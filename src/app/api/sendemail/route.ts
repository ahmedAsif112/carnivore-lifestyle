import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        console.log('📥 Incoming email:', email);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Product PDF Link',
            html: `<p>download krle ganddddduuuu: <a href="https://drive.google.com/drive/folders/1qZuHN_ZwpYtGDvVnu8--xKddsKK_Ojb_?usp=drive_link">Download PDF</a></p>`,
        });

        console.log('📤 Email sent result:', result);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
