/**
 * Stripe API Client Wrapper
 * 
 * This module provides a clean interface for Stripe operations
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
});

export class StripeClient {
  /**
   * Create a customer
   */
  async createCustomer(data: {
    email: string;
    name: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Customer> {
    return await stripe.customers.create({
      email: data.email,
      name: data.name,
      metadata: data.metadata,
    });
  }

  /**
   * Create a subscription
   */
  async createSubscription(data: {
    customerId: string;
    priceId: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.create({
      customer: data.customerId,
      items: [{ price: data.priceId }],
      metadata: data.metadata,
    });
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true
  ): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd,
    });
  }

  /**
   * Create a checkout session
   */
  async createCheckoutSession(data: {
    customerId?: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.create({
      customer: data.customerId,
      mode: 'subscription',
      line_items: [{ price: data.priceId, quantity: 1 }],
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      metadata: data.metadata,
    });
  }

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.retrieve(subscriptionId);
  }

  /**
   * List invoices for a customer
   */
  async listInvoices(customerId: string): Promise<Stripe.ApiList<Stripe.Invoice>> {
    return await stripe.invoices.list({
      customer: customerId,
      limit: 100,
    });
  }
}

export const stripeClient = new StripeClient();

