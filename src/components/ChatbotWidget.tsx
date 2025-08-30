"use client";

import { useState, useEffect } from 'react'; // Import useState
import { useChatbot } from '@/app/contexts/ChatbotContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotWidget = () => {
  const { isChatOpen } = useChatbot();
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
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          {/* The script will inject the chatbot UI here */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotWidget;