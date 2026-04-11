"use server";

import { saveCalculation } from "./services/calculator.service";
import { saveSetupSnapshot } from "@/garage/services/garage.service";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthenticatedUser() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;

    const { user } = await lucia.validateSession(sessionId);
    return user;
}

export async function saveLoadCalculationAction(data: {
    name: string;
    vehicleId?: string;
    settings: any;
    items: any[];
}) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    try {
        const run = await saveCalculation(user.id, data);

        // If a vehicle is associated, also save it as a setup snapshot in the garage
        if (data.vehicleId) {
            await saveSetupSnapshot(data.vehicleId, `Energy Setup: ${data.name}`, {
                runId: run.id,
                totalWh: run.totalWh,
                totalAh: run.totalAh,
                voltage: run.voltage,
                itemCount: data.items.length
            });
            revalidatePath(`/garage/${data.vehicleId}`);
        }

        revalidatePath("/tools/load-calculator");
        return { success: true, runId: run.id };
    } catch (error) {
        console.error("Save calculation error:", error);
        return { error: "Failed to save calculation" };
    }
}
