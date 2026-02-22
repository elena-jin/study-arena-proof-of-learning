import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Coffee, ShoppingBag, Coins, Gift, Smartphone, BookOpen, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

const REWARDS = [
    { id: 1, name: "Premium Coffee", category: "Food", cost: 150, icon: <Coffee />, color: "bg-orange-400" },
    { id: 2, name: "A5 Dot Journal", category: "Stationery", cost: 400, icon: <ShoppingBag />, color: "bg-brand-purple" },
    { id: 3, name: "Solana Booster (NFT)", category: "Digital", cost: 1200, icon: <Coins />, color: "bg-cyan-500", isSol: true },
    { id: 4, name: "Campus Meal Deal", category: "Campus", cost: 800, icon: <Utensils />, color: "bg-red-400" },
    { id: 5, name: "Neon Pen Set", category: "Stationery", cost: 250, icon: <Smartphone />, color: "bg-brand-neon" },
    { id: 6, name: "Focus Planner", category: "Stationery", cost: 350, icon: <BookOpen />, color: "bg-brand-blue" },
];

const RewardsStore = () => {
    const [points, setPoints] = useState(850);
    const [solBalance, setSolBalance] = useState(1.42);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Food", "Stationery", "Campus", "Digital"];

    const filteredRewards = activeCategory === "All"
        ? REWARDS
        : REWARDS.filter(r => r.category === activeCategory);

    const handleRedeem = (reward: any) => {
        if (points >= reward.cost) {
            setPoints(p => p - reward.cost);
            if (reward.isSol) setSolBalance(s => s + 0.1);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#22D3EE", "#8B5CF6", "#F472B6"]
            });
            alert(`Redeemed ${reward.name}! Enjoy your reward! 🎉`);
        } else {
            alert("Not enough points! Complete more quests. 💪");
        }
    };

    return (
        <div className="min-h-screen bg-background pb-12">
            <header className="p-6 bg-white border-b border-border sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-2xl font-black">Student Shop</h1>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple font-black text-xs flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            {points} PTS
                        </div>
                        <div className="px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-600 font-black text-xs flex items-center gap-1 border border-cyan-400/20">
                            <Zap className="w-3 h-3 fill-cyan-400" />
                            {solBalance.toFixed(2)} SOL
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
                {/* Banner */}
                <div className="p-8 rounded-[3rem] bg-brand-purple text-white relative overflow-hidden bubbly-shadow">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-2">Treat Yourself! 🎁</h2>
                        <p className="text-white/80 font-bold max-w-sm">Redeem your study points for real perks or trade up for Solana digital assets.</p>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-2xl font-bold text-sm whitespace-nowrap transition-all bubbly-button ${activeCategory === cat ? 'bg-black text-white' : 'bg-white border border-border'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredRewards.map(reward => (
                            <motion.div
                                key={reward.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="p-6 rounded-[2.5rem] bg-white border border-border bubbly-shadow flex items-center gap-6 group"
                            >
                                <div className={`w-20 h-20 rounded-[1.5rem] ${reward.color} flex items-center justify-center text-white scale-110 -rotate-6 group-hover:rotate-0 transition-transform`}>
                                    {React.cloneElement(reward.icon as React.ReactElement, { size: 36, strokeWidth: 3 })}
                                </div>
                                <div className="flex-1">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{reward.category}</span>
                                    <h3 className="text-xl font-black mb-2">{reward.name}</h3>
                                    <button
                                        onClick={() => handleRedeem(reward)}
                                        className={`w-full py-2.5 rounded-xl font-black text-xs transition-all bubbly-button ${points >= reward.cost ? 'bg-brand-neon text-black' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {reward.cost} POINTS
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default RewardsStore;
