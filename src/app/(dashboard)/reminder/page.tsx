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
          Daily Reminders
        </h1>
        <p style={{ 
          color: 'var(--muted-foreground)', 
          marginBottom: '32px', 
          fontSize: '14px',
          margin: 0
        }}>
          Set your personalized reminders to stay consistent and balanced.
        </p>

        {/* Reminder Cards */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px' 
        }}>
          {reminders.map(({ period }) => (
            <Card
              key={period}
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Card Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '12px' 
              }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  margin: 0
                }}>
                  <Clock style={{ height: '20px', width: '20px', color: 'var(--primary)' }} />
                  {period} Reminder
                </h2>
              </div>

              {/* Inputs */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px'
              }}>
                {/* Time Picker */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  width: '100%'
                }}>
                  <Label 
                    htmlFor={`${period}-time`} 
                    style={{ 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500' 
                    }}
                  >
                    Select Time
                  </Label>
                  <input
                    type="time"
                    id={`${period}-time`}
                    value={selectedReminders[period].time}
                    onChange={(e) => handleChange(period, "time", e.target.value)}
                    style={{
                      border: '1px solid var(--muted)',
                      color: 'var(--foreground)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      outline: 'none',
                      width: '100%',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow = '0 0 0 2px var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--muted)';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }}
                  />
                </div>

                {/* Activity Selector */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  width: '100%'
                }}>
                  <Label 
                    htmlFor={`${period}-activity`} 
                    style={{ 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500' 
                    }}
                  >
                    Choose Activity
                  </Label>
                  <select
                    id={`${period}-activity`}
                    value={selectedReminders[period].activity}
                    onChange={(e) => handleChange(period, "activity", e.target.value)}
                    style={{
                      border: '1px solid var(--muted)',
                      color: 'var(--foreground)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      backgroundColor: 'var(--background)',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      outline: 'none',
                      width: '100%',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow = '0 0 0 2px var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--muted)';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }}
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
          style={{
            marginTop: '40px',
            padding: '12px 32px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </Button>
      </main>
    </div>
  );
};

export default DailyReminders;
