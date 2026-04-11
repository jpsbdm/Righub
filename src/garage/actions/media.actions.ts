"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { generateId } from "lucia";

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT || "", // https://<accountid>.r2.cloudflarestorage.com
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY || "",
        secretAccessKey: process.env.R2_SECRET_KEY || "",
    },
});

import { db } from "@/lib/db";
import { mediaAssets } from "@/garage/schema";
import { posts } from "@/social/schema";
import { eq, sql } from "drizzle-orm";

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

export async function getPresignedUploadUrlAction(fileName: string, contentType: string) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { error: "Unauthorized" };

    const fileKey = `${user.id}/${generateId(10)}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || "righub-media",
        Key: fileKey,
        ContentType: contentType,
    });

    try {
        const url = await getSignedUrl(r2, command, { expiresIn: 3600 });
        return { success: true, url, fileKey };
    } catch (e) {
        console.error("Presigned URL error:", e);
        return { error: "Failed to generate upload URL" };
    }
}

export async function saveMediaReferenceAction(targetId: string, type: 'vehicle' | 'post', fileKey: string) {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { error: "Unauthorized" };

    const { user } = await lucia.validateSession(sessionId);
    if (!user) return { error: "Unauthorized" };

    const fullUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${fileKey}` : fileKey;

    try {
        if (type === 'vehicle') {
            await db.insert(mediaAssets).values({
                vehicleId: targetId,
                url: fullUrl,
                type: "image", // Default to image for now
            });
        } else if (type === 'post') {
            // Update the post's media_urls array
            await db.update(posts)
                .set({
                    mediaUrls: sql`array_append(${posts.mediaUrls}, ${fullUrl})`
                })
                .where(eq(posts.id, targetId));
        }

        return { success: true };
    } catch (error) {
        console.error("Save media reference error:", error);
        return { error: "Failed to save media reference" };
    }
}
