import { Crown, Flame, Target, Medal } from "lucide-react";
import { leaderboard } from "@/data/mockData";
import { useState } from "react";

type Tab = "streaks" | "accuracy" | "points";

export const Leaderboard = () => {
  const [tab, setTab] = useState<Tab>("points");

  const sorted = [...leaderboard].sort((a, b) => {
    if (tab === "streaks") return b.streak - a.streak;
    if (tab === "accuracy") return b.accuracy - a.accuracy;
    return b.points - a.points;
  });

  const tabs: { key: Tab; label: string; icon: typeof Flame }[] = [
    { key: "streaks", label: "Streaks", icon: Flame },
    { key: "accuracy", label: "Accuracy", icon: Target },
    { key: "points", label: "Points", icon: Crown },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-neon-orange";
    if (rank === 2) return "text-muted-foreground";
    if (rank === 3) return "text-neon-orange/60";
    return "text-muted-foreground";
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="w-5 h-5 text-neon-orange" />
        <h2 className="text-xl font-bold text-foreground">Leaderboard</h2>
      </div>

      <div className="flex gap-1 mb-4 bg-secondary/50 rounded-lg p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              tab === key
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sorted.map((user, i) => (
          <div
            key={user.name}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              i === 0 ? "bg-neon-orange/5 neon-border" : "hover:bg-secondary/50"
            }`}
          >
            <div className={`w-7 text-center font-bold font-mono ${getRankColor(i + 1)}`}>
              {i === 0 ? <Medal className="w-5 h-5 text-neon-orange mx-auto" /> : `#${i + 1}`}
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-primary">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
            </div>
            <div className="text-right font-mono text-sm">
              {tab === "streaks" && (
                <span className="text-neon-orange flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />{user.streak}
                </span>
              )}
              {tab === "accuracy" && (
                <span className="text-neon-green">{user.accuracy}%</span>
              )}
              {tab === "points" && (
                <span className="text-primary">{user.points.toLocaleString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
