import { useState } from "react";
import { Timer, TrendingUp, Users, Zap } from "lucide-react";
import { Prediction } from "@/data/mockData";

const MiniChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(185 100% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill="url(#chartGrad)"
      />
      <polyline
        points={points}
        fill="none"
        stroke="hsl(185 100% 50%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const getTimeLeft = (deadline: string) => {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hrs}h ${mins}m`;
};

export const PredictionCard = ({ prediction }: { prediction: Prediction }) => {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);

  return (
    <div className="glass rounded-xl p-5 animate-slide-up hover:neon-border transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-primary">
            {prediction.avatar}
          </div>
          <div>
            <p className="font-semibold text-foreground">{prediction.author}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {prediction.topic}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-neon-orange text-sm font-mono">
          <Zap className="w-4 h-4" />
          {prediction.stake} pts
        </div>
      </div>

      <p className="text-foreground font-medium mb-4 text-lg leading-snug">
        "{prediction.goal}"
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono text-glow-cyan">
              {prediction.probability}%
            </div>
            <div className="text-xs text-muted-foreground">probability</div>
          </div>
          <MiniChart data={prediction.probHistory} />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Timer className="w-4 h-4" />
          {getTimeLeft(prediction.deadline)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{prediction.yesVotes + prediction.noVotes} votes</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setVoted("yes")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              voted === "yes"
                ? "bg-neon-green/20 text-neon-green glow-green"
                : "bg-secondary text-muted-foreground hover:bg-neon-green/10 hover:text-neon-green"
            }`}
          >
            YES {prediction.yesVotes + (voted === "yes" ? 1 : 0)}
          </button>
          <button
            onClick={() => setVoted("no")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              voted === "no"
                ? "bg-destructive/20 text-destructive"
                : "bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            }`}
          >
            NO {prediction.noVotes + (voted === "no" ? 1 : 0)}
          </button>
        </div>
      </div>

      <div className="mt-3 w-full h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full gradient-success transition-all duration-500"
          style={{ width: `${prediction.probability}%` }}
        />
      </div>
    </div>
  );
};
