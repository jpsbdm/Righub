import { trackEvent, trackConversion } from '../../src/backend/analytics';

describe('Analytics Module', () => {
  const userId = 'uid123';

  it('should track a custom event', async () => {
    await expect(trackEvent(userId, 'button_click', { color: 'red' })).resolves.not.toThrow();
  });

  it('should track a conversion', async () => {
    await expect(trackConversion(userId, 'pro_signup')).resolves.not.toThrow();
  });
});
