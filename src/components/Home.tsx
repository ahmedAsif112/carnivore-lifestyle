"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Flame, Crown, Zap, Star, Heart, ChevronRight, Check, Award, Shield, Clock, Users, Target, TrendingUp, HeartIcon } from 'lucide-react';
import ribaye from "@/assets/ribaye.png"
import ground from "@/assets/groundbeef.jpg"
import brix from "@/assets/brix.jpg"
import hero from "@/assets/main.jpeg";
import cow from "@/assets/cow.jpg";
import Image from 'next/image';
import { useRouter } from "next/navigation";
const CarnivoreMealPlan = () => {
    const [isVisible, setIsVisible] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Throttled scroll handler
    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        if (Math.abs(y - scrollY) > 5) {
            setScrollY(y);
            setScrolled(y > 20);
        }
    }, [scrollY]);

    useEffect(() => {
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        setIsLoaded(true);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [handleScroll]);

    // Optimize intersection observer
    useEffect(() => {
        if (!isLoaded) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const updates = {};
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const updates: Record<string, boolean> = {};

                        updates[entry.target.id] = true;
                    }
                });

                if (Object.keys(updates).length > 0) {
                    setIsVisible((prev) => ({ ...prev, ...updates }));
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        const elements = document.querySelectorAll("[data-animate]");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isLoaded]);
    const router = useRouter();
    const features = useMemo(() => [
        {
            icon: <Flame className="w-8 h-8 text-red-600" />,
            title: "Metabolic Transformation",
            description: "Unlock your body's fat-burning potential with scientifically designed carnivore protocols that optimize ketosis and metabolic flexibility.",
            color: "from-red-400 to-orange-500"
        },
        {
            icon: <Crown className="w-8 h-8 text-amber-600" />,
            title: "Premium Quality Meats",
            description: "Curated selection of grass-fed, organic, and wild-caught proteins that maximize nutrient density and eliminate inflammatory compounds.",
            color: "from-amber-400 to-yellow-500"
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-600" />,
            title: "Elimination Protocol",
            description: "Remove all plant toxins, anti-nutrients, and inflammatory foods while healing your gut and reducing autoimmune responses.",
            color: "from-emerald-400 to-green-500"
        }
    ], []);

    const mealPlans = useMemo(() => [
        {
            name: "Ribeye Power Bowl",
            image: ribaye,
            protein: "45g",
            fat: "38g",
            calories: "520",
            description: "Prime ribeye with bone marrow butter and sea salt"
        },
        {
            name: "NY Strip Thunder",
            image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            protein: "42g",
            fat: "35g",
            calories: "485",
            description: "Grass-fed NY strip with rendered beef tallow"
        },
        {
            name: "Filet Mignon Elite",
            image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            protein: "48g",
            fat: "28g",
            calories: "420",
            description: "Premium filet with clarified grass-fed butter"
        },
        {
            name: "Lamb Chop Warrior",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            protein: "38g",
            fat: "32g",
            calories: "450",
            description: "Grass-fed lamb chops with lamb fat rendering"
        },
        {
            name: "Prime Brisket Plate",
            image: brix,
            protein: "35g",
            fat: "45g",
            calories: "550",
            description: "Slow-cooked brisket with natural beef drippings"
        },
        {
            name: "Ground Beef Bowl",
            image: ground,
            protein: "40g",
            fat: "30g",
            calories: "410",
            description: "80/20 grass-fed ground beef with added suet"
        }
    ], []);

    const testimonials = useMemo(() => [
        {
            name: "Marcus Steel",
            text: "Transformed my physique in 90 days. Never felt more powerful and focused in my life.",
            rating: 5,
            location: "Austin, TX",
            result: "Lost 35lbs, Gained Muscle"
        },
        {
            name: "Victoria Hunt",
            text: "My autoimmune symptoms vanished. This isn't just a diet, it's a complete healing protocol.",
            rating: 5,
            location: "Denver, CO",
            result: "Healed Inflammation"
        },
        {
            name: "Jake Thunder",
            text: "Mental clarity is off the charts. I'm performing at levels I never thought possible.",
            rating: 5,
            location: "Miami, FL",
            result: "Enhanced Performance"
        }
    ], []);

    const stats = useMemo(() => [
        { number: "10K+", label: "Carnivore Warriors", icon: <Users className="w-6 h-6" /> },
        { number: "180+", label: "Battle-Tested Meals", icon: <Target className="w-6 h-6" /> },
        { number: "97%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
        { number: "30 Days", label: "Transformation", icon: <Clock className="w-6 h-6" /> }
    ], []);

    const backgroundTransforms = useMemo(() => ({
        first: { transform: `translateY(${scrollY * 0.1}px)` },
        second: { transform: `translateY(${scrollY * 0.15}px)` },
        third: { transform: `translateY(${scrollY * -0.1}px)` }
    }), [scrollY]);

    const menuItems = ['Home', 'About', 'Meal Plans', 'Results', 'Contact'];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
                        <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-red-400">Loading Carnivore Protocol...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full opacity-60 blur-xl will-change-transform animate-pulse"
                    style={backgroundTransforms.first}
                />
                <div
                    className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-r from-amber-500/30 to-red-500/30 rounded-full opacity-40 blur-lg will-change-transform animate-bounce"
                    style={backgroundTransforms.second}
                />
                <div
                    className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-red-600/15 to-orange-600/15 rounded-full opacity-50 blur-2xl will-change-transform"
                    style={backgroundTransforms.third}
                />
            </div>

            {/* Enhanced Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${scrolled
                ? 'bg-black/95 backdrop-blur-2xl shadow-2xl shadow-red-500/20 border-b border-red-800/50'
                : 'bg-black/80 backdrop-blur-xl border-b border-red-900/30'
                }`}>
                {/* Animated fire border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 via-amber-500 to-red-500 bg-size-200 animate-gradient"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4 group cursor-pointer relative">
                            <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                <Crown className="w-3 h-3 text-amber-400 animate-bounce" />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 w-14 h-14 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-full opacity-0 group-hover:opacity-40 scale-75 group-hover:scale-110 transition-all duration-500 blur-sm"></div>
                                <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover:shadow-3xl group-hover:shadow-red-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden border border-red-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <Flame className="w-6 h-6 text-white relative z-10" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:via-orange-300 group-hover:to-amber-300 transition-all duration-500">
                                    CARNIVORE
                                </h1>
                                <p className="text-xs text-gray-400 group-hover:text-red-400 transition-colors duration-300 -mt-1">Elite Meal Plans</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {menuItems.map((item, index) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="cursor-pointer relative text-gray-300 hover:text-red-400 transition-all duration-400 font-medium group px-3 py-2"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <span className="relative z-10">{item}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-400 group-hover:w-full rounded-full"></span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                                    <Flame className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-4">
                            <button onClick={() => router.push("/weightloss")} className="hidden sm:flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-semibold rounded-full shadow-2xl shadow-red-500/40 hover:shadow-3xl hover:shadow-red-500/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group border border-red-500/30">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <Crown className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                                <span className="relative z-10">Explore Now</span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-800/70 hover:to-red-700/70 transition-all duration-300 hover:scale-110 border border-red-700/50"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-red-400" />
                                ) : (
                                    <Menu className="w-6 h-6 text-red-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="bg-black/95 backdrop-blur-xl border-t border-red-800/50 shadow-inner">
                        <div className="px-6 py-6 space-y-4">
                            {menuItems.map((item, index) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="cursor-pointer block text-gray-300 hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-800/30 hover:scale-105 transform border border-transparent hover:border-red-800/30"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: mobileMenuOpen ? "slideInUp 0.5s ease-out forwards" : "",
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                                        <span>{item}</span>
                                    </div>
                                </a>
                            ))}

                            <button onClick={() => router.push("/weightloss")} className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group border border-red-500/30">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Crown className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Explore Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center pt-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-4 text-center lg:text-left">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-orange-900/50 text-red-400 font-semibold text-sm animate-pulse border border-red-800/50 backdrop-blur-sm">
                                    <Crown className="w-4 h-4 mr-2" />
                                    Elite Carnivore Protocol
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                <span className="text-white">UNLEASH YOUR</span>
                                <br />
                                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
                                    PRIMAL POWER
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl lg:max-w-none">
                                Transform your body into a fat-burning machine with scientifically designed carnivore meal plans.
                                Eliminate inflammation, maximize performance, and unlock your genetic potential.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                <button onClick={() => router.push("/weightloss")} className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white border-none shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full relative overflow-hidden group border border-red-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="flex items-center space-x-2 relative z-10">
                                        <Flame className="w-5 h-5" />
                                        <span>Start Transformation</span>
                                    </div>
                                </button>

                                <button onClick={() => router.push("/signup")} className="h-14 px-8 text-lg font-semibold border-2 border-red-500 text-red-400 hover:bg-red-900/30 transform hover:scale-105 transition-all duration-300 rounded-full backdrop-blur-sm">
                                    <div className="flex items-center space-x-2">
                                        <HeartIcon className="w-5 h-5" />
                                        <span>Download Guide</span>
                                    </div>
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex pb-8 flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-red-500" />
                                    <span>Zero Carb</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-red-500" />
                                    <span>Maximum Bioavailability</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-red-500" />
                                    <span>Anti-Inflammatory</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative max-w-lg mx-auto">
                            {/* Main Hero Image */}
                            <div className="relative group">
                                <Image
                                    src={cow}

                                    alt="Premium ribeye steak - carnivore meal"
                                    className="mb-9 w-full h-96 sm:h-[500px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-red-800/30"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent rounded-3xl"></div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 bg-black/90 p-4 rounded-2xl shadow-xl animate-bounce border border-red-700/50 backdrop-blur-sm" style={{ animationDelay: '0.5s' }}>
                                    <Flame className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="absolute -bottom-1 -left-4 bg-black/90 p-4 rounded-2xl shadow-xl animate-bounce border border-red-700/50 backdrop-blur-sm" style={{ animationDelay: '1s' }}>
                                    <Crown className="w-6 h-6 text-amber-500" />
                                </div>
                                <div className="absolute top-1/2 -left-6 bg-black/90 p-3 rounded-xl shadow-lg animate-pulse border border-red-700/50 backdrop-blur-sm" style={{ animationDelay: '1.5s' }}>
                                    <Zap className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="absolute top-20 -right-8 bg-black/90 p-3 rounded-xl shadow-lg animate-pulse border border-red-700/50 backdrop-blur-sm" style={{ animationDelay: '2s' }}>
                                    <Award className="w-5 h-5 text-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-black/50 relative z-10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gradient-to-br from-red-900/30 to-black/50 border border-red-800/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
                                    <div className="text-3xl text-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                                    <h3 className="text-3xl font-bold text-white mb-1">{stat.number}</h3>
                                    <p className="text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-red-950/30 to-black/50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-animate id="features-header">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Carnivore Elite</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                            Precision-engineered nutrition protocols designed for maximum performance and metabolic optimization
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="h-full text-center bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 backdrop-blur-sm">
                                    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-white mb-4 text-xl sm:text-2xl font-bold">{feature.title}</h3>
                                    <p className="text-gray-300 text-base font-medium  sm:text-lg leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meal Plans Gallery */}
            <section id="meal plans" className="py-20 bg-gradient-to-br from-black/50 to-red-950/30 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16" data-animate id="meals-header">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Elite <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Meal Arsenal</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                            Battle-tested nutrition protocols engineered for peak performance
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                        {mealPlans.map((meal, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden backdrop-blur-sm">
                                    <div className="relative overflow-hidden h-48 sm:h-56 w-full">
                                        {typeof meal.image === "string" ? (
                                            <img
                                                src={meal.image}
                                                alt={meal.name}
                                                className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-all duration-500"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <Image
                                                src={meal.image}
                                                alt={meal.name}
                                                className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-all duration-500"
                                                width={400}
                                                height={300}
                                                style={{ objectFit: "cover" }}
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-white mb-3 text-lg sm:text-xl font-bold">{meal.name}</h3>
                                        <p className="text-gray-400 text-sm mb-4">{meal.description}</p>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex space-x-4 text-sm">
                                                <span className="text-red-400">
                                                    <span className="font-semibold">{meal.protein}</span> protein
                                                </span>
                                                <span className="text-orange-400">
                                                    <span className="font-semibold">{meal.fat}</span> fat
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => router.push("/signup")}
                                                className="text-red-400 hover:text-red-300 font-semibold text-sm flex items-center space-x-1 group"
                                            >
                                                <span>View Recipe</span>
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Extra text below cards */}
                    <div className="flex justify-center pt-10">
                        <button
                            onClick={() => router.push("/signup")}
                            className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white border-none shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full relative overflow-hidden group border border-red-500/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <div className="flex items-center space-x-2 relative z-10">
                                <Flame className="w-5 h-5" />
                                <span>Unlock Full Arsenal</span>
                            </div>
                        </button>
                    </div>

                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-20 bg-black/50 relative z-10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div data-animate id="about-content">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                The Science of <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Carnivore Excellence</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl border border-red-800/30 backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Target className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white mb-2 font-bold">Metabolic Optimization</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Trigger deep ketosis and metabolic flexibility through precise macronutrient ratios and meal timing protocols.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl border border-red-800/30 backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white mb-2 font-bold">Inflammation Elimination</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Remove all plant toxins, lectins, and anti-nutrients that trigger inflammatory responses and autoimmune reactions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl border border-red-800/30 backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white mb-2 font-bold">Peak Performance</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Maximize mental clarity, physical strength, and endurance through species-appropriate nutrition protocols.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative" data-animate id="about-image">
                            <Image

                                src={hero}
                                alt="Premium meat selection - carnivore lifestyle"
                                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-red-800/30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent rounded-3xl"></div>

                            {/* Floating stats */}
                            <div className="absolute top-6 left-6 bg-black/90 p-4 rounded-xl backdrop-blur-sm border border-red-700/50">
                                <div className="text-2xl font-bold text-red-400">97%</div>
                                <div className="text-xs text-gray-400">Success Rate</div>
                            </div>

                            <div className="absolute bottom-6 right-6 bg-black/90 p-4 rounded-xl backdrop-blur-sm border border-red-700/50">
                                <div className="text-2xl font-bold text-orange-400">30</div>
                                <div className="text-xs text-gray-400">Days to Transform</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="results" className="py-20 bg-gradient-to-br from-red-950/30 to-black/50 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Warrior <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Transformations</span>
                        </h2>
                        <p className="text-lg text-gray-300">Real results from elite carnivore warriors</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="group">
                                <div className="text-center bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm h-full">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <Crown className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 px-4 py-2 rounded-full inline-block border border-red-700/50">
                                            <span className="text-red-400 font-semibold text-sm">{testimonial.result}</span>
                                        </div>
                                    </div>

                                    <p className="text-base sm:text-lg text-gray-300 italic leading-relaxed mb-6">
                                        {testimonial.text}
                                    </p>

                                    <div className="border-t border-red-800/30 pt-6">
                                        <h4 className="text-white mb-1 text-lg font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-400 text-sm mb-3">{testimonial.location}</p>
                                        <div className="flex justify-center text-yellow-400">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-800/30 to-orange-800/30"></div>

                {/* Animated background elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div data-animate id="cta-content">
                        <div className="mb-6">
                            <span className="inline-flex items-center px-6 py-3 rounded-full bg-black/30 text-white font-semibold backdrop-blur-sm border border-red-500/30">
                                <Flame className="w-4 h-4 mr-2" />
                                Limited Time - Transform in 30 Days
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                            Ready to Unleash Your
                            <br />
                            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                Primal Power?
                            </span>
                        </h2>

                        <p className="text-lg sm:text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join the elite carnivore warriors who have transformed their bodies, minds, and lives through precision nutrition
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button onClick={() => router.push("/signup")} className="h-16 px-10 text-xl font-bold bg-white text-red-700 border-none shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="flex items-center space-x-3 relative z-10">
                                    <Crown className="w-6 h-6" />
                                    <span>Join Elite Program - $27.99</span>
                                </div>
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm text-red-100">
                            <div className="flex items-center space-x-2">
                                <Check className="w-5 h-5" />
                                <span>30-Day Meal Plans</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-5 h-5" />
                                <span>Shopping Lists</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-5 h-5" />
                                <span>Expert Support</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-5 h-5" />
                                <span>Lifetime Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-black text-white py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg border border-red-500/30">
                                    <Flame className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-bold bg-gradient-to-r !text-white bg-clip-text text-transparent">CARNIVORE</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                                Elite carnivore meal plans designed to unleash your primal power. Transform your body, mind, and performance through species-appropriate nutrition.
                            </p>
                            <div className="flex space-x-4">
                                <button className="w-12 h-12 bg-red-900/50 hover:bg-red-800/70 rounded-full flex items-center justify-center transition-all duration-300 border border-red-700/50">
                                    <span className="text-red-400">📱</span>
                                </button>
                                <button className="w-12 h-12 bg-red-900/50 hover:bg-red-800/70 rounded-full flex items-center justify-center transition-all duration-300 border border-red-700/50">
                                    <span className="text-red-400">🔥</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-bold">Quick Links</h4>
                            <div className="space-y-3">
                                {['Home', 'About', 'Meal Plans', 'Results'].map((link) => (
                                    <div key={link}>
                                        <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-red-400 transition-colors duration-300 block">
                                            {link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-bold">Contact</h4>
                            <div className="space-y-3">
                                <div className="text-gray-400">
                                    <strong className="text-white">Email:</strong><br />
                                    carnivoredietssolutions@gmail.com
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="border-t border-red-900/50 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © 2024 Carnivore Elite. All rights reserved. Unleash your primal power.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a onClick={() => router.push("/privacy")} className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors text-sm">Privacy Policy</a>
                                <a onClick={() => router.push("/termsandconditions")} className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors text-sm">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Enhanced CSS */}
            <style jsx>{`
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }

        .will-change-transform {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #dc2626, #ea580c);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b91c1c, #c2410c);
        }
      `}</style>
        </div>
    );
};

export default CarnivoreMealPlan;