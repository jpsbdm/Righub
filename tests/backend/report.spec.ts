import { generateReport, getPublicReport } from '../../src/backend/report';

describe('Reporting Module', () => {
  const userId = 'uid123';
  const vehicleId = 'vid123';

  it('should generate a shareable report', async () => {
    const report = await generateReport(userId, vehicleId, { totalWh: 1500 });
    expect(report.token).toContain('share-');
    expect(report.userId).toBe(userId);
  });

  it('should fetch a public report by token', async () => {
    const token = 'share-xyz';
    const report = await getPublicReport(token);
    expect(report?.token).toBe(token);
  });
});
