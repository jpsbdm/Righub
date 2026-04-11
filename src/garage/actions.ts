"use server";

import { addVehicle, addMod, saveSetupSnapshot } from "./services/garage.service";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthenticatedUser() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;

    const { user } = await lucia.validateSession(sessionId);
    return user;
}

export async function addVehicleAction(formData: FormData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    const make = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year = parseInt(formData.get("year") as string);

    try {
        await addVehicle(user.id, { make, model, year });
        revalidatePath("/garage");
        return { success: true };
    } catch (error) {
        return { error: "Failed to add vehicle" };
    }
}

export async function addModAction(formData: FormData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    const vehicleId = formData.get("vehicleId") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const brand = formData.get("brand") as string || undefined;
    const url = formData.get("url") as string || undefined;
    const priceRaw = formData.get("price") as string;
    const price = priceRaw ? Math.round(parseFloat(priceRaw) * 100) : undefined; // Convert to cents

    try {
        await addMod(vehicleId, { 
            name, 
            category, 
            brand, 
            url, 
            price 
        });
        revalidatePath(`/garage/${vehicleId}`);
        return { success: true };
    } catch (error) {
        console.error("Add mod error:", error);
        return { error: "Failed to add mod" };
    }
}

export async function saveSnapshotAction(formData: FormData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    const vehicleId = formData.get("vehicleId") as string;
    const name = formData.get("name") as string;
    const data = JSON.parse(formData.get("data") as string);

    try {
        const id = await saveSetupSnapshot(vehicleId, name, data);
        return { success: true, id };
    } catch (error) {
        return { error: "Failed to save snapshot" };
    }
}
