"use server";

import { lucia } from "@/core-platform/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { z } from "zod";
import { eq } from "drizzle-orm";

const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export async function signUpAction(formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const result = signUpSchema.safeParse({ email, password });
	if (!result.success) {
		return { error: "Invalid input" };
	}

	const passwordHash = await new Argon2id().hash(result.data.password);
	const userId = generateId(15);

	try {
        // @ts-ignore - Drizzle/Lucia type mismatch in some versions
		await db.insert(users).values({
			id: userId,
			email: result.data.email,
			passwordHash: passwordHash,
			role: "user",
			isPro: false,
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		
		return { success: true };
	} catch (e: any) {
		console.error("Erro no cadastro:", e);
		// PostgreSQL unique constraint violation code
		if (e?.code === "23505") {
			return { error: "Email already exists" };
		}
		return { error: `Erro técnico: ${e?.message || "Erro desconhecido"}` };
	}
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});

export async function loginAction(formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const result = loginSchema.safeParse({ email, password });
	if (!result.success) {
		return { error: "Invalid input" };
	}

	const [existingUser] = await db.select().from(users).where(eq(users.email, result.data.email));
	if (!existingUser || !existingUser.passwordHash) {
		return { error: "Incorrect email or password" };
	}

	const validPassword = await new Argon2id().verify(existingUser.passwordHash, result.data.password);
	if (!validPassword) {
		return { error: "Incorrect email or password" };
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	
	return { success: true };
}

export async function logoutAction() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { error: "Unauthorized" };
	}

	await lucia.invalidateSession(sessionId);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	
	return { success: true };
}
