import React from "react";
import { motion } from "framer-motion";
import { Globe, Shield, Zap, ArrowRight, Github } from "lucide-react";
import { supabase } from "../lib/supabase";

const Auth = () => {
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            }
        });
        if (error) console.error("Error logging in:", error.message);
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] text-black flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Gen-Z Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            <main className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[3rem] bubbly-shadow space-y-10"
                >
                    <div className="text-center space-y-6">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                            className="w-24 h-24 rounded-[2.5rem] bg-black mx-auto flex items-center justify-center text-brand-neon bubbly-shadow cursor-pointer"
                        >
                            <Zap className="w-12 h-12 fill-current" />
                        </motion.div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter leading-none mb-2">Study<span className="text-brand-purple">Arena</span></h1>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">The Social Learning Loop</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full group relative flex items-center justify-center gap-4 py-6 px-8 rounded-[2rem] bg-black text-white font-black text-xl bubbly-shadow hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 rounded-full" />
                            Sign in with Google
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">or vibes</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <button
                            disabled
                            className="w-full flex items-center justify-center gap-4 py-5 px-6 rounded-[2rem] border-2 border-dashed border-border text-muted-foreground/50 font-bold text-lg cursor-not-allowed"
                        >
                            <Github className="w-6 h-6" />
                            GitHub Login (Soon)
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-brand-purple/5 border border-brand-purple/10">
                            <Shield className="w-6 h-6 text-brand-purple" strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Safe Scores</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-brand-neon/5 border border-brand-neon/10">
                            <Globe className="w-6 h-6 text-brand-neon" strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Global Ranks</span>
                        </div>
                    </div>

                    <p className="text-center text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-8 leading-relaxed">
                        By entering the arena, you agree to skip the brainrot and start the grind.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default Auth;
