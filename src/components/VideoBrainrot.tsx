import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export const VideoBrainrot = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [videoUrl, setVideoUrl] = useState('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/video-status/latest');
                const data = await response.json();
                if (data.videoUrl) {
                    setVideoUrl(data.videoUrl);
                    setStatus('ready');
                }
            } catch (err) {
                console.error('Failed to fetch video status', err);
                setStatus('error');
            }
        };
        checkStatus();
    }, []);

    return (
        <Card className="overflow-hidden glass neon-border group relative aspect-[9/16] md:aspect-video w-full max-w-sm mx-auto">
            <div className="absolute inset-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Top/Left: "Serious" content placeholder */}
                <div className="flex-1 bg-black/40 flex items-center justify-center p-4 relative">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-display text-primary">Study Proof</h3>
                        <p className="text-xs text-muted-foreground">Quantum Physics 101</p>
                    </div>
                    <div className="absolute top-2 left-2 bg-primary/20 px-2 py-0.5 rounded text-[10px] text-primary animate-pulse">
                        LIVE ANALYST
                    </div>
                </div>

                {/* Bottom/Right: Brainrot content placeholder */}
                <div className="flex-1 bg-black relative overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                        src={videoUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-accent animate-spin-slow" />
                            <span className="text-xs font-semibold text-accent">Veo Brainrot AI</span>
                        </div>
                        <p className="text-[10px] text-white/80 line-clamp-2">
                            "Wait for the drop! Quantum tunneling is literally fire fr fr 💀🔥"
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-primary transition-colors">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button className="text-white hover:text-primary transition-colors">
                        <RotateCcw size={18} />
                    </button>
                </div>
            </div>
        </Card>
    );
};
