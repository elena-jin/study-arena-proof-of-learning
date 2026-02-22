import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Swords, Users, Clock, Target, Rocket, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const DIFFICULTIES = [
    { label: "Easy", points: 20, multiplier: 1.0, color: "bg-green-400", emoji: "🌱" },
    { label: "Medium", points: 60, multiplier: 1.2, color: "bg-blue-400", emoji: "📚" },
    { label: "Hard", points: 120, multiplier: 1.5, color: "bg-orange-400", emoji: "🔥" },
    { label: "Extreme", points: 300, multiplier: 2.5, color: "bg-purple-500", emoji: "👑" },
];

const FRIENDS = [
    { id: 1, name: "Alex P.", avatar: "AP" },
    { id: 2, name: "Sarah K.", avatar: "SK" },
    { id: 3, name: "Toby M.", avatar: "TM" },
    { id: 4, name: "Lily B.", avatar: "LB" },
];

const CreateQuest = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState(1);
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
    const [title, setTitle] = useState("");
    const [wager, setWager] = useState(0);

    const handleSend = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#8B5CF6", "#3B82F6", "#22D3EE"],
        });
        setTimeout(() => navigate("/dashboard"), 1500);
    };

    const toggleFriend = (id: number) => {
        setSelectedFriends(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const currentDiff = DIFFICULTIES[difficulty];

    return (
        <div className="min-h-screen bg-background pb-12">
            <header className="p-6 flex items-center gap-4 bg-white border-b border-border sticky top-0 z-50">
                <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">New Challenge</h1>
            </header>

            <main className="max-w-2xl mx-auto px-6 space-y-8 pt-8">
                {/* Quest Title */}
                <section className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        What's the quest?
                    </label>
                    <input
                        type="text"
                        placeholder='e.g. "Finish 30 calculus problems"'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-6 bg-white rounded-3xl border-2 border-border focus:border-brand-purple outline-none text-xl font-bold bubbly-shadow transition-all"
                    />
                </section>

                {/* Difficulty Slider */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Swords className="w-4 h-4" />
                            Risk vs Reward ({currentDiff.multiplier}x)
                        </label>
                        <span className="text-brand-purple font-black text-xl">
                            +{Math.floor(currentDiff.points * (1 + wager / 100))} XP
                        </span>
                    </div>

                    <div className="relative h-4 bg-muted rounded-full">
                        <div
                            className={`absolute h-full rounded-full transition-all duration-300 ${currentDiff.color}`}
                            style={{ width: `${(difficulty / (DIFFICULTIES.length - 1)) * 100}%` }}
                        />
                        <div className="absolute inset-0 flex justify-between px-2 -top-2">
                            {DIFFICULTIES.map((d, i) => (
                                <button
                                    key={d.label}
                                    onClick={() => setDifficulty(i)}
                                    className={`w-8 h-8 rounded-full border-4 border-white bubbly-shadow transition-all flex items-center justify-center text-xs ${i === difficulty ? d.color : 'bg-white'}`}
                                >
                                    {d.emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-center font-bold text-lg">{currentDiff.label} Tier</p>
                </section>

                {/* Stake Wager */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Stake Wager (SOL Points)
                        </label>
                        <span className="font-black text-brand-neon">{wager} / 50</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="50" step="5"
                        value={wager}
                        onChange={(e) => setWager(parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-neon"
                    />
                    <p className="text-[10px] text-muted-foreground font-medium">Higher stakes increase your final XP reward but lower your Reputation more if you fail!</p>
                </section>

                {/* Friend Selector */}
                <section className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Social Arena Challenge
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {FRIENDS.map(friend => (
                            <button
                                key={friend.id}
                                onClick={() => toggleFriend(friend.id)}
                                className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFriends.includes(friend.id) ? 'border-brand-purple bg-brand-purple/5 bubbly-shadow' : 'border-border bg-white'}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bubbly-shadow ${selectedFriends.includes(friend.id) ? 'bg-brand-purple' : 'bg-muted text-muted-foreground'}`}>
                                    {friend.avatar}
                                </div>
                                <span className="text-xs font-bold">{friend.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={!title || selectedFriends.length === 0}
                    className="w-full py-6 rounded-3xl bg-brand-purple text-white font-bold text-xl flex items-center justify-center gap-2 bubbly-button hover:bg-brand-purple/90 mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send Arena Challenge
                    <Rocket className="w-6 h-6" />
                </button>
            </main>
        </div>
    );
};

export default CreateQuest;
