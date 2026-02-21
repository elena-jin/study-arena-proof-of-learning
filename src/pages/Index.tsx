import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PredictionCard } from "@/components/PredictionCard";
import { LearningFeed } from "@/components/LearningFeed";
import { StreakDisplay } from "@/components/StreakDisplay";
import { Leaderboard } from "@/components/Leaderboard";
import { QuizModal } from "@/components/QuizModal";
import { predictions } from "@/data/mockData";
import { Plus, Brain } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("markets");
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "markets" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                  Prediction Markets
                </h1>
                <button className="px-4 py-2 rounded-xl gradient-neon text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
                  <Plus className="w-4 h-4" />
                  New Prediction
                </button>
              </div>
              {predictions.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <PredictionCard prediction={p} />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <StreakDisplay />
              <button
                onClick={() => setQuizOpen(true)}
                className="w-full glass rounded-xl p-4 neon-border flex items-center gap-3 hover:bg-secondary/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:animate-pulse-glow">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Take a Quiz</p>
                  <p className="text-xs text-muted-foreground">
                    Verify your learning & earn points
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === "feed" && (
          <div className="max-w-2xl mx-auto">
            <LearningFeed />
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="max-w-2xl mx-auto">
            <Leaderboard />
          </div>
        )}
      </main>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default Index;
