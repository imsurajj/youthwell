"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { IconTrendingUp, IconTrendingDown, IconSun } from "@tabler/icons-react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hasAcceptedCookies } from "@/lib/cookies";
import { useAppContext } from "@/contexts/AppContext";

const WELCOME_MESSAGES = [
  {
    id: 1,
    text: "🌟 Welcome to YouthWell! I'm your AI wellness companion.\n\nI'm here to support you on your mental health journey with:\n• Personalized wellness plans\n• Mood tracking insights\n• Daily reminders and motivation\n• A safe space to talk about anything\n\nHow can I help you feel your best today?",
    isUser: false,
    timestamp: new Date()
  },
  {
    id: 2,
    text: "💚 Hello! I'm your YouthWell AI assistant.\n\nReady to support your mental wellness journey? I can help with:\n• Understanding your emotions\n• Creating healthy habits\n• Managing stress and anxiety\n• Building resilience and confidence\n\nWhat's on your mind today?",
    isUser: false,
    timestamp: new Date()
  },
  {
    id: 3,
    text: "🌈 Hi there! Welcome to your wellness space.\n\nI'm here to be your supportive companion, offering:\n• Gentle guidance and encouragement\n• Tools for emotional well-being\n• Personalized self-care strategies\n• A judgment-free zone to express yourself\n\nHow are you feeling right now?",
    isUser: false,
    timestamp: new Date()
  }
];

const getRandomWelcomeMessage = () => {
  const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
  return { ...WELCOME_MESSAGES[randomIndex], id: Date.now() };
};

// Dashboard content types
type DashboardView = 'analytics' | 'chatbot' | 'reminders' | 'wellness';



// Content components for different views
const AnalyticsContent = () => {
  const { userContext, trackActivity } = useAppContext();
  const [showSummary, setShowSummary] = useState(false);
  
  // Update analytics cards with real data
  const dynamicAnalyticsCards = [
    {
      title: "Daily Check-ins",
      value: userContext.analyticsData?.dailyCheckins || 47,
      change: "+12%",
      trend: "up" as const
    },
    {
      title: "Mood Score",
      value: `${userContext.analyticsData?.moodScore?.toFixed(1) || 7.8}/10`,
      change: "+0.3",
      trend: "up" as const
    },
    {
      title: "Wellness Streak",
      value: `${userContext.analyticsData?.wellnessStreak || 12} days`,
      change: "+2 days",
      trend: "up" as const
    },
    {
      title: "Community Support",
      value: `${userContext.analyticsData?.communitySupport || 1234} users`,
      change: "+23",
      trend: "up" as const
    }
  ];

  return (
  <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Dashboard Header */}
        <div className="px-4 lg:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome to YouthWell</h1>
            <p className="text-muted-foreground text-lg">
              Your personal wellness companion for mental health and emotional well-being
            </p>
          </div>
        </div>

        {/* Quick Actions & Summary */}
        <div className="px-4 lg:px-6 mb-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => trackActivity('checkin')}
                className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">📝</span>
                Check-in
              </button>
              <button
                onClick={() => trackActivity('wellness')}
                className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">🧘</span>
                Meditate
              </button>
              <button
                onClick={() => trackActivity('wellness')}
                className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">📚</span>
                Journal
              </button>
              <button
                onClick={() => trackActivity('wellness')}
                className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">💪</span>
                Exercise
              </button>
              <button
                onClick={() => trackActivity('reminder')}
                className="px-3 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">⏰</span>
                Reminder
              </button>
            </div>
            <button 
              onClick={() => setShowSummary(true)}
              className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Summary
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {dynamicAnalyticsCards.map((card, index) => (
            <Card key={index} className="@container/card">
              <CardHeader>
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {card.value}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={card.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {card.trend === 'up' ? <IconTrendingUp /> : <IconTrendingDown />}
                    {card.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-col items-start gap-1.5 text-sm">
                {/* Removed bottom icons */}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Mood Trends Chart */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends & Patterns</CardTitle>
              <CardDescription>
                Visualize your emotional journey and identify patterns in your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartAreaInteractive />
            </CardContent>
          </Card>
        </div>
        

        {/* Insights Section */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Insights</CardTitle>
              <CardDescription>
                AI-powered insights based on your mood and activity patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-green-600 text-xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Recent Activity</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        {userContext.analyticsData?.lastActivity || "Welcome to YouthWell! Start your wellness journey today."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">Activity Summary</h4>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                        <div>Messages sent: {userContext.analyticsData?.totalMessages || 0}</div>
                        <div>Mood changes: {userContext.analyticsData?.moodChanges || 0}</div>
                        <div>Wellness activities: {userContext.analyticsData?.wellnessActivities || 0}</div>
                        <div>Reminders set: {userContext.analyticsData?.remindersSet || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start your wellness journey with these helpful tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-input rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-2xl mb-2">😊</div>
                  <div className="font-semibold">Check Your Mood</div>
                  <div className="text-sm text-muted-foreground">How are you feeling today?</div>
                </button>
                <button className="p-4 border border-input rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-2xl mb-2">🧘</div>
                  <div className="font-semibold">Start Meditation</div>
                  <div className="text-sm text-muted-foreground">Take a mindful break</div>
                </button>
                <button className="p-4 border border-input rounded-lg hover:bg-muted transition-colors text-left">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-semibold">Journal Entry</div>
                  <div className="text-sm text-muted-foreground">Reflect on your day</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    {/* Summary Popup */}
    {showSummary && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Wellness Summary Report</h2>
              <button
                onClick={() => setShowSummary(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-sm text-muted-foreground">Daily Check-ins</h3>
                  <p className="text-2xl font-bold">{userContext.analyticsData?.dailyCheckins || 47}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-sm text-muted-foreground">Mood Score</h3>
                  <p className="text-2xl font-bold">{userContext.analyticsData?.moodScore?.toFixed(1) || 7.8}/10</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-sm text-muted-foreground">Wellness Streak</h3>
                  <p className="text-2xl font-bold">{userContext.analyticsData?.wellnessStreak || 12} days</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-sm text-muted-foreground">Community Support</h3>
                  <p className="text-2xl font-bold">{userContext.analyticsData?.communitySupport || 1234} users</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Activity Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Messages sent:</span>
                    <span className="font-semibold">{userContext.analyticsData?.totalMessages || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mood changes:</span>
                    <span className="font-semibold">{userContext.analyticsData?.moodChanges || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wellness activities:</span>
                    <span className="font-semibold">{userContext.analyticsData?.wellnessActivities || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reminders set:</span>
                    <span className="font-semibold">{userContext.analyticsData?.remindersSet || 0}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Last Activity</h3>
                <p className="text-sm text-muted-foreground">
                  {userContext.analyticsData?.lastActivity || 'Welcome to YouthWell! Start your wellness journey today.'}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Report generated on {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

const ChatbotContent = () => {
  const { userContext, addChatMessage, clearChatHistory, trackActivity } = useAppContext();
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages from context or default welcome message
  useEffect(() => {
    if (userContext.chatHistory && userContext.chatHistory.length > 0) {
      // Ensure all messages have required properties
      const validMessages = userContext.chatHistory.filter(msg => 
        msg && typeof msg.text === 'string' && msg.timestamp
      ).map(msg => ({
        id: msg.id || Date.now(),
        text: msg.text || '',
        isUser: Boolean(msg.isUser),
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
      }));
      setMessages(validMessages);
    } else {
      setMessages([getRandomWelcomeMessage()]);
    }
  }, [userContext.chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addChatMessage(inputMessage, true);
    trackActivity('message');
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call the real AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: userContext
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        addChatMessage(data.response, false);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-1 flex-col p-6">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Wellness Assistant</CardTitle>
              <CardDescription>Your personal mental health companion - here to listen and support you</CardDescription>
            </div>
            {messages.length > 1 && (
              <div className="flex gap-2">
                <div className="text-xs text-muted-foreground flex items-center">
                  {messages.filter(m => m.isUser).length} messages
                </div>
                <button
                  onClick={() => {
                    clearChatHistory();
                  setMessages([getRandomWelcomeMessage()]);
                  }}
                  className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground border border-input rounded-md hover:bg-muted transition-colors"
                >
                  Clear Chat
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 bg-muted rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {messages.filter(message => message && message.text).map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                      {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      )}
                      <div className={`p-3 rounded-lg max-w-sm ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background border border-input'
                      }`}>
                        <div className="text-sm leading-relaxed">
                          {(message.text || '').split('\n').map((line, index) => {
                            const trimmedLine = line.trim();
                            
                            // Handle bullet points
                            if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                              return (
                                <div key={index} className="flex items-start gap-2 mb-2">
                                  <span className="mt-1">•</span>
                                  <span className="flex-1">{trimmedLine.substring(1).trim()}</span>
                                </div>
                              );
                            }
                            
                            // Handle numbered lists
                            if (/^\d+\./.test(trimmedLine)) {
                              const number = trimmedLine.split('.')[0];
                              const text = trimmedLine.substring(trimmedLine.indexOf('.') + 1).trim();
                              return (
                                <div key={index} className="flex items-start gap-2 mb-2">
                                  <span className="mt-1 font-semibold">{number}.</span>
                                  <span className="flex-1">{text}</span>
                                </div>
                              );
                            }
                            
                            // Handle headers (lines that end with :)
                            if (trimmedLine.endsWith(':') && trimmedLine.length < 50) {
                              return (
                                <div key={index} className="font-semibold mb-2 mt-4 first:mt-0">
                                  {trimmedLine}
                                </div>
                              );
                            }
                            
                            // Handle emphasis (text between **)
                            if (trimmedLine.includes('**')) {
                              const parts = trimmedLine.split('**');
                              return (
                                <div key={index} className="mb-2">
                                  {parts.map((part, partIndex) => 
                                    partIndex % 2 === 1 ? (
                                      <span key={partIndex} className="font-semibold">{part}</span>
                                    ) : (
                                      <span key={partIndex}>{part}</span>
                                    )
                                  )}
                                </div>
                              );
                            }
                            
                            // Handle questions (lines ending with ?)
                            if (trimmedLine.endsWith('?')) {
                              return (
                                <div key={index} className="mb-2 italic">
                                  {trimmedLine}
                                </div>
                              );
                            }
                            
                            // Handle suggestions (lines starting with "Try" or "Consider")
                            if (trimmedLine.startsWith('Try') || trimmedLine.startsWith('Consider') || trimmedLine.startsWith('You can')) {
                              return (
                                <div key={index} className="mb-2">
                                  💡 {trimmedLine}
                                </div>
                              );
                            }
                            
                            // Handle empty lines
                            if (trimmedLine === '') {
                              return <div key={index} className="h-2"></div>;
                            }
                            
                            // Regular paragraphs
                            return (
                              <div key={index} className="mb-2">
                                {trimmedLine}
                              </div>
                            );
                          })}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                        </div>
                      </div>
                      {message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="bg-background border border-input p-3 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message... (Press Enter to send)"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTyping ? 'Sending...' : 'Send'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RemindersContent = () => {
  const { trackActivity } = useAppContext();
  
  return (
    <div className="flex flex-1 flex-col p-6">
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Daily Reminders</CardTitle>
        <CardDescription className="text-base">
          Set your personalized reminders to stay consistent and balanced
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {['Morning', 'Afternoon', 'Evening'].map((period) => (
          <Card key={period} className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-full bg-primary/10">
                  <IconSun className="h-5 w-5 text-primary" />
                </div>
                {period} Reminder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Select Time
                  </label>
                  <div className="relative">
                    <input 
                      type="time" 
                      className="w-full p-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                      defaultValue={period === 'Morning' ? '09:00' : period === 'Afternoon' ? '13:00' : '20:00'}
                      style={{
                        colorScheme: 'dark'
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Choose Activity
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full p-3 rounded-lg border-2 border-input bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                      style={{
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="meditation" className="bg-background text-foreground">
                        {period === 'Morning' ? 'Morning meditation' : period === 'Afternoon' ? 'Afternoon exercise' : 'Evening reflection'}
                      </option>
                      <option value="exercise" className="bg-background text-foreground">Exercise</option>
                      <option value="journaling" className="bg-background text-foreground">Gratitude journaling</option>
                      <option value="breathing" className="bg-background text-foreground">Breathing exercises</option>
                      <option value="reading" className="bg-background text-foreground">Mindful reading</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="pt-4">
          <button 
            onClick={() => trackActivity('reminder')}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 active:bg-primary/95 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Save Changes
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

const WellnessContent = () => {
  const { userContext, updateMood, updateWellnessPlan, trackActivity } = useAppContext();
  const [selectedMood, setSelectedMood] = useState<string | null>(userContext.selectedMood || null);
  const [wellnessPlan, setWellnessPlan] = useState<{
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  } | null>(userContext.wellnessPlan || null);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    { emoji: '😊', name: 'Happy', value: 'happy' },
    { emoji: '😢', name: 'Sad', value: 'sad' },
    { emoji: '😫', name: 'Stressed', value: 'stressed' },
    { emoji: '😟', name: 'Anxious', value: 'anxious' },
    { emoji: '😌', name: 'Calm', value: 'calm' },
    { emoji: '😴', name: 'Tired', value: 'tired' }
  ];

  const getWellnessPlan = (mood: string) => {
    const plans = {
      happy: {
        meditation: "Celebration Meditation: Take a moment to appreciate this positive feeling. Breathe deeply and let gratitude fill your heart. Visualize this joy spreading to others around you.",
        affirmation: "I deserve to feel happy and I allow myself to fully experience this joy. My happiness is valid and important.",
        activity: "Joy Journaling: Write down three things that brought you joy today. Reflect on what made you feel this way and how you can create more moments like this.",
        color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
      },
      sad: {
        meditation: "Compassion Meditation: Place your hand on your heart and breathe gently. Acknowledge your sadness without judgment. Send yourself love and understanding.",
        affirmation: "It&apos;s okay to feel sad. My emotions are valid and temporary. I am strong enough to move through this feeling.",
        activity: "Gentle Movement: Try some gentle stretching or a short walk. Physical movement can help release emotional tension and boost your mood naturally.",
        color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
      },
      stressed: {
        meditation: "Stress Relief Breathing: Inhale for 4 counts, hold for 4, exhale for 6. Repeat 5 times. Focus on releasing tension with each exhale.",
        affirmation: "I can handle this stress one step at a time. I am capable and resilient. This feeling will pass.",
        activity: "Progressive Muscle Relaxation: Tense each muscle group for 5 seconds, then release. Start from your toes and work up to your head.",
        color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
      },
      anxious: {
        meditation: "Grounding Meditation: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This brings you back to the present.",
        affirmation: "I am safe in this moment. My anxiety is temporary and I have the tools to manage it. I am stronger than my worries.",
        activity: "Box Breathing: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat this pattern for 2-3 minutes to calm your nervous system.",
        color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
      },
      calm: {
        meditation: "Mindful Awareness: Notice your calm state without trying to change it. Breathe naturally and observe the peace within you.",
        affirmation: "I am at peace with myself and my surroundings. This calmness is a gift I give to myself and others.",
        activity: "Nature Connection: Spend time outdoors or look at nature images. Connect with the natural world to maintain this peaceful state.",
        color: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800"
      },
      tired: {
        meditation: "Restorative Meditation: Find a comfortable position and focus on your breath. Allow your body to rest and recharge naturally.",
        affirmation: "I honor my need for rest. Taking care of myself is not selfish, it&apos;s necessary for my well-being.",
        activity: "Gentle Self-Care: Take a warm bath, drink herbal tea, or do some light reading. Listen to what your body needs for restoration.",
        color: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
      }
    };
    return plans[mood as keyof typeof plans];
  };

  // Load saved mood from localStorage on component mount (only if cookies accepted)
  useEffect(() => {
    if (hasAcceptedCookies()) {
      const savedMood = localStorage.getItem('youthwell-selected-mood');
      if (savedMood) {
        setSelectedMood(savedMood);
        setWellnessPlan(getWellnessPlan(savedMood));
      }
    }
  }, []);

  const handleMoodSelect = async (moodValue: string) => {
    setSelectedMood(moodValue);
    updateMood(moodValue);
    trackActivity('mood');
    setIsGenerating(true);

    try {
      // Call the real AI API for wellness plan
      const response = await fetch('/api/wellness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: moodValue,
          context: userContext
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setWellnessPlan(data.wellnessPlan);
        updateWellnessPlan(data.wellnessPlan);
      } else {
        throw new Error(data.error || 'Failed to generate wellness plan');
      }
    } catch (error) {
      console.error('Error generating wellness plan:', error);
      // Fallback to default plan
      const defaultPlan = getWellnessPlan(moodValue);
      setWellnessPlan(defaultPlan);
      updateWellnessPlan(defaultPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col p-6">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">How are you feeling today?</CardTitle>
          <CardDescription className="text-base">
            {selectedMood ? (
              <span className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                You previously selected: <span className="font-semibold text-foreground">
                  {moods.find(m => m.value === selectedMood)?.emoji} {moods.find(m => m.value === selectedMood)?.name}
                </span>
              </span>
            ) : (
              "Select a mood to get a personalized wellness plan tailored to your current emotional state"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                disabled={isGenerating}
                className={`p-6 border-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-input hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-4xl mb-3">
                  {isGenerating && selectedMood === mood.value ? (
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                  ) : (
                    mood.emoji
                  )}
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {isGenerating && selectedMood === mood.value ? 'Generating...' : mood.name}
                </div>
              </button>
            ))}
          </div>
          
          {wellnessPlan && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{moods.find(m => m.value === selectedMood)?.emoji}</span>
                  Your Personalized Wellness Plan
                </CardTitle>
                <CardDescription>
                  Here&apos;s a tailored approach to support your current emotional state
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${wellnessPlan.color}`}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🧘</span>
                    Meditation Script (2–3 mins)
                  </h4>
                  <p className="text-sm leading-relaxed">{wellnessPlan.meditation}</p>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${wellnessPlan.color}`}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    Affirmation
                  </h4>
                  <p className="italic text-sm leading-relaxed">&ldquo;{wellnessPlan.affirmation}&rdquo;</p>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${wellnessPlan.color}`}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">🎨</span>
                    Calming Activity
                  </h4>
                  <p className="text-sm leading-relaxed">{wellnessPlan.activity}</p>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setSelectedMood(null);
                      setWellnessPlan(null);
                      // Clear saved mood from localStorage only if cookies are accepted
                      if (hasAcceptedCookies()) {
                        localStorage.removeItem('youthwell-selected-mood');
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Choose a different mood
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function Page() {
  const [currentView, setCurrentView] = useState<DashboardView>('analytics');

  const renderContent = () => {
    switch (currentView) {
      case 'analytics':
        return <AnalyticsContent />;
      case 'chatbot':
        return <ChatbotContent />;
      case 'reminders':
        return <RemindersContent />;
      case 'wellness':
        return <WellnessContent />;
      default:
        return <AnalyticsContent />;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" currentView={currentView} setCurrentView={(view: string) => setCurrentView(view as DashboardView)} />
      <SidebarInset>
        <SiteHeader />
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  );
}
