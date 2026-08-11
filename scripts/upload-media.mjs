#!/usr/bin/env node
/**
 * Upload product photos to the Backblaze B2 bucket that backs img.crystic.ca.
 *
 * Prerequisites (set in your shell or .env.local, never committed):
 *   B2_ENDPOINT   e.g. https://s3.us-west-004.backblazeb2.com
 *   B2_REGION     e.g. us-west-004
 *   B2_BUCKET     e.g. crystic-media
 *   B2_KEY_ID     application key id (scoped to the bucket)
 *   B2_APP_KEY    application key secret
 *
 * Usage:
 *   npm install            # installs @aws-sdk/client-s3 (devDependency)
 *   node scripts/upload-media.mjs ./media
 *
 * It walks the given folder and uploads every file, preserving the relative
 * path as the object key. So ./media/products/amethyst-serenity-01.jpg becomes
 * the key "products/amethyst-serenity-01.jpg", reachable at
 * https://img.crystic.ca/products/amethyst-serenity-01.jpg
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative, sep, extname } from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
  B2_ENDPOINT,
  B2_REGION,
  B2_BUCKET,
  B2_KEY_ID,
  B2_APP_KEY,
} = process.env;

for (const [k, v] of Object.entries({
  B2_ENDPOINT,
  B2_REGION,
  B2_BUCKET,
  B2_KEY_ID,
  B2_APP_KEY,
})) {
  if (!v) {
    console.error(`Missing required env var: ${k}`);
    process.exit(1);
  }
}

const root = process.argv[2] || "./media";

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const s3 = new S3Client({
  endpoint: B2_ENDPOINT,
  region: B2_REGION,
  credentials: { accessKeyId: B2_KEY_ID, secretAccessKey: B2_APP_KEY },
});

const files = walk(root);
if (files.length === 0) {
  console.error(`No files found under ${root}`);
  process.exit(1);
}

console.log(`Uploading ${files.length} file(s) to ${B2_BUCKET} ...`);

for (const file of files) {
  const key = relative(root, file).split(sep).join("/");
  const body = readFileSync(file);
  const ContentType = CONTENT_TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  await s3.send(
    new PutObjectCommand({
      Bucket: B2_BUCKET,
      Key: key,
      Body: body,
      ContentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  console.log(`  ✓ ${key}`);
}

console.log("Done.");
