import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatbotProvider } from "@/app/contexts/ChatbotContext"; // 1. Import Provider
import ChatbotWidget from "@/components/ChatbotWidget"; // 2. Import Widget

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustChain",
  description: "A platform for managing and tracking subsidies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ChatbotProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <ChatbotWidget/>
        </body>
        </ChatbotProvider>
      </html>
    </ClerkProvider>
  );
}
