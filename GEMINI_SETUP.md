# Gemini AI Integration Setup

This guide will help you set up Google Gemini AI integration for the YouthWell application.

## Prerequisites

1. A Google account
2. Access to Google AI Studio

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

## Step 3: Install Dependencies

The required dependencies are already installed:
- `@google/generative-ai` - Official Google Gemini AI SDK

## Step 4: Test the Integration

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the dashboard and test:
   - **Chatbot**: Send a message to see AI responses
   - **Personal Wellness**: Select a mood to get AI-generated wellness plans
   - **Analytics**: View AI-generated insights (if implemented)

## Features

### 🤖 AI Chatbot
- Context-aware responses using user's mood, wellness data, and chat history
- Personalized advice based on current emotional state
- Integration with all dashboard data for better responses

### 🧘 Personalized Wellness Plans
- AI-generated meditation scripts, affirmations, and activities
- Mood-specific recommendations
- Dynamic content based on user context

### 📊 Analytics Insights
- AI-powered pattern recognition in wellness data
- Personalized recommendations based on trends
- Contextual summaries and suggestions

### 🔔 Smart Reminders
- AI-generated reminder suggestions
- Personalized timing and activities
- Based on user patterns and current state

## API Endpoints

- `POST /api/chat` - Generate AI chat responses
- `POST /api/wellness` - Generate personalized wellness plans
- `POST /api/analytics` - Generate analytics insights
- `POST /api/reminders` - Generate reminder suggestions

## Context Integration

The AI uses comprehensive user context including:
- Selected mood and wellness plan
- Chat history
- Analytics data (check-ins, mood scores, streaks)
- Reminder preferences
- User patterns and preferences

## Error Handling

- Graceful fallbacks to default responses if AI fails
- User-friendly error messages
- Console logging for debugging
- Retry mechanisms for failed requests

## Security

- API keys are server-side only
- User data is processed securely
- No sensitive data is logged
- GDPR-compliant data handling

## Troubleshooting

### Common Issues

1. **"Failed to generate response"**
   - Check if `GEMINI_API_KEY` is set correctly
   - Verify the API key is valid and active
   - Check network connectivity

2. **Slow responses**
   - This is normal for AI generation
   - Responses typically take 1-3 seconds
   - Loading states are shown to users

3. **Empty responses**
   - Check the Gemini API quota
   - Verify the API key has proper permissions
   - Check console for error messages

### Debug Mode

Enable debug logging by adding to `.env.local`:
```
DEBUG_GEMINI=true
```

## Next Steps

1. Monitor API usage in Google AI Studio
2. Implement rate limiting if needed
3. Add more sophisticated context analysis
4. Consider implementing conversation memory
5. Add user feedback for AI responses

## Support

For issues with:
- **Gemini API**: Check [Google AI Studio Documentation](https://ai.google.dev/docs)
- **Application**: Check the console logs and error messages
- **Integration**: Review the API endpoint implementations
