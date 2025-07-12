import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RimbpBTtdntfEmT3bsvcnG2',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.lifestylecarnivore.com/success',
      cancel_url: 'https://www.lifestylecarnivore.com/cancel',
    });

    return NextResponse.json({ url: session.url }); // ✅ Corrected
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 });
  }
}
