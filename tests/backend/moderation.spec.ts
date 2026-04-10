import { applyModerationAction, getReviewQueue } from '../../src/backend/moderation';

describe('Moderation Module', () => {
  const adminId = 'admin1';
  const targetId = 'uid456';

  it('should apply a ban to a user', async () => {
    const action = await applyModerationAction(adminId, targetId, 'ban', 'Repeated violations');
    expect(action.action).toBe('ban');
    expect(action.targetUserId).toBe(targetId);
  });

  it('should get the review queue', async () => {
    const queue = await getReviewQueue();
    expect(queue.length).toBeGreaterThan(0);
    expect(queue[0].type).toBe('report');
  });
});
