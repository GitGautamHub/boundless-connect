import json
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import SGD
from sklearn.preprocessing import LabelEncoder
import nltk
from nltk.stem import WordNetLemmatizer
import pickle
import os

nltk.download('punkt')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()

def train_model(intents_file, language_code, models_dir):
    # Check if the intents file exists
    if not os.path.exists(intents_file):
        print(f"[ERROR] Intents file not found: {intents_file}")
        return

    # Ensure the models directory exists
    os.makedirs(models_dir, exist_ok=True)

    # Load the intents JSON file
    with open(intents_file, encoding='utf-8') as file:
        intents = json.load(file)

    words, classes, documents = [], [], []
    ignore_letters = ['!', '?', ',', '.']

    # Extract patterns, tags, and responses
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

    # Preprocess the words
    words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_letters]
    words = sorted(set(words))
    classes = sorted(set(classes))

    # Prepare training data
    training = []
    output_empty = [0] * len(classes)

    for doc in documents:
        bag = []
        word_patterns = [lemmatizer.lemmatize(word.lower()) for word in doc[0]]
        for word in words:
            bag.append(1 if word in word_patterns else 0)
        output_row = list(output_empty)
        output_row[classes.index(doc[1])] = 1
        training.append([bag, output_row])

    # Extract features (X) and labels (Y)
    train_x = np.array([t[0] for t in training], dtype=np.float32)
    train_y = np.array([t[1] for t in training], dtype=np.float32)

    # Define and compile the model
    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation='softmax'))

    sgd = SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

    # Train the model
    model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)

    # Save the trained model and associated data in the models directory
    model.save(os.path.join(models_dir, f'{language_code}_model.h5'))
    with open(os.path.join(models_dir, f'words_{language_code}.pkl'), 'wb') as f:
        pickle.dump(words, f)
    with open(os.path.join(models_dir, f'classes_{language_code}.pkl'), 'wb') as f:
        pickle.dump(classes, f)

    print(f"Model for {language_code} trained and saved successfully in {models_dir}!")

if __name__ == "__main__":
    base_path = os.path.dirname(os.path.abspath(__file__))
    intents_path = os.path.join(base_path, 'intents')
    models_dir = os.path.join(base_path, 'models')

    print(f"[INFO] Intents path: {intents_path}")
    print(f"[INFO] Models will be saved in: {models_dir}")

    # Train for all supported languages
    train_model(os.path.join(intents_path, 'intents_english.json'), 'english', models_dir)
    train_model(os.path.join(intents_path, 'intents_hindi.json'), 'hindi', models_dir)
    train_model(os.path.join(intents_path, 'intents_bengali.json'), 'bengali', models_dir)
    train_model(os.path.join(intents_path, 'intents_telugu.json'), 'telugu', models_dir)
    train_model(os.path.join(intents_path, 'intents_assamese.json'), 'assamese', models_dir)
    train_model(os.path.join(intents_path, 'intents_gujarati.json'), 'gujarati', models_dir)
