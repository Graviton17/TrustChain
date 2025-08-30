"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface ChatbotContextType {
  isChatOpen: boolean;
  toggleChat: () => void;
}

// Create the context with a default value
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Create a provider component
export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <ChatbotContext.Provider value={{ isChatOpen, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};