import { NextResponse } from 'next/server';
import { stripeClient } from '@/src/lib/api/stripe-api/client';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  try {
    // Verify webhook signature
    // const event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET
    // );

    // Handle different event types
    // switch (event.type) {
    //   case 'customer.subscription.created':
    //   case 'customer.subscription.updated':
    //     // Handle subscription updates
    //     break;
    //   case 'invoice.payment_succeeded':
    //     // Handle successful payment
    //     break;
    //   case 'invoice.payment_failed':
    //     // Handle failed payment
    //     break;
    //   default:
    //     console.log(`Unhandled event type: ${event.type}`);
    // }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook error' },
      { status: 400 }
    );
  }
}

