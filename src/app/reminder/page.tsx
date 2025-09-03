"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const reminders = [
  { period: "Morning", defaultTime: "09:00", defaultActivity: "Morning meditation" },
  { period: "Afternoon", defaultTime: "13:00", defaultActivity: "Mindful breathing" },
  { period: "Evening", defaultTime: "20:00", defaultActivity: "Digital detox" },
] as const;

const activityOptions = {
  Morning: ["Morning meditation", "Exercise", "Gratitude journaling"],
  Afternoon: ["Mindful breathing", "Stretch break", "Hydration reminder"],
  Evening: ["Digital detox", "Evening walk", "Read a book"],
};

type Period = typeof reminders[number]["period"];

const DailyReminders: React.FC = () => {
  const [selectedReminders, setSelectedReminders] = useState<Record<
    Period,
    { time: string; activity: string }
  >>({
    Morning: { time: reminders[0].defaultTime, activity: reminders[0].defaultActivity },
    Afternoon: { time: reminders[1].defaultTime, activity: reminders[1].defaultActivity },
    Evening: { time: reminders[2].defaultTime, activity: reminders[2].defaultActivity },
  });

  const handleChange = (period: Period, field: "time" | "activity", value: string) => {
    setSelectedReminders((prev) => ({
      ...prev,
      [period]: {
        ...prev[period],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    alert("✅ Your daily reminders have been saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans px-4">
      <Navbar />

      <main className="max-w-3xl mx-auto text-center mt-16 mb-20">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-3">Daily Reminders</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Set your personalized reminders to stay consistent and balanced.
        </p>

        {/* Reminder Cards */}
        <div className="flex flex-col gap-6">
          {reminders.map(({ period }) => (
            <Card
              key={period}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4 transition-all duration-200 hover:shadow-xl"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {period} Reminder
                </h2>
              </div>

              {/* Inputs */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Time Picker */}
                <div className="flex flex-col items-start w-full sm:w-1/3">
                  <Label htmlFor={`${period}-time`} className="mb-2 text-sm font-medium">
                    Select Time
                  </Label>
                  <input
                    type="time"
                    id={`${period}-time`}
                    value={selectedReminders[period].time}
                    onChange={(e) => handleChange(period, "time", e.target.value)}
                    className="border border-muted text-foreground rounded-lg px-4 py-3 text-base bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                  />
                </div>

                {/* Activity Selector */}
                <div className="flex flex-col items-start w-full sm:w-2/3">
                  <Label htmlFor={`${period}-activity`} className="mb-2 text-sm font-medium">
                    Choose Activity
                  </Label>
                  <select
                    id={`${period}-activity`}
                    value={selectedReminders[period].activity}
                    onChange={(e) => handleChange(period, "activity", e.target.value)}
                    className="border border-muted text-foreground rounded-lg px-4 py-3 text-base bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
                  >
                    {activityOptions[period].map((activity) => (
                      <option key={activity} value={activity}>
                        {activity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="mt-10 px-8 py-3 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Save Changes
        </Button>
      </main>
    </div>
  );
};

export default DailyReminders;
