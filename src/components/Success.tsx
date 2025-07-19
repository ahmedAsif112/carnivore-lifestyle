'use client';

import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';

export default function SuccessPage() {
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasSent = useRef(false); // ✅ flag to prevent double send

    useEffect(() => {
        const email = localStorage.getItem('userEmail');

        if (!email || hasSent.current) return;

        hasSent.current = true; // ✅ mark as sent once

        fetch('/api/sendemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('✅ Email sent:', data);
                setEmailSent(true);
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Email send failed:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <Spin size="large" tip="Sending your PDF..." />
                </div>
            ) : emailSent ? (
                <div className="text-green-600 text-2xl font-bold text-center">
                    ✅ Payment successful! We’ve sent your PDF to your email.
                </div>
            ) : (
                <div className="text-red-600 text-2xl font-bold text-center">
                    ❌ Failed to send email. Please contact support.
                </div>
            )}
        </div>
    );
}
