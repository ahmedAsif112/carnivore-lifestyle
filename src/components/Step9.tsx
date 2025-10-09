/* eslint-disable @next/next/no-img-element */
'use client';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Flame, Crown, Timer, CheckCircle, Star, Target, Gift } from 'lucide-react';
import collage from "../assets/collage.png"
import collagetwo from "../assets/collagetwo.png"
import Image from 'next/image';

const plans = [
    {
        id: '4w',
        title: '4-week plan with 6+ free cookbooks',
        newPrice: '$27.99',
    },
];

export default function PlanPage() {
    const [selectedPlan, setSelectedPlan] = useState('4w');
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const handlePaypalCheckout = async () => {
        const res = await fetch("/api/paypal", { method: "POST" });

        if (!res.ok) {
            alert("Failed to create PayPal order");
            return;
        }

        const data = await res.json();
        if (data?.url) {
            window.location.href = data.url; // Redirect to PayPal checkout
        } else {
            alert("PayPal order creation failed");
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedGender = localStorage.getItem('gender');
        if (storedEmail) setEmail(storedEmail);
        if (storedGender === 'Male' || storedGender === 'Female') setGender(storedGender);
    }, []);

    const formatTime = () => {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const genderLabel = gender === 'Female' ? 'women' : 'men / women';

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planId: selectedPlan, email }),
        });

        if (!res.ok) {
            alert('Failed to create payment session');
            return;
        }

        let data;
        try {
            data = await res.json();
        } catch (err) {
            alert('Invalid server response. Please try again.');
            return;
        }

        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert('Payment session creation failed.');
        }

    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-hidden">
            {/* Animated Background Elements */}
            {/* Animated Background Elements */}

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-4 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full opacity-40 blur-lg animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full opacity-30 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Timer Bar */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-900 via-red-800 to-red-950 text-white text-center py-2 sm:py-3 border-b border-red-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-2">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">Introductory offer expires in:</span>
                    <span className="font-bold text-orange-400 bg-black/30 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-lg animate-pulse">
                        {formatTime()}
                    </span>
                </div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-3 sm:px-4 pt-4 sm:pt-8 pb-20 sm:pb-24">
                {/* Header Card */}
                <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center mb-6 sm:mb-8 shadow-2xl">
                    <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                        <div className="bg-gradient-to-r from-red-800/50 to-orange-800/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-red-700/50">
                            {email || 'Loading email...'}
                        </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Your Elite Carnivore Plan is Ready
                    </h2>

                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-300">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>Perfect for {genderLabel} over 22</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-300">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>For Carnivore competent</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-300">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>For lightly active lifestyle</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-300">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>No dietary restrictions</span>
                        </div>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-full bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8 shadow-xl">
                    <Carousel autoplay autoplaySpeed={2000} dots={false} infinite>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collage}
                                    alt="Premium carnivore meals"
                                    className="w-full max-w-screen-xl rounded-lg sm:rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-lg sm:rounded-xl" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collagetwo}
                                    alt="Carnivore recipe collection"
                                    className="w-full max-w-screen-xl rounded-lg sm:rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-lg sm:rounded-xl" />
                            </div>
                        </div>
                    </Carousel>
                </div>

                {/* Plan Selection */}
                <div className="text-center mb-6 sm:mb-10">
                    <div className="flex items-center justify-center space-x-2 mb-3 flex-wrap">
                        <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400 animate-bounce" />
                        <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 drop-shadow-lg animate-pulse">
                            Special Checkout Offer
                        </h2>
                        <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400 animate-bounce" />
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Get your <span className="font-semibold text-white">4-Week Customized Carnivore Meal Plan {" "}</span>
                        for just <span className="font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 animate-pulse">$27.99</span>
                        (<span className="line-through text-gray-400">$197</span>) — an insane
                        <span className="text-green-400 font-bold animate-pulse"> 85.8% OFF!</span>
                    </p>
                </div>

                <div className="relative border border-red-800/60 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-red-900/50 via-black/60 to-orange-900/40 shadow-2xl backdrop-blur-md space-y-6 overflow-hidden">
                    {/* glowing border animation */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 via-orange-500/20 to-yellow-500/20 blur-2xl animate-pulse"></div>

                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <CheckCircle className="w-6 h-6 text-green-400 animate-ping absolute opacity-75" />
                                <CheckCircle className="w-6 h-6 text-green-400 relative" />
                            </div>
                            <span className="text-gray-200 text-sm sm:text-base leading-snug">
                                <span className="font-bold text-white">Only $27.99</span> for your 4-week customized meal plan
                            </span>
                        </li>

                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <Gift className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                            </div>
                            <span className="text-gray-200 text-sm sm:text-base leading-snug">
                                After purchase, you’ll unlock <span className="font-bold text-white animate-pulse">6+ Premium Carnivore eBooks</span> — <span className="text-yellow-300 font-extrabold">FREE Bonus!</span>
                            </span>
                        </li>
                    </ul>

                    <div className="text-center mt-4 relative z-10">
                        <p className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-300 to-yellow-200 animate-pulse">
                            🚀 Don’t miss out — start your carnivore journey the right way!
                        </p>
                    </div>
                </div>


                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r mt-5 from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-base sm:text-lg">Get my elite carnivore plan<div>(Pay with card)</div></span>
                    </div>
                </button>
                <button
                    onClick={handlePaypalCheckout}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[#FFC439] hover:bg-[#F7B500] text-black font-semibold py-3 rounded-lg transition"
                >
                    <img
                        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                        alt="PayPal"
                        className="h-5"
                    />
                    <span>Pay with PayPal</span>
                </button>
                {/* Trust Indicators */}
                <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        🔒 100% secure checkout
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-25%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }

                /* Custom radio button styling to center the dot */
                input[type="radio"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    border: 2px solid #ef4444;
                    border-radius: 50%;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                input[type="radio"]:checked {
                    background-color: #ef4444;
                    border-color: #ef4444;
                }
                
                input[type="radio"]:checked::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                
                @media (min-width: 640px) {
                    input[type="radio"]:checked::before {
                        width: 8px;
                        height: 8px;
                    }
                }
            `}</style>
        </div>
    );
}