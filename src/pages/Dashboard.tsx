import React from "react";
import { motion } from "framer-motion";
import { Flame, Star, Trophy, ArrowRight, Play, Users, Swords, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import TrendModal from "../components/TrendModal";
import { useUserStats } from "../hooks/useUserStats";

const Dashboard = () => {
    const { points, streak, loading } = useUserStats();
    const [trendModalOpen, setTrendModalOpen] = React.useState(false);
    const [activeQuestTitle, setActiveQuestTitle] = React.useState("");

    const handleQuestClick = (title: string) => {
        setActiveQuestTitle(title);
        setTrendModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <TrendModal
                isOpen={trendModalOpen}
                onClose={() => setTrendModalOpen(false)}
                title={activeQuestTitle}
            />
            {/* Top Header/Stats */}
            <header className="p-6 bg-white border-b border-border mb-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link to="/profile" className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-16 h-16 rounded-3xl bg-brand-purple flex items-center justify-center text-white font-bold text-2xl bubbly-shadow group-hover:scale-105 transition-transform">
                            JD
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold group-hover:text-brand-purple transition-colors">Hey, Scholar! 👋</h1>
                            <p className="text-muted-foreground text-sm font-medium">Level 12 • 92 Rep • Diamond Trust</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <StatPill icon={<Flame className="text-orange-500 fill-orange-500" />} value={loading ? "..." : streak.toString()} label="Streak" />
                        <StatPill icon={<Star className="text-brand-purple fill-brand-purple" />} value={loading ? "..." : points.toString()} label="Points" />
                        <StatPill icon={<Trophy className="text-yellow-500 fill-yellow-500" />} value="#4" label="Rank" />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Social Challenge Arena */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Swords className="w-5 h-5 text-brand-purple" />
                                Challenge Arena
                            </h2>
                            <Link to="/create-quest" className="text-brand-neon font-bold text-sm hover:underline">Challenge Friend +</Link>
                        </div>

                        <div className="space-y-4">
                            <QuestCard
                                title="Finish 30 calculus problems"
                                reward="120 XP"
                                expires="2h left"
                                progress={75}
                                color="bg-brand-purple"
                                difficulty="Extreme"
                                wager={25}
                                onClick={() => handleQuestClick("Finish 30 calculus problems")}
                            />
                            <QuestCard
                                title="Read 'The Great Gatsby' Ch. 4"
                                reward="60 XP"
                                expires="1 day left"
                                progress={30}
                                color="bg-brand-blue"
                                difficulty="Medium"
                                onClick={() => handleQuestClick("Read 'The Great Gatsby' Ch. 4")}
                            />
                        </div>
                    </section>

                    {/* Brainrot Feed Preview */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Play className="w-5 h-5 text-brand-neon" />
                                Latest Brainrot Lessons
                            </h2>
                        </div>
                        <Link to="/feed" className="block w-full group">
                            <div className="p-8 rounded-[3rem] bg-black text-white bubbly-shadow overflow-hidden relative group-hover:scale-[1.01] transition-transform">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 opacity-50" />
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black mb-2">Dive into the Feed 🚀</h3>
                                        <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Quick lessons from Top Scholars</p>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-brand-neon flex items-center justify-center text-black bubbly-shadow group-hover:rotate-12 transition-transform">
                                        <ArrowRight className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">
                    {/* Friend Challenges */}
                    <section className="p-6 rounded-3xl bg-brand-pink/5 border-2 border-brand-pink/20">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-brand-pink" />
                            Friend Challenges
                        </h2>
                        <div className="space-y-4">
                            <ChallengeItem name="Alex P." task="15 Spanish vocab" reward="50 XP" />
                            <ChallengeItem name="Sarah K." task="History Quiz" reward="80 XP" />
                        </div>
                    </section>

                    {/* Leaderboard Fast Look */}
                    <section className="p-6 rounded-3xl bg-white border border-border bubbly-shadow">
                        <h2 className="text-lg font-bold mb-4">Top Scholars</h2>
                        <div className="space-y-3">
                            <LeaderboardItem rank={1} name="Mike R." xp="12,400" />
                            <LeaderboardItem rank={2} name="Jenny L." xp="11,200" />
                            <LeaderboardItem rank={3} name="Chris T." xp="9,800" />
                        </div>
                    </section>
                </div>
            </main>

            {/* Navigation Bar (Mobile Friendly) */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/80 backdrop-blur-xl border border-border p-3 rounded-full flex items-center justify-around bubbly-shadow z-50">
                <NavLink to="/dashboard" icon={<Users />} active />
                <NavLink to="/feed" icon={<Play />} />
                <NavLink to="/create-quest" icon={<Swords />} />
                <NavLink to="/inventory" icon={<Star />} />
            </nav>
        </div>
    );
};

const StatPill = ({ icon, value, label }: { icon: any, value: string, label: string }) => (
    <div className="flex flex-col items-center bg-muted/50 px-4 py-2 rounded-2xl border border-border min-w-[80px]">
        <div className="flex items-center gap-1">
            {icon}
            <span className="font-bold text-lg">{value}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{label}</span>
    </div>
);

const QuestCard = ({ title, reward, expires, progress, color, difficulty, wager, onClick }: any) => (
    <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className="p-5 rounded-3xl bg-white border border-border bubbly-shadow cursor-pointer"
    >
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{title}</h3>
                    {difficulty && (
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${difficulty === 'Extreme' ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                            {difficulty}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {expires}
                </p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-xs">
                    {reward}
                </div>
                {wager && (
                    <div className="flex items-center gap-1 text-xs font-black text-brand-neon italic">
                        <Zap className="w-3 h-3 fill-brand-neon" /> {wager} Stake
                    </div>
                )}
            </div>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${progress}%` }} />
        </div>
    </motion.div>
);

const VideoPreview = ({ title, author }: any) => (
    <div className="aspect-[9/16] rounded-2xl bg-muted relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
            <p className="text-white font-bold text-sm leading-tight mb-1">{title}</p>
            <p className="text-white/70 text-[10px]">{author}</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
            </div>
        </div>
    </div>
);

const ChallengeItem = ({ name, task, reward }: any) => (
    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-brand-pink/10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-pink/20" />
            <div className="text-left">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-[10px] text-muted-foreground">{task}</p>
            </div>
        </div>
        <Link to="/accept-quest" className="px-3 py-1.5 rounded-xl bg-brand-pink text-white font-bold text-[10px] bubbly-button">Accept</Link>
    </div>
);

const LeaderboardItem = ({ rank, name, xp }: any) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${rank === 1 ? 'bg-yellow-400 text-white' : 'bg-muted text-muted-foreground'}`}>{rank}</span>
            <span className="text-sm font-bold">{name}</span>
        </div>
        <span className="text-sm font-bold text-brand-purple">{xp} XP</span>
    </div>
);

const NavLink = ({ to, icon, active = false }: { to: string, icon: any, active?: boolean }) => (
    <Link to={to} className={`p-3 rounded-2xl transition-all ${active ? 'bg-brand-purple text-white bubbly-shadow' : 'text-muted-foreground hover:bg-muted'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: active ? 3 : 2 })}
    </Link>
);

export default Dashboard;
