# import asyncio
# import re
# import aiohttp
# import fitz  # PyMuPDF
# import os
# from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
# from crawl4ai.content_filter_strategy import PruningContentFilter
# from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

# DOWNLOAD_DIR = "C:/Users/cmanw/OneDrive/Documents/WEB-Thai-Fake-News-Detection-with-LLM-Integration/flask-server/temp"
# PDF_FILENAME = os.path.join(DOWNLOAD_DIR, "temp.pdf")

# async def download_pdf(url, filename=PDF_FILENAME):
#     async with aiohttp.ClientSession() as session:
#         async with session.get(url) as resp:
#             if resp.status == 200:
#                 os.makedirs(os.path.dirname(filename), exist_ok=True)
#                 with open(filename, 'wb') as f:
#                     f.write(await resp.read())
#                 return filename
#             else:
#                 print("❌ Failed to download PDF.")
#                 return None

# def extract_text_from_pdf(filepath, char_limit=2000):
#     doc = fitz.open(filepath)
#     text = ""
#     for page in doc:
#         text += page.get_text()
#         if len(text) >= char_limit:
#             break
#     doc.close()
#     return text[:char_limit]

# async def main():
#     url = "https://www.thaipbs.or.th/news/content/342441"  # 🔁 Replace this with actual PDF or HTML URL

#     if url.lower().endswith('.pdf'):
#         filepath = await download_pdf(url)
#         if filepath:
#             extracted = extract_text_from_pdf(filepath, char_limit=1000)
#             print("🧠 Extracted from PDF:\n", extracted)
#             os.remove(filepath)  # 🧹 Clean up after use
#         return

#     # HTML fallback using crawl4ai
#     run_config = CrawlerRunConfig(
#         exclude_internal_links=True,
#         excluded_tags=["a", "script", "style"],
#         excluded_selector="*[class*=popup], *[class*=modal], *[class*=entry-summary], *[class*=footer]",
#         exclude_external_links=True,
#         markdown_generator=DefaultMarkdownGenerator(
#             content_filter=PruningContentFilter(
#                 threshold=0.20,
#                 threshold_type="fixed",
#                 min_word_threshold=40,
#             )
#         )
#     )

#     async with AsyncWebCrawler() as crawler:
#         result = await crawler.arun(url=url, config=run_config)
#         if result.markdown:
#             result.markdown = re.sub(r'https?://\S+|www\.\S+', '', result.markdown)
#             noise_patterns = [
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}ไม่สามารถระบุตัวตนของคุณได้',
#                 r'ปฏิเสธทั้งหมด ยืนยันตัวเลือกของฉัน',
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}ฟังก์ชันบางอย่างของไซต์อาจทำงานไม่ถูกต้อง',
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}คุณจะไม่เห็นโฆษณาที่คุณเป็นเป้าหมาย',
#             ]
#             for pattern in noise_patterns:
#                 result.markdown = re.sub(pattern, '', result.markdown, flags=re.MULTILINE)
#             filtered_blocks = [
#                 block.strip() for block in result.markdown.split('\n')
#                 if len(block.strip()) >= 30 and not re.match(r'^##+', block.strip())
#             ]
#             result.markdown = '\n'.join(filtered_blocks)
#             print("🧠 Cleaned content:\n", result.markdown)  # Limit to 1000 chars for consistency
#         else:
#             print("❌ No content extracted from the URL.")

# if __name__ == "__main__":
#     asyncio.run(main())





# import asyncio
# import re
# import aiohttp
# import fitz  # PyMuPDF
# import os
# from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
# from crawl4ai.content_filter_strategy import PruningContentFilter
# from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
# from googlesearch import search  # Google search package
# import streamlit as st
# import sys

# if sys.platform == "win32":
#     asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# DOWNLOAD_DIR = "C:/Users/cmanw/OneDrive/Documents/WEB-Thai-Fake-News-Detection-with-LLM-Integration/flask-server/temp"
# PDF_FILENAME = os.path.join(DOWNLOAD_DIR, "temp.pdf")

# async def download_pdf(url, filename=PDF_FILENAME):
#     async with aiohttp.ClientSession() as session:
#         async with session.get(url) as resp:
#             if resp.status == 200:
#                 os.makedirs(os.path.dirname(filename), exist_ok=True)
#                 with open(filename, 'wb') as f:
#                     f.write(await resp.read())
#                 return filename
#             else:
#                 print("❌ Failed to download PDF.")
#                 return None

# def extract_text_from_pdf(filepath, char_limit=2000):
#     doc = fitz.open(filepath)
#     text = ""
#     for page in doc:
#         text += page.get_text()
#         if len(text) >= char_limit:
#             break
#     doc.close()
#     return text[:char_limit]

# async def extract_content_from_url(url):
#     if url.lower().endswith('.pdf'):
#         filepath = await download_pdf(url)
#         if filepath:
#             extracted = extract_text_from_pdf(filepath, char_limit=1000)
#             return f"🧠 Extracted from PDF:\n{extracted}"
#         return "❌ Failed to extract content from the PDF."

#     # HTML fallback using crawl4ai
#     run_config = CrawlerRunConfig(
#         exclude_internal_links=True,
#         excluded_tags=["a", "script", "style"],
#         excluded_selector="*[class*=popup], *[class*=modal], *[class*=entry-summary], *[class*=footer]",
#         exclude_external_links=True,
#         markdown_generator=DefaultMarkdownGenerator(
#             content_filter=PruningContentFilter(
#                 threshold=0.20,
#                 threshold_type="fixed",
#                 min_word_threshold=40,
#             )
#         )
#     )

#     async with AsyncWebCrawler() as crawler:
#         result = await crawler.arun(url=url, config=run_config)
#         if result.markdown:
#             result.markdown = re.sub(r'https?://\S+|www\.\S+', '', result.markdown)
#             noise_patterns = [
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}ไม่สามารถระบุตัวตนของคุณได้',
#                 r'ปฏิเสธทั้งหมด ยืนยันตัวเลือกของฉัน',
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}ฟังก์ชันบางอย่างของไซต์อาจทำงานไม่ถูกต้อง',
#                 r'คุกกี้เหล่านี้(?:.|\s){0,500}คุณจะไม่เห็นโฆษณาที่คุณเป็นเป้าหมาย',
#             ]
#             for pattern in noise_patterns:
#                 result.markdown = re.sub(pattern, '', result.markdown, flags=re.MULTILINE)
#             filtered_blocks = [
#                 block.strip() for block in result.markdown.split('\n')
#                 if len(block.strip()) >= 30 and not re.match(r'^##+', block.strip())
#             ]
#             result.markdown = '\n'.join(filtered_blocks)
#             return f"🧠 Cleaned content:\n{result.markdown[:1000]}"
#         else:
#             return "❌ No content extracted from the URL."

# async def main():
#     st.title("Thai Fake News Detection with LLM Integration")
#     query = st.text_input("Search for a topic", "")

#     if query:
#         # Use Google search to find the relevant link
#         search_results = list(search(query, num_results=5))  # Get top 5 search results
#         st.write("🕵️‍♂️ Search results:")
#         for idx, result in enumerate(search_results, 1):
#             st.write(f"{idx}. {result}")
        
#         selected_url = st.selectbox("Select a URL to fetch content", search_results)
        
#         if selected_url:
#             st.write(f"🔗 Extracting content from: {selected_url}")
#             content = await extract_content_from_url(selected_url)
#             st.write(content)

# if __name__ == "__main__":
#     asyncio.run(main())


import asyncio
import re
import aiohttp
import fitz  # PyMuPDF
import os
import streamlit as st
import sys

from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
from serpapi import GoogleSearch  # ✅ SerpAPI import

# Fix for Windows event loop
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# Constants
DOWNLOAD_DIR = "C:/Users/cmanw/OneDrive/Documents/WEB-Thai-Fake-News-Detection-with-LLM-Integration/flask-server/temp"
PDF_FILENAME = os.path.join(DOWNLOAD_DIR, "temp.pdf")
SERPAPI_KEY = "1afe956e3bee4f7c44afda188b524793802191f2ddd26256b2ecbe189cefc863"  # 🔑 Replace with your actual SerpAPI key

# Function to download PDFs
async def download_pdf(url, filename=PDF_FILENAME):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            if resp.status == 200:
                os.makedirs(os.path.dirname(filename), exist_ok=True)
                with open(filename, 'wb') as f:
                    f.write(await resp.read())
                return filename
            else:
                print("❌ Failed to download PDF.")
                return None

# Function to extract text from PDFs
def extract_text_from_pdf(filepath, char_limit=2000):
    doc = fitz.open(filepath)
    text = ""
    for page in doc:
        text += page.get_text()
        if len(text) >= char_limit:
            break
    doc.close()
    return text[:char_limit]

# Content extraction from URL or PDF
async def extract_content_from_url(url):
    if url.lower().endswith('.pdf'):
        filepath = await download_pdf(url)
        if filepath:
            extracted = extract_text_from_pdf(filepath, char_limit=1000)
            return f"🧠 Extracted from PDF:\n{extracted}"
        return "❌ Failed to extract content from the PDF."

    # HTML fallback using crawl4ai
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
                if len(block.strip()) >= 30 and not re.match(r'^##+', block.strip())
            ]
            result.markdown = '\n'.join(filtered_blocks)
            return f"🧠 Cleaned content:\n{result.markdown[:1000]}"
        else:
            return "❌ No content extracted from the URL."

# Get top search results from SerpAPI
def get_serpapi_results(query, api_key, num_results=5):
    params = {
        "q": query,
        "api_key": api_key,
        "engine": "google",
        "num": num_results
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    links = []

    if "organic_results" in results:
        for res in results["organic_results"][:num_results]:
            if "link" in res:
                links.append(res["link"])
    return links

# Streamlit app
async def main():
    st.title("Thai Fake News Detection with LLM Integration")
    query = st.text_input("Search for a topic", "")

    if query:
        # Use SerpAPI to get search results
        search_results = get_serpapi_results(query, SERPAPI_KEY)
        if not search_results:
            st.warning("No results found.")
            return

        st.write("🕵️‍♂️ Search results:")
        for idx, result in enumerate(search_results, 1):
            st.write(f"{idx}. {result}")

        selected_url = st.selectbox("Select a URL to fetch content", search_results)

        if selected_url:
            st.write(f"🔗 Extracting content from: {selected_url}")
            content = await extract_content_from_url(selected_url)
            st.write(content)

# Run the app
if __name__ == "__main__":
    asyncio.run(main())





# from gradio_client import Client
# import ast

# # Connect to Gradio Client
# client = Client("EXt1/BERT-thainews-classification")
# print(f"Loaded as API: {client.src} ✔")

# # Predict using the API
# result = client.predict(
#     text="20 เม.ย. 68 เวลา 01.03 น. เชียงใหม่ เชียงราย ยังคงมีแผ่นดินไหว​ต่อเนื่อง",
#     api_name="/predict"
# )

# # Debugging output
# print(f"Raw result: {result}")
# print(f"Type of result: {type(result)}")
# print(f"Length of result: {len(result)}")

# # --- New Fix Start ---
# try:
#     # Safely parse the string result into a real tuple
#     parsed_result = ast.literal_eval(result)

#     # Now unpack it
#     label, prob_str = parsed_result

#     # Clean probability string and convert to float
#     probability = float(prob_str.replace('%', '').strip()) / 100

#     print(f"Label: {label}, Probability: {probability}")

# except Exception as e:
#     print(f"Error parsing prediction result: {e}")
#     label = "Error"
#     probability = 0































# import os
# import requests
# import hashlib
# import pyodbc
# import time
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from selenium.webdriver.edge.options import Options
# from selenium.webdriver.edge.service import Service
# from webdriver_manager.microsoft import EdgeChromiumDriverManager
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import chardet
# import fitz  # PyMuPDF
# import easyocr
# from urllib.parse import urlparse
# from serpapi import GoogleSearch

# class WebCrawler:
#     def __init__(self, db_connection=None, api_key=None):
#         self.DB_CONNECTION = db_connection or "DRIVER={ODBC Driver 18 for SQL Server};SERVER=NAPATLAPTOP;DATABASE=PredictionDB;UID=test12;PWD=test12;TrustServerCertificate=yes;"
#         self.API_KEY = api_key or '1afe956e3bee4f7c44afda188b524793802191f2ddd26256b2ecbe189cefc863'
#         self.TEMP_DIR = "webcrawling/temp/"
#         os.makedirs(self.TEMP_DIR, exist_ok=True)
#         self.reader = easyocr.Reader(['en', 'th'])  # Initialize EasyOCR once
#         self.USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

#     # --------------------------
#     # PDF Handling Methods
#     # --------------------------

#     def validate_pdf_url(self, url):
#         """Check if URL points to a PDF"""
#         if url.lower().endswith('.pdf'):
#             return True
#         try:
#             response = requests.head(url, timeout=5, headers={'User-Agent': self.USER_AGENT})
#             content_type = response.headers.get('Content-Type', '')
#             if 'pdf' in content_type.lower():
#                 return True
#         except requests.RequestException:
#             return False
#         return False

#     def extract_pdf_text(self, url):
#         """Extract text from PDF (both text and image-based)"""
#         response = requests.get(url, stream=True, headers={'User-Agent': self.USER_AGENT})
#         pdf_text = ""
        
#         if response.status_code == 200:
#             filename = os.path.join(self.TEMP_DIR, os.path.basename(url))
            
#             with open(filename, "wb") as f:
#                 f.write(response.content)
            
#             with fitz.open(filename) as doc:
#                 for page_num in range(len(doc)):
#                     page = doc.load_page(page_num)
#                     text = page.get_text("rawdict")
#                     if text.strip():
#                         pdf_text += text + "\n"
#                     else:
#                         image = page.get_pixmap()
#                         image_path = os.path.join(self.TEMP_DIR, f"page_{page_num}.png")
#                         image.save(image_path)
#                         pdf_text += self.extract_text_from_image(image_path) + "\n"
#                         os.remove(image_path)
            
#             os.remove(filename)
        
#         return pdf_text.strip()

#     def extract_text_from_image(self, image_path):
#         """OCR for image-based content"""
#         result = self.reader.readtext(image_path)
#         return " ".join([text[1] for text in result])

#     def insert_pdf_metadata(self, filename, url, pdf_text):
#         """Store PDF metadata in database"""
#         pdf_hash = hashlib.sha256(pdf_text.encode('utf-8')).hexdigest()
#         try:
#             conn = pyodbc.connect(self.DB_CONNECTION)
#             cursor = conn.cursor()
#             cursor.execute("""
#                 INSERT INTO PDF_Metadata (FileName, PDF_URL, PDF_HASH, PDF_CONTENT)
#                 VALUES (?, ?, CONVERT(VARBINARY(32), ?), ?)
#             """, (filename, url, pdf_hash, pdf_text))
#             conn.commit()
#             cursor.close()
#             conn.close()
#         except Exception as e:
#             print(f"Database error: {e}")

#     # --------------------------
#     # Web Content Extraction
#     # --------------------------

#     def get_article_text(self, url):
#         """Main text extraction method with fallbacks"""
#         if self.validate_pdf_url(url):
#             pdf_text = self.extract_pdf_text(url)
#             self.insert_pdf_metadata(os.path.basename(url), url, pdf_text)
#             return pdf_text

#         try:
#             response = requests.get(url, headers={'User-Agent': self.USER_AGENT}, timeout=10)
#             if not response.encoding or response.encoding == 'ISO-8859-1':
#                 detected_encoding = chardet.detect(response.content)['encoding']
#                 response.encoding = detected_encoding
            
#             if response.status_code != 200:
#                 return self.get_article_text_selenium(url)
            
#             soup = BeautifulSoup(response.text, 'html.parser')
#             text = soup.get_text(separator=' ', strip=True)
#             return text if text else self.get_article_text_selenium(url)
#         except Exception:
#             return self.get_article_text_selenium(url)

#     def get_article_text_selenium(self, url):
#         """Selenium fallback for JavaScript-heavy pages"""
#         options = Options()
#         options.use_chromium = True
#         options.add_argument("--headless")
#         options.add_argument("--disable-gpu")
#         options.add_argument("--no-sandbox")
#         options.add_argument("--disable-dev-shm-usage")
#         options.add_argument(f"user-agent={self.USER_AGENT}")
        
#         service = Service(EdgeChromiumDriverManager().install())
#         driver = webdriver.Edge(service=service, options=options)
        
#         try:
#             driver.get(url)
#             WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
#             soup = BeautifulSoup(driver.page_source, 'html.parser')
#             text = soup.get_text(separator=" ", strip=True)
#             return text if text else "⚠️ No article text found!"
#         except Exception as e:
#             return f"❌ Error fetching article: {e}"
#         finally:
#             driver.quit()

#     # --------------------------
#     # Search Functionality
#     # --------------------------

#     def google_search(self, query_input, number_sample=1):
#         """Perform Google search via SerpAPI"""
#         search_query = f"{query_input} -site:facebook.com -site:twitter.com -site:instagram.com -site:tiktok.com"
#         params = {
#             "q": search_query,
#             "hl": "th",
#             "gl": "th",
#             "num": number_sample,
#             "api_key": self.API_KEY
#         }
#         search = GoogleSearch(params)
#         results = search.get_dict()
#         return results.get("organic_results", [])