"use server";

import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function completeOnboardingAction(formData: FormData) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    
    try {
        await db.update(users)
            .set({ 
                name, 
                onboarded: true,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));
        
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Onboarding error:", error);
        return { error: "Failed to complete onboarding" };
    }
}
