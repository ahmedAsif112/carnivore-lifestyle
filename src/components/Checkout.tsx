'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const plans = [
    {
        id: '4w',
        title: '4-week plan',
        newPrice: '$24.99',
    },
];

export default function PlanPage() {
    const router = useRouter();
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
        const storedEmail = localStorage.getItem('email');
        const storedGender = localStorage.getItem('gender');
        if (storedEmail) setEmail(storedEmail);
        if (storedGender === 'Male' || storedGender === 'Female') setGender(storedGender);
    }, []);

    const formatTime = () => {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const genderLabel = gender === 'Female' ? 'women' : 'men';

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                planId: selectedPlan,
            }),
        });

        const data = await res.json();

        if (data.url) {
            window.location.href = data.url; // ✅ Correct Stripe redirection
        } else {
            alert('Payment session creation failed.');
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            <div className="sticky top-0 z-50 w-full bg-pink-100 text-black text-center py-2 text-sm font-medium">
                Introductory offer expires in: <span className="font-bold">{formatTime()}</span>
            </div>

            <div className="max-w-xl mx-auto px-4 pt-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl p-6 text-center mb-8">
                    <div className="bg-purple-800 px-4 py-1 rounded-full inline-block mb-4 text-sm">
                        {email || 'Loading email...'}
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Your personalized Weight Loss Plan is ready</h2>
                    <ul className="text-sm text-left space-y-2">
                        <li>✔️ Perfect for {genderLabel} over 22</li>
                        <li>✔️ For Carnivore competent</li>
                        <li>✔️ For lightly active lifestyle</li>
                        <li>✔️ No dietary restrictions</li>
                    </ul>
                </div>

                <h3 className="text-lg font-bold mb-4 text-center">Get visible results in 4 weeks!</h3>
                <div className="space-y-4">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`flex justify-between items-center border rounded-xl p-4 cursor-pointer transition ${selectedPlan === plan.id
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                <input
                                    type="radio"
                                    name="plan"
                                    checked={selectedPlan === plan.id}
                                    onChange={() => setSelectedPlan(plan.id)}
                                    className="mt-1 accent-pink-500"
                                />
                                <div>
                                    <div className="font-medium">{plan.title}</div>
                                    <div className="text-sm text-black font-semibold">{plan.newPrice}</div>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleCheckout}
                    className="mt-10 w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white font-semibold py-3 rounded-full transition"
                >
                    Get my plan
                </button>
            </div>
        </div>
    );
}
