from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_utils import predict_class, get_response
import os
import time

app = Flask(__name__)

# Enable CORS for both local development and production
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000",  # Local development
    "https://boundless-connect-frontend.onrender.com"  # Production
]}})

@app.route('/', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify backend is running.
    """
    return jsonify({"message": "Boundless Connect Chatbot Backend is running!"}), 200


@app.route('/chat', methods=['POST'])
def chatbot_response():
    """
    Main chatbot endpoint to handle user messages and return responses.
    """
    try:
        # Get JSON payload from the request
        data = request.get_json()
        print(f"[DEBUG] Received Data: {data}")

        if not data:
            return jsonify({"error": "Invalid request. Please provide JSON data."}), 400

        # Extract and validate input data
        message = data.get('message', '').strip()
        language_code = data.get('language_code', 'english').lower()

        if not message:
            return jsonify({"error": "No message provided. Please include a message to process."}), 400

        # Validate supported languages
        supported_languages = ['english', 'hindi', 'bengali', 'telugu', 'assamese', 'gujarati']
        if language_code not in supported_languages:
            return jsonify({
                "error": f"Unsupported language. Supported languages are: {', '.join(supported_languages)}."
            }), 400

        # Log execution time for `predict_class`
        start_time = time.time()
        intents_list = predict_class(message, language_code)
        print(f"[DEBUG] Predicted Intents: {intents_list}")
        print(f"[DEBUG] predict_class execution time: {time.time() - start_time:.2f} seconds")

        if not intents_list:
            return jsonify({"error": "Unable to predict the intent of the message. Please try again with a different input."}), 500

        # Log execution time for `get_response`
        start_time = time.time()
        response = get_response(intents_list, language_code)
        print(f"[DEBUG] Generated Response: {response}")
        print(f"[DEBUG] get_response execution time: {time.time() - start_time:.2f} seconds")

        if not response:
            return jsonify({"error": "Unable to generate a response. Please try again later."}), 500

        # Return the chatbot's response
        return jsonify({"response": response}), 200

    except Exception as e:
        # Log the exception for debugging
        print(f"[ERROR] Exception: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request. Please try again later."}), 500


if __name__ == "__main__":
    # Get port from environment variable for production
    port = int(os.getenv("PORT", 5001))  # Default to 5001 for local testing
    app.run(host="0.0.0.0", port=port, debug=True)
