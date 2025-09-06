"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input, Button } from 'antd';
import { Target, TargetIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BMIResultMain() {
    const router = useRouter();

    const [bmi, setBMI] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [goalWeight, setGoalWeight] = useState<{ value: string; unit: string }>({
        value: "",
        unit: "kg",
    });
    const [isGoalValid, setIsGoalValid] = useState(false);
    const [goalWeightError, setGoalWeightError] = useState('');

    const handleClick = () => {

        // Save goal weight to localStorage before navigation
        if (goalWeight.value && isGoalValid) {
            localStorage.setItem("goalWeight", JSON.stringify(goalWeight));
            console.log("Navigating to goal weight page with:", goalWeight);
            // router.push("/goalweight");
        }
        router.push("/step3")

    };

    useEffect(() => {
        setIsVisible(true);

        const cWeight = localStorage.getItem("cWeight");
        const heightValue = localStorage.getItem("height");

        if (cWeight && heightValue) {
            const parsedWeight = JSON.parse(cWeight);
            const parsedHeight = JSON.parse(heightValue);

            let kg = parsedWeight.value;
            if (parsedWeight.unit === "lbs") {
                kg = +(kg * 0.453592).toFixed(1);
            }

            let heightInCm = 0;
            if (parsedHeight.unit === "ft") {
                const feet = parsedHeight.value.feet;
                const inches = parsedHeight.value.inches;
                const totalInches = feet * 12 + inches;
                heightInCm = totalInches * 2.54;
            } else if (parsedHeight.unit === "cm") {
                heightInCm = parsedHeight.value;
            }

            const heightInMeters = heightInCm / 100;
            const calculatedBMI = +(kg / (heightInMeters * heightInMeters)).toFixed(1);
            setBMI(calculatedBMI);
        }

        const savedGoalWeight = localStorage.getItem("goalWeight");
        if (savedGoalWeight) {
            setGoalWeight(JSON.parse(savedGoalWeight));
            setIsGoalValid(true);
        }

        // 👇 Auto-scroll to goal section after 3 seconds
        const timer = setTimeout(() => {
            goalSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    const handleGoalWeightChange = (e: any) => {
        const value = e.target.value;
        setGoalWeight({ ...goalWeight, value }); // ✅ keep object structure

        // Validation
        if (!value) {
            setGoalWeightError("Please enter your goal weight!");
            setIsGoalValid(false);
        } else if (!/^\d+(\.\d+)?$/.test(value)) {
            setGoalWeightError("Please enter a valid weight!");
            setIsGoalValid(false);
        } else if (parseFloat(value) <= 0) {
            setGoalWeightError("Weight must be greater than 0!");
            setIsGoalValid(false);
        } else {
            setGoalWeightError("");
            setIsGoalValid(true);
        }
    };

    const getArrowPosition = () => {
        if (bmi === null) return 0;
        const minBMI = 10;
        const maxBMI = 40;
        const percent = Math.min(100, Math.max(0, ((bmi - minBMI) / (maxBMI - minBMI)) * 100));
        return percent;
    };

    const getBMICategory = () => {
        if (bmi === null) return "";
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    const getBMICategoryColor = () => {
        if (bmi === null) return "text-gray-500";
        if (bmi < 18.5) return "text-blue-400";
        if (bmi < 25) return "text-green-400";
        if (bmi < 30) return "text-yellow-400";
        return "text-red-400";
    };
    const goalSectionRef = useRef<HTMLDivElement | null>(null);
    if (bmi === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-10 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    >
                        🥩
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
            >
                <div className={`max-w-lg mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-2xl">📊</span>
                        </div>
                        <motion.h1
                            className="text-2xl font-medium text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Your BMI Analysis
                        </motion.h1>
                        <motion.p
                            className="text-orange-300 font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Understanding your health baseline
                        </motion.p>
                    </div>

                    {/* BMI Display Card */}
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="text-center mb-6">
                            <motion.div
                                className="text-6xl font-bold text-gray-800 mb-2"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {bmi}
                            </motion.div>
                            <div className="text-gray-500 text-sm mb-2">Body Mass Index</div>
                            <div className={`text-lg font-medium ${getBMICategoryColor()}`}>
                                {getBMICategory()}
                            </div>
                        </div>

                        {/* BMI Scale */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <div className="flex justify-between w-full text-sm text-gray-700 px-1 pb-2">
                                <div>18.5</div>
                                <div>25</div>
                                <div>30</div>
                            </div>

                            <div className="relative w-full h-6 rounded-lg overflow-hidden mb-4 shadow-inner">
                                <div className="absolute h-full w-1/4 bg-gradient-to-r from-blue-400 to-blue-500" />
                                <div className="absolute left-1/4 h-full w-1/4 bg-gradient-to-r from-green-400 to-green-500" />
                                <div className="absolute left-2/4 h-full w-1/4 bg-gradient-to-r from-yellow-400 to-yellow-500" />
                                <div className="absolute left-3/4 h-full w-1/4 bg-gradient-to-r from-red-400 to-red-500" />
                                <motion.div
                                    className="absolute -top-4 text-3xl text-black"
                                    style={{ left: `calc(${getArrowPosition()}% - 25px)` }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 100 }}
                                >
                                    ▼
                                </motion.div>
                            </div>

                            <div className="flex justify-between w-full text-sm text-gray-700 px-1">
                                <div>62 kg</div>
                                <div>84 kg</div>
                                <div>100 kg</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Health Info Card */}
                    <motion.div
                        className="bg-gradient-to-r from-orange-800/80 to-red-800/80 backdrop-blur-sm border border-orange-500/30 shadow-xl rounded-2xl p-6 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                    >
                        <div className="text-center space-y-4">
                            <div className="flex justify-center items-center space-x-2">
                                <span className="text-2xl animate-pulse">⚠️</span>
                                <h3 className="text-orange-300 text-lg font-medium">Health Impact</h3>
                                <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>⚠️</span>
                            </div>
                            <p className="text-orange-100 text-sm leading-relaxed font-light">
                                Reaching and maintaining a healthy BMI (18.5 – 24.9) reduces the risk of many
                                chronic diseases like heart disease, high blood pressure, type 2 diabetes,
                                breathing problems, and certain types of cancer
                            </p>
                        </div>
                    </motion.div>

                    {/* Goal Weight Input Card */}
                    <motion.div
                        ref={goalSectionRef}
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                    >
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-3 flex items-center justify-center animate-pulse">
                                <Target className="text-lg text-white" />
                            </div>
                            <h3 className="text-gray-800 text-lg font-medium mb-2">
                                Set Your Goal Weight
                            </h3>
                            <p className="text-gray-600 text-sm font-light">
                                What’s your target weight for your carnivore journey?
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Enhanced Weight Input with better alignment */}
                            <div className="relative">
                                <Input
                                    size="large"
                                    prefix={<TargetIcon className="text-orange-400" />}
                                    placeholder="Enter your goal weight"
                                    value={goalWeight.value}
                                    onChange={handleGoalWeightChange}
                                    className="rounded-xl border-2 border-gray-200 focus:border-orange-500 hover:border-orange-300 text-center font-medium text-lg shadow-sm transition-all duration-300"
                                    style={{
                                        height: "56px",
                                        fontSize: "16px"
                                    }}
                                />
                                {goalWeight.value && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <span className="text-orange-500 font-semibold text-sm">
                                            {goalWeight.unit}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Enhanced Unit Selector Buttons */}
                            <div className="flex justify-center">
                                <div className="bg-gray-100 p-1 rounded-xl shadow-inner">
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => setGoalWeight({ ...goalWeight, unit: "kg" })}
                                            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 min-w-[80px] ${goalWeight.unit === "kg"
                                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                                                : "bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50"
                                                }`}
                                        >
                                            kg
                                        </button>
                                        <button
                                            onClick={() => setGoalWeight({ ...goalWeight, unit: "lbs" })}
                                            className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 min-w-[80px] ${goalWeight.unit === "lbs"
                                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                                                : "bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50"
                                                }`}
                                        >
                                            lbs
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Validation Error */}
                            {goalWeightError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-200"
                                >
                                    {goalWeightError}
                                </motion.div>
                            )}

                            {/* Success indicator when valid */}
                            {isGoalValid && goalWeight.value && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-full border border-green-200">
                                        <span className="text-lg">✓</span>
                                        <span className="text-sm font-medium">
                                            Goal set: {goalWeight.value} {goalWeight.unit}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                    >
                        <Button
                            onClick={handleClick}
                            disabled={!isGoalValid}
                            size="large"
                            className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white rounded-full px-12 h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        >
                            Continue Your Journey →
                        </Button>

                        <div className="mt-4">
                            <p className="text-orange-300 text-sm font-light">
                                🎯 Set your target to unlock your personalized carnivore plan
                            </p>
                        </div>
                    </motion.div>

                    {/* Motivational Message */}
                    <motion.div
                        className="text-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.8 }}
                    >
                        <div className="bg-gradient-to-r from-red-50/10 to-orange-50/10 p-4 rounded-xl border border-orange-500/20">
                            <p className="text-gray-300 text-sm font-light">
                                💪 Transform your health with the carnivore lifestyle
                            </p>
                        </div>
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
}