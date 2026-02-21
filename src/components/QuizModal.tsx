import { useState } from "react";
import { X, CheckCircle2, XCircle, Brain, Sparkles } from "lucide-react";
import { quizQuestions } from "@/data/mockData";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const question = quizQuestions[current];
  const isLast = current === quizQuestions.length - 1;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.correct;
    setTimeout(() => {
      const newAnswers = [...answers, correct];
      setAnswers(newAnswers);
      if (isLast) {
        setShowResult(true);
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 1000);
  };

  const score = answers.filter(Boolean).length;
  const passed = score >= Math.ceil(quizQuestions.length * 0.7);

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl p-6 max-w-lg w-full neon-border animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Proof-of-Learning Quiz</h3>
        </div>

        {!showResult ? (
          <>
            <div className="flex gap-1.5 mb-6">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    i < current
                      ? "gradient-success"
                      : i === current
                      ? "bg-primary animate-pulse-glow"
                      : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              Question {current + 1} of {quizQuestions.length}
            </p>
            <h4 className="text-foreground font-semibold text-lg mb-6">{question.question}</h4>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                let cls = "bg-secondary/50 text-foreground hover:bg-secondary";
                if (selected !== null) {
                  if (i === question.correct) cls = "bg-neon-green/20 text-neon-green glow-green";
                  else if (i === selected) cls = "bg-destructive/20 text-destructive";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl font-medium transition-all ${cls}`}
                  >
                    <span className="font-mono text-sm mr-3 text-muted-foreground">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                    {selected !== null && i === question.correct && (
                      <CheckCircle2 className="w-5 h-5 inline ml-2" />
                    )}
                    {selected !== null && i === selected && i !== question.correct && (
                      <XCircle className="w-5 h-5 inline ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className={`text-6xl font-bold font-mono mb-2 ${passed ? "text-neon-green text-glow-green" : "text-destructive"}`}>
              {score}/{quizQuestions.length}
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">
              {passed ? "🎉 Mastery Verified!" : "📚 Keep Studying!"}
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              {passed
                ? "Prediction resolved as TRUE. You earned bonus points!"
                : "You didn't reach the mastery threshold. Try again!"}
            </p>
            {passed && (
              <div className="flex items-center justify-center gap-2 text-neon-green mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">+75 points earned</span>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={reset}
                className="px-6 py-2 rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all"
              >
                Retry
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl gradient-neon text-primary-foreground font-semibold hover:opacity-90 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
