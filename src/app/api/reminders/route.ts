import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    // Generate personalized reminder suggestions using Gemini
    const suggestions = await geminiService.generateReminderSuggestions(context || {});

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Reminders API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate reminder suggestions' },
      { status: 500 }
    );
  }
}
