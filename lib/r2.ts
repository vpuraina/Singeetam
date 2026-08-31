import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID || "5b93fc831594fed368379a8239f7ba18";
const bucketName = process.env.R2_BUCKET_NAME || "singeetam-storage";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });
  return await getSignedUrl(r2, command, { expiresIn: 60 * 5 });
}

export function publicUrlFor(key: string) {
  const publicBase = process.env.R2_PUBLIC_URL || "https://pub-c2ec93f51f824b84adc9d86a6abd6a99.r2.dev";
  return `${publicBase.replace(/\/$/, "")}/${key}`;
}

export async function deleteObject(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
}

export function buildTrackKey(userId: string, fileName: string) {
  const safeName = (fileName || "audio").replace(/[^a-zA-Z0-9._-]/g, "_");
  const unique = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36.substring(2));
  return `tracks/${userId}/${unique}-${safeName}`;
}