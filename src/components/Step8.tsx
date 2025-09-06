'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const progressItems = [
    { label: 'Carnivore Profile Assessment', emoji: '🥩' },
    { label: 'Metabolic Health Analysis', emoji: '💪' },
    { label: 'Calculating Macro Requirements', emoji: '🔥' },
    { label: 'Activity & Meat Preferences', emoji: '🏃‍♂️' }
];

const testimonials = [
    '"Lost 30 lbs on carnivore - this app made it simple!"',
    '"Finally found my perfect meat macros. Game changer!"',
    '"The meal planning took all the guesswork out of carnivore!"'
];

export default function Calculating() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const startTime = Date.now();
        const interval: NodeJS.Timeout = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / 4000) * 100, 100);
            setProgress(percentage);

            if (percentage >= 100) {
                clearInterval(interval);
                if (currentIndex < progressItems.length - 1) {
                    setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                        setProgress(0);
                    }, 100);
                } else {
                    setTimeout(() => router.push('/step9'), 500);
                }
            }
        }, 33);

        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 2500);

        return () => clearInterval(testimonialInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">


            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10">
                <div className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-3xl">🥩</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
                            Crafting Your Perfect
                            <span className="block bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                                Carnivore Journey
                            </span>
                        </h1>
                        <p className="text-orange-300 font-light text-lg">
                            Personalizing your meat-based transformation plan
                        </p>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 mb-8">
                        <div className="space-y-6">
                            {progressItems.map((item, idx) => (
                                <div
                                    key={item.label}
                                    className={`transition-all duration-500 ${idx <= currentIndex ? 'opacity-100' : 'opacity-60'}`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{item.emoji}</span>
                                        <div className={`text-lg font-medium transition-all duration-300 ${idx === currentIndex
                                            ? 'font-bold text-orange-600 scale-105'
                                            : idx < currentIndex
                                                ? 'text-green-600'
                                                : 'text-gray-600'
                                            }`}>
                                            {item.label}
                                        </div>
                                        {idx < currentIndex && (
                                            <span className="text-green-500 text-xl animate-bounce">✓</span>
                                        )}
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-300 ease-out ${idx < currentIndex || (idx === currentIndex && progress >= 100)
                                                ? 'bg-gradient-to-r from-green-400 to-green-500 w-full shadow-lg'
                                                : idx === currentIndex
                                                    ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-lg'
                                                    : 'w-0'
                                                }`}
                                            style={{
                                                width: idx === currentIndex ? `${Math.min(progress, 100)}%`
                                                    : idx < currentIndex ? '100%' : '0%'
                                            }}
                                        />
                                    </div>

                                    <div className="text-right text-sm mt-2 font-medium">
                                        <span className={`${idx < currentIndex
                                            ? 'text-green-600'
                                            : idx === currentIndex
                                                ? 'text-orange-600'
                                                : 'text-gray-400'
                                            }`}>
                                            {idx < currentIndex
                                                ? '100%'
                                                : idx === currentIndex
                                                    ? `${Math.min(progress, 100).toFixed(0)}%`
                                                    : '0%'
                                            }
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className="text-center">
                        <div className="mb-6">
                            <p className="text-orange-200 font-medium text-lg mb-2">
                                Trusted by over 50,000+ carnivore enthusiasts
                            </p>
                            <div className="flex justify-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                                        ⭐
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-800/80 to-red-800/80 backdrop-blur-sm border border-orange-500/30 shadow-xl rounded-2xl p-6 max-w-md mx-auto transition-all duration-500 hover:scale-105">
                            <div className="text-orange-100 text-lg italic font-light leading-relaxed">
                                {testimonials[testimonialIndex]}
                            </div>
                            <div className="mt-4 text-orange-300 text-sm">
                                — Verified Carnivore Member
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-2">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === testimonialIndex
                                        ? 'bg-orange-400 w-8'
                                        : 'bg-orange-600/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Loading Message */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
                            <div className="w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
                            <span className="text-orange-200 font-light">
                                Analyzing your carnivore potential...
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}