// garage.ts – Garage Module for vehicle management and mods
import { logAuditAction } from './auth';

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

export async function createGarage(userId: string): Promise<Garage> {
  console.log(`Creating garage for user: ${userId}`);
  await logAuditAction(userId, 'CREATE_GARAGE');
  return { id: 'gid' + Math.random().toString(36).substr(2, 9), userId, vehicles: [] };
}

export async function addVehicle(userId: string, vehicle: Omit<Vehicle, 'id' | 'userId' | 'mods' | 'media'>): Promise<Vehicle> {
  console.log(`Adding vehicle for user: ${userId}`);
  const newVehicle: Vehicle = {
    ...vehicle,
    id: 'vid' + Math.random().toString(36).substr(2, 9),
    userId,
    mods: [],
    media: []
  };
  await logAuditAction(userId, 'ADD_VEHICLE', { vehicleId: newVehicle.id });
  return newVehicle;
}

export async function addMod(userId: string, vehicleId: string, mod: Omit<VehicleMod, 'id'>): Promise<VehicleMod> {
  console.log(`Adding mod to vehicle: ${vehicleId}`);
  const newMod: VehicleMod = {
    ...mod,
    id: 'mid' + Math.random().toString(36).substr(2, 9)
  };
  await logAuditAction(userId, 'ADD_MOD', { vehicleId, modId: newMod.id });
  return newMod;
}

export async function saveSetupSnapshot(userId: string, vehicleId: string, name: string): Promise<string> {
  console.log(`Saving setup snapshot for vehicle: ${vehicleId} as ${name}`);
  const snapshotId = 'sid' + Math.random().toString(36).substr(2, 9);
  await logAuditAction(userId, 'SAVE_SNAPSHOT', { vehicleId, snapshotId });
  return snapshotId;
}
