"use server";

import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { createPost, toggleLike, addComment } from "./services/social.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function getAuthenticatedUser() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;

    const { user } = await lucia.validateSession(sessionId);
    return user;
}

const postSchema = z.object({
    content: z.string().optional(),
    mediaUrls: z.array(z.string()).optional(),
    vehicleId: z.string().optional(),
    type: z.enum(["status", "build_share", "expedition"]).optional(),
});

export async function createPostAction(formData: FormData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    const content = formData.get("content") as string;
    const vehicleId = formData.get("vehicleId") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const type = formData.get("type") as any;
    
    // Media URLs would normally come from a separate upload step
    const mediaUrls = JSON.parse(formData.get("mediaUrls") as string || "[]");

    try {
        await createPost(user.id, {
            content,
            vehicleId: vehicleId || undefined,
            mediaUrls,
            youtubeUrl: youtubeUrl || undefined,
            type,
        });

        revalidatePath("/feed");
        return { success: true };
    } catch (error) {
        console.error("Create post error:", error);
        return { error: "Failed to create post" };
    }
}

export async function likePostAction(postId: string) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    try {
        const result = await toggleLike(user.id, postId);
        revalidatePath("/feed");
        return { success: true, ...result };
    } catch (error) {
        return { error: "Failed to toggle like" };
    }
}

export async function addCommentAction(postId: string, content: string) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Unauthorized" };

    try {
        await addComment(user.id, postId, content);
        revalidatePath("/feed");
        return { success: true };
    } catch (error) {
        return { error: "Failed to add comment" };
    }
}
