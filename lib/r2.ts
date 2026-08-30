import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// R2 is S3-API-compatible, so the AWS SDK works against it directly -
// we just point endpoint at the Cloudflare account URL instead of AWS.
export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;

// Generates a short-lived URL the browser can PUT the audio file to
// directly - the file never passes through our Next.js server, so we
// avoid Vercel's request body size limits entirely.
export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(r2, command, { expiresIn: 60 * 5 }); // 5 minutes
}

export function publicUrlFor(key: string) {
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteObject(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

// Builds a collision-safe object key, namespaced by user so R2 doubles
// as a natural per-user folder structure.
export function buildTrackKey(userId: string, fileName: string) {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const unique = crypto.randomUUID();
  return `tracks/${userId}/${unique}-${safeName}`;
}
