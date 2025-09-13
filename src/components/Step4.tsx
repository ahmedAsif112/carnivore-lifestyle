"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    ScriptableLineSegmentContext,
    TooltipItem
} from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

const testimonials = [
    {
        name: "Tina",
        country: "United States",
        text: "I have done carnivore many times and I've never seen much results because I didn't see a progress and now that I'm using this service, I successfully have lost 10 lbs in almost 4 weeks!!"
    },
    {
        name: "Liam",
        country: "Canada",
        text: "Before this, my diet didn't move the needle much. But since starting here, I'm already down 7 lbs in 2 weeks."
    },
    {
        name: "Sarah",
        country: "UK",
        text: "Honestly I didn't expect this to work but I'm super surprised. This is working and I'm finally seeing the scale move!"
    }
];

const WeightProgressChart = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const router = useRouter();
    const [unit, setUnit] = useState<"kg" | "lbs">("kg");
    const [cWeight, setCWeight] = useState<number>(92);
    const [goalWeight, setGoalWeight] = useState<number>(82);
    const [name, setName] = useState("Undifined");
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set visibility for animations
        setIsVisible(true);

        if (typeof window !== "undefined") {
            const storedCWeight = JSON.parse(localStorage.getItem("cWeight") || "null");
            const storedGoalWeight = JSON.parse(localStorage.getItem("goalWeight") || "null");
            const storedName = localStorage.getItem("name");
            const storedUnit = JSON.parse(localStorage.getItem("unit") || `"kg"`);

            if (storedCWeight?.value) setCWeight(storedCWeight.value);
            if (storedGoalWeight?.value) setGoalWeight(storedGoalWeight.value);
            if (storedName) setName(storedName);
            if (storedUnit === "lbs" || storedUnit === "kg") setUnit(storedUnit);
        }

        // Auto-scroll to chart after 2 seconds, then testimonials after 5 seconds
        const chartTimer = setTimeout(() => {
            chartRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 2000);

        const testimonialsTimer = setTimeout(() => {
            testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 5000);

        return () => {
            clearTimeout(chartTimer);
            clearTimeout(testimonialsTimer);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000); // Increased interval to 4 seconds for smoother transitions
        return () => clearInterval(interval);
    }, []);

    // Prevent hydration errors by only rendering animations after mount
    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    const convertToLbs = (kg: number) => kg * 2.20462;
    const formatWeight = (value: number) =>
        unit === "lbs" ? `${convertToLbs(value).toFixed(1)} lbs` : `${value.toFixed(1)} kg`;
    const formatWeightNoDecimal = (value: number) =>
        unit === "lbs" ? `${Math.round(convertToLbs(value))} lbs` : `${Math.round(value)} kg`;

    const augWeight = cWeight + (goalWeight - cWeight) * 0.33;
    const sepWeight = cWeight + (goalWeight - cWeight) * 0.66;

    const now = new Date();
    const labels = Array.from({ length: 4 }).map((_, i) =>
        new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleString("default", {
            month: "short"
        })
    );

    const data: ChartData<"line"> = {
        labels,
        datasets: [
            {
                data: [cWeight, augWeight, sepWeight, goalWeight],
                tension: 0.5,
                pointRadius: 8, // Reduced from 10
                pointHoverRadius: 10, // Reduced from 12
                pointBackgroundColor: ["#ef5350", "#ffa726", "#ffee58", "#00c853"],
                segment: {
                    borderColor: (ctx: ScriptableLineSegmentContext) => {
                        const i = ctx.p0DataIndex;
                        return ["#ef5350", "#ffa726", "#ffee58"][i] || "#00c853";
                    },
                    borderWidth: 4 // Reduced from 6
                },
                fill: false
            }
        ]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { left: 20, right: 20, top: 30, bottom: 40 } }, // Increased top and bottom padding for goal box
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<"line">) => formatWeight(ctx.parsed.y)
                }
            },
            datalabels: {
                anchor: (ctx: Context) => {
                    if (ctx.dataIndex === 3) return "center";
                    return "end";
                },
                align: (ctx: Context) => {
                    if (ctx.dataIndex === 3) {
                        // Check if line is going downward by comparing current weight vs goal weight
                        const isGoingDown = cWeight > goalWeight;
                        return isGoingDown ? "top" : "bottom"; // Show above line if going down, below if going up
                    }
                    return "top";
                },
                formatter: (value: number, ctx: Context) =>
                    ctx.dataIndex === 3
                        ? "Goal\n" + formatWeightNoDecimal(value)
                        : formatWeightNoDecimal(value),
                font: { weight: "bold", size: 12 },
                color: (ctx: Context) => (ctx.dataIndex === 3 ? "#fff" : "#000"),
                backgroundColor: (ctx: Context) => (ctx.dataIndex === 3 ? "#00c853" : null),
                borderRadius: (ctx: Context) => (ctx.dataIndex === 3 ? 8 : 0), // Slightly increased border radius
                padding: (ctx: Context) => (ctx.dataIndex === 3 ? 8 : 0), // Added padding for goal box
                offset: (ctx: Context) => (ctx.dataIndex === 3 ? 20 : 0), // Increased offset to prevent cutting
                clip: false
            }
        },
        scales: {
            y: { display: false, grid: { display: false } },
            x: {
                offset: true,
                grid: { display: false },
                ticks: {
                    color: "#000",
                    font: { weight: "bold", size: 12 } // Reduced from 14
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
            >
                {/* Header Section */}
                <motion.div
                    className={`w-full max-w-4xl mx-auto text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {/* Animated Icon */}
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-pulse">
                        <span className="text-3xl">📊</span>
                    </div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {name}, we predict you’ll be{" "}
                        <motion.span
                            className="text-green-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
                        >
                            {formatWeightNoDecimal(goalWeight)}
                        </motion.span>{" "}
                        by{" "}
                        <motion.span
                            className="text-green-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
                        >
                            {labels[3]} 6th
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        className="text-orange-300 text-lg font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Your personalized carnivore weight loss journey
                    </motion.p>
                </motion.div>

                {/* Chart Section - Made smaller */}
                <motion.div
                    ref={chartRef}
                    className="w-full max-w-3xl mx-auto mb-16" // Reduced from max-w-4xl to max-w-3xl
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 }}
                >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-orange-200/50"> {/* Reduced padding from p-8 to p-6 */}
                        <motion.div
                            style={{ height: "300px" }} // Reduced from 400px to 300px
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 1 }}
                        >
                            <Line data={data} options={options} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Progress Indicators */}
                <motion.div
                    className="w-full max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: "🎯", title: "Target Set", desc: "Goal weight defined" },
                            { icon: "📈", title: "Progress Tracking", desc: "Monthly milestones" },
                            { icon: "💪", title: "Success Path", desc: "Carnivore lifestyle" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-r from-orange-800/80 to-red-800/80 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 text-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <div className="text-3xl mb-3 animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}>
                                    {item.icon}
                                </div>
                                <h3 className="text-orange-300 font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-orange-100 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials Section - Improved transitions */}
                <motion.div
                    ref={testimonialsRef}
                    className="w-full max-w-4xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">What people say</h3>
                        <p className="text-orange-300 font-light">Real success stories from our community</p>
                    </div>

                    <div className="relative overflow-hidden"> {/* Added container for better positioning */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ x: 400, opacity: 0, scale: 0.95 }} // Increased x value for smoother entrance
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                exit={{ x: -400, opacity: 0, scale: 0.95 }} // Increased exit distance
                                transition={{
                                    duration: 0.8, // Increased duration for smoother transition
                                    type: "spring",
                                    stiffness: 80, // Reduced stiffness for smoother motion
                                    damping: 20 // Added damping for less bounce
                                }}
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl border border-orange-200/50"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }} // Increased delay for better sync
                                >
                                    <p className="font-semibold text-lg mb-2">
                                        {testimonials[currentTestimonial].name},{" "}
                                        <span className="text-gray-500">{testimonials[currentTestimonial].country}</span>
                                    </p>
                                    <div className="text-yellow-500 my-3 text-xl">⭐⭐⭐⭐⭐</div>
                                    <p className="font-medium text-gray-700 text-base leading-relaxed">
                                        {testimonials[currentTestimonial].text}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-3 mt-6">
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentTestimonial ? "bg-orange-500" : "bg-gray-300"
                                    }`} // Increased transition duration
                                whileHover={{ scale: 1.2 }}
                                animate={i === currentTestimonial ? { scale: 1.2 } : { scale: 1 }}
                                transition={{ duration: 0.3 }} // Added smooth transition for indicators
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.p
                    className="text-sm text-orange-300/70 mb-8 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}
                >
                    The prediction above is based on the results of members like you and not a guarantee
                </motion.p>

                {/* Continue Button - Mobile responsive */}
                <motion.div
                    className="sticky bottom-2 md:bottom-4 z-10 py-3 md:py-4 px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                >
                    <motion.button
                        onClick={() => router.push("/step5")}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 md:px-12 py-3 md:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg w-full sm:w-auto"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(255, 100, 100, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Continue Your Journey →
                    </motion.button>

                    <motion.div
                        className="mt-3 md:mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.6, duration: 0.8 }}
                    >
                        <p className="text-orange-300 text-xs md:text-sm font-light text-center">
                            🚀 Ready to transform your health with carnivore?
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default WeightProgressChart;