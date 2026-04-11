"use server";

import { addVehicle, createGarage, addMod, saveSetupSnapshot } from "@/garage/services/garage.service";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addVehicleAction(formData: FormData) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
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
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { error: "Unauthorized" };

    const vehicleId = formData.get("vehicleId") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    try {
        await addMod(vehicleId, { name, category });
        revalidatePath(`/garage/${vehicleId}`);
        return { success: true };
    } catch (error) {
        return { error: "Failed to add mod" };
    }
}

export async function saveSnapshotAction(formData: FormData) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
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
