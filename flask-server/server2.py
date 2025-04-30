# C:\Program Files\Tesseract-OCR
# from flask import Flask, request, jsonify
# import tensorflow as tf
# from tensorflow.keras.optimizers import Adam
# from gensim.models import KeyedVectors
# from pythainlp.tokenize import word_tokenize
# from pythainlp.tag import pos_tag
# import re
# import joblib
# import easyocr
# import cv2
# import numpy as np
# from flask_cors import CORS
# from gradio_client import Client
# import ast 

# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"])

# # Load original models EXACTLY as in your code
# fasttext_model = KeyedVectors.load_word2vec_format(
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
#     binary=False
# )
# vectorizer = joblib.load(
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
# )
# lstm_model = tf.keras.models.load_model(
#     r"C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
#     compile=False
# )
# lstm_model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# # OCR function
# def ocr_from_image(image):
#     reader = easyocr.Reader(['th', 'en'])  # ใช้ภาษาไทยและภาษาอังกฤษ
#     result = reader.readtext(image, detail=0)  # detail=0 จะให้ผลลัพธ์เป็นข้อความ
#     return " ".join(result)  # รวมข้อความจาก OCR

# # OCR route
# @app.route("/ocr", methods=["POST"])
# def ocr():
#     # รับไฟล์ภาพจากการโพสต์
#     file = request.files.get("image")
    
#     if file:
#         # แปลงไฟล์เป็นภาพที่ OpenCV สามารถอ่านได้
#         in_memory_image = np.asarray(bytearray(file.read()), dtype=np.uint8)
#         image = cv2.imdecode(in_memory_image, cv2.IMREAD_COLOR)

#         if image is None:
#             return jsonify({"error": "ไม่สามารถโหลดภาพได้"}), 400

#         # ทำ OCR จากภาพ
#         ocr_text = ocr_from_image(image)

#         return jsonify({"ocr_text": ocr_text})

#     return jsonify({"error": "ไม่พบไฟล์ภาพ"}), 400


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

# # Load Gradio Clients
# bert_client = Client("EXt1/BERT-thainews-classification")
# mdeberta_client = Client("EXt1/Mdeberta_v3_Thainews_Classification")

# def predict_with_bert(text):
#     result = bert_client.predict(text=text, api_name="/predict")
#     if isinstance(result, str):
#         # Safely parse the returned string into a tuple
#         result = ast.literal_eval(result)
#     label, prob_str = result  # result is ('Fake News', '81.37%')
#     probability = float(prob_str.replace('%', '')) / 100
#     return label, probability

# def predict_with_mdeberta(text):
#     result = mdeberta_client.predict(text=text, api_name="/predict")
#     if isinstance(result, str):
#         # Safely parse the returned string into a tuple
#         result = ast.literal_eval(result)
#     label, prob_str = result
#     probability = float(prob_str.replace('%', '')) / 100
#     return label, probability

# def predict_with_lstm(text):
#     X_input = preprocess_and_extract_features(text)
#     prediction = lstm_model.predict(X_input)
#     categories = ["Real News", "Fake News"]
#     dominant_index = np.argmax(prediction[0])
#     dominant_label = categories[dominant_index]
#     probability = float(prediction[0][dominant_index])
#     return dominant_label, probability

# def majority_vote(predictions):
#     """
#     predictions: list of tuples like [('Fake News', 0.81), ('Fake News', 0.85), ('True News', 0.40)]
#     """
#     label_votes = {}
#     prob_accumulator = {}

#     for label, prob in predictions:
#         label_votes[label] = label_votes.get(label, 0) + 1
#         prob_accumulator[label] = prob_accumulator.get(label, 0.0) + prob

#     # Find label with majority vote
#     majority_label = max(label_votes.items(), key=  lambda x: (x[1], prob_accumulator.get(x[0], 0.0)))[0]
#     average_probability = prob_accumulator[majority_label] / label_votes[majority_label]
#     return majority_label, average_probability

# # 3. SINGLE PREDICTION ENDPOINT (ORIGINAL + NEW FUNCTIONALITY)
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     user_input = data.get("text", "").strip()

#     if not user_input:
#         return jsonify({"error": "Text input is required"}), 400

#     try:
#         # Predictions from all 3 models
#         lstm_label, lstm_prob = predict_with_lstm(user_input)
#         bert_label, bert_prob = predict_with_bert(user_input)
#         mdeberta_label, mdeberta_prob = predict_with_mdeberta(user_input)

#         # Ensemble
#         all_predictions = [
#             (lstm_label, lstm_prob),
#             (bert_label, bert_prob),
#             (mdeberta_label, mdeberta_prob)
#         ]

#         final_label, final_avg_prob = majority_vote(all_predictions)

#         # A. Original response
#         response = {
#             "prediction": final_label,
#             "probability": round(final_avg_prob, 4),
#             "input_text": user_input,
#             "individual_predictions": {
#                 "LSTM": {"label": lstm_label, "probability": round(lstm_prob, 4)},
#                 "BERT": {"label": bert_label, "probability": round(bert_prob, 4)},
#                 "MDeBERTa": {"label": mdeberta_label, "probability": round(mdeberta_prob, 4)}
#             }
#         }

#         return jsonify(response)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from gensim.models import KeyedVectors
from pythainlp.tokenize import word_tokenize
from pythainlp.tag import pos_tag
import re
import joblib
import easyocr
import cv2
import numpy as np
from flask_cors import CORS
from gradio_client import Client
import ast
from webcrawler import ContentExtractor
import pytesseract
import asyncio

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

extractor = ContentExtractor()

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

# OCR function using both EasyOCR and Tesseract with image enhancement
def ocr_from_image(image):
    # Check if image is loaded
    if image is None:
        return None, "Error: Image not found or cannot be loaded"
    
    # Resize and enhance image
    image_resized = cv2.resize(image, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_LINEAR)  # ขยายภาพ
    gray = cv2.cvtColor(image_resized, cv2.COLOR_BGR2GRAY)  # แปลงเป็นขาวดำ
    enhanced_img = cv2.equalizeHist(gray)  # ปรับ contrast

    # Convert BGR to RGB for EasyOCR
    image_rgb = cv2.cvtColor(enhanced_img, cv2.COLOR_GRAY2RGB)  # เพราะ EasyOCR ต้องใช้ RGB 3-channel

    # EasyOCR
    reader = easyocr.Reader(['th', 'en'])  # รองรับไทย-อังกฤษ
    result_easyocr = reader.readtext(image_rgb, detail=0)  # เอาแค่ข้อความ

    easyocr_text = " ".join(result_easyocr).strip()

    # Tesseract OCR
    result_tesseract = pytesseract.image_to_string(enhanced_img, lang='tha+eng')
    tesseract_text = result_tesseract.strip()

    # รวมข้อความที่ได้จากทั้งสอง OCR
    combined_text = (easyocr_text + " " + tesseract_text).strip()

    return combined_text, None


@app.route("/ocr", methods=["POST"])
def ocr():
    file = request.files.get("image")
    
    if file:
        # Convert file to OpenCV format
        in_memory_image = np.asarray(bytearray(file.read()), dtype=np.uint8)
        image = cv2.imdecode(in_memory_image, cv2.IMREAD_COLOR)

        # Perform OCR with enhancement
        ocr_text, error = ocr_from_image(image)

        if error:
            return jsonify({"error": error}), 400
        
        if not ocr_text:
            return jsonify({"error": "ไม่พบข้อความในภาพ"}), 400

        return jsonify({"ocr_text": ocr_text})

    return jsonify({"error": "ไม่พบไฟล์ภาพ"}), 400



# Function to convert text to word vector
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

# Preprocessing and feature extraction
def preprocess_and_extract_features(text):
    cleaned_text = re.sub(r"[!\'\-#]", "", text)

    word_vector = get_word2vec_embedding(cleaned_text, fasttext_model)

    tokens = word_tokenize(cleaned_text, engine="deepcut")
    pos_tags = pos_tag(tokens, engine="perceptron")
    noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))

    word_count = len(tokens)
    entity_count = 0  # Optional: implement real NER if needed

    bow_vector = vectorizer.transform([cleaned_text]).toarray()
    sum_bow = bow_vector.sum(axis=1)[0]

    numeric_features = np.array([noun_count, word_count, entity_count, sum_bow]).reshape(1, 1, 4)
    word_vector = word_vector.reshape(1, 1, -1)

    X_combined = np.concatenate([word_vector, numeric_features], axis=-1)
    return X_combined


# Load Gradio Clients
bert_client = Client("EXt1/BERT-thainews-classification")
mdeberta_client = Client("EXt1/Mdeberta_v3_Thainews_Classification")
reasoning_client = Client("EXt1/Typhoon_7B_reasoning")

def predict_with_bert(text):
    result = bert_client.predict(text=text, api_name="/predict")
    if isinstance(result, str):
        result = ast.literal_eval(result)
    label, prob_str = result  # result is ('Fake News', '81.37%')
    probability = float(prob_str.replace('%', '')) / 100
    return label, probability

def predict_with_mdeberta(text):
    result = mdeberta_client.predict(text=text, api_name="/predict")
    if isinstance(result, str):
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

label_map_for_reasoning = {
    "Real News": "ข่าวจริง",
    "Fake News": "ข่าวปลอม",
}

def get_reasoning(text, label):
    try:
        response = reasoning_client.predict(text, label, api_name="/predict")
        return response
    except Exception as e:
        return f"Error generating reasoning: {str(e)}"
    

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

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    user_input = data.get("text", "").strip()

    if not user_input:
        return jsonify({"error": "Text input is required"}), 400

    try:
        # Get predictions
        lstm_label, lstm_prob = predict_with_lstm(user_input)
        bert_label, bert_prob = predict_with_bert(user_input)
        mdeberta_label, mdeberta_prob = predict_with_mdeberta(user_input)

        all_predictions = [
            (lstm_label, lstm_prob),
            (bert_label, bert_prob),
            (mdeberta_label, mdeberta_prob)
        ]
        final_label, final_avg_prob = majority_vote(all_predictions)

        # Get reasoning from Typhoon 7B
        label_for_reasoning = label_map_for_reasoning.get(final_label, final_label)
        reason = get_reasoning(user_input, label_for_reasoning)

        response = {
            "prediction": final_label,
            "probability": round(final_avg_prob, 4),
            "input_text": user_input,
            "individual_predictions": {
                "LSTM": {"label": lstm_label, "probability": round(lstm_prob, 4)},
                "BERT": {"label": bert_label, "probability": round(bert_prob, 4)},
                "MDeBERTa": {"label": mdeberta_label, "probability": round(mdeberta_prob, 4)}
            },
            "reasoning": reason
        }

        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/predict-url", methods=["POST"])
def predict():
    data = request.get_json()
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Query input is required"}), 400

    try:
        # Step 1: Use web crawler to extract content
        result = asyncio.run(extractor.search_and_extract_top_result(query))
        
        if result:
            # Step 2: Extract title from web crawler result
            title = result["title"]

            # Step 3: Get predictions using your models
            lstm_label, lstm_prob = predict_with_lstm(title)
            bert_label, bert_prob = predict_with_bert(title)
            mdeberta_label, mdeberta_prob = predict_with_mdeberta(title)

            all_predictions = [
                (lstm_label, lstm_prob),
                (bert_label, bert_prob),
                (mdeberta_label, mdeberta_prob)
            ]

            # Step 4: Perform majority voting to get final prediction
            final_label, final_avg_prob = majority_vote(all_predictions)

            # Step 5: Get reasoning from the Typhoon model
            label_for_reasoning = label_map_for_reasoning.get(final_label, final_label)
            reason = get_reasoning(title, label_for_reasoning)

            # Prepare the response
            response = {
                "prediction": final_label,
                "probability": round(final_avg_prob, 4),
                "title": title,
                "input_query": query,
                "individual_predictions": {
                    "LSTM": {"label": lstm_label, "probability": round(lstm_prob, 4)},
                    "BERT": {"label": bert_label, "probability": round(bert_prob, 4)},
                    "MDeBERTa": {"label": mdeberta_label, "probability": round(mdeberta_prob, 4)}
                },
                "reasoning": reason
            }

            return jsonify(response)

        else:
            return jsonify({"error": "No results found from the web crawler"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
