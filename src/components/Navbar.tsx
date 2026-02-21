import { Flame, Zap } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: "markets", label: "Markets" },
  { key: "feed", label: "Feed" },
  { key: "leaderboard", label: "Ranks" },
];

export const Navbar = ({ activeTab, onTabChange }: NavbarProps) => (
  <header className="sticky top-0 z-40 glass border-b border-border/50">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-neon flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground tracking-tight">
          Study Arena
        </span>
      </div>

      <nav className="flex gap-1 bg-secondary/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-neon-orange text-sm font-mono">
          <Flame className="w-4 h-4 animate-streak-flame" />
          14
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-primary">
          YU
        </div>
      </div>
    </div>
  </header>
);
