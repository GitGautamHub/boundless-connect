import React, { useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl w-80 mb-4"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Chat Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="h-96 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-50 rounded-lg p-3 ml-auto">
                    <p className="text-sm text-gray-800">
                      How can I assist you with your shipment today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 input-field"
                />
                <button className="btn-primary py-2">Send</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg transition-colors duration-200"
      >
        <FiMessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Chatbot;