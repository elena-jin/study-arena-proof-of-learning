import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Calendar, Target, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const STUDY_DATA = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 4 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 2 },
    { day: 'Sat', hours: 6 },
    { day: 'Sun', hours: 4 },
];

const DIFFICULTY_DATA = [
    { name: 'Easy', value: 30, color: '#4ADE80' },
    { name: 'Medium', value: 45, color: '#3B82F6' },
    { name: 'Hard', value: 20, color: '#FB923C' },
    { name: 'Extreme', value: 5, color: '#A855F7' },
];

const Analytics = () => {
    return (
        <div className="min-h-screen bg-background pb-12 text-foreground">
            <header className="p-6 bg-white border-b border-border sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-2xl font-black">Analytics</h1>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer px-4 py-2 rounded-full bg-brand-neon text-black font-black text-xs bubbly-shadow">
                        <Calendar className="w-4 h-4" />
                        This Week
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pt-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickStat icon={<Clock className="text-brand-blue" />} label="Avg Study" value="3.5h" />
                    <QuickStat icon={<Target className="text-brand-purple" />} label="Success Rate" value="88%" />
                    <QuickStat icon={<TrendingUp className="text-brand-neon" />} label="XP Growth" value="+24%" />
                    <QuickStat icon={<Zap className="text-brand-pink" />} label="Active Streaks" value="12" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Study Time Chart */}
                    <section className="p-8 rounded-[3rem] bg-white border border-border bubbly-shadow h-[400px]">
                        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-brand-blue" />
                            Hours Studied
                        </h3>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={STUDY_DATA}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Difficulty Distribution */}
                    <section className="p-8 rounded-[3rem] bg-white border border-border bubbly-shadow h-[400px]">
                        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-brand-purple" />
                            Difficulty Mix
                        </h3>
                        <div className="flex h-[280px] items-center">
                            <div className="flex-1 h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={DIFFICULTY_DATA}
                                            cx="50%" cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {DIFFICULTY_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-col gap-3 pr-4">
                                {DIFFICULTY_DATA.map(d => (
                                    <div key={d.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                                        <span className="text-[10px] font-black uppercase text-muted-foreground">{d.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Weekly Narrative */}
                <section className="p-8 rounded-[3rem] bg-brand-neon/10 border-2 border-brand-neon text-center relative overflow-hidden">
                    <h4 className="text-xl font-black mb-2">Scholar's Verdict 🧠</h4>
                    <p className="font-bold text-muted-foreground">You study most on weekends! Your "Extreme" quest rate is at 5%. Try pushing your limits this Saturday for a Reputation boost.</p>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-neon/20 rounded-full blur-2xl" />
                </section>
            </main>
        </div>
    );
};

const QuickStat = ({ icon, label, value }: any) => (
    <div className="p-6 rounded-[2rem] bg-white border border-border bubbly-shadow flex flex-col items-center gap-1 group">
        <div className="mb-2 p-3 rounded-2xl bg-muted/50 group-hover:bg-muted group-hover:scale-110 transition-all">
            {React.cloneElement(icon, { size: 24, strokeWidth: 3 })}
        </div>
        <span className="text-2xl font-black">{value}</span>
        <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{label}</span>
    </div>
);

export default Analytics;
