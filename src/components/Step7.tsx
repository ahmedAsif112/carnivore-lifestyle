"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GoalSetScreenFunnel = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = () => {
        router.push("/step8"); // Navigate to /target-route
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">


            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10"
            >
                <div className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header with animated icon */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-3xl">🎯</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            YOU DID IT!
                        </motion.h1>

                        <motion.h2
                            className="text-2xl md:text-3xl font-bold text-orange-400 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            DON'T STOP NOW!
                        </motion.h2>
                    </div>

                    {/* Main Content Card */}
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <motion.div
                            className="text-center mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                🔥 AMAZING! You're officially SPECIAL!
                            </h3>

                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                You just invested serious time and effort into creating something incredible -
                                <span className="font-semibold text-orange-600"> your personal transformation blueprint.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6 border border-orange-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                🎯 Your 100% PERSONALIZED Carnivore Plan is Ready!
                            </h4>

                            <p className="text-gray-700 mb-4">
                                This isn't generic - it's built from YOUR answers:
                            </p>

                            <div className="space-y-2">
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 0.4 }}
                                >
                                    <span className="text-green-500 mr-2">✅</span>
                                    <span>Your meat preferences</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4, duration: 0.4 }}
                                >
                                    <span className="text-green-500 mr-2">✅</span>
                                    <span>Your lifestyle & goals</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.6, duration: 0.4 }}
                                >
                                    <span className="text-green-500 mr-2">✅</span>
                                    <span>Your unique body needs</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.6 }}
                        >
                            <p className="text-lg font-semibold text-gray-800 mb-2">
                                ⚡ You're literally 20 seconds from accessing your custom roadmap...
                            </p>

                            <p className="text-gray-700 font-medium">
                                Don't waste the effort you just invested. You're a <span className="font-bold text-orange-600">FINISHER</span>, not a quitter.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Motivational Message - matching profile page style */}
                    <motion.div
                        className="bg-gradient-to-r from-orange-800/80 to-red-800/80 backdrop-blur-sm border border-orange-500/30 shadow-xl rounded-2xl px-6 py-4 flex gap-3 items-start mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.6 }}
                    >
                        <motion.span
                            className="text-orange-300 text-xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            🚀
                        </motion.span>
                        <p className="text-orange-100 font-light">
                            Your transformation starts the moment you click continue. Every second you wait is another second of the old you.
                            The new you is waiting on the other side of this button.
                        </p>
                    </motion.div>

                    {/* Continue Button - matching profile page style */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={handleSelect}
                            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 uppercase tracking-wide"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get My Personalized Plan →
                        </motion.button>

                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.4, duration: 0.8 }}
                        >
                            <p className="text-orange-300 text-sm font-light">
                                🔥 Your custom carnivore transformation awaits
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default GoalSetScreenFunnel;