import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
    // or your Stripe API version
});

export async function POST(req: Request) {
    const buf = await req.arrayBuffer();
    const body = Buffer.from(buf);

    const sig = req.headers.get('stripe-signature')!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('❌ Webhook signature verification failed:', err.message);
            return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
        }
        console.error('❌ Unknown error in webhook:', err);
        return new NextResponse('Unknown error in webhook', { status: 400 });
    }

    // ✅ Only handle successful checkout
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const customerEmail = session.customer_details?.email;
        console.log('✔️ Payment succeeded. Email:', customerEmail);

        if (customerEmail) {
            try {
                // Read PDF from public folder
                const filePath = path.join(process.cwd(), 'public/files/plan.pdf');
                const pdfBuffer = fs.readFileSync(filePath);

                // Setup nodemailer transporter
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });

                // Send email
                await transporter.sendMail({
                    from: `"Carnivore Plan" <${process.env.GMAIL_USER}>`,
                    to: customerEmail,
                    subject: 'Your 4-week Weight Loss Plan 📩',
                    text: 'Please find your PDF plan attached.',
                    attachments: [
                        {
                            filename: 'plan.pdf',
                            content: pdfBuffer,
                            contentType: 'application/pdf',
                        },
                    ],
                });

                console.log('✅ Email sent to:', customerEmail);
            } catch (err) {
                console.error('❌ Error sending email:', err);
                return new NextResponse('Error sending email', { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}