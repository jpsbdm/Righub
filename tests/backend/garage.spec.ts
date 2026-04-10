import { createGarage, addVehicle, addMod, saveSetupSnapshot } from '../../src/backend/garage';

describe('Garage Module', () => {
  const userId = 'uid123';

  it('should create a new garage for a user', async () => {
    const garage = await createGarage(userId);
    expect(garage.userId).toBe(userId);
    expect(garage.vehicles).toHaveLength(0);
  });

  it('should add a vehicle to the garage', async () => {
    const vehicleData = { make: 'Toyota', model: 'Hilux', year: 2022 };
    const vehicle = await addVehicle(userId, vehicleData);
    expect(vehicle.make).toBe('Toyota');
    expect(vehicle.userId).toBe(userId);
  });

  it('should add a mod to a vehicle', async () => {
    const vehicleId = 'vid123';
    const modData = { name: 'Dual Battery System', category: 'Electrical' };
    const mod = await addMod(userId, vehicleId, modData);
    expect(mod.name).toBe('Dual Battery System');
    expect(mod.id).toBeDefined();
  });

  it('should save a setup snapshot', async () => {
    const vehicleId = 'vid123';
    const snapshotId = await saveSetupSnapshot(userId, vehicleId, 'Summer Trip 2024');
    expect(snapshotId).toMatch(/^sid/);
  });
});
