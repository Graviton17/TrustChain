"use client";

import { useState, useEffect } from 'react'; // Import useState
import { useChatbot } from '@/app/contexts/ChatbotContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const ChatbotWidget = () => {
  const { isChatOpen, toggleChat } = useChatbot();
  const [isMounted, setIsMounted] = useState(false);

  // This effect runs only on the client, after the initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isChatOpen) {
      const script = document.createElement('script');
      script.src = "https://www.noupe.com/embed/0198fbda55667322b70ec631e99c087e5349.js"; // PASTE YOUR SCRIPT URL HERE
      script.async = true;
      script.id = 'chatbot-script';
      document.body.appendChild(script);

      return () => {
        const existingScript = document.getElementById('chatbot-script');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
        // Tidio specifically creates an iframe with this ID
        const tidioWidget = document.getElementById('tidio-chat-iframe');
        if (tidioWidget) {
           tidioWidget.parentElement?.remove();
        }
      };
    }
  }, [isChatOpen, isMounted]);

  // Render nothing on the server or during the initial client render
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Floating Chatbot Button - only show when chat is closed */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-colors"
            aria-label="Open AI Chat Assistant"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {/* Notification dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 w-[280px] sm:w-[320px] md:w-[350px] max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)]"
          >
            {/* Responsive chatbot container */}
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <div className="h-[400px] sm:h-[450px] md:h-[500px] flex flex-col">
                {/* Header */}
                <div className="bg-emerald-600 text-white p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <h3 className="font-semibold text-sm sm:text-base">AI Assistant</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm opacity-75 hidden sm:block">Online</span>
                    <button
                      onClick={toggleChat}
                      className="hover:bg-emerald-700 rounded-full p-1 transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Chat content area - the script will inject content here */}
                <div className="flex-1 p-2 sm:p-3 bg-gray-50">
                  {/* Placeholder content while waiting for external script */}
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-emerald-600" />
                      <p className="text-sm sm:text-base">AI Assistant is loading...</p>
                      <p className="text-xs sm:text-sm mt-1 opacity-75">Please wait a moment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;