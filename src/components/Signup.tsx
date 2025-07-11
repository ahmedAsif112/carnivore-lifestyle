"use client";
import { motion } from "framer-motion";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const validateEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleContinue = () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        localStorage.setItem("email", email);
        router.push("/almostdone"); // update with your actual route
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
                <h1 className="text-3xl font-semibold mb-8">Sign up</h1>

                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-3 text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />

                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                <button
                    onClick={handleContinue}
                    className="w-full max-w-md mt-7 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg py-3 rounded-full transition mb-6"
                >
                    Continue with email
                </button>

                <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-xl">🔒</span>
                    Please check our{" "}
                    <a href="#" className="underline text-gray-500">
                        Privacy Policy
                    </a>{" "}
                    to understand how we use your data
                </p>
            </div>
        </motion.div>
    );
}
