import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Box, Sparkles, Zap, ShieldCheck, Gem } from "lucide-react";
import { Link } from "react-router-dom";

const INVENTORY_ITEMS = [
    { id: 1, name: "Neon Fox Skin", type: "Skin", icon: <Box className="text-brand-purple" />, count: 1, rarity: "Legendary" },
    { id: 2, name: "2x XP Booster", type: "Booster", icon: <Zap className="text-yellow-500" />, count: 3, rarity: "Rare" },
    { id: 3, name: "Streak Saver", type: "Item", icon: <ShieldCheck className="text-brand-blue" />, count: 2, rarity: "Epic" },
    { id: 4, name: "Mystery Reward Box", type: "Loot", icon: <Gem className="text-brand-pink" />, count: 5, rarity: "Common" },
];

const Inventory = () => {
    return (
        <div className="min-h-screen bg-background pb-12">
            <header className="p-6 flex items-center gap-4 bg-white border-b border-border mb-8">
                <Link to="/dashboard" className="p-2 rounded-full bg-white border border-border bubbly-shadow cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold">My Rewards</h1>
            </header>

            <main className="max-w-4xl mx-auto px-6">
                {/* Stats Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    <InventoryStat label="Total Items" value="11" icon={<Box />} />
                    <InventoryStat label="Skins Unlocked" value="4" icon={<Sparkles />} />
                    <InventoryStat label="Boosters" value="3" icon={<Zap />} />
                    <InventoryStat label="Gems" value="450" icon={<Gem />} />
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {["All", "Skins", "Boosters", "Items", "Loot"].map((cat, i) => (
                        <button key={cat} className={`px-6 py-2 rounded-full font-bold text-sm bubbly-button whitespace-nowrap ${i === 0 ? 'bg-brand-purple text-white shadow-lg' : 'bg-white border border-border text-muted-foreground'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {INVENTORY_ITEMS.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-[2.5rem] bg-white border-2 border-border bubbly-shadow flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                                {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
                            </div>
                            <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-3">{item.rarity}</p>
                            <div className="px-3 py-1 rounded-full bg-brand-purple text-white font-black text-[10px]">
                                x{item.count}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

const InventoryStat = ({ label, value, icon }: any) => (
    <div className="p-4 rounded-3xl bg-white border border-border bubbly-shadow flex flex-col items-center">
        <div className="text-brand-purple mb-1 opacity-50">{icon}</div>
        <span className="text-xl font-black">{value}</span>
        <span className="text-[10px] uppercase font-bold text-muted-foreground">{label}</span>
    </div>
);

export default Inventory;
