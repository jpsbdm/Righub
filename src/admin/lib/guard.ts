import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminGuard() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user || user.role !== 'admin') {
        // Redirect to home if not admin
        redirect("/");
    }

    return user;
}
