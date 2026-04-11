import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  // We use a warning here so the app doesn't crash during build if key is missing
  console.warn('STRIPE_SECRET_KEY is missing from environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia' as any,
  appInfo: {
    name: 'RigHub',
    version: '0.1.0',
  },
});

export const STRIPE_PLANS = {
  MONTHLY: {
    name: 'RigHub Pro Monthly',
    price: 900, // $9.00 AUD
    currency: 'aud',
    interval: 'month' as const,
  },
  YEARLY: {
    name: 'RigHub Pro Yearly',
    price: 8400, // $7.00 * 12 = $84.00 AUD
    currency: 'aud',
    interval: 'year' as const,
  }
};
