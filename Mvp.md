# 📄 Product Requirements Document (PRD)

**Product Name:** YouthWell  
**Type:** Web Application  
**Target Users:** Gen Z & young adults (15–30) seeking stress relief, self-reflection, and wellness support.  
**Timeline:** 20 days (Hackathon-ready MVP)  

---

## 1. 🧠 Problem Statement  

Young people face rising stress, anxiety, and loneliness but lack affordable, stigma-free, and personalized wellness solutions. Existing apps feel too clinical, generic, or unrelatable. Youth need a safe, empathetic, and interactive space where they can reflect, express emotions, and receive support tailored to their feelings.  

---

## 2. 🎯 Goals & Objectives  

- Provide an AI-powered wellness companion for daily emotional check-ins.  
- Enable anonymous venting and empathetic AI responses.  
- Offer personalized meditations, affirmations, and calming tips based on mood.  
- Deliver daily reminders for healthy mental wellness habits.  
- Create a lightweight, engaging, and accessible web app.  

---

## 3. 🏗️ Core Features (MVP)  

### 3.1 Mood Check-in  
- User selects mood (emoji or mood list: happy, sad, stressed, anxious, calm, etc.).  
- AI generates personalized output:  
  - Meditation script (2–3 mins read).  
  - Short affirmation.  
  - Calming activity/tip.  

### 3.2 Anonymous Venting Chatbot  
- User types their thoughts/feelings (anonymous option available).  
- GPT responds empathetically (“I hear you…”, “It’s okay to feel this way…”).  
- History stored for private review.  

### 3.3 Daily Wellness Reminder  
- Push/browser notification once a day.  
- Example nudges: “Take a deep breath 🌿”, “Drink some water 💧”, “Be kind to yourself ❤️.”  

### 3.4 Mood History Dashboard  
- Visual chart (Recharts/Chart.js) showing daily mood trends.  
- Tracks streaks (days of consistent check-ins).  

---

## 4. 🌟 Secondary Features (Nice-to-Have if Time Permits)  

- **Dream Journal + AI Meaning:** Users record dreams → GPT interprets symbolic meaning.  
- **AI Affirmation Card Generator:** Creates shareable motivational images/cards.  
- **Voice Input for Journaling:** Use Web Speech API for speech-to-text venting.  
- **Community Mode (Phase 2):** Anonymous sharing board with supportive comments.  

---

## 5. 🧩 User Flows  

1. **Daily Check-in Flow**  
   Home → Select Mood → AI Response (meditation + affirmation + tip).  

2. **Venting Flow**  
   Vent Screen → Type/Voice feelings → AI empathetic reply → Option to save.  

3. **Reminder Flow**  
   Browser Notification → Click → Redirects to app (Daily Check-in).  

4. **Dashboard Flow**  
   Profile → Mood History Chart + Saved Affirmations → Track emotional patterns.  

---

## 6. 🎨 UX/UI Requirements  

- Youth-friendly design → calming pastel theme, minimal clutter.  
- Simple navigation (3–4 tabs max): Home | Vent | Dashboard | Profile.  
- Emoji-driven mood selector (fast & intuitive).  
- Card-based outputs (affirmations, meditations displayed in neat cards).  

---

## 7. 🛠️ Tech Stack  

- **Frontend:** Next.js (React), TailwindCSS, ShadCN/UI  
- **Backend & Auth:** Supabase (Auth, Database, Realtime, Edge functions)  
- **AI:** OpenAI GPT API (text) + DALL·E (optional image backgrounds)  
- **Charts:** Recharts or Chart.js (mood history)  
- **Notifications:** Browser Push API (via service workers) or Supabase Functions for email reminders  
- **Hosting:** Vercel (frontend + API routes), Supabase (backend)  
