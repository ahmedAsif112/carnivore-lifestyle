// src/components/WeightProgressChart.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
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
        text: "I have done carnivore many times and I’ve never seen much results because I didn’t see a progress and now that I’m using this service, I successfully have lost 10 lbs in almost 4 weeks!!"
    },
    {
        name: "Liam",
        country: "Canada",
        text: "Before this, my diet didn’t move the needle much. But since starting here, I’m already down 7 lbs in 2 weeks."
    },
    {
        name: "Sarah",
        country: "UK",
        text: "Honestly I didn’t expect this to work but I’m super surprised. This is working and I’m finally seeing the scale move!"
    }
];

const WeightProgressChart = () => {
    const router = useRouter();
    const handleSelect = () => {
        router.push("/halfwaythere");
    };
    const cWeight = JSON.parse(localStorage.getItem("cWeight"))?.value || 92;
    const goalWeight = JSON.parse(localStorage.getItem("goalWeight"))?.value || 82;
    const name = localStorage.getItem("name") || "Ahmed";
    const unit = JSON.parse(localStorage.getItem("unit")) || "kg";

    const convertToLbs = (kg: number) => kg * 2.20462;
    const formatWeight = (value: number) =>
        unit === "lbs" ? `${convertToLbs(value).toFixed(1)} lbs` : `${value.toFixed(1)} kg`;
    const formatWeightNoDecimal = (value: number) =>
        unit === "lbs" ? `${Math.round(convertToLbs(value))} lbs` : `${Math.round(value)} kg`;

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const augWeight = cWeight + (goalWeight - cWeight) * 0.33;
    const sepWeight = cWeight + (goalWeight - cWeight) * 0.66;

    const now = new Date();
    const labels = [];
    for (let i = 0; i < 4; i++) {
        const month = new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleString("default", {
            month: "short",
        });
        labels.push(month);
    }

    const data = {
        labels,
        datasets: [
            {
                data: [cWeight, augWeight, sepWeight, goalWeight],
                tension: 0.5,
                pointRadius: 10,
                pointHoverRadius: 12,
                pointBackgroundColor: ["#ef5350", "#ffa726", "#ffee58", "#00c853"],
                segment: {
                    borderColor: (ctx: any) => {
                        const i = ctx.p0DataIndex;
                        return ["#ef5350", "#ffa726", "#ffee58"][i] || "#00c853";
                    },
                    borderWidth: 6,
                },
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 20,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => formatWeight(ctx.parsed.y),
                },
            },
            datalabels: {
                anchor: (ctx: Context) =>
                    ctx.dataIndex === 3
                        ? ctx.dataset.data[3] < ctx.dataset.data[2]
                            ? "end"
                            : "start"
                        : "end",
                align: (ctx: Context) =>
                    ctx.dataIndex === 3
                        ? ctx.dataset.data[3] < ctx.dataset.data[2]
                            ? "top"
                            : "bottom"
                        : "top",
                formatter: (value: number, ctx: Context) => {
                    const isGoal = ctx.dataIndex === 3;
                    const formatted = isGoal
                        ? "Goal\n" + formatWeightNoDecimal(value)
                        : formatWeightNoDecimal(value);
                    return formatted;
                },
                font: {
                    weight: "bold",
                    size: 14,
                },
                color: (ctx: Context) => (ctx.dataIndex === 3 ? "#fff" : "#000"),
                backgroundColor: (ctx: Context) =>
                    ctx.dataIndex === 3 ? "#00c853" : null,
                borderRadius: (ctx: Context) => (ctx.dataIndex === 3 ? 6 : 0),
                padding: (ctx: Context) =>
                    ctx.dataIndex === 3
                        ? { top: 8, bottom: 8, left: 12, right: 12 }
                        : undefined,
                offset: (ctx: Context) => (ctx.dataIndex === 3 ? 14 : 0),
                clip: false,
            },
        },
        scales: {
            y: {
                display: false,
                grid: { display: false },
            },
            x: {
                offset: true,
                grid: { display: false },
                ticks: {
                    color: "#000",
                    font: {
                        weight: "bold",
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="w-[40%] weightchart" style={{ margin: "2rem auto", textAlign: "center" }}>
            <h2 className="text-[30px]" style={{ fontWeight: 700, marginBottom: "1rem" }}>
                {name}, we predict you’ll be{" "}
                <span style={{ color: "#00c853" }}>{formatWeightNoDecimal(goalWeight)}</span> by{" "}
                <span style={{ color: "#00c853" }}>{labels[3]} 6th</span>
            </h2>
            <div style={{ height: "300px" }}>
                <Line data={data} options={options} />
            </div>
            <div style={{ marginTop: "4rem" }}>
                <h3 className="text-[20px] font-bold">What people say</h3>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: "#f9f9f9",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            margin: "1rem auto",
                            maxWidth: "500px"
                        }}
                    >
                        <p style={{ fontWeight: 600 }}>
                            {testimonials[currentTestimonial].name},{" "}
                            <span style={{ color: "#888" }}>
                                {testimonials[currentTestimonial].country}
                            </span>
                        </p>
                        <p style={{ color: "#fbc02d", margin: "4px 0" }}>⭐⭐⭐⭐⭐</p>
                        <p style={{ fontWeight: 500 }}>
                            {testimonials[currentTestimonial].text}
                        </p>
                    </motion.div>
                </AnimatePresence>
                <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
                    {testimonials.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: i === currentTestimonial ? "#f8485e" : "#ccc",
                                transition: "all 0.3s"
                            }}
                        />
                    ))}
                </div>
                <p style={{ color: "#999", fontSize: "14px", marginTop: "3rem" }}>
                    The prediction above is based on the results of members like you and not a guarantee
                </p>
                <div className="sticky bottom-4 z-10 py-4">
                    <button
                        onClick={handleSelect}
                        style={{
                            marginTop: "2rem",
                            padding: "12px 32px",
                            fontSize: "16px",
                            borderRadius: "999px",
                            border: "none",
                            background: "#f8485e",
                            color: "white",
                            fontWeight: 600
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeightProgressChart;
