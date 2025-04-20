from flask import Flask, request, jsonify
from flask_cors import CORS
from webcrawler import WebCrawler
from serpapi import GoogleSearch
import chardet
import re
import pickle
import numpy as np
from pythainlp.tag import pos_tag, NER
from pythainlp.tokenize import word_tokenize
from pythainlp.corpus import thai_stopwords
from tensorflow.keras.models import load_model
from gensim.models import KeyedVectors
import os

# import asyncio
# import aiohttp
# from concurrent.futures import ThreadPoolExecutor


SERPAPI_KEY = '1afe956e3bee4f7c44afda188b524793802191f2ddd26256b2ecbe189cefc863'


app = Flask(__name__)
CORS(app, resources={
    r"/predict": {
        "origins": ["http://localhost:5173"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Type"]
    }
})
# executor = ThreadPoolExecutor(max_workers=4)
# Initialize components
crawler = WebCrawler()

# Load FastText model
def load_fasttext_model():
    model_path = r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin'
    return KeyedVectors.load_word2vec_format(model_path, binary=False)

fasttext_model = load_fasttext_model()

# Load models
with open(r"C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

ner = NER("thainer")
model = load_model(r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5')
stopwords = set(thai_stopwords())

def is_url(text):
    url_pattern = re.compile(
        r'^(https?://)?'  # http:// or https://
        r'([A-Za-z0-9-]+\.)+[A-Za-z]{2,}'  # domain
        r'(:\d+)?'  # port
        r'(/[^/\s]*)*'  # path
        r'(\?[^\s]*)?'  # query string
        r'(#\S*)?$',  # fragment
        re.IGNORECASE
    )
    return bool(url_pattern.match(text.strip()))

def get_search_results(query):
    """Get first organic search result"""
    try:
        search = GoogleSearch({
            "q": f"{query} -site:facebook.com -site:twitter.com -site:instagram.com",
            "hl": "th",
            "gl": "th",
            "num": 1,
            "api_key": SERPAPI_KEY
        })
        results = search.get_dict()
        if "organic_results" in results and results["organic_results"]:
            return results["organic_results"][0]
    except Exception as e:
        print(f"Search error: {e}")
    return None

def get_word2vec_embedding(text, model=fasttext_model, vector_size=300):
    """Convert text to FastText embedding vector"""
    vec = np.zeros((vector_size,))
    count = 0
    for word in word_tokenize(text, engine="deepcut"):
        if word in model:
            vec += model[word]
            count += 1
    if count > 0:
        vec /= count  # Average vectors
    return vec

def preprocess_and_extract_features(text):
    # 1. Clean text
    cleaned_text = re.sub(r"[!\'\-#]", "", text)

    # 2. Tokenize
    tokens = word_tokenize(cleaned_text, engine="deepcut")

    # 3. Remove stopwords
    filtered_tokens = [word for word in tokens if word not in stopwords]

    # 4. Word count
    word_count = len(word_tokenize(cleaned_text, engine='newmm'))

    # 5. Noun count
    pos_tags = pos_tag(tokens, engine="perceptron")
    noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))

    # 6. NER entities
    entities = ner.tag(cleaned_text)
    entity_count = sum(1 for _, tag in entities if tag != "O")

    # 7. Bag of Words
    processed_text_str = " ".join(filtered_tokens)
    bow_vector = vectorizer.transform([processed_text_str]).toarray()
    sum_bow = bow_vector.sum(axis=1)[0]

    # 8. FastText Embeddings (NEW)
    fasttext_vec = get_word2vec_embedding(cleaned_text)

    # Combine all features (now includes FastText)
    model_features = np.concatenate([
        np.array([[word_count, noun_count, entity_count, sum_bow]]),
        fasttext_vec.reshape(1, -1)
    ], axis=1)

    return {
        "processed_text": filtered_tokens,
        "features": model_features.tolist(),
        "analysis": {
            "word_count": word_count,
            "noun_count": noun_count,
            "entity_count": entity_count,
            "sum_bow": sum_bow,
            "embedding_size": len(fasttext_vec)  # NEW
        }
    }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_input = data.get('text', '').strip()
    
    if not user_input:
        return jsonify({"error": "Text input is required"}), 400
    
    try:
        # Get search result regardless of input type
        search_result = get_search_results(user_input)
        search_metadata = {
            'url': None,
            'title': None,
            'content': None
        }
        
        if search_result:
            search_url = search_result.get('link')
            search_title = search_result.get('title')
            if search_url:
                _, search_content = crawler.extract_content(search_url)
                search_metadata = {
                    'url': search_url,
                    'title': search_title,
                    'content': search_content
                }
        
        # Create comprehensive input combining all elements
        analysis_text = (
            f"USER INPUT: {user_input}\n"
            f"SEARCH RESULT URL: {search_metadata['url'] or 'N/A'}\n"
            f"SEARCH RESULT TITLE: {search_metadata['title'] or 'N/A'}\n"
            f"SEARCH RESULT CONTENT: {search_metadata['content'][:1000] if search_metadata['content'] else 'N/A'}"
        )
        
        # Preprocess and extract features (now with FastText)
        result = preprocess_and_extract_features(analysis_text)
        input_array = np.array(result['features'])        # shape: (1, 304)
        input_array = np.expand_dims(input_array, axis=1) # shape: (1, 1, 304)
        
        # Make prediction
        predictions = model.predict(input_array)
        
        # Get dominant category
        categories = ["True", "Fake", "Suspicious"]
        dominant_index = np.argmax(predictions[0])
        dominant_category = categories[dominant_index]
        dominant_probability = float(predictions[0][dominant_index])
        
        return jsonify({
            "prediction": dominant_category,
            "probability": dominant_probability,
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Processing error: {str(e)}",
            "fallback_input": user_input[:500] if user_input else None
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)






# async def get_search_results_async(query):
#     loop = asyncio.get_event_loop()
#     try:
#         return await loop.run_in_executor(
#             executor,
#             lambda: GoogleSearch({
#                 "q": f"{query} -site:facebook.com",
#                 "hl": "th",
#                 "num": 1,
#                 "api_key": "your_api_key"
#             }).get_dict()
#         )
#     except Exception as e:
#         print(f"Search error: {e}")
#         return None

# async def extract_content_async(url):
#     loop = asyncio.get_event_loop()
#     try:
#         return await loop.run_in_executor(
#             executor,
#             lambda: crawler.extract_content(url)
#         )
#     except Exception as e:
#         print(f"Extraction error: {e}")
#         return url, f"Extraction failed: {str(e)}"

# async def predict_async(features):
#     loop = asyncio.get_event_loop()
#     return await loop.run_in_executor(
#         executor,
#         lambda: model.predict(np.array(features))
#     )

# @app.route('/predict', methods=['POST'])
# async def predict():
#     data = request.get_json()
#     user_input = data.get('text', '').strip()
    
#     if not user_input:
#         return jsonify({"error": "Text input is required"}), 400

#     try:
#         # Step 1: Perform search (async)
#         search_result = await get_search_results_async(user_input)
#         search_metadata = {'url': None, 'title': None, 'content': None}

#         if search_result and 'organic_results' in search_result:
#             first_result = search_result['organic_results'][0]
#             search_url = first_result.get('link')
#             search_title = first_result.get('title')
            
#             if search_url:
#                 # Step 2: Extract content (async)
#                 _, search_content = await extract_content_async(search_url)
#                 search_metadata = {
#                     'url': search_url,
#                     'title': search_title,
#                     'content': search_content[:1000]  # Limit content size
#                 }

#         # Step 3: Prepare analysis input
#         analysis_text = (
#             f"QUERY: {user_input}\n"
#             f"URL: {search_metadata['url'] or 'N/A'}\n"
#             f"TITLE: {search_metadata['title'] or 'N/A'}\n"
#             f"CONTENT: {search_metadata['content'] or 'N/A'}"
#         )

#         # Step 4: Preprocess (CPU-bound, async)
#         loop = asyncio.get_event_loop()
#         features = await loop.run_in_executor(
#             executor,
#             lambda: preprocess_and_extract_features(analysis_text)['features']
#         )

#         # Step 5: Model prediction (async)
#         predictions = await predict_async(features)
        
#         # Step 6: Determine result
#         categories = ["True", "Suspicious", "Fake"]
#         dominant_index = np.argmax(predictions[0])
        
#         return jsonify({
#             "prediction": categories[dominant_index],
#             "probability": float(predictions[0][dominant_index]),
#             "metadata": {
#                 "search_url": search_metadata['url'],
#                 "search_title": search_metadata['title']
#             }
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle
# from tensorflow.keras.models import load_model
# from pythainlp.tag import pos_tag
# from pythainlp.corpus import thai_stopwords
# from pythainlp.tag import NER
# from pythainlp.tokenize import word_tokenize
# import re
# import numpy as np
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Load models (adjust paths as needed)
# with open("vectorizer.pkl", "rb") as f:
#     vectorizer = pickle.load(f)

# ner = NER("thainer")
# model = load_model('best_model_LSTM_85.h5')
# stopwords = set(thai_stopwords())

# def preprocess_and_extract_features(text):
#     # 1. Clean text
#     cleaned_text = re.sub(r"[!\'\-#]", "", text)

#     # 2. Tokenize
#     tokens = word_tokenize(cleaned_text, engine="deepcut")

#     # 3. Remove stopwords
#     filtered_tokens = [word for word in tokens if word not in stopwords]

#     # 4. Word count
#     word_count = len(word_tokenize(cleaned_text, engine='newmm'))

#     # 5. Noun count
#     pos_tags = pos_tag(tokens, engine="perceptron")
#     noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))

#     # 6. NER entities
#     entities = ner.tag(cleaned_text)
#     entity_count = sum(1 for _, tag in entities if tag != "O")

#     # 7. Bag of Words
#     processed_text_str = " ".join(filtered_tokens)
#     bow_vector = vectorizer.transform([processed_text_str]).toarray()
#     sum_bow = bow_vector.sum(axis=1)[0]

#     # Prepare features for model prediction
#     model_features = np.array([[word_count, noun_count, entity_count, sum_bow]])

#     return {
#         "processed_text": filtered_tokens,
#         "features": model_features.tolist(),
#         "analysis": {
#             "word_count": word_count,
#             "noun_count": noun_count,
#             "entity_count": entity_count,
#             "sum_bow": sum_bow
#         }
#     }

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     text = data.get('text', '')
    
#     if not text:
#         return jsonify({"error": "No text provided"}), 400
    
#     try:
#         # Preprocess and extract features
#         result = preprocess_and_extract_features(text)
        
#         # Make prediction (assuming 3 output classes: True, Suspicious, Fake)
#         predictions = model.predict(np.array(result['features']))
        
#         # Get dominant category
#         categories = ["True", "Suspicious", "Fake"]
#         dominant_index = np.argmax(predictions[0])
#         dominant_category = categories[dominant_index]
#         dominant_probability = float(predictions[0][dominant_index])
        
#         return jsonify({
#             "prediction": dominant_category,
#             "probability": dominant_probability
#         })
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)