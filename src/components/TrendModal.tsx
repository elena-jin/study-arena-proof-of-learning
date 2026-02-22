import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Target, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TRENDS = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 68 },
    { day: "Thu", score: 85 },
    { day: "Fri", score: 82 },
    { day: "Sat", score: 95 },
    { day: "Sun", score: 88 },
];

interface TrendModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const TrendModal = ({ isOpen, onClose, title }: TrendModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-full max-w-xl bg-white rounded-[3rem] border border-border bubbly-shadow overflow-hidden relative"
                    >
                        <header className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black leading-tight">{title}</h2>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Past Behavior Trends</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full hover:bg-muted transition-colors bubbly-button"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </header>

                        <div className="px-8 pb-8 space-y-6">
                            <div className="h-[250px] w-full bg-muted/20 rounded-[2rem] p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={MOCK_TRENDS}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fontWeight: 'bold' }}
                                            dy={10}
                                        />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '1.5rem',
                                                border: 'none',
                                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                                fontWeight: 'bold'
                                            }}
                                            itemStyle={{ color: '#8B5CF6' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#8B5CF6"
                                            strokeWidth={4}
                                            dot={{ fill: '#8B5CF6', r: 6, strokeWidth: 2, stroke: '#fff' }}
                                            activeDot={{ r: 8, strokeWidth: 0 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <TrendStat icon={<Target className="text-brand-pink" />} label="Consistency" value="85%" />
                                <TrendStat icon={<Zap className="text-brand-neon" />} label="Avg. Score" value="78" />
                            </div>

                            <p className="text-center text-sm font-bold text-muted-foreground italic px-8">
                                "Your performance data suggests you study best on Saturday afternoons!"
                            </p>

                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-2xl bg-brand-purple text-white font-black text-lg bubbly-button"
                            >
                                Start Quest Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const TrendStat = ({ icon, label, value }: any) => (
    <div className="p-4 rounded-3xl bg-muted/30 border border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center bubbly-shadow">
            {React.cloneElement(icon, { size: 20, strokeWidth: 3 })}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">{label}</p>
            <p className="text-xl font-black leading-none">{value}</p>
        </div>
    </div>
);

export default TrendModal;
