import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    // Generate analytics insights using Gemini
    const insights = await geminiService.generateAnalyticsInsights(context || {});

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analytics insights' },
      { status: 500 }
    );
  }
}
