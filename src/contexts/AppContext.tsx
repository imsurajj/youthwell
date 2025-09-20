"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hasAcceptedCookies } from '@/lib/cookies';

export interface UserContext {
  selectedMood?: string;
  wellnessPlan?: {
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  };
  reminders?: Array<{
    period: string;
    time: string;
    activity: string;
  }>;
  chatHistory?: Array<{
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }>;
  analyticsData?: {
    dailyCheckins?: number;
    moodScore?: number;
    wellnessStreak?: number;
    communitySupport?: number;
    totalMessages?: number;
    wellnessActivities?: number;
    remindersSet?: number;
    moodChanges?: number;
    lastActivity?: string;
  };
}

interface AppContextType {
  userContext: UserContext;
  updateMood: (mood: string) => void;
  updateWellnessPlan: (plan: UserContext['wellnessPlan']) => void;
  addChatMessage: (message: string, isUser: boolean) => void;
  updateAnalytics: (data: UserContext['analyticsData']) => void;
  updateReminders: (reminders: UserContext['reminders']) => void;
  trackActivity: (activityType: 'message' | 'mood' | 'wellness' | 'reminder' | 'checkin') => void;
  clearChatHistory: () => void;
  clearContext: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

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

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userContext, setUserContext] = useState<UserContext>({
    selectedMood: undefined,
    wellnessPlan: undefined,
    reminders: [],
    chatHistory: [getRandomWelcomeMessage()],
    analyticsData: {
      dailyCheckins: 47,
      moodScore: 7.8,
      wellnessStreak: 12,
      communitySupport: 1234,
      totalMessages: 0,
      wellnessActivities: 0,
      remindersSet: 0,
      moodChanges: 0,
      lastActivity: 'Welcome to YouthWell!'
    }
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    if (hasAcceptedCookies()) {
      const savedMood = localStorage.getItem('youthwell-selected-mood');
      const savedChatHistory = localStorage.getItem('youthwell-chat-history');
      const savedReminders = localStorage.getItem('youthwell-reminders');
      const savedAnalytics = localStorage.getItem('youthwell-analytics');

      // Parse chat history and ensure proper format
      let parsedChatHistory = [];
      if (savedChatHistory) {
        try {
          parsedChatHistory = JSON.parse(savedChatHistory);
          // Convert timestamp strings back to Date objects and validate data
          parsedChatHistory = parsedChatHistory
            .filter((msg: { id?: number; text?: string; isUser?: boolean; timestamp?: string }) => msg && typeof msg.text === 'string' && msg.timestamp)
            .map((msg: { id?: number; text?: string; isUser?: boolean; timestamp?: string }) => ({
              id: msg.id || Date.now(),
              text: msg.text || '',
              isUser: Boolean(msg.isUser),
              timestamp: new Date(msg.timestamp!)
            }));
        } catch (error) {
          console.error('Error parsing chat history:', error);
          parsedChatHistory = [];
        }
      }

      setUserContext(prev => ({
        ...prev,
        selectedMood: savedMood || undefined,
        chatHistory: parsedChatHistory,
        reminders: savedReminders ? JSON.parse(savedReminders) : [],
        analyticsData: savedAnalytics ? JSON.parse(savedAnalytics) : prev.analyticsData
      }));
    }
  }, []);

  const updateMood = (mood: string) => {
    setUserContext(prev => ({ ...prev, selectedMood: mood }));
    if (hasAcceptedCookies()) {
      localStorage.setItem('youthwell-selected-mood', mood);
    }
  };

  const updateWellnessPlan = (plan: UserContext['wellnessPlan']) => {
    setUserContext(prev => ({ ...prev, wellnessPlan: plan }));
  };

  const addChatMessage = (message: string, isUser: boolean) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      isUser,
      timestamp: new Date()
    };

    setUserContext(prev => {
      const updatedHistory = [...(prev.chatHistory || []), newMessage];
      if (hasAcceptedCookies()) {
        // Save to localStorage with proper serialization
        localStorage.setItem('youthwell-chat-history', JSON.stringify(updatedHistory));
      }
      return { ...prev, chatHistory: updatedHistory };
    });
  };

  const updateAnalytics = (data: UserContext['analyticsData']) => {
    setUserContext(prev => {
      const updatedData = { ...prev.analyticsData, ...data };
      if (hasAcceptedCookies()) {
        localStorage.setItem('youthwell-analytics', JSON.stringify(updatedData));
      }
      return { ...prev, analyticsData: updatedData };
    });
  };

  const updateReminders = (reminders: UserContext['reminders']) => {
    setUserContext(prev => ({ ...prev, reminders }));
    if (hasAcceptedCookies()) {
      localStorage.setItem('youthwell-reminders', JSON.stringify(reminders));
    }
  };

  const trackActivity = (activityType: 'message' | 'mood' | 'wellness' | 'reminder' | 'checkin') => {
    setUserContext(prev => {
      const currentAnalytics = prev.analyticsData || {
        dailyCheckins: 47,
        moodScore: 7.8,
        wellnessStreak: 12,
        communitySupport: 1234,
        totalMessages: 0,
        wellnessActivities: 0,
        remindersSet: 0,
        moodChanges: 0,
        lastActivity: 'Welcome to YouthWell!'
      };

      const updatedAnalytics = { ...currentAnalytics };
      const now = new Date();

      switch (activityType) {
        case 'message':
          updatedAnalytics.totalMessages = (updatedAnalytics.totalMessages || 0) + 1;
          updatedAnalytics.lastActivity = `Sent a message at ${now.toLocaleTimeString()}`;
          break;
        case 'mood':
          updatedAnalytics.moodChanges = (updatedAnalytics.moodChanges || 0) + 1;
          updatedAnalytics.lastActivity = `Updated mood at ${now.toLocaleTimeString()}`;
          // Update mood score based on the selected mood
          const moodScoreMap: { [key: string]: number } = {
            'happy': 0.5,
            'calm': 0.3,
            'tired': -0.2,
            'sad': -0.4,
            'stressed': -0.3,
            'anxious': -0.4
          };
          const moodChange = moodScoreMap[userContext.selectedMood || ''] || 0;
          updatedAnalytics.moodScore = Math.max(0, Math.min(10, (updatedAnalytics.moodScore || 7.8) + moodChange));
          break;
        case 'wellness':
          updatedAnalytics.wellnessActivities = (updatedAnalytics.wellnessActivities || 0) + 1;
          updatedAnalytics.wellnessStreak = (updatedAnalytics.wellnessStreak || 0) + 1;
          updatedAnalytics.lastActivity = `Completed wellness activity at ${now.toLocaleTimeString()}`;
          break;
        case 'reminder':
          updatedAnalytics.remindersSet = (updatedAnalytics.remindersSet || 0) + 1;
          updatedAnalytics.lastActivity = `Set a reminder at ${now.toLocaleTimeString()}`;
          break;
        case 'checkin':
          updatedAnalytics.dailyCheckins = (updatedAnalytics.dailyCheckins || 0) + 1;
          updatedAnalytics.lastActivity = `Daily check-in at ${now.toLocaleTimeString()}`;
          break;
      }

      // Save to localStorage
      if (hasAcceptedCookies()) {
        localStorage.setItem('youthwell-analytics', JSON.stringify(updatedAnalytics));
      }

      return { ...prev, analyticsData: updatedAnalytics };
    });
  };

  const clearChatHistory = () => {
    setUserContext(prev => ({ ...prev, chatHistory: [] }));
    if (hasAcceptedCookies()) {
      localStorage.removeItem('youthwell-chat-history');
    }
  };

  const clearContext = () => {
    setUserContext({
      selectedMood: undefined,
      wellnessPlan: undefined,
      reminders: [],
      chatHistory: [getRandomWelcomeMessage()],
      analyticsData: {
        dailyCheckins: 47,
        moodScore: 7.8,
        wellnessStreak: 12,
        communitySupport: 1234,
        totalMessages: 0,
        wellnessActivities: 0,
        remindersSet: 0,
        moodChanges: 0,
        lastActivity: 'Welcome to YouthWell!'
      }
    });

    if (hasAcceptedCookies()) {
      localStorage.removeItem('youthwell-selected-mood');
      localStorage.removeItem('youthwell-chat-history');
      localStorage.removeItem('youthwell-reminders');
      localStorage.removeItem('youthwell-analytics');
    }
  };

  return (
    <AppContext.Provider
      value={{
        userContext,
        updateMood,
        updateWellnessPlan,
        addChatMessage,
        updateAnalytics,
        updateReminders,
        trackActivity,
        clearChatHistory,
        clearContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
