import os
import requests
import fitz  # PyMuPDF
import easyocr
import re
import chardet
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.edge.service import Service
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse

class WebCrawler:
    def __init__(self):
        # Initialize EasyOCR once
        self.reader = easyocr.Reader(['en', 'th'], gpu=True)
        self.USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        self.TEMP_DIR = "temp_webcontent/"
        os.makedirs(self.TEMP_DIR, exist_ok=True)
    
    def extract_content(self, url):
        """Main extraction method that gets all text"""
        if self._is_pdf(url):
            return self._extract_pdf_content(url)
        return self._extract_web_content(url)
    
    def _is_pdf(self, url):
        if url.lower().endswith('.pdf'):
            return True
        try:
            response = requests.head(url, timeout=5, headers={'User-Agent': self.USER_AGENT})
            return 'pdf' in response.headers.get('Content-Type', '').lower()
        except:
            return False
    
    def _extract_pdf_content(self, url):
        """Extract all text from PDF (both text and image-based)"""
        try:
            response = requests.get(url, stream=True, headers={'User-Agent': self.USER_AGENT})
            if response.status_code != 200:
                return url, "Failed to download PDF"
            
            pdf_path = os.path.join(self.TEMP_DIR, "temp.pdf")
            with open(pdf_path, 'wb') as f:
                f.write(response.content)
            
            text_content = []
            with fitz.open(pdf_path) as doc:
                for page in doc:
                    text = page.get_text()
                    if text.strip():
                        text_content.append(text)
                    else:
                        text_content.append(self._ocr_page(page))
            
            os.remove(pdf_path)
            return os.path.basename(url), '\n'.join(text_content)
        except Exception as e:
            return url, f"PDF processing error: {str(e)}"
    
    def _ocr_page(self, page):
        """OCR for image-based PDF pages"""
        try:
            pix = page.get_pixmap()
            img_path = os.path.join(self.TEMP_DIR, f"page_{page.number}.png")
            pix.save(img_path)
            result = self.reader.readtext(img_path)
            os.remove(img_path)
            return ' '.join([item[1] for item in result])
        except Exception as e:
            return f"[OCR failed: {str(e)}]"
    
    def _extract_web_content(self, url):
        """Extract all text from webpage with proper encoding detection"""
        # Try with requests first
        try:
            response = requests.get(url, timeout=10, headers={'User-Agent': self.USER_AGENT})
            
            # Detect encoding if not properly declared
            if not response.encoding or response.encoding.lower() == 'iso-8859-1':
                detected_encoding = chardet.detect(response.content)['encoding']
                if detected_encoding:
                    response.encoding = detected_encoding
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                title = self._extract_title(soup)
                content = self._get_all_text(soup)
                return title, content
        except Exception as e:
            print(f"Requests extraction failed: {e}")
        
        # Fallback to Selenium
        return self._extract_with_selenium(url)
    
    def _extract_with_selenium(self, url):
        """Selenium fallback with encoding detection"""
        options = Options()
        options.add_argument("--headless")
        options.add_argument(f"user-agent={self.USER_AGENT}")
        service = Service(EdgeChromiumDriverManager().install())
        driver = webdriver.Edge(service=service, options=options)
        
        try:
            driver.get(url)
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # Detect encoding from response
            page_source = driver.page_source
            try:
                encoding = chardet.detect(page_source.encode())['encoding']
                soup = BeautifulSoup(page_source, 'html.parser', from_encoding=encoding)
            except:
                soup = BeautifulSoup(page_source, 'html.parser')
            
            title = self._extract_title(soup)
            content = self._get_all_text(soup)
            return title, content
        except Exception as e:
            return url, f"Selenium extraction failed: {str(e)}"
        finally:
            driver.quit()
    
    def _get_all_text(self, soup):
        """Extract and clean all text from BeautifulSoup object"""
        # Remove script and style elements
        for element in soup(["script", "style", "nav", "footer", "iframe"]):
            element.decompose()
        
        # Get text and clean it
        text = soup.get_text(separator='\n', strip=True)
        text = re.sub(r'\s+', ' ', text)  # Normalize whitespace
        text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)  # Remove control chars
        return text
    
    def _extract_title(self, soup):
        """Comprehensive title extraction"""
        # Try standard title tag
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()
        
        # Try OpenGraph/Twitter cards
        for meta in soup.find_all('meta'):
            if meta.get('property', '').lower() in ['og:title', 'twitter:title']:
                return meta.get('content', '').strip()
        
        # Try prominent headings
        for tag in ['h1', 'h2', 'h3']:
            heading = soup.find(tag)
            if heading:
                return heading.get_text().strip()
        
        return urlparse(soup.base_url if soup.base_url else '').path or "Untitled Content"