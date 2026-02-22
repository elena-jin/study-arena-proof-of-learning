import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock data
const users = [
    {
        id: "1",
        name: "Scholar JD",
        level: 12,
        xp: 850,
        streak: 12,
        rank: 4,
        reputation: 92, // Reputation Score (0-100)
        completionRate: 88,
        totalQuests: 124,
        studyTime: "56h",
        solBalance: 1.42 // Solana Balance
    },
    {
        id: "2",
        name: "Alex P.",
        level: 15,
        xp: 1200,
        streak: 8,
        rank: 2,
        reputation: 75,
        solBalance: 0.5
    }
];

const quests = [
    {
        id: "q1",
        title: "Finish 30 calculus problems",
        difficulty: "Hard", // Easy, Medium, Hard, Extreme
        multiplier: 1.5,
        points: 120,
        progress: 75,
        expires: "2h left",
        color: "bg-brand-purple",
        wager: 25 // Stake wagered
    },
    {
        id: "q2",
        title: "Read 'The Great Gatsby' Ch. 4",
        difficulty: "Medium",
        multiplier: 1.2,
        points: 60,
        progress: 30,
        expires: "1 day left",
        color: "bg-brand-blue"
    }
];

// Routes
app.get('/api/user', (req, res) => {
    res.json(users[0]);
});

app.get('/api/quests', (req, res) => {
    res.json(quests);
});

app.get('/api/generate-quiz/:topic', (req, res) => {
    const { topic } = req.params;
    res.json({
        topic,
        questions: [
            { id: 1, text: `What is a key concept in ${topic}?`, options: ["Option A", "Option B", "Option C"], correct: 0 },
            { id: 2, text: `Why is ${topic} important for students?`, options: ["Option A", "Option B", "Option C"], correct: 1 },
            { id: 3, text: `Solve a simple ${topic} problem.`, options: ["Option A", "Option B", "Option C"], correct: 2 },
        ]
    });
});

app.post('/api/generate-video', (req, res) => {
    const { topic } = req.body;
    res.json({
        status: 'pending',
        message: 'Veo is cooking your educational brainrot... 🔥',
        videoId: Math.random().toString(36).substring(7)
    });
});

app.get('/api/video-status/:id', (req, res) => {
    res.json({
        status: 'ready',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        topic: 'Calculus Derivatives',
        author: 'Anime Tutor',
        difficulty: 'Hard'
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
