"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", mood: 4.1 },
  { day: "Tue", mood: 3.8 },
  { day: "Wed", mood: 4.0 },
  { day: "Thu", mood: 3.6 },
  { day: "Fri", mood: 4.3 },
  { day: "Sat", mood: 3.5 },
  { day: "Sun", mood: 4.2 },
];

const DailyMood: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans px-4">
      <Navbar />

      <main className="max-w-6xl mx-auto mt-12 mb-20">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Chart Card */}
          <Card className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Daily Mood Trend</h2>
                <p className="text-sm text-muted-foreground">Last 7 Days</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">4.2</p>
                <p className="text-green-400 text-sm">↑ 0.2%</p>
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="day" stroke="#888" />
                <YAxis domain={[3, 5]} stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e2f",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4f9cff"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Streaks Section */}
          <div className="flex flex-col gap-6">
            {/* Check-in Streak */}
            <Card className="bg-card border border-border rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="text-muted-foreground font-semibold text-sm">
                Check-in Streak
              </h3>
              <p className="text-4xl font-bold mt-2">7 <span className="text-base font-medium">Days</span></p>
              <p className="text-sm text-muted-foreground mt-1">Keep it up!</p>
            </Card>

            {/* Longest Streak */}
            <Card className="bg-card border border-border rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="text-muted-foreground font-semibold text-sm">
                Longest Streak
              </h3>
              <p className="text-4xl font-bold mt-2 text-blue-400">21 <span className="text-base font-medium text-foreground">Days</span></p>
              <p className="text-sm text-muted-foreground mt-1">You &apos;re doing great!</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyMood;