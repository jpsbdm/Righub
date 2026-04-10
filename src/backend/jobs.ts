// jobs.ts – Background jobs (Trigger.dev / Inngest stubs)
import { logAuditAction } from './auth';

export async function schedulePeriodicCalc(userId: string): Promise<string> {
  console.log(`Scheduling periodic calculation for user: ${userId}`);
  await logAuditAction(userId, 'SCHEDULE_JOB', { type: 'periodic_calc' });
  return 'job_id_' + Math.random().toString(36).substr(2, 9);
}

export async function sendEmailNotification(userId: string, template: string): Promise<void> {
  console.log(`Sending email notification to user ${userId} using template ${template}`);
}

export async function triggerAnalyticsSync(): Promise<void> {
  console.log('Triggering daily analytics sync');
}
