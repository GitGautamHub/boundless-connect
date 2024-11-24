from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from nlp_utils import predict_class, get_response

app = Flask(__name__)

# Enable CORS for the app
CORS(app)

@app.route('/chat', methods=['POST'])
def chatbot_response():
    try:
        # Parse incoming JSON data
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request. Please provide JSON data."}), 400

        # Extract user input and language code
        message = data.get('message', '').strip()
        language_code = data.get('language_code', 'english').lower()

        if not message:
            return jsonify({"error": "No message provided. Please include a message to process."}), 400

        # Check if language code is supported
        supported_languages = ['english', 'hindi', 'bengali', 'telugu', 'assamese', 'gujarati']
        if language_code not in supported_languages:
            return jsonify({
                "error": f"Unsupported language. Supported languages are: {', '.join(supported_languages)}."
            }), 400

        # Predict intent and get response
        intents_list = predict_class(message, language_code)
        response = get_response(intents_list, language_code)

        # Return bot response
        return jsonify({"response": response}), 200

    except Exception as e:
        # Log the error and return a generic error message
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "An error occurred while processing your request. Please try again later."}), 500


if __name__ == "__main__":
    app.run(debug=True)
