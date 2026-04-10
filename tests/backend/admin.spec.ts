import { getSystemStats, updateInternalConfig } from '../../src/backend/admin';

describe('Admin Module', () => {
  const adminId = 'admin1';

  it('should get system statistics', async () => {
    const stats = await getSystemStats();
    expect(stats.totalUsers).toBeGreaterThan(0);
    expect(stats.totalPosts).toBeDefined();
  });

  it('should allow updating internal config', async () => {
    await expect(updateInternalConfig(adminId, 'maintenance_mode', true)).resolves.not.toThrow();
  });
});
