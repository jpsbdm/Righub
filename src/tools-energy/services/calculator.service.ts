import "server-only";
import { db } from "@/lib/db";
import { calculationRuns, calculationItems } from "@/tools-energy/schema";
import { eq } from "drizzle-orm";
import { calculateLoad, LoadItem, SystemSettings } from "@/tools-energy/lib/calculator-utils";

export async function saveCalculation(userId: string, data: {
    name: string;
    vehicleId?: string;
    settings: SystemSettings;
    items: LoadItem[];
}) {
    const { totalWh, totalAh } = calculateLoad(data.items, data.settings);

    // 1. Create the run
    const [run] = await db.insert(calculationRuns).values({
        userId,
        vehicleId: data.vehicleId,
        name: data.name,
        voltage: data.settings.voltage,
        totalWh: totalWh.toString(),
        totalAh: totalAh.toString(),
    }).returning();

    // 2. Insert items
    if (data.items.length > 0) {
        await db.insert(calculationItems).values(
            data.items.map(item => ({
                runId: run.id,
                name: item.name,
                watts: item.watts.toString(),
                hoursPerDay: item.hoursPerDay.toString(),
                dutyCycle: item.dutyCycle,
                isAC: item.isAC,
                quantity: item.quantity,
            }))
        );
    }

    return run;
}

export async function getCalculationHistory(userId: string) {
    return await db.select().from(calculationRuns).where(eq(calculationRuns.userId, userId));
}

export async function getCalculationDetails(runId: string) {
    const [run] = await db.select().from(calculationRuns).where(eq(calculationRuns.id, runId));
    if (!run) return null;

    const items = await db.select().from(calculationItems).where(eq(calculationItems.runId, runId));
    
    return {
        ...run,
        items
    };
}
