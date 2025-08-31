import React from "react";
import { ChatbotProvider } from "@/app/contexts/ChatbotContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatbotProvider>
      {children}
    </ChatbotProvider>
  );
}
