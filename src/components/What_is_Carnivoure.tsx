"use client";
import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Typography, Form } from 'antd';
import { BookOutlined, GiftOutlined, CheckCircleOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import image from "@/assets/protein.webp"
import Image from 'next/image';
import { useRouter } from "next/navigation";
const { Title, Text, Paragraph } = Typography;

export default function CarnivoreLanding() {
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [animatedCards, setAnimatedCards] = useState([false, false, false, false]);
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);

        // Animate cards one by one
        const delays = [500, 700, 900, 1100];
        delays.forEach((delay, index) => {
            setTimeout(() => {
                setAnimatedCards(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            }, delay);
        });

        // ✅ Load saved user data
        const savedName = localStorage.getItem("name");
        const savedEmail = localStorage.getItem("userEmail");

        if (savedName && savedEmail) {
            const userData = { name: savedName, email: savedEmail };
            form.setFieldsValue(userData);
            setFormData(userData);
            setIsFormValid(true);
            setFormSubmitted(true); // optional
        }
    }, [form]);


    const handleFormChange = () => {
        const values = form.getFieldsValue();
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        const hasAllFields = values.name && values.email;
        setIsFormValid(hasAllFields && !hasErrors);
        setFormData(values);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setFormSubmitted(true);
            setFormData(values);

            // Save separately instead of JSON
            localStorage.setItem("name", values.name);
            localStorage.setItem("userEmail", values.email);

            console.log("Form submitted:", values);
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };


    const bookCards = [
        { title: "Beginner's Guide", icon: "📖", bgColor: "from-orange-500/80 to-orange-600/80" },
        { title: "Meal Planning", icon: "🥩", bgColor: "from-orange-500/80 to-orange-600/80" },
        { title: "Success Stories", icon: "🏆", bgColor: "from-orange-500/80 to-orange-600/80" },
        { title: "Quick Recipes", icon: "⚡", bgColor: "from-orange-500/80 to-orange-600/80" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    >
                        🥩
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header Section */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    {/* Logo */}
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-2xl">🥩</span>
                        </div>
                        <div className="space-y-1">
                            <Title level={1} className="!text-red-400 !mb-0 !text-2xl font-medium tracking-wide">
                                CARNIVORE
                            </Title>
                            <Text className="text-orange-300 text-base font-normal tracking-wider">
                                MEAL PLANNER
                            </Text>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="mb-8">
                        <Title level={2} className="!text-white !mb-4 !text-3xl lg:!text-4xl font-normal">
                            Welcome to Your
                        </Title>
                        <Title level={1} className="!text-orange-400 !mb-6 !text-3xl lg:!text-4xl font-medium bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                            Carnivore Journey!
                        </Title>
                        <Paragraph className="!text-gray-300 !text-base max-w-2xl mx-auto font-light">
                            Discover the power of meat-based nutrition with a personalized meal plan designed just for you
                        </Paragraph>
                    </div>
                </div>

                {/* Free Bonus Section */}
                <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <Card className="bg-gradient-to-r from-orange-800/80 to-orange-800/80 border border-orange-500/30 shadow-xl backdrop-blur-sm rounded-2xl">
                        <div className="text-center space-y-6">
                            <div className="flex justify-center items-center space-x-4 mb-4">
                                <GiftOutlined className="text-3xl text-yellow-400 animate-bounce" />
                                <Title level={2} className="!text-yellow-400 !mb-0 !text-2xl font-medium">
                                    FREE BONUS!
                                </Title>
                                <GiftOutlined className="text-3xl text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                            </div>

                            <Paragraph className="!text-orange-200 !text-base !mb-4 font-light">
                                Complete our quick survey and get
                            </Paragraph>

                            <Title level={1} className="!text-yellow-300 !mb-4 !text-3xl lg:!text-4xl font-medium animate-pulse">
                                4 FREE CARNIVORE BOOKS
                            </Title>

                            <Text className="text-gray-300 text-base font-light">
                                Worth $197 - Yours absolutely free!
                            </Text>

                            {/* Book Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                                {bookCards.map((book, index) => (
                                    <div
                                        key={book.title}
                                        className={`transition-all duration-700 ${animatedCards[index] ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-12'
                                            }`}
                                    >
                                        <Card className={`bg-gradient-to-br ${book.bgColor} border-orange-400/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl`}>
                                            <div className="text-center p-2">
                                                <div className="text-2xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                                                    {book.icon}
                                                </div>
                                                <Text className="text-white font-normal text-sm">
                                                    {book.title}
                                                </Text>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form Section */}
                <div className={`max-w-lg mx-auto mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                        {!formSubmitted ? (
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                        <GiftOutlined className="text-xl text-white" />
                                    </div>
                                    <Title level={3} className="!text-gray-800 !mb-2 !text-xl font-medium">
                                        Get Your FREE Books Now!
                                    </Title>
                                    <Text className="text-gray-600 font-light">
                                        Enter your details to start your transformation
                                    </Text>
                                </div>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFieldsChange={handleFormChange}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Please enter your full name!' },
                                            { min: 2, message: 'Name must be at least 2 characters long!' },
                                            { pattern: /^[a-zA-Z\s]+$/, message: 'Name should only contain letters and spaces!' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            prefix={<UserOutlined className="text-gray-400" />}
                                            placeholder="Enter your full name"
                                            className="rounded-xl border border-gray-200 focus:border-orange-500 hover:border-orange-300"
                                            style={{ height: '48px' }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please enter your email address!' },
                                            { type: 'email', message: 'Please enter a valid email address!' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            type="email"
                                            prefix={<MailOutlined className="text-gray-400" />}
                                            placeholder="Enter your email address"
                                            className="rounded-xl border border-gray-200 focus:border-orange-500 hover:border-orange-300"
                                            style={{ height: '48px' }}
                                        />
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid}
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 border-0 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                    >
                                        Get My FREE Books & Start Journey! →
                                    </Button>
                                </Form>

                                <div className="mt-4 text-center">
                                    <Text className="text-gray-500 text-sm font-light">
                                        🔒 100% secure • No spam • Unsubscribe anytime
                                    </Text>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                    <CheckCircleOutlined className="text-3xl text-green-500" />
                                </div>
                                <Title level={3} className="!text-green-600 !mb-4 !text-xl font-medium">
                                    Welcome {formData.name}! 🎉
                                </Title>
                                <Paragraph className="!text-gray-600 !mb-6 font-light">
                                    Your free books are waiting… ⏳ Answer a few quick questions
                                </Paragraph>
                                <Button
                                    onClick={() => router.push("/step1")}
                                    size="large"
                                    className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white rounded-xl px-8 h-11 font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    Continue to Survey →
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* What is Carnivore Section */}
                <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl overflow-hidden rounded-2xl">
                        <div className="grid lg:grid-cols-2 gap-8 p-8">
                            {/* Content */}
                            <div className="space-y-6">
                                <Title level={2} className="!text-gray-800 !mb-4 !text-2xl font-medium">
                                    What is the Carnivore Diet? 🥩
                                </Title>

                                <Paragraph className="!text-gray-600 !text-base !leading-relaxed font-light">
                                    The carnivore diet is a revolutionary approach to nutrition that focuses exclusively on
                                    animal-based foods. By eliminating plant foods and focusing on nutrient-dense meats,
                                    many people experience incredible transformations.
                                </Paragraph>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Rapid Fat Loss", desc: "Burn fat efficiently with zero-carb approach", icon: "🔥" },
                                        { title: "Mental Clarity", desc: "Experience enhanced focus and brain function", icon: "🧠" },
                                        { title: "Reduced Inflammation", desc: "Eliminate inflammatory plant compounds", icon: "✨" },
                                        { title: "Simplified Eating", desc: "No counting, measuring, or complicated rules", icon: "⚡" }
                                    ].map((benefit, index) => (
                                        <div
                                            key={benefit.title}
                                            className={`bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-fadeInUp' : ''
                                                }`}
                                            style={{ animationDelay: `${800 + index * 200}ms` }}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <span className="text-xl">{benefit.icon}</span>
                                                <div>
                                                    <Title level={5} className="!text-gray-800 !mb-1 !text-base font-medium">
                                                        {benefit.title}
                                                    </Title>
                                                    <Text className="text-gray-600 text-sm font-light">
                                                        {benefit.desc}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                                    <Title level={4} className="!text-orange-700 !mb-2 !text-lg font-medium">
                                        Perfect for Beginners! 🌟
                                    </Title>
                                    <Text className="text-gray-600 font-light">
                                        Our comprehensive guides and meal plans make it easy to start your carnivore journey,
                                        even if you're completely new to this way of eating.
                                    </Text>
                                </div>
                            </div>

                            {/* Image/Visual */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-4 h-full flex items-center justify-center overflow-hidden">
                                    {/* Image Container */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            src={image}
                                            alt="Animal-based nutrition"
                                            width={600}
                                            height={400}
                                            className={`w-full h-full object-contain rounded-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form Section */}
                <div className={`pt-8 max-w-lg mx-auto mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                        {!formSubmitted ? (
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                        <GiftOutlined className="text-xl text-white" />
                                    </div>
                                    <Title level={3} className="!text-gray-800 !mb-2 !text-xl font-medium">
                                        Get Your FREE Books Now!
                                    </Title>
                                    <Text className="text-gray-600 font-light">
                                        Enter your details to start your transformation
                                    </Text>
                                </div>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFieldsChange={handleFormChange}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Please enter your full name!' },
                                            { min: 2, message: 'Name must be at least 2 characters long!' },
                                            { pattern: /^[a-zA-Z\s]+$/, message: 'Name should only contain letters and spaces!' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            prefix={<UserOutlined className="text-gray-400" />}
                                            placeholder="Enter your full name"
                                            className="rounded-xl border border-gray-200 focus:border-orange-500 hover:border-orange-300"
                                            style={{ height: '48px' }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please enter your email address!' },
                                            { type: 'email', message: 'Please enter a valid email address!' }
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            type="email"
                                            prefix={<MailOutlined className="text-gray-400" />}
                                            placeholder="Enter your email address"
                                            className="rounded-xl border border-gray-200 focus:border-orange-500 hover:border-orange-300"
                                            style={{ height: '48px' }}
                                        />
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid}
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 border-0 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                    >
                                        Get My FREE Books & Start Journey! →
                                    </Button>
                                </Form>

                                <div className="mt-4 text-center">
                                    <Text className="text-gray-500 text-sm font-light">
                                        🔒 100% secure • No spam • Unsubscribe anytime
                                    </Text>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                    <CheckCircleOutlined className="text-3xl text-green-500" />
                                </div>
                                <Title level={3} className="!text-green-600 !mb-4 !text-xl font-medium">
                                    Welcome {formData.name}! 🎉
                                </Title>
                                <Paragraph className="!text-gray-600 !mb-6 font-light">
                                    Your free books are waiting… ⏳ Answer a few quick questions
                                </Paragraph>
                                <Button
                                    onClick={() => router.push("/step1")}
                                    size="large"
                                    className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white rounded-xl px-8 h-11 font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    Continue to Survey →
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Hello World Section */}
                <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Card className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 border border-purple-500/30 shadow-xl backdrop-blur-sm rounded-2xl">
                        <div className="text-center p-8 space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-pulse">
                                <span className="text-3xl">👋</span>
                            </div>

                            <Title level={1} className="!text-white !mb-4 !text-4xl lg:!text-5xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                Hello World!
                            </Title>

                            <Paragraph className="!text-purple-200 !text-lg !mb-6 font-light max-w-2xl mx-auto">
                                Welcome to the world of carnivore nutrition! This is where your transformation begins.
                                Say hello to a new you with our revolutionary meal planning system.
                            </Paragraph>

                            <div className="flex flex-wrap justify-center gap-4 text-2xl animate-pulse">
                                <span>🌟</span>
                                <span>🚀</span>
                                <span>💪</span>
                                <span>🎯</span>
                                <span>✨</span>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-400/20 mt-6">
                                <Text className="text-purple-100 text-base font-light">
                                    Ready to say hello to your best self? Join the carnivore revolution today!
                                </Text>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <Text className="text-gray-300 font-light">
                        Join thousands of people who transformed their health with the carnivore diet
                    </Text>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}