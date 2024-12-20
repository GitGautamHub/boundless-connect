import React, { useState, useEffect } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // Chatbox visibility state
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const [language, setLanguage] = useState("english"); // Default language

  const backendUrl =
    "https://boundless-connect-chatbot.onrender.com/chat" || import.meta.env.VITE_BACKEND_URL ;

  // Add initial welcome message on load
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Hi there! I'm here to help you with logistics and shipments.",
        },
        {
          sender: "bot",
          text: "Here are some examples of what you can ask me:",
        },
        {
          sender: "bot",
          text: "1. Track my shipment",
        },
        {
          sender: "bot",
          text: "2. Which carrier is best?",
        },
        {
          sender: "bot",
          text: "3. How to upload documents?",
        },
        {
          sender: "bot",
          text: "4. What is Boundless Connect?",
        },
        {
          sender: "bot",
          text: "5. Help with the dashboard",
        },
        {
          sender: "bot",
          text: "6. Create a new shipment",
        },
        {
          sender: "bot",
          text: "7. Contact support",
        },
        {
          sender: "bot",
          text:
            "You can also change the language to Hindi, Bengali, Telugu, Assamese, or Gujarati to interact with me. Just select your preferred language from the dropdown above!",
        },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return; // Prevent empty messages

    // Append user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: trimmedInput }]);
    setInput(""); // Clear input field
    setLoading(true); // Show loading indicator

    try {
      console.log(
        `[DEBUG] Sending message to bot: ${trimmedInput} in language: ${language}`
      );
      const res = await axios.post(backendUrl, {
        message: trimmedInput,
        language_code: language, // Send the selected language
      });

      // Append bot response to the chat
      console.log(`[DEBUG] Bot response: `, res.data.response);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.response || "No response from the bot." },
      ]);
    } catch (error) {
      console.error(`[ERROR] Failed to send message:`, error.response || error.message);

      let errorMessage = "Oops! Something went wrong. Please try again later.";
      if (error.response && error.response.data) {
        errorMessage =
          error.response.data.error ||
          "The server encountered an issue processing your message.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    } finally {
      setLoading(false); // Remove loading indicator
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Update the selected language
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Language Selector */}
      <div className="absolute top-[-40px] right-0">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border rounded px-2 py-1 bg-white text-gray-700 focus:outline-none"
          aria-label="Select Language"
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="bengali">Bengali</option>
          <option value="telugu">Telugu</option>
          <option value="assamese">Assamese</option>
          <option value="gujarati">Gujarati</option>
        </select>
      </div>

      {/* Chatbox Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl w-80 mb-4"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Chat Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close Chatbot"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-96 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-lg p-3 bg-gray-200 text-gray-800">
                    <p className="text-sm">Typing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Chat message input"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                  aria-label="Send Message"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors duration-200"
        aria-label="Open Chatbot"
      >
        <FiMessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Chatbot;
