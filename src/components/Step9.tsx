'use client';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Flame, Crown, Timer, CheckCircle, Star, Target } from 'lucide-react';
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
            body: JSON.stringify({ planId: selectedPlan }),
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
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full opacity-40 blur-lg animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full opacity-30 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Timer Bar */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-900 via-red-800 to-red-950 text-white text-center py-3 border-b border-red-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-2">
                    <Timer className="w-4 h-4 text-red-400 animate-pulse" />
                    <span className="text-sm font-medium">Introductory offer expires in:</span>
                    <span className="font-bold text-orange-400 bg-black/30 px-3 py-1 rounded-full text-lg animate-pulse">
                        {formatTime()}
                    </span>
                </div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-4 pt-8 pb-24">
                {/* Header Card */}
                <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 backdrop-blur-sm text-white rounded-2xl p-6 text-center mb-8 shadow-2xl">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Crown className="w-5 h-5 text-orange-400" />
                        <div className="bg-gradient-to-r from-red-800/50 to-orange-800/50 px-4 py-2 rounded-full text-sm border border-red-700/50">
                            {email || 'Loading email...'}
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Your Elite Carnivore Plan is Ready
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>Perfect for {genderLabel} over 22</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>For Carnivore competent</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>For lightly active lifestyle</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span>No dietary restrictions</span>
                        </div>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-full bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
                    <Carousel autoplay autoplaySpeed={2000} dots={false} infinite>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collage}
                                    alt="Premium carnivore meals"
                                    className="w-full max-w-screen-xl rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-xl" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collagetwo}
                                    alt="Carnivore recipe collection"
                                    className="w-full max-w-screen-xl rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-xl" />
                            </div>
                        </div>
                    </Carousel>
                </div>

                {/* Plan Selection */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-red-400" />
                        <h3 className="text-lg font-bold text-white">Get visible results in 4 weeks plan</h3>
                        <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
                    </div>
                    <p className="text-gray-400 text-sm">Transform your body with our elite protocol</p>
                </div>

                <div className="space-y-4 mb-8">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`flex justify-between items-center border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${selectedPlan === plan.id
                                ? 'border-red-500 bg-gradient-to-r from-red-900/30 to-orange-900/20 shadow-xl backdrop-blur-sm transform scale-105'
                                : 'border-red-800/30 bg-gradient-to-r from-red-900/20 to-black/40 hover:border-red-600/50 backdrop-blur-sm'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="relative mt-1">
                                    <input
                                        type="radio"
                                        name="plan"
                                        checked={selectedPlan === plan.id}
                                        onChange={() => setSelectedPlan(plan.id)}
                                        className="w-5 h-5 accent-red-500 cursor-pointer"
                                    />
                                    {selectedPlan === plan.id && (
                                        <div className="absolute -top-1 -left-1 w-7 h-7 border-2 border-red-400 rounded-full animate-pulse" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg mb-2">{plan.title}</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg text-gray-400 line-through">$197</span>
                                            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                85.8% OFF
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                                {plan.newPrice}
                                            </span>
                                            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                BEST VALUE
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {selectedPlan === plan.id && (
                                <div className="text-red-400">
                                    <Star className="w-6 h-6 fill-current animate-pulse" />
                                </div>
                            )}
                        </label>
                    ))}
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <Flame className="w-5 h-5" />
                        <span className="text-lg">Get my elite carnivore plan</span>
                        <Flame className="w-5 h-5" />
                    </div>
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
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
            `}</style>
        </div>
    );
}