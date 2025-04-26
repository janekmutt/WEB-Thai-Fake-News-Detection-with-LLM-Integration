from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from gensim.models import KeyedVectors
from pythainlp.tokenize import word_tokenize
from pythainlp.tag import pos_tag
import re
import joblib
from flask_cors import CORS
from transformers import pipeline, MT5Tokenizer, MT5ForConditionalGeneration
from torch import cuda
from gradio_client import Client
import ast 

import sys

sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load original models EXACTLY as in your code
fasttext_model = KeyedVectors.load_word2vec_format(
    r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
    binary=False
)
vectorizer = joblib.load(
    r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
)
lstm_model = tf.keras.models.load_model(
    r"C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
    compile=False
)
lstm_model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# Load Gradio Clients
bert_client = Client("EXt1/BERT-thainews-classification")
mdeberta_client = Client("EXt1/Mdeberta_v3_Thainews_Classification")

def predict_with_bert(text):
    result = bert_client.predict(text=text, api_name="/predict")
    if isinstance(result, str):
        # Safely parse the returned string into a tuple
        result = ast.literal_eval(result)
    label, prob_str = result  # result is ('Fake News', '81.37%')
    probability = float(prob_str.replace('%', '')) / 100
    return label, probability

def predict_with_mdeberta(text):
    result = mdeberta_client.predict(text=text, api_name="/predict")
    if isinstance(result, str):
        # Safely parse the returned string into a tuple
        result = ast.literal_eval(result)
    label, prob_str = result
    probability = float(prob_str.replace('%', '')) / 100
    return label, probability

def predict_with_lstm(text):
    X_input = preprocess_and_extract_features(text)
    prediction = lstm_model.predict(X_input)
    categories = ["Real News", "Fake News"]
    dominant_index = np.argmax(prediction[0])
    dominant_label = categories[dominant_index]
    probability = float(prediction[0][dominant_index])
    return dominant_label, probability

def majority_vote(predictions):
    """
    predictions: list of tuples like [('Fake News', 0.81), ('Fake News', 0.85), ('True News', 0.40)]
    """
    label_votes = {}
    prob_accumulator = {}

    for label, prob in predictions:
        label_votes[label] = label_votes.get(label, 0) + 1
        prob_accumulator[label] = prob_accumulator.get(label, 0.0) + prob

    # Find label with majority vote
    majority_label = max(label_votes.items(), key=  lambda x: (x[1], prob_accumulator.get(x[0], 0.0)))[0]
    average_probability = prob_accumulator[majority_label] / label_votes[majority_label]
    return majority_label, average_probability


def get_word2vec_embedding(text, model, vector_size=300):
    vec = np.zeros((vector_size,))
    count = 0
    for word in word_tokenize(text, engine="deepcut"):
        if word in model:
            vec += model[word]
            count += 1
    if count > 0:
        vec /= count
    return vec

def preprocess_and_extract_features(text):
    cleaned_text = re.sub(r"[!\'\-#]", "", text)
    word_vector = get_word2vec_embedding(cleaned_text, fasttext_model)
    tokens = word_tokenize(cleaned_text, engine="deepcut")
    pos_tags = pos_tag(tokens, engine="perceptron")
    noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))
    word_count = len(tokens)
    entity_count = 0
    bow_vector = vectorizer.transform([cleaned_text]).toarray()
    sum_bow = bow_vector.sum(axis=1)[0]
    numeric_features = np.array([noun_count, word_count, entity_count, sum_bow]).reshape(1, 1, 4)
    word_vector = word_vector.reshape(1, 1, -1)
    X_combined = np.concatenate([word_vector, numeric_features], axis=-1)
    return X_combined

# 3. SINGLE PREDICTION ENDPOINT (ORIGINAL + NEW FUNCTIONALITY)
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    user_input = data.get("text", "").strip()

    if not user_input:
        return jsonify({"error": "Text input is required"}), 400

    try:
        # Predictions from all 3 models
        lstm_label, lstm_prob = predict_with_lstm(user_input)
        bert_label, bert_prob = predict_with_bert(user_input)
        mdeberta_label, mdeberta_prob = predict_with_mdeberta(user_input)

        # Ensemble
        all_predictions = [
            (lstm_label, lstm_prob),
            (bert_label, bert_prob),
            (mdeberta_label, mdeberta_prob)
        ]

        final_label, final_avg_prob = majority_vote(all_predictions)

        # A. Original response
        response = {
            "prediction": final_label,
            "probability": round(final_avg_prob, 4),
            "input_text": user_input,
            "individual_predictions": {
                "LSTM": {"label": lstm_label, "probability": round(lstm_prob, 4)},
                "BERT": {"label": bert_label, "probability": round(bert_prob, 4)},
                "MDeBERTa": {"label": mdeberta_label, "probability": round(mdeberta_prob, 4)}
            }
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)



























# from flask import Flask, request, jsonify
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.optimizers import Adam
# from gensim.models import KeyedVectors
# from pythainlp.tokenize import word_tokenize
# from pythainlp.tag import pos_tag
# import re
# import joblib
# from flask_cors import CORS
# from webcrawler import WebCrawler
# from transformers import pipeline, MT5Tokenizer, MT5ForConditionalGeneration
# from torch import cuda
# import sys

# sys.stdout.reconfigure(encoding='utf-8')

# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"])

# # Initialize WebCrawler
# crawler = WebCrawler()

# # Load original models EXACTLY as in your code
# fasttext_model = KeyedVectors.load_word2vec_format(
#     r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
#     binary=False
# )
# vectorizer = joblib.load(
#     r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
# )
# lstm_model = tf.keras.models.load_model(
#     r"C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
#     compile=False
# )
# lstm_model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# # Initialize MT5 summarizer
# mt5_tokenizer = MT5Tokenizer.from_pretrained("EXt1/KMUTT-CPE35-thai-mt5base-summarizer")
# mt5_model = MT5ForConditionalGeneration.from_pretrained("EXt1/KMUTT-CPE35-thai-mt5base-summarizer")
# summarizer = pipeline(
#     "summarization",
#     model=mt5_model,
#     tokenizer=mt5_tokenizer,
#     device=0 if cuda.is_available() else -1
# )

# # 1. EXACT COPY OF YOUR ORIGINAL PREPROCESSING FUNCTIONS
# def get_word2vec_embedding(text, model, vector_size=300):
#     vec = np.zeros((vector_size,))
#     count = 0
#     for word in word_tokenize(text, engine="deepcut"):
#         if word in model:
#             vec += model[word]
#             count += 1
#     if count > 0:
#         vec /= count
#     return vec

# def preprocess_and_extract_features(text):
#     cleaned_text = re.sub(r"[!\'\-#]", "", text)
#     word_vector = get_word2vec_embedding(cleaned_text, fasttext_model)
#     tokens = word_tokenize(cleaned_text, engine="deepcut")
#     pos_tags = pos_tag(tokens, engine="perceptron")
#     noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))
#     word_count = len(tokens)
#     entity_count = 0
#     bow_vector = vectorizer.transform([cleaned_text]).toarray()
#     sum_bow = bow_vector.sum(axis=1)[0]
#     numeric_features = np.array([noun_count, word_count, entity_count, sum_bow]).reshape(1, 1, 4)
#     word_vector = word_vector.reshape(1, 1, -1)
#     X_combined = np.concatenate([word_vector, numeric_features], axis=-1)
#     return X_combined

# # 2. NEW SUMMARIZATION FUNCTION
# def generate_summary(text):
#     if len(text) < 300:
#         return "Content too short for summary"
#     summary = summarizer(
#         text,
#         max_length=512,
#         min_length=200,
#         num_beams=10,
#         do_sample=False,
#         length_penalty=1.1,
#         no_repeat_ngram_size=3,
#         repetition_penalty=2.0,
#         early_stopping=True
#     )
#     return summary[0]['summary_text']

# # 3. SINGLE PREDICTION ENDPOINT (ORIGINAL + NEW FUNCTIONALITY)
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     user_input = data.get("text", "").strip()

#     if not user_input:
#         return jsonify({"error": "Text input is required"}), 400

#     try:
#         # A. ORIGINAL PREDICTION LOGIC (UNCHANGED)
#         X_input = preprocess_and_extract_features(user_input)
#         predictions = lstm_model.predict(X_input)
#         categories = ["True", "Fake", "Suspicious"]
#         dominant_index = np.argmax(predictions[0])
#         dominant_category = categories[dominant_index]
#         dominant_probability = float(predictions[0][dominant_index])

#         # B. NEW SEARCH FUNCTIONALITY
#         search_results = crawler.google_search(user_input)
#         articles = []
#         for result in search_results:
#             content = crawler.get_article_text(result.get('link'))
#             articles.append({
#                 # "title": result.get('title', 'No Title'),
#                 # "url": result.get('link'),
#                 "summary": generate_summary(content),
#             })

#         return jsonify({
#             # Original response fields
#             "prediction": dominant_category,
#             "probability": dominant_probability,
#             "input_text": user_input,
            
#             # New fields
#             "summary": articles
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)




































# from flask import Flask, request, jsonify
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.optimizers import Adam
# from gensim.models import KeyedVectors
# from pythainlp.tokenize import word_tokenize
# from pythainlp.tag import pos_tag
# import re
# import joblib
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"])

# # Load FastText model
# fasttext_model = KeyedVectors.load_word2vec_format(
#     r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
#     binary=False
# )

# # Load CountVectorizer
# vectorizer = joblib.load(
#     r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
# )

# # Load the trained model
# model = tf.keras.models.load_model(
#     r"C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
#     compile=False
# )
# model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# # Function to convert text to word vector
# def get_word2vec_embedding(text, model, vector_size=300):
#     vec = np.zeros((vector_size,))
#     count = 0
#     for word in word_tokenize(text, engine="deepcut"):
#         if word in model:
#             vec += model[word]
#             count += 1
#     if count > 0:
#         vec /= count
#     return vec

# # Preprocessing and feature extraction
# def preprocess_and_extract_features(text):
#     cleaned_text = re.sub(r"[!\'\-#]", "", text)

#     word_vector = get_word2vec_embedding(cleaned_text, fasttext_model)

#     tokens = word_tokenize(cleaned_text, engine="deepcut")
#     pos_tags = pos_tag(tokens, engine="perceptron")
#     noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))

#     word_count = len(tokens)
#     entity_count = 0  # Optional: implement real NER if needed

#     bow_vector = vectorizer.transform([cleaned_text]).toarray()
#     sum_bow = bow_vector.sum(axis=1)[0]

#     numeric_features = np.array([noun_count, word_count, entity_count, sum_bow]).reshape(1, 1, 4)
#     word_vector = word_vector.reshape(1, 1, -1)

#     X_combined = np.concatenate([word_vector, numeric_features], axis=-1)
#     return X_combined

# # Prediction route
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     user_input = data.get("text", "")

#     if not user_input.strip():
#         return jsonify({"error": "⚠️ Missing 'headline' field"}), 400

#     try:
#         X_input = preprocess_and_extract_features(user_input)
#         predictions = model.predict(X_input)

#         categories = ["True", "Fake", "Suspicious"]
#         dominant_index = np.argmax(predictions[0])
#         dominant_category = categories[dominant_index]
#         dominant_probability = float(predictions[0][dominant_index])

#         return jsonify({
#             "prediction": dominant_category,
#             "probability": dominant_probability,
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)
