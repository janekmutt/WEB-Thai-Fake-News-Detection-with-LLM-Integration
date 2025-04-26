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
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
#     binary=False
# )

# # Load CountVectorizer
# vectorizer = joblib.load(
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
# )

# # Load the trained model
# model = tf.keras.models.load_model(
#     r"C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
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

# from flask import Flask, request, jsonify
# import asyncio
# from crawl4ai import AsyncWebCrawler
# from MT import summarize_text, model, tokenizer

# app = Flask(__name__)

# @app.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.get_json()
#     user_input = data.get("query", "")  # รับคำค้นหาจากผู้ใช้

#     if not user_input.strip():
#         return jsonify({"error": "⚠️ Missing 'query' field"}), 400

#     # 1. ใช้คำค้นหาจากผู้ใช้ในการค้นหาข้อมูลจากเว็บ
#     async def fetch_and_summarize():
#         async with AsyncWebCrawler() as crawler:
#             result = await crawler.arun(url=f"https://www.nbcnews.com/business/{user_input}")  # ปรับ URL ตามความต้องการ

#             if result.markdown:
#                 # 2. สรุปข้อมูลที่ดึงมาโดยใช้โมเดล
#                 summary = summarize_text(result.markdown, model, tokenizer)
#                 return summary
#             else:
#                 return "No content found."

#     # 3. เรียกใช้งานการค้นหาและสรุปแบบ async
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     summary = loop.run_until_complete(fetch_and_summarize())

#     # ส่งข้อมูลสรุปกลับไปยังผู้ใช้
#     return jsonify({
#         "query": user_input,
#         "summary": summary
#     })

# if __name__ == "__main__":
#     app.run(debug=True)

# import easyocr
# from flask import Flask, request, jsonify
# import cv2
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
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
#     binary=False
# )

# # Load CountVectorizer
# vectorizer = joblib.load(
#     r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
# )

# # Load the trained model
# model = tf.keras.models.load_model(
#     r"C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
#     compile=False
# )
# model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# # OCR function
# def ocr_from_image(image):
#     reader = easyocr.Reader(['th', 'en'])  # ใช้ภาษาไทยและอังกฤษ
#     result = reader.readtext(image, detail=0)  # detail=0 จะให้ผลลัพธ์เป็นข้อความ
#     return " ".join(result)  # รวมข้อความจาก OCR

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

#         print("Dominant Probability:", dominant_probability)  # ตรวจสอบค่านี้

#         return jsonify({
#             "prediction": dominant_category,
#             "probability": dominant_probability,  # ค่าตัวนี้ที่ส่งกลับไป
#         })

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

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load FastText model
fasttext_model = KeyedVectors.load_word2vec_format(
    r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin',
    binary=False
)

# Load CountVectorizer
vectorizer = joblib.load(
    r'C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl'
)

# Load the trained model
model = tf.keras.models.load_model(
    r"C:\Users\Janejojija\Documents\Thesis3\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5",
    compile=False
)
model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# OCR function
def ocr_from_image(image):
    reader = easyocr.Reader(['th', 'en'])  # ใช้ภาษาไทยและภาษาอังกฤษ
    result = reader.readtext(image, detail=0)  # detail=0 จะให้ผลลัพธ์เป็นข้อความ
    return " ".join(result)  # รวมข้อความจาก OCR

# OCR route
@app.route("/ocr", methods=["POST"])
def ocr():
    # รับไฟล์ภาพจากการโพสต์
    file = request.files.get("image")
    
    if file:
        # แปลงไฟล์เป็นภาพที่ OpenCV สามารถอ่านได้
        in_memory_image = np.asarray(bytearray(file.read()), dtype=np.uint8)
        image = cv2.imdecode(in_memory_image, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "ไม่สามารถโหลดภาพได้"}), 400

        # ทำ OCR จากภาพ
        ocr_text = ocr_from_image(image)

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

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    user_input = data.get("text", "")

    if not user_input.strip():
        return jsonify({"error": "⚠️ Missing 'headline' field"}), 400

    try:
        X_input = preprocess_and_extract_features(user_input)
        predictions = model.predict(X_input)

        categories = ["True", "Fake", "Suspicious"]
        dominant_index = np.argmax(predictions[0])
        dominant_category = categories[dominant_index]
        dominant_probability = float(predictions[0][dominant_index])

        print("Dominant Probability:", dominant_probability)  # ตรวจสอบค่านี้

        return jsonify({
            "prediction": dominant_category,
            "probability": dominant_probability,  # ค่าตัวนี้ที่ส่งกลับไป
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
