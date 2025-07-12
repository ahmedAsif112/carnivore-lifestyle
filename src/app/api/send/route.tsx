// app/api/send/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER!,
                pass: process.env.GMAIL_PASS!,
            },
        });

        const pdfPath = path.join(process.cwd(), 'public', 'files', 'plan.pdf');
        const pdfContent = fs.readFileSync(pdfPath);

        await transporter.sendMail({
            from: `"Weight Plan" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Your Custom Weight Loss Plan PDF',
            text: 'Attached is your PDF.',
            attachments: [
                {
                    filename: 'plan.pdf',
                    content: pdfContent,
                },
            ],
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Email Error:', err);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}