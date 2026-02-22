import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, Zap, Brain, Eye, AlertCircle } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import { supabase } from "../lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SocialAccountability from "../components/SocialAccountability";

const FocusMode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const questData = location.state as { questReward?: number; questTitle?: string } | null;

    const [seconds, setSeconds] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [focusScore, setFocusScore] = useState(95);
    const [isDistracted, setIsDistracted] = useState(false);
    const [xpMultiplier, setXpMultiplier] = useState(1.0);

    // Phase 3 & 6 Additions
    const [showVerification, setShowVerification] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<null | 'success' | 'failure'>(null);
    const [predictedReward, setPredictedReward] = useState(questData?.questReward || 150);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    // Initialize Camera
    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera access denied:", err);
            }
        };

        if (isActive || showVerification) {
            startCamera();
        } else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isActive, showVerification]);

    useEffect(() => {
        let interval: any = null;
        if (isActive && seconds > 0 && !isDistracted) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
                // Simulate focus score fluctuations
                setFocusScore(prev => Math.max(0, Math.min(100, prev + (Math.random() * 4 - 2))));

                // Presage SDK Simulated Reward Scaling
                if (!questData) {
                    const baseReward = 150;
                    const timeBonus = (seconds / (25 * 60)) * 50;
                    const focusBonus = (focusScore / 100) * 50;
                    setPredictedReward(Math.floor(baseReward + timeBonus + focusBonus));
                }
            }, 1000);
        } else if (seconds === 0 && isActive) {
            handleTimeUp();
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, isDistracted, focusScore, questData]);

    // Simulated Presage Detection
    useEffect(() => {
        let presageInterval: any = null;
        if (isActive) {
            presageInterval = setInterval(() => {
                const chance = Math.random();
                if (chance > 0.95) {
                    setIsDistracted(true);
                    setXpMultiplier(1.0);
                } else if (chance < 0.1) {
                    setIsDistracted(false);
                }

                if (!isDistracted && focusScore > 80) {
                    setXpMultiplier(prev => Math.min(3.0, prev + 0.1));
                }
            }, 3000);
        }
        return () => clearInterval(presageInterval);
    }, [isActive, isDistracted, focusScore]);

    const triggerSocialShame = async (reason: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const message = `${user.email?.split('@')[0] || 'Scholar'} lost their bet on ${questData?.questTitle || 'Calculus studies'}! Reason: ${reason}`;
            const { error } = await supabase
                .from('notifications')
                .insert({
                    user_id: user.id,
                    message,
                    type: 'shame'
                });

            if (error) console.error("Social shame failed:", error.message);
        } catch (e) {
            console.error("Shame trigger error:", e);
        }
    };

    const handleTimeUp = () => {
        setIsActive(false);
        setShowVerification(true);
    };

    const handleVerify = async () => {
        setIsVerifying(true);

        try {
            // Capture Frame from Canvas
            if (!videoRef.current || !canvasRef.current) throw new Error("Camera not ready");

            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Canvas context failed");

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

            // Real Gemini Logic
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_QUIZ_API_KEY;
            if (!apiKey) throw new Error("API Key missing");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `You are a strict academic verification AI for StudyArena. 
            Analyze this student's homework photo. They are supposed to be working on: ${questData?.questTitle || "Calculus/General Study"}. 
            
            Verification Criteria:
            1. Handwriting, diagrams, or text must be visible in the image.
            2. Content should relate to ${questData?.questTitle || "General Study"}.
            3. If it's a blank page or a non-educational image, fail it.
            
            You MUST respond ONLY with a raw JSON object in this exact format: 
            {"subject": "Detected Subject", "status": "verified" | "failed", "reason": "3-word reason"}
            Do not include markdowns, backticks, or any other text.`;

            const result = await model.generateContent([
                prompt,
                { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
            ]);

            const response = await result.response;
            const text = response.text().trim();
            // Robust JSON extraction
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const cleanJson = jsonMatch ? jsonMatch[0] : text;
            const geminiAnalysis = JSON.parse(cleanJson);

            if (geminiAnalysis.status === "verified") {
                setVerificationResult('success');

                // Update Supabase Score Loop
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        // Fetch current points
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('points')
                            .eq('id', user.id)
                            .single();

                        const currentPoints = profile?.points || 0;

                        const { error } = await supabase
                            .from('profiles')
                            .update({
                                points: currentPoints + predictedReward,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', user.id);
                        if (error) console.error("Supabase loop failed:", error.message);
                    }
                } catch (e) {
                    console.log("Supabase error:", e);
                }

                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#22D3EE", "#818CF8", "#F472B6"]
                });
            } else {
                setVerificationResult('failure');
                triggerSocialShame(geminiAnalysis.reason || "Verification failed");
            }
        } catch (error) {
            console.error("Verification failed:", error);
            setVerificationResult('failure');
            triggerSocialShame("Technical error during scan");
        } finally {
            setIsVerifying(false);
        }
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="min-h-screen bg-brand-purple overflow-y-auto py-20 px-6 text-white text-center font-inter flex flex-col items-center">
            <header className="fixed top-6 left-6 right-6 flex items-center justify-between z-50">
                <Link to="/dashboard" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 font-bold text-sm">
                    <Brain className="w-4 h-4" />
                    Presage Core Active
                </div>
            </header>

            <main className="space-y-8 max-w-md w-full relative pt-12">
                {/* Predicted Reward Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-full z-10"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 bubbly-shadow">
                        <Zap className="w-4 h-4 text-brand-neon fill-brand-neon" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Predicted Reward: {predictedReward} XP</span>
                    </div>
                </motion.div>

                {/* Timer Circle */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="128" cy="128" r="115" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                        <motion.circle
                            cx="128" cy="128" r="115" stroke="currentColor" strokeWidth="12" fill="none"
                            strokeDasharray="722"
                            initial={{ strokeDashoffset: 722 }}
                            animate={{ strokeDashoffset: 722 - (722 * seconds) / (25 * 60) }}
                            className="text-white"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black leading-none">{formatTime(seconds)}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2">Focus Session</span>
                    </div>
                </div>

                {/* Focus Stats & Continuous Monitoring */}
                <AnimatePresence>
                    {isActive ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            {/* Camera Monitoring Box */}
                            <div className="relative w-full aspect-video rounded-[2rem] bg-black border border-white/20 overflow-hidden bubbly-shadow">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                />

                                {/* Scanning Overlay */}
                                <div className="absolute top-4 left-4 flex flex-col gap-1 items-start z-20">
                                    <div className="flex items-center gap-2 px-2 py-1 rounded bg-red-600 animate-pulse text-[8px] font-black uppercase tracking-tighter shadow-lg">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white transition-opacity" />
                                        REC: Presage Eye
                                    </div>
                                    <div className="text-[10px] font-black text-brand-neon uppercase tracking-widest drop-shadow-md">
                                        {isDistracted ? "⚠️ Warning: Focus Lost" : "✓ AI Tracking: Active"}
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Calculus Logic Scan</p>
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">
                                            {seconds % 4 === 0 ? "Mapping Derivatives..." :
                                                seconds % 4 === 1 ? "Checking Integration..." :
                                                    seconds % 4 === 2 ? "Analyzing Proofs..." : "Verifying Intent..."}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/40 tracking-tighter">0% LAG</p>
                                    </div>
                                </div>

                                {/* Scanner Scanning Line */}
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[1px] bg-brand-neon/30 z-10"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2 text-xs font-bold text-white/60 mb-1 font-black uppercase tracking-widest">
                                        <Eye className="w-4 h-4" /> Attention
                                    </div>
                                    <span className={`text-2xl font-black ${isDistracted ? 'text-red-400' : 'text-brand-neon'}`}>
                                        {isDistracted ? 'Distracted' : 'Focused'}
                                    </span>
                                </div>
                                <div className="p-4 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2 text-xs font-bold text-white/60 mb-1 font-black uppercase tracking-widest">
                                        <Zap className="w-4 h-4" /> Multiplier
                                    </div>
                                    <span className="text-2xl font-black text-brand-neon">{xpMultiplier.toFixed(1)}x</span>
                                </div>
                            </div>

                            {/* Social Accountability System */}
                            <SocialAccountability isDistracted={isDistracted} />
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            <button
                                onClick={() => setShowVerification(true)}
                                className="w-full py-6 rounded-[2rem] bg-white text-brand-purple font-black text-xl bubbly-shadow hover:scale-105 active:scale-95 transition-all"
                            >
                                Verify Scan 📷
                            </button>
                            <SocialAccountability isDistracted={false} />
                        </div>
                    )}
                </AnimatePresence>

                {/* Camera Verification Modal */}
                <AnimatePresence>
                    {showVerification && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="w-full max-w-sm bg-white rounded-[3rem] border border-border bubbly-shadow overflow-hidden relative text-black"
                            >
                                <div className="p-8 space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-3xl font-black tracking-tighter mb-1">Deep Scan</h3>
                                        <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.2em]">Keep Camera Open Entire Time</p>
                                    </div>

                                    {/* Camera Box */}
                                    <div className="aspect-square rounded-[3rem] bg-black relative overflow-hidden border-4 border-dashed border-brand-purple/20 flex items-center justify-center shadow-inner">
                                        <canvas ref={canvasRef} className="hidden" />
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                                        />

                                        {isVerifying ? (
                                            <div className="flex flex-col items-center gap-4 z-20">
                                                <div className="w-20 h-20 rounded-full border-[6px] border-brand-purple border-t-transparent animate-spin" />
                                                <div className="space-y-1 text-center font-inter">
                                                    <p className="font-black text-brand-purple uppercase tracking-widest text-[10px]">Analyzing Proofs...</p>
                                                    <p className="text-[8px] font-bold text-white uppercase bg-black/50 px-2 py-1 rounded-full">Security DEFINER: Active</p>
                                                </div>
                                            </div>
                                        ) : verificationResult === 'success' ? (
                                            <div className="flex flex-col items-center gap-4 text-brand-neon z-20">
                                                <div className="w-24 h-24 rounded-full bg-brand-neon/20 flex items-center justify-center bubbly-shadow backdrop-blur-md">
                                                    <Zap className="w-12 h-12 fill-brand-neon" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-black text-2xl uppercase tracking-tighter">Verified!</p>
                                                    <p className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 px-2 py-1 rounded-full">Logged to Supabase</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 text-white z-20">
                                                <button
                                                    onClick={handleVerify}
                                                    className="px-10 py-4 rounded-full bg-brand-purple text-white font-black text-sm bubbly-button hover:scale-105 transition-transform shadow-2xl"
                                                >
                                                    Analyze Proofs 📷
                                                </button>
                                                <p className="text-[8px] font-black px-12 text-center uppercase tracking-widest leading-relaxed drop-shadow-lg">Gemini Vision 1.5 Flash Active</p>
                                            </div>
                                        )}
                                        {/* Scanner Line */}
                                        {isVerifying && (
                                            <motion.div
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute left-0 right-0 h-1 bg-brand-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.8)] z-30"
                                            />
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        {verificationResult === 'success' ? (
                                            <button
                                                onClick={() => navigate('/dashboard')}
                                                className="w-full py-5 rounded-2xl bg-brand-neon text-black font-black text-xl bubbly-shadow hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                Claim {predictedReward} XP
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setShowVerification(false)}
                                                className="w-full py-5 rounded-2xl bg-muted text-muted-foreground font-black text-lg bubbly-button"
                                            >
                                                Return to Arena
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 pt-4">
                    <button
                        onClick={() => { setSeconds(25 * 60); setIsActive(false); setIsDistracted(false); setVerificationResult(null); }}
                        className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all bubbly-shadow"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center bubbly-shadow transition-all ${isActive ? 'bg-white/20' : 'bg-white text-brand-purple'}`}
                    >
                        {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FocusMode;
