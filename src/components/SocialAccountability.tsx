import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, AlertTriangle, MessageSquare, Skull, TrendingDown } from "lucide-react";
import { supabase } from "../lib/supabase";

interface SocialAccountabilityProps {
    isDistracted: boolean;
    userName?: string;
}

interface Notification {
    id: string;
    message: string;
    created_at: string;
}

const SocialAccountability: React.FC<SocialAccountabilityProps> = ({ isDistracted, userName = "Scholar" }) => {
    const [recentShames, setRecentShames] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchShames = async () => {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            if (data) setRecentShames(data);
        };

        fetchShames();

        // Subscribe to new shame
        const channel = supabase
            .channel('public:notifications')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
                setRecentShames(prev => [payload.new as Notification, ...prev.slice(0, 2)]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-4 w-full">
            {/* Stakes Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] bubbly-shadow">
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-brand-pink/20">
                        <AlertTriangle className="w-4 h-4 text-brand-pink" />
                    </div>
                    <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-white/60">Active Stakes</h4>
                </div>
                <p className="text-[10px] font-bold text-white mb-2 uppercase tracking-widest">Fail = Notify Friends</p>
                <div className="flex -space-x-2">
                    {['Alex P.', 'Sarah K.', 'Leo M.'].map((name, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-brand-purple bg-brand-purple flex items-center justify-center text-[10px] font-black bubbly-shadow">
                            {name[0]}
                        </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-brand-purple bg-white/10 flex items-center justify-center text-[10px] font-black backdrop-blur-md">
                        +2
                    </div>
                </div>
            </div>

            {/* Wall of Shame Preview */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] bubbly-shadow overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Skull className="w-4 h-4 text-red-400" />
                        <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-white/60">Wall of Shame</h4>
                    </div>
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Live</span>
                </div>

                <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                        {recentShames.length > 0 ? (
                            recentShames.map((shame) => (
                                <motion.div
                                    key={shame.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex items-start gap-2"
                                >
                                    <TrendingDown className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-[9px] font-bold text-white/80 leading-tight">
                                        {shame.message}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-[9px] font-bold text-white/30 text-center py-2 italic uppercase tracking-widest">Quiet in the Arena...</p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Distraction Alert Overlay */}
            <AnimatePresence>
                {isDistracted && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-32 left-6 right-6 z-[200]"
                    >
                        <div className="bg-brand-pink p-4 rounded-2xl border-2 border-white bubbly-shadow flex items-center gap-4 animate-bounce">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                                <MessageSquare className="w-6 h-6 text-brand-pink" />
                            </div>
                            <div>
                                <h5 className="font-black text-white text-sm uppercase">Friend Alert!</h5>
                                <p className="text-[10px] font-bold text-white/90">Alex P. sent: "GET BACK TO WORK OR I'M POSTING THE RECEIPTS!"</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SocialAccountability;
