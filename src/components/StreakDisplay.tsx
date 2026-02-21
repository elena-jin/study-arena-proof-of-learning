import { Flame, Trophy, Target, Sparkles } from "lucide-react";

export const StreakDisplay = () => {
  const streak = 14;
  const multiplier = 2.5;
  const todayCompleted = 3;
  const todayGoal = 5;

  return (
    <div className="glass rounded-xl p-6 neon-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Flame className="w-10 h-10 text-neon-orange animate-streak-flame" />
            <Sparkles className="w-4 h-4 text-neon-orange absolute -top-1 -right-1" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground font-mono">
              {streak}
              <span className="text-sm text-muted-foreground font-sans ml-1">days</span>
            </div>
            <p className="text-xs text-muted-foreground">Current Streak</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-neon-orange font-mono">
            ×{multiplier}
          </div>
          <p className="text-xs text-muted-foreground">Multiplier</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Today's Progress</span>
          <span className="text-foreground font-mono">{todayCompleted}/{todayGoal}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full gradient-fire transition-all duration-700"
            style={{ width: `${(todayCompleted / todayGoal) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Target, label: "Quizzes", value: "8", color: "text-primary" },
          { icon: Trophy, label: "Predictions", value: "5", color: "text-neon-green" },
          { icon: Sparkles, label: "Challenges", value: "12", color: "text-neon-purple" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-secondary/50 rounded-lg p-3 text-center">
            <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
            <div className="text-lg font-bold text-foreground font-mono">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
