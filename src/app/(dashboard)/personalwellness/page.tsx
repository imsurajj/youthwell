"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😢" },
  { label: "Stressed", emoji: "😫" },
  { label: "Anxious", emoji: "😟" },
  { label: "Calm", emoji: "😌" },
  { label: "Tired", emoji: "😴" },
] as const;

type Mood = typeof moods[number]["label"];

const wellnessPlans: Record<
  Mood,
  {
    meditation: string;
    affirmation: string;
    activity: string;
  }
> = {
  Happy: {
    meditation: "Take a moment to smile and appreciate the good things around you.",
    affirmation: "I am joyful and grateful.",
    activity: "Dance to your favorite upbeat song for 5 minutes.",
  },
  Sad: {
    meditation: "Sit comfortably and breathe deeply. Let your sadness flow through you without resistance.",
    affirmation: "It is okay to feel sad; I honor my emotions.",
    activity: "Write down your feelings in a journal to understand them better.",
  },
  Stressed: {
    meditation:
      "Find a comfortable spot. Close your eyes. Breathe in deeply through your nose, feeling your belly expand. Hold for three counts. Exhale slowly through your mouth, letting go of any tension. Repeat this three times. Now, picture a warm, calming light at the top of your head. Let it slowly travel down your body, relaxing every muscle it touches - your face, your neck, your shoulders, all the way to your toes. Stay with this feeling of warmth and peace for a few moments. When you're ready, wiggle your fingers and toes, and gently open your eyes.",
    affirmation: "I am in control of my thoughts and feelings. I can handle any challenge that comes my way.",
    activity:
      "Grab a pen and paper. Don't try to draw anything specific. Just let your hand move freely across the page, creating lines, shapes, and patterns. Focus on the feeling of the pen on the paper and the movement of your hand. Do this for 5 minutes.",
  },
  Anxious: {
    meditation: "Focus on your breath and slowly count to five as you inhale, then five as you exhale.",
    affirmation: "I am calm and grounded.",
    activity: "Try a 5-minute guided meditation for anxiety relief.",
  },
  Calm: {
    meditation: "Maintain your relaxed breathing and observe the calm around you with gratitude.",
    affirmation: "I embrace peace within me.",
    activity: "Spend 5 minutes noticing and appreciating your surroundings.",
  },
  Tired: {
    meditation: "Visualize your body relaxing and releasing fatigue with each breath.",
    affirmation: "I honor my need for rest and rejuvenation.",
    activity: "Take a short power nap or practice gentle stretching for 5 minutes.",
  },
};

const YouthWell: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>("Stressed");

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      padding: '0 16px' 
    }}>
      <Navbar />

      <main style={{ 
        maxWidth: '768px', 
        margin: '0 auto', 
        textAlign: 'center', 
        marginTop: '64px', 
        marginBottom: '80px' 
      }}>
        {/* Heading */}
        <h1 style={{ 
          fontSize: '30px', 
          fontWeight: 'bold', 
          marginBottom: '12px',
          margin: 0
        }}>
          How are you feeling today?
        </h1>
        <p style={{ 
          color: 'var(--muted-foreground)', 
          marginBottom: '32px', 
          fontSize: '14px',
          margin: 0
        }}>
          Select a mood to get a personalized wellness plan.
        </p>

        {/* Mood buttons */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          {moods.map(({ label, emoji }) => (
            <Button
              key={label}
              variant={selectedMood === label ? "default" : "outline"}
              onClick={() => setSelectedMood(label)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '96px',
                height: '96px',
                fontSize: '18px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                transform: selectedMood === label ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedMood === label ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
              }}
              aria-pressed={selectedMood === label}
            >
              <span style={{ fontSize: '24px' }}>{emoji}</span>
              <span style={{ fontSize: '14px', marginTop: '4px' }}>{label}</span>
            </Button>
          ))}
        </div>

        {/* Dropdown */}
        <div style={{ marginBottom: '48px' }}>
          <Label 
            htmlFor="mood-select" 
            style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500', 
              fontSize: '14px' 
            }}
          >
            Or choose from a list
          </Label>
          <select
            id="mood-select"
            style={{
              border: '1px solid var(--muted)',
              color: 'var(--foreground)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '16px',
              width: '256px',
              margin: '0 auto',
              backgroundColor: 'var(--background)',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              transition: 'all 0.2s ease',
              display: 'block'
            }}
            value={selectedMood || ""}
            onChange={(e) => setSelectedMood(e.target.value as Mood)}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 2px var(--primary)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--muted)';
              e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }}
          >
            <option value="" disabled>
              Select a mood...
            </option>
            {moods.map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Wellness Plan */}
        {selectedMood && wellnessPlans[selectedMood] && (
          <section
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              textAlign: 'left',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              margin: '0 auto',
              maxWidth: '512px',
              transition: 'all 0.3s ease'
            }}
            aria-label="Personalized wellness plan"
          >
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              textAlign: 'center',
              margin: 0,
              marginBottom: '24px'
            }}>
              Your Personalized Wellness Plan
            </h2>

            {/* Meditation */}
            <div style={{
              backgroundColor: 'rgba(var(--muted), 0.1)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s ease',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <h3 style={{ 
                color: 'var(--muted-foreground)', 
                fontWeight: '600', 
                margin: 0,
                marginBottom: '4px'
              }}>
                🧘 Meditation Script (2–3 mins)
              </h3>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.6',
                margin: 0
              }}>
                {wellnessPlans[selectedMood].meditation}
              </p>
            </div>

            {/* Affirmation */}
            <div style={{
              backgroundColor: 'rgba(var(--muted), 0.1)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s ease',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <h3 style={{ 
                color: 'var(--muted-foreground)', 
                fontWeight: '600', 
                margin: 0,
                marginBottom: '4px'
              }}>
                💬 Affirmation
              </h3>
              <p style={{ 
                fontStyle: 'italic', 
                fontSize: '16px',
                margin: 0
              }}>
                &ldquo;{wellnessPlans[selectedMood].affirmation}&rdquo;
              </p>
            </div>

            {/* Activity */}
            <div style={{
              backgroundColor: 'rgba(var(--muted), 0.1)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.2)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <h3 style={{ 
                color: 'var(--muted-foreground)', 
                fontWeight: '600', 
                margin: 0,
                marginBottom: '4px'
              }}>
                🎨 Calming Activity
              </h3>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.6',
                margin: 0
              }}>
                <span style={{ fontWeight: 'bold' }}>Mindful Doodling:</span> {wellnessPlans[selectedMood].activity}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default YouthWell;
