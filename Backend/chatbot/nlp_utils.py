import os
import nltk
import numpy as np
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import json
import pickle

lemmatizer = WordNetLemmatizer()

# Define the base path for models and data
base_path = os.path.dirname(os.path.abspath(__file__))
print(f"[DEBUG] Base path: {base_path}")

# Load model and data for a specific language
def load_language_model(language_code):
    try:
        model_path = os.path.join(base_path, 'models', f'{language_code}_model.h5')
        words_path = os.path.join(base_path, 'models', f'words_{language_code}.pkl')
        classes_path = os.path.join(base_path, 'models', f'classes_{language_code}.pkl')

        print(f"[DEBUG] Checking model path: {model_path}")
        print(f"[DEBUG] Checking words path: {words_path}")
        print(f"[DEBUG] Checking classes path: {classes_path}")

        # Ensure files exist
        if not os.path.exists(model_path):
            print(f"[ERROR] Model file not found: {model_path}")
            return None, None, None
        if not os.path.exists(words_path):
            print(f"[ERROR] Words file not found: {words_path}")
            return None, None, None
        if not os.path.exists(classes_path):
            print(f"[ERROR] Classes file not found: {classes_path}")
            return None, None, None

        # Load model and supporting files
        model = load_model(model_path)
        with open(words_path, 'rb') as f:
            words = pickle.load(f)
        with open(classes_path, 'rb') as f:
            classes = pickle.load(f)
        return model, words, classes
    except Exception as e:
        print(f"[ERROR] Error loading model or data: {e}")
        return None, None, None

# Preprocess user input
def clean_up_sentence(sentence):
    try:
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
        return sentence_words
    except LookupError as e:
        print("[ERROR] NLTK resources not found. Attempting to download 'punkt'.")
        nltk.download('punkt')
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
        return sentence_words

# Convert sentence into bag of words
def bag_of_words(sentence, words):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

# Predict intent
def predict_class(sentence, language_code):
    model, words, classes = load_language_model(language_code)
    if not model:
        print("[ERROR] Model loading failed.")
        return []
    try:
        bow = bag_of_words(sentence, words)
        print(f"[DEBUG] Bag of words: {bow}")
        res = model.predict(np.array([bow]))[0]
        print(f"[DEBUG] Raw predictions: {res}")
        results = [[i, r] for i, r in enumerate(res) if r > 0.15]  # Confidence threshold
        print(f"[DEBUG] Filtered results: {results}")
        results.sort(key=lambda x: x[1], reverse=True)
        return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]
    except Exception as e:
        print(f"[ERROR] Prediction error: {e}")
        return []

# Get response based on intent
def get_response(intents_list, language_code):
    intents_path = os.path.join(base_path, 'intents', f'intents_{language_code}.json')
    print(f"[DEBUG] Loading intents from: {intents_path}")
    try:
        with open(intents_path, encoding='utf-8') as f:
            intents = json.load(f)
    except FileNotFoundError:
        print(f"[ERROR] Intents file not found: {intents_path}")
        return "I'm sorry, I don't understand that."
    except json.JSONDecodeError as e:
        print(f"[ERROR] Invalid JSON format in {intents_path}: {e}")
        return "I'm sorry, I don't understand that."

    if intents_list:
        tag = intents_list[0]['intent']
        for i in intents['intents']:
            if i['tag'] == tag:
                return np.random.choice(i['responses'])
    return "I'm sorry, I don't understand that."
