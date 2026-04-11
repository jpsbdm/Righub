"use server";

import { db } from "@/lib/db";
import { calculationRuns } from "@/tools-energy/schema";
import { eq, and } from "drizzle-orm";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

export async function toggleCalculationVisibilityAction(id: string, visibility: 'private' | 'unlisted' | 'public') {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { success: false, error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { success: false, error: "Unauthorized" };

    try {
        // Generate slug if it doesn't exist and we are opening for sharing
        let slug = null;
        if (visibility !== 'private') {
            const [existing] = await db.select().from(calculationRuns).where(eq(calculationRuns.id, id)).limit(1);
            slug = existing.shareSlug || nanoid(10);
        }

        await db
            .update(calculationRuns)
            .set({ 
                visibility, 
                shareSlug: slug,
                updatedAt: new Date()
            })
            .where(and(eq(calculationRuns.id, id), eq(calculationRuns.userId, user.id)));

        revalidatePath("/tools/diagnostics");
        return { success: true, slug };
    } catch (error) {
        console.error("Error toggling visibility:", error);
        return { success: false, error: "Failed to update sharing settings" };
    }
}
