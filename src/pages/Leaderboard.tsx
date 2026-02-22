import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Star, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Mike R.", xp: "12,400", quests: 45, streak: 32, avatar: "MR", color: "bg-yellow-400" },
    { rank: 2, name: "Jenny L.", xp: "11,200", quests: 42, streak: 15, avatar: "JL", color: "bg-gray-300" },
    { rank: 3, name: "Chris T.", xp: "9,800", quests: 38, streak: 45, avatar: "CT", color: "bg-orange-400" },
    { rank: 4, name: "Aria W.", xp: "8,500", quests: 30, streak: 12, avatar: "AW", color: "bg-brand-purple" },
    { rank: 5, name: "Leo G.", xp: "7,900", quests: 28, streak: 8, avatar: "LG", color: "bg-brand-blue" },
];

const Leaderboard = () => {
    return (
        <div className="min-h-screen bg-background pb-12">
            <header className="p-6 flex items-center gap-4 bg-white border-b border-border mb-8 sticky top-0 z-50">
                <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">Top Scholars</h1>
            </header>

            <main className="max-w-2xl mx-auto px-6 space-y-6">
                {/* Top 3 Podium (Optional/Compact) */}
                <div className="flex justify-center items-end gap-4 mb-10 pt-4">
                    <PodiumItem rank={2} name="Jenny L." xp="11.2k" size="h-32" avatar="JL" color="bg-gray-300" />
                    <PodiumItem rank={1} name="Mike R." xp="12.4k" size="h-44" avatar="MR" color="bg-yellow-400" />
                    <PodiumItem rank={3} name="Chris T." xp="9.8k" size="h-24" avatar="CT" color="bg-orange-400" />
                </div>

                {/* List View */}
                <div className="space-y-4">
                    {LEADERBOARD_DATA.map((player) => (
                        <motion.div
                            key={player.rank}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: player.rank * 0.1 }}
                            className={`p-4 rounded-3xl bg-white border-2 flex items-center justify-between bubbly-shadow ${player.name === 'JD' ? 'border-brand-purple' : 'border-border'}`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-8 font-black text-xl text-muted-foreground">#{player.rank}</span>
                                <div className={`w-12 h-12 rounded-full ${player.color} flex items-center justify-center text-white font-bold bubbly-shadow`}>
                                    {player.avatar}
                                </div>
                                <div>
                                    <p className="font-bold">{player.name}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                                        <Flame className="w-3 h-3 fill-orange-500 text-orange-500" /> {player.streak} day streak
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-brand-purple font-black">{player.xp}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Total XP</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

const PodiumItem = ({ rank, name, xp, size, avatar, color }: any) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 rounded-full ${color} border-4 border-white bubbly-shadow flex items-center justify-center text-white font-bold text-xl relative`}>
            {avatar}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-border flex items-center justify-center">
                {rank === 1 ? <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : <Medal className="w-4 h-4 text-muted-foreground" />}
            </div>
        </div>
        <div className={`w-20 ${size} ${color} rounded-t-3xl flex flex-col items-center justify-center text-white bubbly-shadow`}>
            <span className="font-black text-2xl">#{rank}</span>
            <span className="text-[10px] font-bold uppercase">{xp}</span>
        </div>
        <span className="font-bold text-xs">{name}</span>
    </div>
);

export default Leaderboard;
