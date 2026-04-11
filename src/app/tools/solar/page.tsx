import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { calculationRuns } from "@/tools-energy/schema";
import { eq, desc } from "drizzle-orm";
import SolarCalculatorUI from "@/components/tools/solar-calculator-ui";

export default async function SolarPage() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    // Get the most recent calculation to pre-fill the consumption
    const [latestCalc] = await db.select()
        .from(calculationRuns)
        .where(eq(calculationRuns.userId, user.id))
        .orderBy(desc(calculationRuns.createdAt))
        .limit(1);

    const initialWh = latestCalc ? Number(latestCalc.totalWh) : 0;

    return <SolarCalculatorUI initialConsumptionWh={initialWh} />;
}
