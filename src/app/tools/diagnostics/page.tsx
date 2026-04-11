import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { vehicles as vehiclesTable } from "@/garage/schema";
import { eq } from "drizzle-orm";
import DiagnosticsSuite from "@/components/tools/diagnostics-suite";

export default async function DiagnosticsPage() {
    // Auth check
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    // Fetch data for the suite
    const userVehicles = await db.select().from(vehiclesTable).where(eq(vehiclesTable.userId, user.id));

    return (
        <main className="min-h-screen bg-background">
            <DiagnosticsSuite vehicles={userVehicles} />
        </main>
    );
}
