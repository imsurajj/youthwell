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
    <div className="min-h-screen bg-background text-foreground font-sans px-4">
      <Navbar />

      <main className="max-w-3xl mx-auto text-center mt-16 mb-20">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-3">How are you feeling today?</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Select a mood to get a personalized wellness plan.
        </p>

        {/* Mood buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {moods.map(({ label, emoji }) => (
            <Button
              key={label}
              variant={selectedMood === label ? "default" : "outline"}
              onClick={() => setSelectedMood(label)}
              className="flex flex-col items-center justify-center w-24 h-24 text-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
              aria-pressed={selectedMood === label}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm mt-1">{label}</span>
            </Button>
          ))}
        </div>

        {/* Dropdown */}
        <div className="mb-12">
          <Label htmlFor="mood-select" className="block mb-2 font-medium text-sm">
            Or choose from a list
          </Label>
          <select
            id="mood-select"
            className="border border-muted text-foreground rounded-lg px-4 py-3 text-base w-64 mx-auto bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={selectedMood || ""}
            onChange={(e) => setSelectedMood(e.target.value as Mood)}
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
            className="bg-card border border-border text-left p-6 rounded-2xl shadow-xl mx-auto max-w-2xl transition-all duration-300 space-y-6"
            aria-label="Personalized wellness plan"
          >
            <h2 className="text-xl font-bold text-center">Your Personalized Wellness Plan</h2>

            {/* Meditation */}
            <div className="bg-muted/10 hover:bg-muted/20 border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md">
              <h3 className="text-muted-foreground font-semibold mb-1">
                🧘 Meditation Script (2–3 mins)
              </h3>
              <p className="text-sm leading-relaxed">
                {wellnessPlans[selectedMood].meditation}
              </p>
            </div>

            {/* Affirmation */}
            <div className="bg-muted/10 hover:bg-muted/20 border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md">
              <h3 className="text-muted-foreground font-semibold mb-1">💬 Affirmation</h3>
              <p className="italic text-base">
                &ldquo;{wellnessPlans[selectedMood].affirmation}&rdquo;
              </p>
            </div>

            {/* Activity */}
            <div className="bg-muted/10 hover:bg-muted/20 border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md">
              <h3 className="text-muted-foreground font-semibold mb-1">
                🎨 Calming Activity
              </h3>
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Mindful Doodling:</span> {wellnessPlans[selectedMood].activity}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default YouthWell;
