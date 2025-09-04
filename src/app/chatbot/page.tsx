"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! I'm here to listen. What's on your mind?",
    },
    {
      sender: "user",
      text: "I've been feeling really overwhelmed lately with work and personal life.",
    },
    {
      sender: "bot",
      text:
        "I understand. It’s tough when everything feels like too much. " +
        "Can you tell me more about what’s been overwhelming you?",
    },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage:Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply:Message = {
        sender: "bot",
        text: "Thank you for sharing that. I'm here for you.",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto px-4 pt-20 pb-28">
        {/* Header */}
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome to your safe space</h1>
          <p className="text-muted-foreground mt-2">
            Share your thoughts and feelings anonymously. Our empathetic chatbot is here to listen and support you.
          </p>
        </section>

        {/* Chat Area */}
        <div
          ref={chatRef}
          className="flex-1 w-full bg-muted rounded-lg p-4 overflow-y-auto black-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
            >
              <div
                className={`p-3 rounded-lg max-w-sm text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fixed Chat Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-10">
        <div className="w-full max-w-3xl mx-auto flex items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="message" className="sr-only">
              Your Message
            </Label>
            <input
              id="message"
              type="text"
              placeholder="Type your message..."
              className="w-full p-3 rounded-lg bg-secondary text-secondary-foreground placeholder-muted-foreground outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <Button onClick={handleSend} className="px-4 py-3">
            ✈️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
