import { schedulePeriodicCalc, sendEmailNotification, triggerAnalyticsSync } from '../../src/backend/jobs';

describe('Background Jobs', () => {
  const userId = 'uid123';

  it('should schedule a periodic calculation', async () => {
    const jobId = await schedulePeriodicCalc(userId);
    expect(jobId).toContain('job_id_');
  });

  it('should send email notification', async () => {
    await expect(sendEmailNotification(userId, 'welcome')).resolves.not.toThrow();
  });

  it('should trigger analytics sync', async () => {
    await expect(triggerAnalyticsSync()).resolves.not.toThrow();
  });
});
