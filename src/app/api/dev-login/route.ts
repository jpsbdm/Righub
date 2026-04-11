import { lucia } from "@/core-platform/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // 1. Apenas em Desenvolvimento
    if (process.env.NODE_ENV !== "development") {
        return new NextResponse("Forbidden", { status: 403 });
    }

    const email = "joao@righub.com";
    const name = "João Dev";

    try {
        console.log("Tentando logar usuário dev:", email);
        
        // 2. Tentar buscar ou criar de forma mais direta
        let user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email)
        });

        if (!user) {
            console.log("Usuário não encontrado, criando...");
            const results = await db.insert(users).values({
                email,
                name,
                role: "admin",
                isPro: true,
                onboarded: true
            }).returning();
            user = results[0];
        }

        if (!user) {
            throw new Error("Falha ao criar ou encontrar o usuário de teste.");
        }

        console.log("Usuário identificado:", user.id);

        // 3. Criar Sessão no Lucia
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        // 4. Set Cookie e Redirecionar
        const cookieStore = await cookies();
        cookieStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return redirect("/feed");
    } catch (error) {
        console.error("Erro no Dev Login:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
