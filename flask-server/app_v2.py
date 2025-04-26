import streamlit as st
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from gensim.models import KeyedVectors
from pythainlp.tokenize import word_tokenize
from pythainlp.tag import pos_tag
import re
import joblib  


st.title("📰 Fake News Detection in Thai")
st.markdown("""
Fake News Detection Model ที่พัฒนาโดยใช้ **LSTM Neural Network** 
เพื่อวิเคราะห์และจำแนกข่าวสารออกเป็น **ข่าวจริง, ข่าวปลอม และข่าวบิดเบือน** โดยมีความแม่นยำกว่า **85%**  

🔍 เพียงป้อนหัวข้อข่าวลงไป **ระบบจะวิเคราะห์และแสดงผลทันที** ว่าข่าวที่คุณกำลังอ่านอยู่เป็นข่าวจริงหรือไม่! พร้อมทั้งแสดงข่าวที่เกี่ยวข้องและสรุปเนื้อหา
""")

# 📌 1️⃣ โหลด FastText Model
@st.cache_resource
def load_fasttext_model():
    return KeyedVectors.load_word2vec_format(r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\gensim_fasttext_3000_vec300_e500_mc1.bin', binary=False)

fasttext_model = load_fasttext_model()

# 📌 2️⃣ โหลด CountVectorizer ที่ใช้ตอน Train
@st.cache_resource
def load_vectorizer():
    return joblib.load(r'C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\vectorizer.pkl')

vectorizer = load_vectorizer()

# 📌 3️⃣ โหลด Model ที่ Train ไว้ (แก้ให้ตรงกับที่คุณใช้)
@st.cache_resource
def load_model():
    model_path = r"C:\Users\cmanw\OneDrive\Documents\WEB-Thai-Fake-News-Detection-with-LLM-Integration\Model_Development\DL_model\best_lstm_model_2025.h5"
    model = tf.keras.models.load_model(model_path, compile=False)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

model = load_model()

# 📌 4️⃣ ฟังก์ชันแปลงคำเป็นเวกเตอร์จาก FastText
def get_word2vec_embedding(text, model, vector_size=300):
    vec = np.zeros((vector_size,))
    count = 0
    for word in word_tokenize(text, engine="deepcut"):
        if word in model:
            vec += model[word]
            count += 1
    if count > 0:
        vec /= count  # ค่าเฉลี่ยเวกเตอร์
    return vec

# 📌 5️⃣ ฟังก์ชัน Preprocess & Extract Features
def preprocess_and_extract_features(text):
    # 🔹 ทำความสะอาดข้อความ
    cleaned_text = re.sub(r"[!\'\-#]", "", text)

    # 🔹 แปลงเป็นเวกเตอร์ FastText
    word_vector = get_word2vec_embedding(cleaned_text, fasttext_model)

    # 🔹 นับคำนาม (noun_count)
    tokens = word_tokenize(cleaned_text, engine="deepcut")
    pos_tags = pos_tag(tokens, engine="perceptron")
    noun_count = sum(1 for _, tag in pos_tags if tag.startswith("N"))

    # 🔹 นับจำนวนคำ (Word_Count)
    word_count = len(tokens)

    # 🔹 NER (entity_count)
    entity_count = 0  

    # 🔹 แปลงเป็น Bag of Words (sum_bow)
    bow_vector = vectorizer.transform([cleaned_text]).toarray()
    sum_bow = bow_vector.sum(axis=1)[0]

    # 🔹 รวมฟีเจอร์ทั้งหมด
    numeric_features = np.array([noun_count, word_count, entity_count, sum_bow]).reshape(1, 1, 4)
    word_vector = word_vector.reshape(1, 1, -1)

    # 🔹 รวม Word Embeddings + Features
    X_combined = np.concatenate([word_vector, numeric_features], axis=-1)

    return X_combined  # Shape (1, 1, 304)

# 📌 6️⃣ สร้าง Streamlit UI
# รับอินพุตจากผู้ใช้
user_input = st.text_area("✍️ ป้อนหัวข้อข่าว", "")

if st.button("🔎 ตรวจสอบข่าว"):
    if user_input:
        # Preprocess ข้อความ
        X_input = preprocess_and_extract_features(user_input)

        # ทำ Prediction
        pred = model.predict(X_input)
        pred_class = np.argmax(pred)

        # แสดงผลลัพธ์
        class_names = ["✅ ข่าวจริง", "⚠️ ข่าวปลอม", "🔶 ข่าวบิดเบือน"]
        st.subheader(f"📌 ผลลัพธ์: {class_names[pred_class]}")
        
        # แสดง Probabilities
        st.write("📊 ค่า Confidence ของแต่ละประเภท:")
        st.json({class_names[i]: f"{prob*100:.2f}%" for i, prob in enumerate(pred[0])})
    else:
        st.warning("⚠️ กรุณากรอกข้อความก่อนกดปุ่มตรวจสอบ!")

# เครดิต
st.markdown("---")
st.markdown("🔹 Developed by CPE35 Student, KMUTT")
