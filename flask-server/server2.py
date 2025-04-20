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

# Prediction route
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

        return jsonify({
            "prediction": dominant_category,
            "probability": dominant_probability,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
