import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || "",
        secretAccessKey: R2_SECRET_ACCESS_KEY || "",
    },
});

export async function getUploadUrl(key: string, contentType: string) {
    if (!R2_BUCKET_NAME) throw new Error("R2_BUCKET_NAME is not defined");

    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });

    // URL valid for 1 hour (3600 seconds)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
}

export function getPublicUrl(key: string) {
    // Assuming a custom domain or the R2 public worker is setup
    // For now, we use a placeholder logic. Usually: https://pub-xyz.r2.dev/key
    const publicBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    if (!publicBase) return `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;
    return `${publicBase}/${key}`;
}
