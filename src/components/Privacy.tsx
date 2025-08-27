"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Clock, CheckCircle, AlertCircle, Crown, Flame } from 'lucide-react';

const PrivacyPolicy = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

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

    const backgroundTransforms = {
        first: { transform: `translateY(${scrollY * 0.1}px)` },
        second: { transform: `translateY(${scrollY * 0.15}px)` },
        third: { transform: `translateY(${scrollY * -0.1}px)` }
    };

    const sections = [
        {
            id: 'information-collection',
            title: 'Information We Collect',
            icon: <Eye className="w-6 h-6" />,
            content: [
                'Personal information you provide when creating an account or purchasing meal plans',
                'Usage data and interaction patterns with our platform',
                'Payment information processed securely through our payment providers',
                'Device and browser information for optimal service delivery'
            ]
        },
        {
            id: 'data-usage',
            title: 'How We Use Your Data',
            icon: <Users className="w-6 h-6" />,
            content: [
                'Deliver personalized carnivore meal plans and nutrition guidance',
                'Process payments and manage your account access',
                'Send important updates about your meal plans and account',
                'Improve our services based on user feedback and analytics'
            ]
        },
        {
            id: 'data-protection',
            title: 'Data Protection',
            icon: <Lock className="w-6 h-6" />,
            content: [
                'Industry-standard encryption for all data transmission',
                'Secure servers with regular security audits and updates',
                'Limited access to personal data on a need-to-know basis',
                'Regular backups with encrypted storage solutions'
            ]
        },
        {
            id: 'third-parties',
            title: 'Third-Party Services',
            icon: <Shield className="w-6 h-6" />,
            content: [
                'Payment processors (Stripe, PayPal) for secure transactions',
                'Analytics services to improve user experience',
                'Email service providers for communication',
                'Cloud storage providers for secure data backup'
            ]
        },
        {
            id: 'your-rights',
            title: 'Your Privacy Rights',
            icon: <CheckCircle className="w-6 h-6" />,
            content: [
                'Access and download your personal data at any time',
                'Request correction of inaccurate information',
                'Delete your account and associated data',
                'Opt-out of marketing communications'
            ]
        },
        {
            id: 'updates',
            title: 'Policy Updates',
            icon: <Clock className="w-6 h-6" />,
            content: [
                'We may update this policy to reflect service changes',
                'Users will be notified of significant changes via email',
                'Continued use constitutes acceptance of updated terms',
                'Previous versions available upon request'
            ]
        }
    ];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-red-400">Loading Privacy Policy...</p>
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

            {/* Navigation */}


            {/* Header Section */}
            <section className="pt-32 pb-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-900/50 to-orange-900/50 text-red-400 font-semibold backdrop-blur-sm border border-red-800/50 mb-6">
                            <Shield className="w-5 h-5 mr-2" />
                            Your Privacy Matters
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                            <span className="text-white">Privacy</span>
                            <br />
                            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            We’re committed to protecting your privacy and personal information. Here’s how we collect, use, and safeguard your data.
                        </p>
                    </div>

                    <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span>Last Updated: December 2024</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-red-500" />
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Introduction */}
                    <div className="mb-16 text-center">
                        <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-3xl p-8 backdrop-blur-sm">
                            <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-4">Elite Privacy Standards</h2>
                            <p className="text-gray-300 leading-relaxed">
                                At Carnivore Elite, we maintain the highest standards for data protection. Your trust is earned through transparency, security, and respect for your personal information.
                            </p>
                        </div>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className="group opacity-0 animate-fadeInUp"
                                style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                            >
                                <div className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-800/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {section.content.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-300 leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute top-4 left-4 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/5 rounded-full animate-bounce"></div>

                            <div className="relative z-10">
                                <AlertCircle className="w-12 h-12 text-white mx-auto mb-4 opacity-90" />
                                <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
                                <p className="text-red-100 mb-6 leading-relaxed">
                                    We’re here to help. Contact our privacy team for any questions about how we handle your data.
                                </p>
                                <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm border border-red-500/30">
                                    <p className="text-white font-semibold">Email: carnivoredietssolutions.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 relative z-10 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                            <Flame className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">CARNIVORE</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2024 Carnivore Elite. All rights reserved. Your privacy is our priority.
                    </p>
                </div>
            </footer>

            {/* Enhanced CSS */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { 
                        transform: translateY(30px); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateY(0); 
                        opacity: 1; 
                    }
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                
                .bg-size-200 {
                    background-size: 200% 200%;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out;
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

export default PrivacyPolicy;