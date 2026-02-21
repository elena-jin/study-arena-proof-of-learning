import { Heart, Swords, BookOpen, Brain, HelpCircle, TrendingUp } from "lucide-react";
import { feedItems, FeedItem } from "@/data/mockData";

const typeConfig: Record<FeedItem["type"], { icon: typeof Heart; label: string; color: string }> = {
  concept: { icon: BookOpen, label: "Concept", color: "text-primary" },
  flashcard: { icon: Brain, label: "Flashcard", color: "text-neon-purple" },
  "mini-quiz": { icon: HelpCircle, label: "Quiz", color: "text-neon-orange" },
  trending: { icon: TrendingUp, label: "Trending", color: "text-neon-pink" },
};

const FeedCard = ({ item }: { item: FeedItem }) => {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div className="glass rounded-xl p-5 animate-slide-up">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>
          {config.label}
        </span>
        <span className="text-xs text-muted-foreground ml-auto">{item.topic}</span>
      </div>

      <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.content}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-neon-pink transition-colors">
            <Heart className="w-4 h-4" />
            {item.likes}
          </button>
          <span className="text-sm text-muted-foreground">
            {item.challenges} challenged
          </span>
        </div>
        <button className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center gap-1.5">
          <Swords className="w-4 h-4" />
          Challenge Me
        </button>
      </div>
    </div>
  );
};

export const LearningFeed = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <TrendingUp className="w-5 h-5 text-neon-pink" />
      <h2 className="text-xl font-bold text-foreground">Brainrot Feed</h2>
    </div>
    {feedItems.map((item, i) => (
      <div key={item.id} style={{ animationDelay: `${i * 0.1}s` }}>
        <FeedCard item={item} />
      </div>
    ))}
  </div>
);
