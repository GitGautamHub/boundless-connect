from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_utils import load_language_model, predict_class, get_response
import os
import time
import traceback

# Set custom NLTK data path
base_path = os.path.dirname(os.path.abspath(__file__))

# Force TensorFlow to use CPU
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

app = Flask(__name__)

# Enable CORS with specific origins
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",  # Local development
    "https://boundless-connect-frontend.onrender.com"  # Production
]}}, supports_credentials=True)

# Global variables for loaded models
MODELS = {}


def preload_models():
    """
    Preload language models at the start of the application.
    """
    global MODELS
    supported_languages = ['english', 'hindi', 'bengali', 'telugu', 'assamese', 'gujarati']

    print("[INFO] Preloading models for all supported languages...")
    for lang in supported_languages:
        try:
            model, words, classes = load_language_model(lang)
            if model:
                MODELS[lang] = {"model": model, "words": words, "classes": classes}
                print(f"[INFO] Successfully loaded model for language: {lang}")
            else:
                print(f"[WARNING] Model not found for language: {lang}")
        except Exception as e:
            print(f"[ERROR] Failed to preload model for language {lang}: {str(e)}")


# Preload models when the application starts
preload_models()


@app.before_request
def handle_options():
    """
    Handle OPTIONS requests for preflight CORS.
    """
    if request.method == "OPTIONS":
        response = app.response_class()
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response


@app.after_request
def add_cors_headers(response):
    """
    Add CORS headers to all responses.
    """
    origin = request.headers.get("Origin")
    allowed_origins = [
        "http://localhost:5173",  # Local development
        "https://boundless-connect-frontend.onrender.com"  # Production
    ]

    # Add CORS headers only if the origin is allowed
    if origin in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

    return response


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
        # Log the raw payload for debugging
        raw_payload = request.get_data(as_text=True)
        print(f"[DEBUG] Raw Payload Received: {raw_payload}")

        # Attempt to parse the JSON payload
        try:
            data = request.get_json()
            print(f"[DEBUG] Parsed Payload: {data}")
        except Exception as json_error:
            print(f"[ERROR] JSON parsing failed: {str(json_error)}")
            return jsonify({"error": "Invalid JSON payload. Ensure it is properly formatted."}), 400

        # Validate payload
        if not data:
            print("[ERROR] Empty JSON payload.")
            return jsonify({"error": "Invalid request. Please provide JSON data."}), 400

        # Extract and validate input data
        message = data.get('message', '').strip()
        language_code = data.get('language_code', 'english').lower()

        print(f"[DEBUG] Extracted message: '{message}', language_code: '{language_code}'")

        if not message:
            print("[ERROR] No message provided in the payload.")
            return jsonify({"error": "No message provided. Please include a message to process."}), 400

        # Validate supported languages
        supported_languages = ['english', 'hindi', 'bengali', 'telugu', 'assamese', 'gujarati']
        if language_code not in supported_languages:
            print(f"[ERROR] Unsupported language: {language_code}")
            return jsonify({
                "error": f"Unsupported language. Supported languages are: {', '.join(supported_languages)}."
            }), 400

        # Use preloaded model
        if language_code not in MODELS or not MODELS[language_code].get("model"):
            print(f"[ERROR] Model not loaded for language: {language_code}")
            return jsonify({"error": f"Model not available for language: {language_code}"}), 500

        model_data = MODELS[language_code]

        # Log execution time for `predict_class`
        start_time = time.time()
        try:
            intents_list = predict_class(
                message=message,
                model=model_data["model"],
                words=model_data["words"],
                classes=model_data["classes"],
                language_code=language_code  # Pass the language_code
            )
            print(f"[DEBUG] Predicted Intents: {intents_list}")
        except Exception as predict_error:
            print(f"[ERROR] predict_class failed: {str(predict_error)}")
            traceback.print_exc()
            return jsonify({"error": "Intent prediction failed. Please try again later."}), 500
        print(f"[DEBUG] predict_class execution time: {time.time() - start_time:.2f} seconds")

        if not intents_list:
            print("[ERROR] Unable to predict intents.")
            return jsonify({"error": "Unable to predict the intent of the message. Please try again with a different input."}), 500

        # Log execution time for `get_response`
        start_time = time.time()
        try:
            response = get_response(intents_list, language_code)
            print(f"[DEBUG] Generated Response: {response}")
        except Exception as response_error:
            print(f"[ERROR] get_response failed: {str(response_error)}")
            traceback.print_exc()
            return jsonify({"error": "Response generation failed. Please try again later."}), 500
        print(f"[DEBUG] get_response execution time: {time.time() - start_time:.2f} seconds")

        if not response:
            print("[ERROR] Unable to generate a response.")
            return jsonify({"error": "Unable to generate a response. Please try again later."}), 500

        # Return the chatbot's response
        return jsonify({"response": response}), 200

    except Exception as e:
        # Log the exception for debugging
        print(f"[ERROR] Exception occurred in /chat endpoint: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "An error occurred while processing your request. Please try again later."}), 500


if __name__ == "__main__":
    # Log the environment port for debugging
    port_env = os.getenv("PORT", "5001")
    try:
        port = int(port_env)
        print(f"[DEBUG] Using port: {port}")
    except ValueError:
        print(f"[ERROR] Invalid port value: {port_env}. Defaulting to port 5001.")
        port = 5001

    # Start the Flask app
    app.run(host="0.0.0.0", port=port, debug=False)
