// moderation.ts – Moderation actions and queue
import { logAuditAction } from './auth';

export interface ModerationAction {
  id: string;
  adminId: string;
  targetUserId: string;
  action: 'warn' | 'suspend' | 'ban';
  reason: string;
  expiresAt?: Date;
}

export async function applyModerationAction(adminId: string, targetUserId: string, action: 'suspend' | 'ban', reason: string): Promise<ModerationAction> {
  console.log(`Admin ${adminId} ${action} user ${targetUserId}: ${reason}`);
  const record: ModerationAction = {
    id: 'mod' + Math.random().toString(36).substr(2, 9),
    adminId,
    targetUserId,
    action,
    reason,
    expiresAt: action === 'suspend' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined // default 1 week
  };
  await logAuditAction(adminId, 'APPLY_MODERATION', { targetUserId, action, reason });
  return record;
}

export async function getReviewQueue(): Promise<any[]> {
  // Mock review queue items (reported posts, etc.)
  return [
    { type: 'report', id: 'rep1', reason: 'Spam' }
  ];
}
