import { createCheckoutSession, handleStripeWebhook, getSubscription } from '../../src/backend/billing';

describe('Billing Module', () => {
  const userId = 'uid123';

  it('should create a checkout session URL', async () => {
    const session = await createCheckoutSession(userId, 'Pro');
    expect(session.url).toContain('stripe.com');
  });

  it('should handle stripe webhooks', async () => {
    await expect(handleStripeWebhook({ type: 'customer.subscription.created' })).resolves.not.toThrow();
  });

  it('should get user subscription', async () => {
    const sub = await getSubscription(userId);
    expect(sub.userId).toBe(userId);
    expect(sub.plan).toBeDefined();
  });
});
