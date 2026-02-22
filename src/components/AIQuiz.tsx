import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Brain, ArrowRight, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface AIQuizProps {
    topic: string;
    onComplete: (score: number) => void;
}

const AIQuiz = ({ topic, onComplete }: AIQuizProps) => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    // Specialized quiz content based on topic
    const getQuizForTopic = () => {
        if (topic.toLowerCase().includes("moon")) {
            return [
                { text: "What is the primary engine type used for lunar descent?", options: ["Solid Rocket Booster", "Liquid Bi-propellant Engine", "Ion Thruster"], correct: 1 },
                { text: "What is the gravitational acceleration on the Moon relative to Earth?", options: ["1/6th", "1/2", "Same as Earth"], correct: 0 },
                { text: "Which historical mission first put humans on the lunar surface?", options: ["Voyager 1", "Apollo 11", "Mars Pathfinder"], correct: 1 },
            ];
        } else if (topic.toLowerCase().includes("cancer")) {
            return [
                { text: "What process describes the uncontrolled division of abnormal cells?", options: ["Apoptosis", "Mitosis", "Malignancy"], correct: 2 },
                { text: "Which of these is a known tumor suppressor gene?", options: ["TP53", "ATP1A1", "HBB"], correct: 0 },
                { text: "What is the term for cancer spreading to other parts of the body?", options: ["Mutation", "Metastasis", "Inflammation"], correct: 1 },
            ];
        } else if (topic.toLowerCase().includes("cleopatra")) {
            return [
                { text: "Which dynasty did Cleopatra VII belong to?", options: ["Ramesside", "Ptolemaic", "Achaemenid"], correct: 1 },
                { text: "Which Roman leader was Cleopatra's first major political ally?", options: ["Julius Caesar", "Augustus", "Nero"], correct: 0 },
                { text: "In which ancient city was Cleopatra's palace located?", options: ["Thebes", "Alexandria", "Memphis"], correct: 1 },
            ];
        }
        return [
            { text: `What is the core principle behind ${topic}?`, options: ["Foundation A", "Mechanism B", "Concept C"], correct: 1 },
            { text: `In a real-world scenario, how applies ${topic}?`, options: ["Usage X", "Application Y", "Function Z"], correct: 0 },
            { text: `Which limitation is common in ${topic}?`, options: ["Constraint 1", "Issue 2", "Gap 3"], correct: 2 },
        ];
    };

    const questions = getQuizForTopic();

    const handleAnswer = (index: number) => {
        const isCorrect = index === questions[step].correct;
        if (isCorrect) setScore(s => s + 1);

        if (step < questions.length - 1) {
            setStep(s => s + 1);
        } else {
            const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
            setFinished(true);
            if (finalScore >= 70) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#22D3EE", "#818CF8", "#F472B6"]
                });
            }
            setTimeout(() => onComplete(finalScore), 2500);
        }
    };

    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div className="p-6 rounded-[2.5rem] bg-white border border-border bubbly-shadow max-w-md mx-auto relative overflow-hidden text-black">
            {!finished ? (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-brand-purple font-black uppercase text-xs tracking-widest">
                            <Brain className="w-4 h-4" />
                            AI Verification
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground">
                            Question {step + 1} of {questions.length}
                        </div>
                    </div>

                    <div className="w-full h-2 bg-muted rounded-full mb-6">
                        <motion.div
                            className="h-full bg-brand-purple rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    <h3 className="text-xl font-bold leading-tight min-h-[60px] text-black">
                        {questions[step].text}
                    </h3>

                    <div className="space-y-3">
                        {questions[step].options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className="w-full p-4 rounded-2xl border-2 border-border hover:border-brand-purple hover:bg-brand-purple/5 transition-all text-left font-bold text-sm bubbly-button text-black"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="result"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 space-y-4"
                >
                    {score / questions.length >= 0.7 ? (
                        <>
                            <div className="w-20 h-20 rounded-full bg-brand-neon/20 flex items-center justify-center mb-2">
                                <Trophy className="w-10 h-10 text-brand-neon" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-neon">Verification Passed!</h3>
                            <p className="text-sm font-bold text-muted-foreground italic">Quest Completed + Rep Increase</p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-2">
                                <XCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black text-red-500">Need More Study!</h3>
                            <p className="text-sm font-bold text-muted-foreground italic text-center px-4">You hit {Math.round((score / questions.length) * 100)}%. Aim for 70% to pass.</p>
                        </>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default AIQuiz;
