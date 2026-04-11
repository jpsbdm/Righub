import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { vehicles as vehiclesTable } from "@/garage/schema";
import { eq } from "drizzle-orm";
import LoadCalculatorUI from "@/components/tools/load-calculator-ui";

export default async function LoadCalculatorPage() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    const userVehicles = await db.select().from(vehiclesTable).where(eq(vehiclesTable.userId, user.id));

    return <LoadCalculatorUI vehicles={userVehicles} />;
}
