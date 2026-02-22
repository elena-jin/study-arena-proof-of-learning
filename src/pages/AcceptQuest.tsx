import { motion } from "framer-motion";
import { ArrowLeft, Swords, Trophy, Star, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const AcceptQuest = () => {
    const navigate = useNavigate();

    const handleAccept = () => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#F472B6", "#8B5CF6", "#22D3EE"],
        });
        setTimeout(() => navigate("/focus", {
            state: {
                questReward: 120,
                questTitle: "Finish 15 Spanish Vocab Cards"
            }
        }), 1000);
    };

    return (
        <div className="min-h-screen bg-brand-purple/5 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-[3rem] p-8 border-4 border-brand-purple bubbly-shadow relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Swords size={120} className="text-brand-purple" />
                </div>

                <div className="flex flex-col items-center text-center relative z-10">
                    <Link to="/dashboard" className="absolute -top-4 -left-4 p-3 rounded-full bg-white border-2 border-border bubbly-button">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </Link>

                    <div className="w-24 h-24 rounded-full bg-brand-pink border-4 border-white bubbly-shadow flex items-center justify-center text-white font-black text-3xl mb-4">
                        AP
                    </div>

                    <h2 className="text-xl font-black text-brand-pink uppercase tracking-widest mb-2">New Challenge!</h2>
                    <p className="text-muted-foreground font-bold mb-6">Alex P. sent you a quest</p>

                    <div className="w-full p-6 rounded-3xl bg-muted/50 border-2 border-border mb-8">
                        <h3 className="text-2xl font-black mb-2">"Finish 15 Spanish Vocab Cards"</h3>
                        <div className="flex items-center justify-center gap-4">
                            <span className="flex items-center gap-1 text-orange-500 font-bold">
                                <Swords className="w-4 h-4" /> Hard
                            </span>
                            <span className="flex items-center gap-1 text-brand-purple font-black">
                                <Star className="w-4 h-4 fill-brand-purple" /> +120 XP
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-4">
                        <button
                            onClick={handleAccept}
                            className="w-full py-5 rounded-2xl bg-brand-purple text-white font-black text-xl flex items-center justify-center gap-2 bubbly-button hover:bg-brand-purple/90"
                        >
                            Accept Quest
                            <Trophy className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full py-4 rounded-2xl bg-white text-muted-foreground font-bold text-sm hover:bg-muted transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AcceptQuest;
