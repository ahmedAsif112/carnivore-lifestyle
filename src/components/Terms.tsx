"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Shield, Flame, Crown, AlertCircle, Check, Scale, Eye, Lock, Zap } from 'lucide-react';

const TermsAndConditions = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [acceptedSections, setAcceptedSections] = useState(new Set());

    // Throttled scroll handler
    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        if (Math.abs(y - scrollY) > 5) {
            setScrollY(y);
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

    // Intersection observer for animations
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
            { threshold: 0.1, rootMargin: "50px" }
        );

        const elements = document.querySelectorAll("[data-animate]");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isLoaded]);

    const backgroundTransforms = {
        first: { transform: `translateY(${scrollY * 0.1}px)` },
        second: { transform: `translateY(${scrollY * 0.15}px)` },
        third: { transform: `translateY(${scrollY * -0.1}px)` }
    };

    const sections = [
        {
            id: 'acceptance',
            icon: <Check className="w-6 h-6 text-emerald-400" />,
            title: 'Acceptance of Terms',
            content: 'By accessing and using Carnivore Elite services, you accept and agree to be bound by these terms. If you do not agree to these terms, you may not use our services.'
        },
        {
            id: 'services',
            icon: <Crown className="w-6 h-6 text-amber-400" />,
            title: 'Our Services',
            content: 'Carnivore Elite provides digital meal plans, nutritional guidance, and educational content focused on carnivore diet protocols. All content is for educational purposes and not medical advice.'
        },
        {
            id: 'medical',
            icon: <AlertCircle className="w-6 h-6 text-red-400" />,
            title: 'Medical Disclaimer',
            content: 'Our content is not medical advice. Consult healthcare professionals before starting any diet program. We are not liable for health consequences from following our recommendations.'
        },
        {
            id: 'payment',
            icon: <Scale className="w-6 h-6 text-orange-400" />,
            title: 'Payment & No Refund Policy',
            content: 'All sales are final with NO REFUNDS. Digital products are delivered immediately upon purchase. Due to the instant digital nature of our carnivore meal plans and content, we cannot offer refunds under any circumstances once access is granted.'
        },
        {
            id: 'intellectual',
            icon: <Shield className="w-6 h-6 text-blue-400" />,
            title: 'Intellectual Property',
            content: 'All content, designs, and materials are protected by copyright. Users may not redistribute, resell, or share purchased content without written permission.'
        },
        {
            id: 'privacy',
            icon: <Eye className="w-6 h-6 text-purple-400" />,
            title: 'Privacy & Data',
            content: 'We collect minimal personal data necessary for service delivery. Your information is never sold to third parties. See our Privacy Policy for detailed information handling practices.'
        },
        {
            id: 'limitation',
            icon: <Lock className="w-6 h-6 text-cyan-400" />,
            title: 'Limitation of Liability',
            content: 'Carnivore Elite\'s liability is limited to the amount paid for services. We are not responsible for indirect damages, lost profits, or consequential damages arising from service use.'
        },
        {
            id: 'changes',
            icon: <Zap className="w-6 h-6 text-pink-400" />,
            title: 'Terms Updates',
            content: 'We reserve the right to update these terms. Changes will be posted on this page with an updated effective date. Continued use constitutes acceptance of modified terms.'
        }
    ];

    const toggleSection = (sectionId: any) => {
        const newAccepted = new Set(acceptedSections);
        if (newAccepted.has(sectionId)) {
            newAccepted.delete(sectionId);
        } else {
            newAccepted.add(sectionId);
        }
        setAcceptedSections(newAccepted);
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
                        <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-red-400">Loading Terms...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full opacity-60 blur-xl animate-pulse"
                    style={backgroundTransforms.first}
                />
                <div
                    className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-r from-amber-500/30 to-red-500/30 rounded-full opacity-40 blur-lg animate-bounce"
                    style={backgroundTransforms.second}
                />
                <div
                    className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-red-600/15 to-orange-600/15 rounded-full opacity-50 blur-2xl"
                    style={backgroundTransforms.third}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}


                    {/* Title Section */}
                    <div className="text-center mb-16" data-animate id="header">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-red-500/40 border border-red-500/30">
                                <Scale className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                            <span className="text-white">Terms &</span>
                            <br />
                            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Conditions
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Elite carnivore warriors deserve transparent terms. Review our commitment to your transformation journey.
                        </p>

                        <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-orange-900/50 text-red-400 font-semibold text-sm border border-red-800/50 backdrop-blur-sm">
                            <Flame className="w-4 h-4 mr-2" />
                            Last Updated: January 2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms Sections */}
            <div className="relative z-10 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                data-animate
                                id={`section-${section.id}`}
                                className="group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-red-700/50">
                                            {section.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 group-hover:text-red-300 transition-colors duration-300">
                                                {section.title}
                                            </h3>

                                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                                                {section.content}
                                            </p>

                                            {/* Interactive Accept Button */}
                                            <button
                                                onClick={() => toggleSection(section.id)}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${acceptedSections.has(section.id)
                                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white'
                                                    : 'bg-gradient-to-r from-red-900/50 to-red-800/50 text-red-400 hover:from-red-800/70 hover:to-red-700/70'
                                                    } border border-opacity-50 ${acceptedSections.has(section.id) ? 'border-emerald-500' : 'border-red-700'
                                                    }`}
                                            >
                                                <Check className={`w-4 h-4 transition-transform duration-300 ${acceptedSections.has(section.id) ? 'scale-100' : 'scale-0'
                                                    }`} />
                                                <span>
                                                    {acceptedSections.has(section.id) ? 'Understood' : 'Mark as Read'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="relative z-10 py-16 bg-black/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div data-animate id="contact-section">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Questions About These <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Terms?</span>
                        </h2>

                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Our elite support team is ready to help clarify any aspect of our terms and conditions.
                        </p>

                        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800/30 rounded-2xl p-6 backdrop-blur-sm inline-block">
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">📧</span>
                                </div>
                                <span className="text-red-400 font-semibold">Contact Us</span>
                            </div>
                            <p className="text-white font-semibold">carnivoredietssolutions@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="fixed bottom-8 right-8 z-50">
                <div className="bg-black/90 backdrop-blur-sm border border-red-800/50 rounded-2xl p-4 shadow-xl">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">
                            {acceptedSections.size}/{sections.length}
                        </div>
                        <div className="text-xs text-gray-400">Sections Read</div>
                        <div className="w-16 h-2 bg-red-900/50 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                                style={{ width: `${(acceptedSections.size / sections.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

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

                [data-animate] {
                    animation: fadeInUp 0.6s ease-out forwards;
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

export default TermsAndConditions;