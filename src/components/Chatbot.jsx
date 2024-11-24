import React, { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // Chatbox visibility state
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const [language, setLanguage] = useState("english"); // Default language

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent empty messages

    // Append user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput(""); // Clear input field
    setLoading(true); // Show loading indicator

    try {
      const res = await axios.post("http://localhost:5001/chat", {
        message: input,
        language_code: language, // Send the selected language
      });
      // Append bot response to the chat
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.response || "No response from the bot." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Please try again later." },
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
