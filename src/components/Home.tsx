"use client";
import image from "@/assets/protein.webp"
import React, { useState, useEffect } from 'react';
import { Flame, Crown, Shield, Target, CheckCircle, Star, Users, TrendingUp, Award, ChevronRight, User, Mail, Gift, Heart, MapPin, Phone } from 'lucide-react';
import collage from "@/assets/collagehero.png"
import cow from "@/assets/cow.jpg"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Button } from "antd";
const CarnivoreFunnelPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Form states
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState({ name: '', email: '' });
    const [animatedCards, setAnimatedCards] = useState([false, false, false, false]);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Auto-rotate testimonials
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);


        // Animate cards
        const delays = [500, 700, 900, 1100];
        delays.forEach((delay, index) => {
            setTimeout(() => {
                setAnimatedCards((prev) => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            }, delay);
        });

        // ✅ Restore saved data from localStorage
        const savedName = localStorage.getItem("name");
        const savedEmail = localStorage.getItem("userEmail");

        if (savedName && savedEmail) {
            const userData = { name: savedName, email: savedEmail };
            setFormData(userData);
            setIsFormValid(true);
            setFormSubmitted(true);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };


    }, []);


    const testimonials = [
        {
            name: "Sarah Johnson",
            result: "Lost 28lbs in 30 days",
            text: "This program completely transformed how I think about nutrition. The meal plans are simple, delicious, and incredibly effective.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Marcus Chen",
            result: "Eliminated joint pain",
            text: "After years of inflammation issues, I finally found relief. The carnivore approach healed my body from the inside out.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Lisa Rodriguez",
            result: "Energy levels doubled",
            text: "I wake up refreshed and maintain steady energy all day. No more afternoon crashes or brain fog.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];



    // Form validation
    const validateField = (name: any, value: any) => {
        let error = '';

        if (name === 'name') {
            if (!value || value.trim().length === 0) {
                error = 'Please enter your full name!';
            } else if (value.trim().length < 2) {
                error = 'Name must be at least 2 characters long!';
            } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                error = 'Name should only contain letters and spaces!';
            }
        }

        if (name === 'email') {
            if (!value || value.trim().length === 0) {
                error = 'Please enter your email address!';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Please enter a valid email address!';
            }
        }

        return error;
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim();

        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, trimmedValue);
        setFormErrors(prev => ({ ...prev, [name]: error }));

        // Check if form is valid
        const updatedFormData = { ...formData, [name]: value };
        const updatedErrors = { ...formErrors, [name]: error };

        const nameError = name === 'name' ? error : validateField('name', updatedFormData.name);
        const emailError = name === 'email' ? error : validateField('email', updatedFormData.email);

        const hasErrors = nameError || emailError;
        const hasAllFields = updatedFormData.name.trim() && updatedFormData.email.trim();

        setIsFormValid(hasAllFields && !hasErrors);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validate all fields
        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);

        if (nameError || emailError) {
            setFormErrors({ name: nameError, email: emailError });
            return;
        }

        try {
            setFormSubmitted(true);

            // Save to localStorage (for your environment)
            localStorage.setItem("name", formData.name.trim());
            localStorage.setItem("userEmail", formData.email.trim());

            console.log("Form submitted:", {
                name: formData.name.trim(),
                email: formData.email.trim()
            });
        } catch (error) {
            console.log("Form submission failed:", error);
        }

    };

    const handleContinueToSurvey = () => {
        // router.push("/step1"); // For your Next.js environment
        router.push("/step1");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full opacity-40 blur-lg animate-bounce" />


            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-xl border border-red-500/30">
                                <Flame className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                    CARNIVORE
                                </h1> */}
                                <h1 className="text-2xl font-serif font-normal text-white">
                                    Carnivore Diet
                                </h1>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>10,000+ Active Members</span>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-7 items-center">
                            {/* Content */}
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-orange-900/50 text-red-400 font-semibold text-sm border border-red-800/50 backdrop-blur-sm">
                                        <Crown className="w-4 h-4 mr-2" />
                                        Welcome to Your Transformation
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    <span className="text-white">Discover the</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                        Carnivore Advantage
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                                    Welcome to a proven system that has helped over 10,000 people transform their health,
                                    energy, and physique through the power of carnivore nutrition. You’re about to discover
                                    why this ancient way of eating is the key to unlocking your body’s true potential.
                                </p>

                                <Button
                                    type="primary"
                                    size="large"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-5 shadow-lg"
                                >
                                    Buy Now
                                </Button>

                                {/* Trust Indicators */}
                                <div className="flex flex-wrap gap-6 mb-6 text-sm pt-7 text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Science-Backed</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Expert-Designed</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Proven Results</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image/Visual */}
                            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                <div className="relative bg-gradient-to-br from-red-100/10 to-orange-100/10 rounded-3xl p-8 backdrop-blur-sm border border-red-800/20">
                                    {/* Main Visual - Premium Steak */}
                                    <div className="relative mb-8">
                                        <Image
                                            src={collage}
                                            alt="Premium ribeye steak"
                                            className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-2xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-2xl" />

                                        {/* Floating Quality Badges */}
                                        <div className="absolute -top-3 -right-3 bg-black/90 p-3 rounded-xl shadow-lg animate-pulse border border-red-700/50 backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-red-400">A+</div>
                                                <div className="text-xs text-gray-400">Grade</div>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-3 -left-3 bg-black/90 p-3 rounded-xl shadow-lg animate-bounce border border-red-700/50 backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-orange-400">100%</div>
                                                <div className="text-xs text-gray-400">Grass-Fed</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center space-y-6">
                                        <div className="flex justify-center items-center space-x-4 mb-4">
                                            <Gift className="text-3xl text-yellow-400 animate-bounce" />
                                            <h2 className="text-yellow-400 text-2xl font-bold">FREE BONUS!</h2>
                                            <Gift
                                                className="text-3xl text-yellow-400 animate-bounce"
                                                style={{ animationDelay: "0.5s" }}
                                            />
                                        </div>

                                        <p className="text-orange-200 text-base font-light">
                                            Complete our quick survey and get
                                        </p>

                                        <h1 className="text-yellow-300 text-3xl lg:text-4xl font-bold animate-pulse">
                                            6+ FREE CARNIVORE BOOKS
                                        </h1>

                                        {/* 🎀 Green Ribbon Behind Text */}
                                        <div className="flex justify-center">
                                            <div className="relative inline-block">
                                                <div className="bg-green-600 text-white font-bold px-6 py-2 rounded-sm relative z-10">
                                                    Worth $197 - Yours absolutely free!
                                                </div>
                                                {/* Left ribbon edge */}
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-3 h-0 border-t-[20px] border-b-[20px] border-r-[12px] border-r-green-700 border-t-transparent border-b-transparent"></div>
                                                {/* Right ribbon edge */}
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-3 h-0 border-t-[20px] border-b-[20px] border-l-[12px] border-l-green-700 border-t-transparent border-b-transparent"></div>
                                            </div>
                                        </div>


                                    </div>
                                    {/* Benefits Grid */}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                {/* Form Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-red-900 via-red-800 to-red-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce" />
                    <div className="max-w-lg mx-auto relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
                            {!formSubmitted ? (
                                <div>
                                    <div className="text-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-gray-800 text-xl font-medium mb-2">
                                            Get Your FREE Books Now!
                                        </h3>
                                        <p className="text-gray-600 font-light">
                                            Enter your details to start your transformation
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-orange-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email address"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-orange-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid}
                                            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                                        >
                                            ✨ Get My FREE Books & Start Journey! →
                                        </button>

                                    </form>

                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500 text-sm font-light">
                                            🔒 100% secure • No spam
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                        <CheckCircle className="w-7 h-7 text-green-500" />
                                    </div>
                                    <h3 className="text-green-600 text-xl font-medium mb-4">
                                        Welcome {formData.name}! 🎉
                                    </h3>
                                    <p className="text-gray-600 mb-6 font-light">
                                        Your free books are waiting… ⏳ Answer a few quick questions
                                    </p>
                                    <button
                                        onClick={handleContinueToSurvey}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                        Continue to Survey →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>


                {/* Stats Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-8 bg-black/30 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { number: "10,000+", label: "Success Stories", icon: <Users className="w-6 h-6" /> },
                                { number: "97%", label: "Satisfaction Rate", icon: <TrendingUp className="w-6 h-6" /> },
                                { number: "30", label: "Day Results", icon: <Target className="w-6 h-6" /> },
                                { number: "24/7", label: "Expert Support", icon: <Award className="w-6 h-6" /> }
                            ].map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
                                        <div className="text-2xl text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</h3>
                                        <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Science of Carnivore Excellence Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-red-950 via-red-900 to-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                                        The Science of <span className="text-red-400">Carnivore</span>
                                        <br />
                                        <span className="text-orange-400">Excellence</span>
                                    </h2>
                                </div>

                                {/* Science Points */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-red-900/30 to-black/50 p-6 rounded-2xl border border-red-800/30 backdrop-blur-sm">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Target className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Metabolic Optimization</h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Trigger deep ketosis and metabolic flexibility through precise macronutrient
                                                    ratios and meal timing protocols.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-red-900/30 to-black/50 p-6 rounded-2xl border border-red-800/30 backdrop-blur-sm">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Inflammation Elimination</h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Remove all plant toxins, lectins, and anti-nutrients that trigger
                                                    inflammatory responses and autoimmune reactions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-red-900/30 to-black/50 p-6 rounded-2xl border border-red-800/30 backdrop-blur-sm">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Flame className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Peak Performance</h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Maximize mental clarity, physical strength, and endurance through species-
                                                    appropriate nutrition protocols.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative">
                                <div className="relative bg-gradient-to-br from-red-900/20 to-black/40 rounded-3xl p-8 border border-red-800/30 backdrop-blur-sm">
                                    {/* Main meat image */}
                                    <div className="relative mb-8">
                                        <Image
                                            src={cow}
                                            alt="Premium cuts of meat"
                                            className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent rounded-2xl" />

                                        {/* Floating badges */}
                                        <div className="absolute -top-4 -right-4 bg-black/90 p-4 rounded-xl shadow-xl border border-red-700/50 backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-400">97%</div>
                                                <div className="text-xs text-gray-400">Success Rate</div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Bottom stats grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-red-900/40 to-black/60 p-4 rounded-xl border border-red-800/30 text-center">
                                            <div className="text-red-400 mb-2 flex justify-center">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div className="text-lg font-bold text-white">10,000+</div>
                                            <div className="text-xs text-gray-400">Success Stories</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-900/40 to-black/60 p-4 rounded-xl border border-orange-800/30 text-center">
                                            <div className="text-orange-400 mb-2 flex justify-center">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            <div className="text-lg font-bold text-white">24/7</div>
                                            <div className="text-xs text-gray-400">Expert Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* What is Carnivore Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-br from-black via-red-950 to-red-900">
                    <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl overflow-hidden rounded-2xl">
                            <div className="grid lg:grid-cols-2 gap-8 p-8">
                                {/* Content */}
                                <div className="space-y-6">
                                    <h2 className="text-gray-800 text-3xl font-bold mb-4">
                                        What is the Carnivore Diet? 🥩
                                    </h2>

                                    <p className="text-gray-600 text-base leading-relaxed font-light">
                                        The carnivore diet is a revolutionary approach to nutrition that focuses exclusively on
                                        animal-based foods. By eliminating plant foods and focusing on nutrient-dense meats,
                                        many people experience incredible transformations in their health, energy, and body composition.
                                    </p>

                                    {/* What You Eat Section */}
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                                        <h4 className="text-green-700 mb-3 text-lg font-semibold">
                                            What You Can Eat 📝
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                            <div className="space-y-2">
                                                <p className="text-gray-700 font-medium">• Red Meat (Beef, Lamb, Bison)</p>
                                                <p className="text-gray-700 font-medium">• Poultry (Chicken, Duck, Turkey)</p>
                                                <p className="text-gray-700 font-medium">• Fish & Seafood</p>
                                                <p className="text-gray-700 font-medium">• Organ Meats</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-gray-700 font-medium">• Eggs (from any animal)</p>
                                                <p className="text-gray-700 font-medium">• Animal Fats (Tallow, Lard)</p>
                                                <p className="text-gray-700 font-medium">• Bone Broth</p>
                                                <p className="text-gray-700 font-medium">• Salt & Water</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefits Grid */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { title: "Rapid Fat Loss", desc: "Burn fat efficiently with zero-carb ketogenic approach", icon: "🔥" },
                                            { title: "Mental Clarity", desc: "Experience enhanced focus and brain function", icon: "🧠" },
                                            { title: "Reduced Inflammation", desc: "Eliminate inflammatory plant compounds and lectins", icon: "✨" },
                                            { title: "Simplified Eating", desc: "No counting, measuring, or complicated meal prep", icon: "⚡" },
                                            { title: "Better Digestion", desc: "Heal gut issues and improve digestive health", icon: "🦋" },
                                            { title: "Stable Energy", desc: "No blood sugar spikes or energy crashes", icon: "⚡" }
                                        ].map((benefit, index) => (
                                            <div
                                                key={benefit.title}
                                                className={`bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:scale-105 `}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-xl">{benefit.icon}</span>
                                                    <div>
                                                        <h5 className="text-gray-800 mb-1 text-base font-medium">
                                                            {benefit.title}
                                                        </h5>
                                                        <p className="text-gray-600 text-sm font-light">
                                                            {benefit.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* How It Works */}
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
                                        <h4 className="text-blue-700 mb-3 text-lg font-semibold">
                                            How Does It Work? 🔬
                                        </h4>
                                        <p className="text-gray-600 font-light mb-3">
                                            By removing all plant foods, you eliminate potential irritants, toxins, and anti-nutrients
                                            that can cause inflammation and digestive issues. Your body enters a state of nutritional
                                            ketosis, burning fat for fuel while providing complete amino acid profiles from high-quality animal proteins.
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p>• <strong>Week 1-2:</strong> Adaptation phase, electrolyte balance</p>
                                            <p>• <strong>Week 3-4:</strong> Energy stabilizes, cravings diminish</p>
                                            <p>• <strong>Month 2+:</strong> Full benefits emerge, body composition changes</p>
                                        </div>
                                    </div>

                                    {/* Perfect for Beginners */}
                                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                                        <h4 className="text-orange-700 mb-2 text-lg font-semibold">
                                            Perfect for Beginners! 🌟
                                        </h4>
                                        <p className="text-gray-600 font-light mb-3">
                                            Our comprehensive guides and meal plans make it easy to start your carnivore journey,
                                            even if you’re completely new to this way of eating.
                                        </p>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p>✅ Step-by-step meal plans</p>
                                            <p>✅ Shopping lists and prep guides</p>
                                            <p>✅ Expert support and community</p>
                                            <p>✅ Transition strategies from any diet</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Image/Visual */}
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-6 h-full">
                                        {/* Main Image - Fixed to show full image */}
                                        <div className="relative mb-6">
                                            <Image
                                                src={image}
                                                alt="Animal-based nutrition foods"
                                                className={`w-full h-auto object-contain rounded-lg shadow-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ aspectRatio: '3/2', maxHeight: '500px' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                                        </div>

                                        {/* Key Stats */}
                                        <div className="space-y-4">
                                            <h4 className="text-gray-800 text-xl font-bold text-center mb-4">
                                                Why Carnivore Works
                                            </h4>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/80 p-4 rounded-xl text-center border border-orange-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-red-600">0g</div>
                                                    <div className="text-sm text-gray-600">Carbohydrates</div>
                                                </div>
                                                <div className="bg-white/80 p-4 rounded-xl text-center border border-orange-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-blue-600">100%</div>
                                                    <div className="text-sm text-gray-600">Bioavailable</div>
                                                </div>
                                                <div className="bg-white/80 p-4 rounded-xl text-center border border-orange-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-green-600">20+</div>
                                                    <div className="text-sm text-gray-600">Amino Acids</div>
                                                </div>
                                                <div className="bg-white/80 p-4 rounded-xl text-center border border-orange-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-purple-600">Zero</div>
                                                    <div className="text-sm text-gray-600">Plant Toxins</div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Form Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-red-900 via-red-800 to-red-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-bounce" />
                    <div className="max-w-lg mx-auto relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
                            {!formSubmitted ? (
                                <div>
                                    <div className="text-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-gray-800 text-xl font-medium mb-2">
                                            Get Your FREE Books Now!
                                        </h3>
                                        <p className="text-gray-600 font-light">
                                            Enter your details to start your transformation
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-orange-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email address"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-orange-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid}
                                            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                                        >
                                            ✨ Get My FREE Books & Start Journey! →
                                        </button>

                                    </form>

                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500 text-sm font-light">
                                            🔒 100% secure • No spam
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                        <CheckCircle className="w-7 h-7 text-green-500" />
                                    </div>
                                    <h3 className="text-green-600 text-xl font-medium mb-4">
                                        Welcome {formData.name}! 🎉
                                    </h3>
                                    <p className="text-gray-600 mb-6 font-light">
                                        Your free books are waiting… ⏳ Answer a few quick questions
                                    </p>
                                    <button
                                        onClick={handleContinueToSurvey}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                        Continue to Survey →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* Testimonial Carousel */}
                <section className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Real People, <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Real Results</span>
                            </h2>
                            <p className="text-gray-300 text-lg">Join thousands who have already transformed their lives</p>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-sm">
                                <div className="mb-6">

                                    <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 px-4 py-2 rounded-full inline-block border border-red-700/50 mb-4">
                                        <span className="text-red-400 font-semibold text-sm">{testimonials[currentTestimonial].result}</span>
                                    </div>
                                </div>

                                <blockquote className="text-lg sm:text-xl text-gray-300 italic mb-6 leading-relaxed">
                                    {testimonials[currentTestimonial].text}
                                </blockquote>

                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{testimonials[currentTestimonial].name}</h4>
                                    <div className="flex justify-center text-yellow-400 mb-4">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Indicators */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                            ? 'bg-red-500 scale-125'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



                {/* Footer */}
                <footer className="bg-gradient-to-br from-black via-red-950 to-red-900 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-20 left-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-xl" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                            {/* Brand Section */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-xl border border-red-500/30">
                                        <Flame className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                            CARNIVORE
                                        </h1>
                                        <p className="text-xs text-gray-400 -mt-1">Elite Protocol</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed max-w-md">
                                    Transform your health, energy, and physique through the power of carnivore nutrition.
                                    Join thousands who have already discovered the ancient way of eating that unlocks your body’s true potential.
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span>10,000+ Success Stories</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Heart className="w-4 h-4 text-red-400" />
                                        <span>97% Satisfaction Rate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-white font-semibold mb-4 flex items-center">
                                    <Target className="w-4 h-4 mr-2 text-red-400" />
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    <li><a href="#science" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">Science & Research</a></li>
                                    <li><a href="#testimonials" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">Success Stories</a></li>
                                    <li><a href="#what-is-carnivore" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">What is Carnivore?</a></li>
                                    <li><a href="#benefits" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">Benefits</a></li>
                                    <li><a href="#start" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">Start Your Journey</a></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-white font-semibold mb-4 flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-red-400" />
                                    Support
                                </h3>
                                <ul className="space-y-3">
                                    <li><a href="#community" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm">Community</a></li>
                                    <li className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Phone className="w-3 h-3" />
                                        <span>24/7 Expert Support</span>
                                    </li>
                                    <li className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Mail className="w-3 h-3" />
                                        <span>carnivoredietssolutions@gmail.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-12 pt-8 border-t border-red-800/30">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                    <span>© 2025 Carnivore Elite Protocol. All rights reserved.</span>
                                </div>

                                <div className="flex items-center space-x-6 text-sm">
                                    <a onClick={() => router.push("/privacy")} className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-300">Privacy Policy</a>
                                    <a onClick={() => router.push("/termsandconditions")} className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-300">Terms of Service</a>
                                </div>
                            </div>


                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
              @keyframes blinkJump {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }
  .animate-blinkJump {
    animation: blinkJump 1.5s infinite;
  }
            
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
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
};

export default CarnivoreFunnelPage;