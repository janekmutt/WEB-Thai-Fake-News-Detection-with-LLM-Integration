
import asyncio
import re
import aiohttp
import fitz  # PyMuPDF
import os
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
from googlesearch import search  # Google search package
from serpapi import GoogleSearch
import sys
# import streamlit as st

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

DOWNLOAD_DIR = "C:/Users/cmanw/OneDrive/Documents/WEB-Thai-Fake-News-Detection-with-LLM-Integration/flask-server/temp"
PDF_FILENAME = os.path.join(DOWNLOAD_DIR, "temp.pdf")
SERPAPI_KEY = "1afe956e3bee4f7c44afda188b524793802191f2ddd26256b2ecbe189cefc863"  # Replace with your own if needed

class ContentExtractor:
    def __init__(self, serpapi_key=SERPAPI_KEY):
        self.serpapi_key = serpapi_key

    async def download_pdf(self, url, filename=PDF_FILENAME):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                if resp.status == 200:
                    os.makedirs(os.path.dirname(filename), exist_ok=True)
                    with open(filename, 'wb') as f:
                        f.write(await resp.read())
                    return filename
                return None

    def extract_text_from_pdf(self, filepath, char_limit=2000):
        doc = fitz.open(filepath)
        text = ""
        for page in doc:
            text += page.get_text()
            if len(text) >= char_limit:
                break
        doc.close()
        return text[:char_limit]

    async def extract_content_from_url(self, url):
        if url.lower().endswith('.pdf'):
            filepath = await self.download_pdf(url)
            if filepath:
                extracted = self.extract_text_from_pdf(filepath, char_limit=1000)
                return "Extracted from PDF:\n" + extracted
            return "Failed to extract content from the PDF."

        run_config = CrawlerRunConfig(
            exclude_internal_links=True,
            excluded_tags=["a", "script", "style"],
            excluded_selector="*[class*=popup], *[class*=modal], *[class*=entry-summary], *[class*=footer]",
            exclude_external_links=True,
            markdown_generator=DefaultMarkdownGenerator(
                content_filter=PruningContentFilter(
                    threshold=0.20,
                    threshold_type="fixed",
                    min_word_threshold=40,
                )
            )
        )

        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(url=url, config=run_config)
            if result.markdown:
                result.markdown = re.sub(r'https?://\S+|www\.\S+', '', result.markdown)
                noise_patterns = [
                    r'คุกกี้เหล่านี้(?:.|\s){0,500}ไม่สามารถระบุตัวตนของคุณได้',
                    r'ปฏิเสธทั้งหมด ยืนยันตัวเลือกของฉัน',
                    r'คุกกี้เหล่านี้(?:.|\s){0,500}ฟังก์ชันบางอย่างของไซต์อาจทำงานไม่ถูกต้อง',
                    r'คุกกี้เหล่านี้(?:.|\s){0,500}คุณจะไม่เห็นโฆษณาที่คุณเป็นเป้าหมาย',
                ]
                for pattern in noise_patterns:
                    result.markdown = re.sub(pattern, '', result.markdown, flags=re.MULTILINE)
                filtered_blocks = [
                    block.strip() for block in result.markdown.split('\n')
                    if len(block.strip()) >= 30 and not re.match(r'^#{1,6}\s', block.strip()) 
                ]
                return "\n" + '\n'.join(filtered_blocks[:10])
            return "No content extracted from the URL."

    async def search_and_extract_top_result(self, query):
        params = {
            "engine": "google",
            "q": query,
            "api_key": self.serpapi_key,
            "num": 5,
            "hl": "th"
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        organic_results = results.get("organic_results", [])
        if not organic_results:
            return None

        # Get top result
        top = organic_results[0]
        top_title = top.get("title")
        top_link = top.get("link")

        if not top_link:
            return None

        # Crawl only the top result
        top_content = await self.extract_content_from_url(top_link)

        # Get the remaining 4 links (if available)
        other_links = [
            {"title": r.get("title"), "link": r.get("link")}
            for r in organic_results[0:5]
            if r.get("link") and r.get("title")
]
        return {
            "title": top_title,
            "link": top_link,
            "content": top_content,
            "other_links": other_links  # Just links
        }


