# StudyArena: Bet on your Brain 🧠💎

StudyArena is a gamified social learning platform that turns the "brainrot" experience of vertical video feeds into a high-stakes arena for academic mastery. By combining TikTok-style micro-learning with AI-powered proof-of-work and social prediction markets, we've created a loop where students don't just study—they compete.

## Inspiration
We noticed that traditional educational apps feel like "work," while social media feeds feel like "play." However, the reward loops in social media are hollow. We wanted to hijack those exact Dopamine-driven mechanics (the scroll, the like, the streak) and pivot them toward academic productivity. 

The core idea: **What if you could wager on your own attention?** If you "bet" that you can stay focused for 25 minutes, and our AI proves you did, you win big. That’s the genesis of StudyArena.

## What it does
StudyArena is built on three pillars:
1. **Brainrot Learning Feed**: A vertical feed of bite-sized, academically rigorous videos (Physics, Biology, History) punctuated by AI-generated "knowledge checkpoints" (quizzes).
2. **Focus Arena (The Wager)**: Users start pomodoro sessions where a real-time "Presage Eye" (camera monitoring) tracks leur attention. At the end, our **Gemini Vision** "Deep Scan" analyzes their physical notes/homework to verify completion.
3. **Social Prediction Markets**: Kids can challenge friends to "Study Duels." *Example: "I bet 100 points Alex can't finish 15 Spanish vocab cards in 20 minutes."* This turns focus into a social asset.

## How we built it
- **Frontend**: React + Vite + Tailwind CSS for a "Gen-Z" glassmorphic aesthetic.
- **Backend/DB**: **Supabase** for real-time user profiles, points persistence, and auth.
- **AI Engine**: **Gemini 1.5 Flash** (via Google Generative AI SDK) for real-time "Deep Scan" verification of handwritten homework and student notes.
- **Motion**: Framer Motion for high-fidelity micro-interactions and "bubbly" physics.

## Challenges we ran into
- **AI Latency & Accuracy**: Getting an LLM to reliably "grade" a photo of messy calculus notes in under 3 seconds was hard. We optimized the prompt engineering to focus on "Proof of Effort" and specific keywords detected in the image.
- **Real-time Camera Handling**: Managing state between active camera streams in "Monitoring" mode versus "Verification" mode without refreshing the page or losing the Pomodoro state.
- **Supabase Real-time Sync**: Ensuring that points won in a "Duel" reflect instantly on the Dashboard across all devices using Postgres Changes subscriptions.

## Accomplishments that we're proud of
- **The "Bet on your Brain" Loop**: Successfully creating a flow where a user accepts a friend challenge, finishes their work, and sees their global rank rise in real-time.
- **The Aesthetic**: Moving away from "boring" education UI into a vibrant, high-energy design system that feels more like a game than a classroom.
- **Actual Gemini Integration**: Implementing real-world "Proof of Learning" via computer vision, moving past simple simulated progress bars.

## What we learned
- **Incentives Matter**: When points are tied to a "Social Arena" where friends can see your rank, the motivation to finish a boring assignment triples. 
- **AI is a Great Proctor**: Computer vision is surprisingly effective at detecting whether a student is actually writing or just scrolling on their phone, which makes the "Focus Score" feel earned.

## What's next for StudyArena
- **Solana Integration**: Moving the point system on-chain to allow for real reward redemption.
- **Collaborative Quests**: "Global Raids" where the entire community has to log 10,000 focus hours to unlock a new video series.
- **Voice-to-Knowledge**: Using Gemini to listen to live classroom lectures and automatically generate StudyArena-style quiz cards in real-time.
