import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { mood, context } = await request.json();

    if (!mood) {
      return NextResponse.json(
        { error: 'Mood is required' },
        { status: 400 }
      );
    }

    // Generate personalized wellness plan using Gemini
    const wellnessPlan = await geminiService.generateWellnessPlan(mood, context || {});

    return NextResponse.json({ wellnessPlan });
  } catch (error) {
    console.error('Wellness API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate wellness plan' },
      { status: 500 }
    );
  }
}
