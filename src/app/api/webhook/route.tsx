import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Invalid webhook signature:', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    return new Response('Unknown Error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (email) {
      try {
        await resend.emails.send({
          from: 'info@lifestylecarnivore.com',
          to: email,
          subject: 'Your Carnivore Plan is Ready 🥩',
          html: `
            <p>Hey there!</p>
            <p>Thanks for your purchase. You can download your Carnivore Plan PDF here:</p>
            <a href="https://drive.google.com/drive/folders/1qZuHN_ZwpYtGDvVnu8--xKddsKK_Ojb_?usp=drive_link" target="_blank">Download Plan</a>
            <p>Enjoy!</p>
          `,
        });

        console.log('✅ Email sent to:', email);
      } catch (err) {
        console.error('❌ Email sending failed:', err);
        return new Response('Email failed', { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}