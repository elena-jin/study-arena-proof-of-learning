import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Award, CheckCircle2, Clock, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
    // Mock student data (would come from API)
    const stats = {
        reputation: 92,
        completionRate: 88,
        streak: 12,
        totalQuests: 124,
        studyTime: "56h",
        name: "Scholar JD",
        level: 12,
        solBalance: 1.42
    };

    const getTrustBadge = (score: number) => {
        if (score >= 90) return { label: "Diamond", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" };
        if (score >= 70) return { label: "Gold", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
        if (score >= 40) return { label: "Silver", color: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" };
        return { label: "Bronze", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" };
    };

    const badge = getTrustBadge(stats.reputation);

    return (
        <div className="min-h-screen bg-background pb-12">
            <header className="p-6 flex items-center justify-between bg-white border-b border-border mb-8 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold">My Profile</h1>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple font-black text-sm">
                    <Zap className="w-4 h-4 fill-brand-purple" />
                    {stats.solBalance} SOL
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-6 space-y-8 text-center">
                {/* Profile Card */}
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-[3rem] bg-brand-purple flex items-center justify-center text-white font-black text-4xl bubbly-shadow mb-4">
                        JD
                    </div>
                    <h2 className="text-3xl font-black">{stats.name}</h2>
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm mb-6">Level {stats.level} • Junior Master</p>

                    {/* Trust Badge */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 ${badge.bg} ${badge.border} ${badge.color} font-black text-lg bubbly-shadow`}
                    >
                        <Shield className="w-6 h-6 fill-current" />
                        {badge.label} Trust
                    </motion.div>
                </div>

                {/* Reputation Meter */}
                <section className="p-8 rounded-[3rem] bg-white border border-border bubbly-shadow relative overflow-hidden">
                    <h3 className="text-xl font-bold mb-8">Study Reputation</h3>
                    <div className="relative w-48 h-48 mx-auto mb-6">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="96" cy="96" r="88"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-muted/20"
                            />
                            <motion.circle
                                cx="96" cy="96" r="88"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeDasharray="553"
                                initial={{ strokeDashoffset: 553 }}
                                animate={{ strokeDashoffset: 553 - (553 * stats.reputation) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                                className="text-brand-purple"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-brand-purple">{stats.reputation}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic font-medium px-8">
                        "Preventing students from choosing easy challenges & rewarding consistency. Stay focused, stay reliable!"
                    </p>
                </section>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <SimpleStat icon={<Award className="text-orange-500" />} label="Completion Rate" value={`${stats.completionRate}%`} />
                    <SimpleStat icon={<Flame className="text-brand-pink fill-brand-pink" />} label="Current Streak" value={`${stats.streak} days`} />
                    <SimpleStat icon={<CheckCircle2 className="text-brand-neon" />} label="Quests Done" value={stats.totalQuests} />
                    <SimpleStat icon={<Clock className="text-brand-blue" />} label="Total Study" value={stats.studyTime} />
                </div>
            </main>
        </div>
    );
};

const SimpleStat = ({ icon, label, value }: any) => (
    <div className="p-6 rounded-3xl bg-white border border-border bubbly-shadow flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <span className="text-2xl font-black">{value}</span>
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{label}</span>
    </div>
);

export default Profile;
