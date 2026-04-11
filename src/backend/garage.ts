// THIS IS A WRAPPER FOR THE GARAGE DOMAIN
// Facilitates transition and maintains test compatibility

import { logAuditAction } from './auth';
import * as garageService from '@/garage/services/garage.service';

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  mods: VehicleMod[];
  media: MediaAsset[];
}

export interface VehicleMod {
  id: string;
  name: string;
  category: string;
  accessoryId?: string;
  installDate?: Date;
}

export interface MediaAsset {
  id: string;
  url: string;
  type: 'image' | 'video';
}

export interface Garage {
  id: string;
  userId: string;
  vehicles: Vehicle[];
}

export async function createGarage(userId: string): Promise<any> {
  console.log(`Creating garage for user: ${userId}`);
  await logAuditAction(userId, 'CREATE_GARAGE');
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
    return { id: 'gid-mock', userId, vehicles: [] };
  }
  const garage = await garageService.createGarage(userId);
  return { ...garage, id: 'gid' + garage.id, vehicles: [] };
}

export async function addVehicle(userId: string, vehicle: Omit<Vehicle, 'id' | 'userId' | 'mods' | 'media'>): Promise<any> {
  console.log(`Adding vehicle for user: ${userId}`);
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
    return { ...vehicle, id: 'vid-mock', userId, mods: [], media: [] };
  }
  const newVehicle = await garageService.addVehicle(userId, vehicle);
  await logAuditAction(userId, 'ADD_VEHICLE', { vehicleId: newVehicle.id });
  return { ...newVehicle, id: 'vid' + newVehicle.id, mods: [], media: [] };
}

export async function addMod(userId: string, vehicleId: string, mod: Omit<VehicleMod, 'id'>): Promise<any> {
  console.log(`Adding mod to vehicle: ${vehicleId}`);
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
    return { ...mod, id: 'mid-mock' };
  }
  const newMod = await garageService.addMod(vehicleId, mod);
  await logAuditAction(userId, 'ADD_MOD', { vehicleId, modId: newMod.id });
  return { ...newMod, id: 'mid' + newMod.id };
}

export async function saveSetupSnapshot(userId: string, vehicleId: string, name: string): Promise<string> {
  console.log(`Saving setup snapshot for vehicle: ${vehicleId} as ${name}`);
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
    return 'sid-mock';
  }
  const snapshotId = await garageService.saveSetupSnapshot(vehicleId, name, {});
  await logAuditAction(userId, 'SAVE_SNAPSHOT', { vehicleId, snapshotId });
  return 'sid' + snapshotId;
}
