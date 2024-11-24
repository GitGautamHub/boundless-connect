import nltk
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from nlp_utils import bag_of_words, clean_up_sentence

# Load the trained model and supporting files
language_code = 'english'  # Change this to your required language
model = load_model(f'chatbot/models/{language_code}_model.h5')
with open(f'chatbot/models/words_{language_code}.pkl', 'rb') as f:
    words = pickle.load(f)
with open(f'chatbot/models/classes_{language_code}.pkl', 'rb') as f:
    classes = pickle.load(f)

# Load intents
import json
with open(f'chatbot/intents/intents_{language_code}.json', encoding='utf-8') as f:
    intents = json.load(f)

# Predict intent
def predict_class(sentence):
    bow = bag_of_words(sentence, words)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

# Get response from intents
def get_response(intents_list):
    tag = intents_list[0]['intent']
    for i in intents['intents']:
        if i['tag'] == tag:
            return np.random.choice(i['responses'])
    return "Sorry, I didn't understand that."

# Run the chatbot
while True:
    message = input("You: ")
    if message.lower() in ["exit", "quit"]:
        break
    intents_list = predict_class(message)
    response = get_response(intents_list)
    print(f"Bot: {response}")
