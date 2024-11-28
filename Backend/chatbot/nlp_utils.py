import os
import nltk
import numpy as np
from nltk.tokenize.punkt import PunktLanguageVars
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import json
import pickle

lemmatizer = WordNetLemmatizer()

# Set custom NLTK data path
base_path = os.path.dirname(os.path.abspath(__file__))  # Directory of this file
nltk_data_path = os.path.join(base_path, "nltk_data")
nltk.data.path.append(nltk_data_path)

print(f"[DEBUG] Base path: {base_path}")
print(f"[DEBUG] NLTK data path: {nltk.data.path}")

# Ensure 'punkt_tab' resource exists or download it
try:
    nltk.data.find('tokenizers/punkt_tab/english')
    print("[DEBUG] 'punkt_tab' resource found!")
except LookupError:
    print("[DEBUG] 'punkt_tab' resource not found. Downloading...")
    nltk.download('punkt_tab', download_dir=nltk_data_path)

# Ensure 'wordnet' resource exists or download it
try:
    nltk.data.find('corpora/wordnet')
    print("[DEBUG] 'wordnet' resource found!")
except LookupError:
    print("[DEBUG] 'wordnet' resource not found. Downloading...")
    nltk.download('wordnet', download_dir=nltk_data_path)

# Safe unpickler class to prevent restricted module loading
class SafeUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        # Allow only specific modules/classes
        if module == "nltk.tokenize.punkt" and name == "PunktSentenceTokenizer":
            return super().find_class(module, name)
        raise pickle.UnpicklingError(f"Attempted to load restricted class {module}.{name}")

# Function to safely load a pickle file
def safe_pickle_load(file_path):
    try:
        with open(file_path, "rb") as f:
            return SafeUnpickler(f).load()
    except Exception as e:
        print(f"[ERROR] Failed to safely load pickle file {file_path}: {e}")
        raise

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

        # Load model and pickle files safely
        model = load_model(model_path)
        words = safe_pickle_load(words_path)
        classes = safe_pickle_load(classes_path)
        return model, words, classes
    except Exception as e:
        print(f"[ERROR] Error loading model or data: {e}")
        return None, None, None

# Preprocess user input
def clean_up_sentence(sentence):
    try:
        print(f"[DEBUG] NLTK paths during tokenization: {nltk.data.path}")

        # Load PunktLanguageVars tokenizer for punkt_tab
        tokenizer = PunktLanguageVars()

        # Tokenize and lemmatize the sentence
        sentence_words = tokenizer.word_tokenize(sentence)
        sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
        return sentence_words
    except Exception as e:
        print(f"[ERROR] Tokenizer error: {e}")
        raise

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
