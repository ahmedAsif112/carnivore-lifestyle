'use client';

import { useEffect } from 'react';

export default function SuccessPage() {
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        console.log("LocalStorage email:", email); // Debug log

        if (email) {
            fetch('/api/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('✅ Email sent successfully:', data);
                })
                .catch(err => {
                    console.error('❌ Error sending email:', err);
                });
        } else {
            console.warn("⚠️ No email found in localStorage!");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center text-green-600 text-2xl font-bold">
            ✅ Payment successful! We’ll contact you shortly.
        </div>
    );
}
