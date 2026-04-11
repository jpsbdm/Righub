import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
}

export async function getUserById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
}

export async function checkAccess(userId: string, requiredRole: "user" | "admin" | "moderator"): Promise<boolean> {
    const user = await getUserById(userId);
    if (!user) return false;

    const roles: ("user" | "admin" | "moderator")[] = ["user", "moderator", "admin"];
    return roles.indexOf(user.role) >= roles.indexOf(requiredRole);
}

export async function isProMember(userId: string): Promise<boolean> {
    const user = await getUserById(userId);
    return user?.isPro ?? false;
}
