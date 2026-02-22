import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, ArrowLeft, User, Bookmark, Brain, Volume2, VolumeX, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AIQuiz from "../components/AIQuiz";

const VIDEO_DATA = [
    {
        id: 1,
        title: "How can we get to moon?",
        videoUrl: "/videos/ballerina.mp4",
        author: "SpaceX Explorer",
        likes: "102K",
        comments: "5.1K",
        topic: "Physics",
        emoji: "🚀",
        difficulty: "Hard"
    },
    {
        id: 2,
        title: "Understand Cancer Cells",
        videoUrl: "/videos/cancer.mp4",
        author: "BioWhiz",
        likes: "45K",
        comments: "2.1K",
        topic: "Biology",
        emoji: "🧬",
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "The Life of Cleopatra",
        videoUrl: "/videos/cleopatra.mp4",
        author: "HistoryBuff",
        likes: "89K",
        comments: "3.4K",
        topic: "History",
        emoji: "👑",
        difficulty: "Medium"
    }
];

const VideoFeed = () => {
    const [index, setIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const nextVideo = () => {
        setLiked(false);
        setSaved(false);
        setShowQuiz(false);
        setIndex((prev) => (prev + 1) % VIDEO_DATA.length);
    };

    const current = VIDEO_DATA[index];

    return (
        <div className="h-screen w-full bg-black text-white relative flex items-center justify-center overflow-hidden font-inter">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
                <Link to="/dashboard" className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex gap-4 font-bold text-lg">
                    <button className="text-white border-b-2 border-white pb-1">For You</button>
                    <button className="text-white/60">Following</button>
                </div>
                <Link to="/profile" className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center border-2 border-white overflow-hidden">
                    <User className="w-6 h-6" />
                </Link>
            </div>

            {/* Video Content */}
            <AnimatePresence mode="wait">
                {!showQuiz ? (
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full w-full max-w-lg relative bg-black flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => !showQuiz && nextVideo()}
                    >
                        {/* Actual Video Element */}
                        <video
                            id={`video-${current.id}`}
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            key={current.videoUrl + (isMuted ? '-muted' : '-unmuted')}
                        >
                            <source src={current.videoUrl} type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Volume Overlay Hint */}
                        {isMuted && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20"
                                >
                                    <VolumeX className="w-8 h-8 text-white/50" />
                                </motion.div>
                            </div>
                        )}

                        {/* Engagement Tags */}
                        <div className="absolute bottom-12 left-6 right-16 z-10">
                            <div className="flex gap-2 mb-4">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-neon">
                                    <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                                    Learning Now
                                </div>
                                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/10">
                                    {current.difficulty}
                                </div>
                            </div>
                            <h2 className="text-4xl font-black mb-1 leading-tight drop-shadow-xl">{current.title}</h2>
                            <p className="text-lg text-white/80 font-bold drop-shadow-lg">@{current.author} • {current.topic}</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="z-[100] w-full max-w-md px-4"
                    >
                        <AIQuiz topic={current.title} onComplete={() => setShowQuiz(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Right Interaction Bar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-50">
                <ActionButton
                    icon={isMuted ? <VolumeX className="text-brand-neon" /> : <Volume2 className="text-brand-neon" />}
                    label={isMuted ? "Muted" : "On"}
                    onClick={(e: any) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                />
                <ActionButton
                    icon={<Heart className={liked ? "fill-brand-pink text-brand-pink" : ""} />}
                    label={current.likes}
                    active={liked}
                    onClick={() => setLiked(!liked)}
                />
                <ActionButton icon={<MessageCircle />} label={current.comments} />
                <ActionButton
                    icon={<Bookmark className={saved ? "fill-white text-white" : ""} />}
                    label="Save"
                    active={saved}
                    onClick={() => setSaved(!saved)}
                />

                {/* Quick Quiz Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowQuiz(true)}
                    className="w-14 h-14 rounded-2xl bg-brand-neon flex flex-col items-center justify-center bubbly-shadow group"
                >
                    <Brain className="w-6 h-6 text-black" />
                    <span className="text-[8px] font-black text-black">QUIZ</span>
                </motion.button>
            </div>
        </div>
    );
};

const ActionButton = ({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: (e: any) => void }) => (
    <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={onClick}>
        <motion.div
            whileTap={{ scale: 0.8 }}
            animate={active ? { scale: [1, 1.2, 1] } : {}}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all border bubbly-shadow ${active ? 'bg-white text-black border-white' : 'bg-white/10 backdrop-blur-md text-white border-white/10 hover:bg-white/20'}`}
        >
            {React.cloneElement(icon, { size: 24, strokeWidth: 3 })}
        </motion.div>
        <span className="text-[10px] font-black text-white/90 uppercase tracking-tighter">{label}</span>
    </div>
);

export default VideoFeed;
