// tools.ts – Energy Calculation Services
import { logAuditAction } from './auth';

export interface LoadCalculationInput {
  appliances: Array<{ name: string; powerWatts: number; hoursPerDay: number }>;
}

export interface LoadCalculationResult {
  dailyTotalWh: number;
  recommendedBatteryCapacityAh: number; // assuming 12V
}

export interface SolarCalculationInput {
  panelWattage: number;
  sunHours: number;
  efficiency: number;
}

export function calculateDailyLoad(input: LoadCalculationInput): LoadCalculationResult {
  const dailyTotalWh = input.appliances.reduce((acc, app) => acc + (app.powerWatts * app.hoursPerDay), 0);
  const recommendedBatteryCapacityAh = (dailyTotalWh / 12) * 2; // 50% depth of discharge rule of thumb
  return { dailyTotalWh, recommendedBatteryCapacityAh };
}

export function calculateSolarYield(input: SolarCalculationInput): number {
  return input.panelWattage * input.sunHours * input.efficiency;
}

export async function runValidation(userId: string, setupId: string): Promise<{ status: 'pass' | 'fail'; issues: string[] }> {
  console.log(`Running validation for setup: ${setupId}`);
  await logAuditAction(userId, 'RUN_VALIDATION', { setupId });
  // Mock validation logic
  return { status: 'pass', issues: [] };
}

export async function rateSetup(userId: string, setupId: string, rating: number): Promise<void> {
  console.log(`User ${userId} rated setup ${setupId}: ${rating}`);
  await logAuditAction(userId, 'RATE_SETUP', { setupId, rating });
}
