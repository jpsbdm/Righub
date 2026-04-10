import { calculateDailyLoad, calculateSolarYield, runValidation, rateSetup } from '../../src/backend/tools';

describe('Tools Energy Module', () => {
  it('should calculate daily load correctly', () => {
    const input = {
      appliances: [
        { name: 'Fridge', powerWatts: 50, hoursPerDay: 24 },
        { name: 'Lights', powerWatts: 20, hoursPerDay: 4 }
      ]
    };
    const result = calculateDailyLoad(input);
    expect(result.dailyTotalWh).toBe(1280);
    expect(result.recommendedBatteryCapacityAh).toBe((1280 / 12) * 2);
  });

  it('should calculate solar yield correctly', () => {
    const input = { panelWattage: 200, sunHours: 5, efficiency: 0.8 };
    const yieldWh = calculateSolarYield(input);
    expect(yieldWh).toBe(800);
  });

  it('should run setup validation', async () => {
    const result = await runValidation('uid123', 'sid123');
    expect(result.status).toBe('pass');
  });

  it('should allow rating a setup', async () => {
    await expect(rateSetup('uid123', 'sid123', 5)).resolves.not.toThrow();
  });
});
