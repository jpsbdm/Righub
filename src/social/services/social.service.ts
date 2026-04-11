import { db } from "@/lib/db";
import { posts, likes, comments } from "@/social/schema";
import { users } from "@/core-platform/schema";
import { vehicles } from "@/garage/schema";
import { eq, desc, sql, and } from "drizzle-orm";

export async function createPost(userId: string, data: {
    content?: string;
    mediaUrls?: string[];
    youtubeUrl?: string;
    vehicleId?: string;
    type?: "status" | "build_share" | "expedition";
}) {
    const [post] = await db.insert(posts).values({
        userId,
        content: data.content,
        mediaUrls: data.mediaUrls || [],
        youtubeUrl: data.youtubeUrl,
        vehicleId: data.vehicleId,
        type: data.type || "status",
    }).returning();
    return post;
}

export async function getGlobalFeed(limit: number = 10, offset: number = 0) {
    const results = await db.select({
        id: posts.id,
        content: posts.content,
        mediaUrls: posts.mediaUrls,
        youtubeUrl: posts.youtubeUrl,
        type: posts.type,
        createdAt: posts.createdAt,
        user: {
            id: users.id,
            name: users.name,
            avatarUrl: users.avatarUrl,
        },
        vehicle: {
            id: vehicles.id,
            make: vehicles.make,
            model: vehicles.model,
            year: vehicles.year,
        },
        likesCount: sql<number>`(SELECT count(*) FROM ${likes} WHERE ${likes.postId} = ${posts.id})`,
        commentsCount: sql<number>`(SELECT count(*) FROM ${comments} WHERE ${comments.postId} = ${posts.id})`,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .leftJoin(vehicles, eq(posts.vehicleId, vehicles.id))
    .orderBy(desc(posts.createdAt))
    .limit(limit)
    .offset(offset);

    return results;
}

export async function toggleLike(userId: string, postId: string) {
    const [existing] = await db.select()
        .from(likes)
        .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

    if (existing) {
        await db.delete(likes).where(eq(likes.id, existing.id));
        return { liked: false };
    } else {
        await db.insert(likes).values({ userId, postId });
        return { liked: true };
    }
}

export async function addComment(userId: string, postId: string, content: string) {
    const [comment] = await db.insert(comments).values({
        userId,
        postId,
        content,
    }).returning();
    return comment;
}
