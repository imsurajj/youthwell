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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      padding: '0 16px' 
    }}>
      <Navbar />

      <main style={{ 
        maxWidth: '1152px', 
        margin: '0 auto', 
        marginTop: '48px', 
        marginBottom: '80px' 
      }}>
        {/* Page Heading */}
        <h1 style={{ 
          fontSize: '30px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          margin: 0 
        }}>
          Dashboard
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(1, 1fr)', 
          gap: '32px' 
        }}>
          {/* Mood Chart Card */}
          <Card style={{
            gridColumn: 'span 2',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '24px' 
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Daily Mood Trend
                </h2>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--muted-foreground)',
                  margin: 0
                }}>
                  Last 7 Days
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ 
                  fontSize: '30px', 
                  fontWeight: 'bold',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  4.2
                </p>
                <p style={{ 
                  color: '#4ade80', 
                  fontSize: '14px',
                  margin: 0
                }}>
                  ↑ 0.2%
                </p>
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
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px' 
          }}>
            {/* Check-in Streak */}
            <Card style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{ 
                color: 'var(--muted-foreground)', 
                fontWeight: '600', 
                fontSize: '14px',
                margin: 0,
                marginBottom: '8px'
              }}>
                Check-in Streak
              </h3>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                margin: 0,
                marginBottom: '4px'
              }}>
                7 <span style={{ fontSize: '16px', fontWeight: '500' }}>Days</span>
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                Keep it up!
              </p>
            </Card>

            {/* Longest Streak */}
            <Card style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{ 
                color: 'var(--muted-foreground)', 
                fontWeight: '600', 
                fontSize: '14px',
                margin: 0,
                marginBottom: '8px'
              }}>
                Longest Streak
              </h3>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                margin: 0,
                marginBottom: '4px',
                color: '#60a5fa'
              }}>
                21 <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--foreground)' }}>Days</span>
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'var(--muted-foreground)',
                margin: 0
              }}>
                You&apos;re doing great!
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyMood;
