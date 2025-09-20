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

// Dashboard content types
type DashboardView = 'analytics' | 'chatbot' | 'reminders' | 'wellness';

// Analytics Cards Data - YouthWell focused
const analyticsCards = [
  {
    title: "Daily Check-ins",
    value: "47",
    change: "+8.2%",
    trend: "up",
    description: "Today's wellness check-ins",
    subtitle: "Up from yesterday"
  },
  {
    title: "Mood Score",
    value: "7.8",
    change: "+0.3",
    trend: "up",
    description: "Average mood this week",
    subtitle: "Improving trend"
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+15.3%",
    trend: "up",
    description: "Users this month",
    subtitle: "Growing community"
  },
  {
    title: "Wellness Streak",
    value: "12 days",
    change: "+3 days",
    trend: "up",
    description: "Current streak",
    subtitle: "Keep it up!"
  }
];


// Content components for different views
const AnalyticsContent = () => (
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
        
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {analyticsCards.map((card, index) => (
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
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.description} {card.trend === 'up' ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
                </div>
                <div className="text-muted-foreground">
                  {card.subtitle}
                </div>
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
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Positive Pattern Detected</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Your mood scores have been consistently higher on days when you practice morning meditation. 
                        Consider maintaining this routine for continued emotional well-being.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">Weekly Summary</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        This week you&apos;ve shown great consistency with your wellness check-ins. 
                        Your average mood score of 7.8/10 indicates a positive emotional state.
                      </p>
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
  </div>
);

const ChatbotContent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I&apos;m your YouthWell AI assistant. I&apos;m here to listen and help with your mental health and wellness journey. What&apos;s on your mind today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('sad') || input.includes('depressed') || input.includes('down')) {
      return "I hear that you&apos;re feeling down, and I want you to know that it&apos;s okay to feel this way. Sometimes our emotions can feel overwhelming. Would you like to try a simple breathing exercise together? Take three deep breaths with me - in for 4 counts, hold for 4, out for 6. You&apos;re not alone in this.";
    }
    
    if (input.includes('anxious') || input.includes('anxiety') || input.includes('worried')) {
      return "Anxiety can feel really intense, but remember that these feelings are temporary. Let's try a grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.";
    }
    
    if (input.includes('stressed') || input.includes('overwhelmed')) {
      return "It sounds like you're carrying a lot right now. Stress can build up and feel overwhelming. Let's break this down - what's one small thing you can do right now to take care of yourself? Even something as simple as drinking a glass of water or taking a few deep breaths can make a difference.";
    }
    
    if (input.includes('happy') || input.includes('good') || input.includes('great')) {
      return "That&apos;s wonderful to hear! I&apos;m so glad you&apos;re feeling positive. It&apos;s important to celebrate these moments. What do you think contributed to feeling this way? Sometimes recognizing what brings us joy can help us create more of those moments.";
    }
    
    if (input.includes('tired') || input.includes('exhausted') || input.includes('sleep')) {
      return "It sounds like you might need some rest. Sleep is so important for our mental health. Are you getting enough sleep? Sometimes our bodies and minds need extra care when we're feeling tired. Consider creating a relaxing bedtime routine to help you wind down.";
    }
    
    if (input.includes('help') || input.includes('support')) {
      return "I&apos;m here to support you. Remember, seeking help is a sign of strength, not weakness. If you&apos;re feeling like you need more support than I can provide, consider reaching out to a mental health professional. You can also try some of the wellness activities in your dashboard, like meditation or journaling.";
    }
    
    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. I&apos;m listening and I care about how you&apos;re feeling. Can you tell me more about what&apos;s going on?",
      "I appreciate you opening up to me. It takes courage to share your thoughts and feelings. What would be most helpful for you right now?",
      "I&apos;m here to listen without judgment. Your feelings are valid, and it&apos;s okay to not be okay sometimes. What&apos;s on your mind?",
      "Thank you for trusting me with your thoughts. Remember, you&apos;re not alone in this journey. Is there anything specific you&apos;d like to work through together?",
      "I can hear that this is important to you. Take your time, and know that I&apos;m here to support you through whatever you&apos;re experiencing."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
          <CardTitle>AI Wellness Assistant</CardTitle>
          <CardDescription>Your personal mental health companion - here to listen and support you</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 bg-muted rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-sm ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background border border-input'
                  }`}>
                    <div className="text-sm">{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
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

const RemindersContent = () => (
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
          <button className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 active:bg-primary/95 transition-all duration-200 shadow-lg hover:shadow-xl">
            Save Changes
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const WellnessContent = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [wellnessPlan, setWellnessPlan] = useState<{
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  } | null>(null);

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

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
    setWellnessPlan(getWellnessPlan(moodValue));
    // Save mood selection to localStorage only if cookies are accepted
    if (hasAcceptedCookies()) {
      localStorage.setItem('youthwell-selected-mood', moodValue);
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
                className={`p-6 border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-input hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <div className="text-sm font-semibold text-foreground">{mood.name}</div>
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
  )
}
