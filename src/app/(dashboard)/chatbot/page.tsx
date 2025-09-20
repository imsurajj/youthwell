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
        "I understand. It's tough when everything feels like too much. " +
        "Can you tell me more about what's been overwhelming you?",
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
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)' 
    }}>
      <Navbar />

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: '768px', 
        margin: '0 auto', 
        padding: '80px 16px 112px 16px' 
      }}>
        {/* Header */}
        <section style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', margin: 0 }}>
            Welcome to your safe space
          </h1>
          <p style={{ 
            color: 'var(--muted-foreground)', 
            marginTop: '8px', 
            margin: 0 
          }}>
            Share your thoughts and feelings anonymously. Our empathetic chatbot is here to listen and support you.
          </p>
        </section>

        {/* Chat Area */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'var(--muted)',
            borderRadius: '8px',
            padding: '16px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#333 #111'
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: '12px'
              }}
            >
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  maxWidth: '384px',
                  fontSize: '14px',
                  backgroundColor: msg.sender === "user" 
                    ? 'var(--primary)' 
                    : 'var(--secondary)',
                  color: msg.sender === "user" 
                    ? 'var(--primary-foreground)' 
                    : 'var(--secondary-foreground)'
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fixed Chat Input at Bottom */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        padding: '16px',
        zIndex: 10
      }}>
        <div style={{
          width: '100%',
          maxWidth: '768px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ flex: 1 }}>
            <Label htmlFor="message" style={{ display: 'none' }}>
              Your Message
            </Label>
            <input
              id="message"
              type="text"
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                border: 'none',
                outline: 'none'
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <Button 
            onClick={handleSend} 
            style={{ padding: '12px 16px' }}
          >
            ✈️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
