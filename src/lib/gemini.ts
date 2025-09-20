import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
    dailyCheckins: number;
    moodScore: number;
    wellnessStreak: number;
    communitySupport: number;
  };
}

export class GeminiService {
  private static instance: GeminiService;
  private model = model;

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  /**
   * Generate AI response for chatbot with full context
   */
  async generateChatResponse(userInput: string, context: UserContext): Promise<string> {
    try {
      const prompt = this.buildChatPrompt(userInput, context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean up any HTML entities that might be returned
      return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    } catch (error) {
      console.error('Error generating chat response:', error);
      return "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
    }
  }

  /**
   * Generate personalized wellness plan based on mood and context
   */
  async generateWellnessPlan(mood: string, context: UserContext): Promise<{
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  }> {
    try {
      const prompt = this.buildWellnessPrompt(mood, context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      // Clean up HTML entities before parsing
      const cleanContent = content.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Parse the response to extract structured data
      return this.parseWellnessResponse(cleanContent);
    } catch (error) {
      console.error('Error generating wellness plan:', error);
      return this.getDefaultWellnessPlan(mood);
    }
  }

  /**
   * Generate insights based on analytics data
   */
  async generateAnalyticsInsights(context: UserContext): Promise<{
    pattern: string;
    summary: string;
    recommendation: string;
  }> {
    try {
      const prompt = this.buildAnalyticsPrompt(context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      // Clean up HTML entities before parsing
      const cleanContent = content.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      return this.parseAnalyticsResponse(cleanContent);
    } catch (error) {
      console.error('Error generating analytics insights:', error);
      return {
        pattern: "No specific patterns detected at this time.",
        summary: "Continue your wellness journey with consistent check-ins.",
        recommendation: "Keep up the great work with your daily wellness routine!"
      };
    }
  }

  /**
   * Generate personalized reminder suggestions
   */
  async generateReminderSuggestions(context: UserContext): Promise<Array<{
    time: string;
    activity: string;
    reason: string;
  }>> {
    try {
      const prompt = this.buildReminderPrompt(context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      // Clean up HTML entities before parsing
      const cleanContent = content.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      return this.parseReminderResponse(cleanContent);
    } catch (error) {
      console.error('Error generating reminder suggestions:', error);
      return [
        {
          time: "09:00",
          activity: "Morning meditation",
          reason: "Start your day with mindfulness"
        },
        {
          time: "13:00",
          activity: "Breathing exercise",
          reason: "Midday stress relief"
        },
        {
          time: "20:00",
          activity: "Gratitude journaling",
          reason: "End your day with reflection"
        }
      ];
    }
  }

  private buildChatPrompt(userInput: string, context: UserContext): string {
    return `
You are YouthWell AI, a compassionate mental health and wellness assistant for young people. 
You provide supportive, evidence-based guidance while maintaining a warm, understanding tone.

User Context:
- Current Mood: ${context.selectedMood || 'Not specified'}
- Wellness Streak: ${context.analyticsData?.wellnessStreak || 0} days
- Daily Check-ins: ${context.analyticsData?.dailyCheckins || 0}
- Mood Score: ${context.analyticsData?.moodScore || 'Not available'}/10
- Wellness Plan: ${context.wellnessPlan ? 'Has personalized plan' : 'No current plan'}

Recent Chat History (last 5 messages):
${context.chatHistory?.slice(-5).map(msg => 
  `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`
).join('\n') || 'No previous conversation'}

Current User Message: "${userInput}"

IMPORTANT: Vary your response format to keep conversations engaging. Use these approaches internally:

- Sometimes use bullet points (•) for suggestions
- Sometimes use numbered steps (1., 2., 3.) for advice
- Sometimes use natural conversation with **bold** emphasis
- Always end with a question to continue the conversation

Response Guidelines:
- Keep responses SHORT (2-3 sentences maximum)
- Be warm, encouraging, and age-appropriate
- Use emojis occasionally but sparingly
- Reference their progress when relevant
- Provide practical, specific advice
- If distressed, gently suggest professional help
- NEVER mention format types or numbers in your response

Respond naturally and conversationally without any technical formatting labels.
    `.trim();
  }

  private buildWellnessPrompt(mood: string, context: UserContext): string {
    return `
Generate a personalized wellness plan for someone feeling "${mood}".

User Context:
- Current mood: ${mood}
- Wellness streak: ${context.analyticsData?.wellnessStreak || 0} days
- Previous mood patterns: ${context.chatHistory?.length || 0} interactions
- Current wellness plan: ${context.wellnessPlan ? 'Has existing plan' : 'No existing plan'}

Please provide a JSON response with this exact structure:
{
  "meditation": "A 2-3 minute meditation script tailored to their ${mood} mood",
  "affirmation": "A positive, personalized affirmation for someone feeling ${mood}",
  "activity": "A specific calming activity recommendation for ${mood} mood",
  "color": "bg-[color]-50 dark:bg-[color]-950/20 border-[color]-200 dark:border-[color]-800"
}

Make the content:
- Specific to their ${mood} emotional state
- Practical and immediately actionable
- Encouraging and supportive
- Professional but warm in tone
- 2-3 sentences maximum per section
    `.trim();
  }

  private buildAnalyticsPrompt(context: UserContext): string {
    return `
Analyze this wellness data and provide insights:

Analytics Data:
- Daily Check-ins: ${context.analyticsData?.dailyCheckins || 0}
- Mood Score: ${context.analyticsData?.moodScore || 0}/10
- Wellness Streak: ${context.analyticsData?.wellnessStreak || 0} days
- Community Support: ${context.analyticsData?.communitySupport || 0} users

Recent Mood: ${context.selectedMood || 'Not specified'}
Chat Interactions: ${context.chatHistory?.length || 0}

Provide a JSON response with:
{
  "pattern": "A specific pattern you notice in their wellness data",
  "summary": "A brief summary of their current wellness state",
  "recommendation": "A specific recommendation based on the data"
}

Keep each response 1-2 sentences, encouraging and actionable.
    `.trim();
  }

  private buildReminderPrompt(context: UserContext): string {
    return `
Suggest personalized daily reminders based on this context:

User Data:
- Current Mood: ${context.selectedMood || 'Not specified'}
- Wellness Streak: ${context.analyticsData?.wellnessStreak || 0} days
- Existing Reminders: ${context.reminders?.length || 0}
- Chat Patterns: ${context.chatHistory?.length || 0} interactions

Provide a JSON array of 3 reminder suggestions:
[
  {
    "time": "HH:MM format",
    "activity": "Specific wellness activity",
    "reason": "Why this reminder helps their current state"
  }
]

Make suggestions:
- Relevant to their current mood and patterns
- Spread throughout the day
- Specific and actionable
- Supportive of their wellness journey
    `.trim();
  }

  private parseWellnessResponse(content: string): {
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  } {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          meditation: parsed.meditation || "Take a moment to breathe deeply and center yourself.",
          affirmation: parsed.affirmation || "I am worthy of care and compassion.",
          activity: parsed.activity || "Try some gentle stretching or a short walk.",
          color: parsed.color || "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
        };
      }
    } catch (error) {
      console.error('Error parsing wellness response:', error);
    }
    
    return this.getDefaultWellnessPlan('general');
  }

  private parseAnalyticsResponse(content: string): {
    pattern: string;
    summary: string;
    recommendation: string;
  } {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          pattern: parsed.pattern || "No specific patterns detected at this time.",
          summary: parsed.summary || "Continue your wellness journey with consistent check-ins.",
          recommendation: parsed.recommendation || "Keep up the great work with your daily wellness routine!"
        };
      }
    } catch (error) {
      console.error('Error parsing analytics response:', error);
    }
    
    return {
      pattern: "No specific patterns detected at this time.",
      summary: "Continue your wellness journey with consistent check-ins.",
      recommendation: "Keep up the great work with your daily wellness routine!"
    };
  }

  private parseReminderResponse(content: string): Array<{
    time: string;
    activity: string;
    reason: string;
  }> {
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error parsing reminder response:', error);
    }
    
    return [
      {
        time: "09:00",
        activity: "Morning meditation",
        reason: "Start your day with mindfulness"
      },
      {
        time: "13:00",
        activity: "Breathing exercise",
        reason: "Midday stress relief"
      },
      {
        time: "20:00",
        activity: "Gratitude journaling",
        reason: "End your day with reflection"
      }
    ];
  }

  private getDefaultWellnessPlan(mood: string): {
    meditation: string;
    affirmation: string;
    activity: string;
    color: string;
  } {
    const plans = {
      happy: {
        meditation: "Celebration Meditation: Take a moment to appreciate this positive feeling. Breathe deeply and let gratitude fill your heart.",
        affirmation: "I deserve to feel happy and I allow myself to fully experience this joy.",
        activity: "Joy Journaling: Write down three things that brought you joy today.",
        color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
      },
      sad: {
        meditation: "Compassion Meditation: Place your hand on your heart and breathe gently. Acknowledge your sadness without judgment.",
        affirmation: "It's okay to feel sad. My emotions are valid and temporary.",
        activity: "Gentle Movement: Try some gentle stretching or a short walk.",
        color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
      },
      stressed: {
        meditation: "Stress Relief Breathing: Inhale for 4 counts, hold for 4, exhale for 6. Repeat 5 times.",
        affirmation: "I can handle this stress one step at a time. I am capable and resilient.",
        activity: "Progressive Muscle Relaxation: Tense each muscle group for 5 seconds, then release.",
        color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
      },
      anxious: {
        meditation: "Grounding Meditation: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
        affirmation: "I am safe in this moment. My anxiety is temporary and I have the tools to manage it.",
        activity: "Box Breathing: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat for 2-3 minutes.",
        color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
      },
      calm: {
        meditation: "Mindful Awareness: Notice your calm state without trying to change it. Breathe naturally.",
        affirmation: "I am at peace with myself and my surroundings.",
        activity: "Nature Connection: Spend time outdoors or look at nature images.",
        color: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800"
      },
      tired: {
        meditation: "Restorative Meditation: Find a comfortable position and focus on your breath.",
        affirmation: "I honor my need for rest. Taking care of myself is necessary for my well-being.",
        activity: "Gentle Self-Care: Take a warm bath, drink herbal tea, or do some light reading.",
        color: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800"
      }
    };
    
    return plans[mood as keyof typeof plans] || plans.sad;
  }
}

export const geminiService = GeminiService.getInstance();
