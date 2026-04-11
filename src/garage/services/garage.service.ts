import { db } from "@/lib/db";
import { garages, vehicles, vehicleMods, setupSnapshots } from "@/garage/schema";
import { eq, and } from "drizzle-orm";

export async function createGarage(userId: string) {
    const [newGarage] = await db.insert(garages).values({ userId }).returning();
    return newGarage;
}

export async function getGarageByUserId(userId: string) {
    const [garage] = await db.select().from(garages).where(eq(garages.userId, userId));
    return garage || null;
}

export async function addVehicle(userId: string, data: { make: string; model: string; year: number }) {
    let garage = await getGarageByUserId(userId);
    if (!garage) {
        garage = await createGarage(userId);
    }

    const [newVehicle] = await db.insert(vehicles).values({
        garageId: garage.id,
        userId,
        ...data
    }).returning();

    return newVehicle;
}

export async function addMod(vehicleId: string, data: { 
    name: string; 
    category: string; 
    brand?: string; 
    url?: string; 
    price?: number; 
    installDate?: Date 
}) {
    const [newMod] = await db.insert(vehicleMods).values({
        vehicleId,
        ...data
    }).returning();
    return newMod;
}

export async function saveSetupSnapshot(vehicleId: string, name: string, data: any) {
    const [snapshot] = await db.insert(setupSnapshots).values({
        vehicleId,
        name,
        data: JSON.stringify(data)
    }).returning();
    return snapshot.id;
}

export async function getVehicleDetails(vehicleId: string) {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, vehicleId));
    if (!vehicle) return null;

    const mods = await db.select().from(vehicleMods).where(eq(vehicleMods.vehicleId, vehicleId));
    const snapshots = await db.select().from(setupSnapshots).where(eq(setupSnapshots.vehicleId, vehicleId));
    
    return {
        ...vehicle,
        mods,
        snapshots
    };
}
export async function getVehiclesByUserId(userId: string) {
    return db.select().from(vehicles).where(eq(vehicles.userId, userId));
}
