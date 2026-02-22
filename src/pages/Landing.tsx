import { motion } from "framer-motion";
import { ArrowRight, Star, Rocket, Trophy, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-sm mb-8 animate-bounce-subtle"
                    >
                        <Star className="w-4 h-4 fill-brand-purple" />
                        Join 1,000+ Students Today!
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                    >
                        Turn Studying Into a <span className="text-brand-purple">Game.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                    >
                        Challenge friends, complete quests, and learn faster with AI-powered micro videos.
                        Addictive learning, real results! 🚀
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/dashboard"
                            className="px-8 py-4 rounded-2xl bg-brand-purple text-white font-bold text-lg flex items-center gap-2 bubbly-button hover:bg-brand-purple/90 w-full sm:w-auto text-center justify-center"
                        >
                            Start Studying
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button
                            className="px-8 py-4 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue font-bold text-lg flex items-center gap-2 bubbly-button hover:bg-muted w-full sm:w-auto text-center justify-center"
                        >
                            Watch Demo
                            <Play className="w-5 h-5 fill-brand-blue" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grids */}
            <section className="py-16 px-6 bg-white/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Trophy className="w-8 h-8 text-yellow-500" />}
                        title="Quest Challenges"
                        description="Challenge your friends and climb the leaderboard."
                        color="bg-yellow-100"
                    />
                    <FeatureCard
                        icon={<Play className="w-8 h-8 text-brand-neon" />}
                        title="Brainrot Learning"
                        description="30-60 second micro-lessons that explain everything."
                        color="bg-cyan-100"
                    />
                    <FeatureCard
                        icon={<Rocket className="w-8 h-8 text-brand-pink" />}
                        title="Social Hub"
                        description="Connect with your study squad and share progress."
                        color="bg-pink-100"
                    />
                    <FeatureCard
                        icon={<Star className="w-8 h-8 text-brand-purple" />}
                        title="Streak System"
                        description="Build your daily habit and unlock mystery rewards."
                        color="bg-purple-100"
                    />
                </div>
            </section>

            {/* Simple Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-brand-purple rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-blue rounded-full blur-[120px]" />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-8 rounded-3xl bg-white border border-border flex flex-col items-center text-center bubbly-shadow"
    >
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
);

export default Landing;
