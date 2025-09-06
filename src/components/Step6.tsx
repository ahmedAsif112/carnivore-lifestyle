"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const meatOptions = [
    { label: "Chicken", icon: "🍗" },
    { label: "Pork", icon: "🐖" },
    { label: "Bacon", icon: "🥓" },
    { label: "Beef", icon: "🐄" },
    { label: "Turkey", icon: "🦃" },
    { label: "Fish", icon: "🐟" },
    { label: "Lamb", icon: "🐑" },
    { label: "I'm a vegetarian", icon: "🍆" }
];

export default function MeatPreference() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSelect = () => {
        router.push("/step7");
    };

    const toggleOption = (label: string) => {
        if (label === "All in one") {
            setSelected(meatOptions.map((m) => m.label));
        } else {
            setSelected((prev) =>
                prev.includes(label)
                    ? prev.filter((item) => item !== label)
                    : [...prev, label]
            );
        }
    };

    const isSelected = (label: string) => selected.includes(label);

    const handleContinue = () => {
        console.log("Selected meat options:", selected);
    };

    const getSelectionPercentage = () => {
        return selected.length > 0 ? (selected.length / meatOptions.length) * 100 : 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            {isMounted && (
                <div className="absolute inset-0">
                    {[...Array(18)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute opacity-10"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut"
                            }}
                        >
                            {['🥩', '🍗', '🐖', '🥓', '🐄'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </div>
            )}

            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 min-h-screen"
            >
                <div className={`min-h-screen flex flex-col items-center justify-start py-6 sm:py-10 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-center mb-6 sm:mb-8"
                    >
                        <motion.div
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl"
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 10px 25px rgba(249, 115, 22, 0.3)",
                                    "0 15px 35px rgba(249, 115, 22, 0.4)",
                                    "0 10px 25px rgba(249, 115, 22, 0.3)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="text-2xl sm:text-3xl">🥩</span>
                        </motion.div>

                        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 sm:mb-3 px-2">
                            Which meat do you prefer?
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-orange-300 font-light text-sm sm:text-base px-2"
                        >
                            Select your favorite proteins for your carnivore journey
                        </motion.p>
                    </motion.div>

                    {/* Selection Progress */}
                    {selected.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-4 sm:mb-6 w-full max-w-xl"
                        >
                            <div className="flex justify-between items-center text-orange-300 text-xs sm:text-sm mb-2">
                                <span>{selected.length} protein{selected.length !== 1 ? 's' : ''} selected</span>
                                <span>{Math.round(getSelectionPercentage())}% of options</span>
                            </div>
                            <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden shadow-inner">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getSelectionPercentage()}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="w-full pt-4 sm:pt-8 max-w-xl space-y-3 sm:space-y-4">

                        {/* All in one button */}
                        <motion.button
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-full text-left px-6 py-4 sm:py-5 rounded-2xl font-medium bg-white/95 backdrop-blur-sm flex justify-between items-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-orange-300/50"
                            onClick={() => toggleOption("All in one")}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">✨</span>
                                </div>
                                <span className="text-gray-800 font-medium">All in one</span>
                            </div>
                            <motion.span
                                className="text-2xl text-orange-500"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                +
                            </motion.span>
                        </motion.button>

                        {/* Meat options */}
                        {meatOptions.map(({ label, icon }, index) => (
                            <motion.button
                                key={label}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.3 + (index * 0.1),
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                className={`w-full text-left px-6 py-4 sm:py-5 rounded-2xl font-medium flex justify-between items-center transition-all duration-300 hover:scale-[1.02] border-2 shadow-xl hover:shadow-2xl ${isSelected(label)
                                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 transform scale-[1.02]"
                                    : "bg-white/95 backdrop-blur-sm hover:bg-white border-transparent hover:border-orange-300/50"
                                    }`}
                                onClick={() => toggleOption(label)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center space-x-3 flex-1">
                                    {isSelected(label) ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        >
                                            <span className="text-white font-bold">✓</span>
                                        </motion.div>
                                    ) : (
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-lg">{icon}</span>
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        {isSelected(label) ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <p className="text-sm font-light">
                                                    We've added <strong>{label.toLowerCase()}</strong>
                                                </p>
                                                <p className="text-sm font-light opacity-90">to your meal plan</p>
                                            </motion.div>
                                        ) : (
                                            <span className="text-base font-medium text-gray-800">
                                                {label}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <motion.div
                                    className="flex items-center"
                                    animate={{
                                        rotate: isSelected(label) ? 360 : 0,
                                        scale: isSelected(label) ? [1, 1.2, 1] : 1
                                    }}
                                    transition={{
                                        duration: isSelected(label) ? 0.5 : 0.2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {isSelected(label) ? (
                                        <span className="text-xl text-white">✔</span>
                                    ) : (
                                        <span className="text-2xl text-orange-500">+</span>
                                    )}
                                </motion.div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Continue Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-8 sm:mt-10 flex flex-col items-center"
                    >
                        <motion.button
                            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-xl hover:shadow-2xl transition-all duration-300 ${selected.length > 0
                                ? "hover:scale-105 cursor-pointer"
                                : "opacity-70 cursor-not-allowed"
                                }`}
                            onClick={() => {
                                handleContinue();
                                handleSelect();
                            }}
                            whileHover={selected.length > 0 ? { scale: 1.05, y: -2 } : {}}
                            whileTap={selected.length > 0 ? { scale: 0.95 } : {}}
                            disabled={selected.length === 0}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>Continue</span>
                                {selected.length > 0 && (
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        →
                                    </motion.span>
                                )}
                            </span>
                        </motion.button>

                        {selected.length === 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-orange-300 text-xs sm:text-sm text-center mt-3 font-light"
                            >
                                Please select at least one protein to continue
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Motivational Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="text-center mt-6 sm:mt-8 max-w-lg"
                    >
                        <div className="bg-gradient-to-r from-red-50/10 to-orange-50/10 p-3 sm:p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm">
                            <p className="text-gray-300 text-xs sm:text-sm font-light">
                                🔥 Choose the proteins that will fuel your carnivore transformation
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}