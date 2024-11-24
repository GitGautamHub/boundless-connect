from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from nlp_utils import predict_class, get_response

app = Flask(__name__)

# Enable CORS for the app with the correct frontend origin
CORS(app, resources={r"/*": {"origins": "https://boundless-connect-chatbot-backend.onrender.com"}})

@app.route('/', methods=['GET'])
def health_check():
    """
    Root route to check if the server is running.
    This route is primarily used for health checks.
    """
    return jsonify({"message": "Boundless Connect Chatbot Backend is running!"}), 200

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
        if not intents_list:
            return jsonify({"error": "Unable to predict the intent of the message. Please try again with a different input."}), 500

        response = get_response(intents_list, language_code)
        if not response:
            return jsonify({"error": "Unable to generate a response. Please try again later."}), 500

        # Return bot response
        return jsonify({"response": response}), 200

    except Exception as e:
        # Log the error and return a generic error message
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": "An error occurred while processing your request. Please try again later."}), 500

# Running the application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
