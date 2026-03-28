---
name: neo-storage
description: |
  Use when uploading, downloading, deleting files, or generating presigned URLs
  with NEO Object Storage (Biznet Gio). Triggers on "upload file", "object storage",
  "NEO", "S3", "presigned URL", "file storage", "image upload", or "bucket".
  Do NOT use for database operations or local file system.
---

# NEO Object Storage — Pola Wajib Project Ini

NEO Object Storage Biznet Gio adalah S3-compatible storage berlokasi di Indonesia.
Endpoint: `https://nos.wjv-1.neo.id`

## Client Setup (`lib/storage/index.ts`)

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const storageClient = new S3Client({
  endpoint: process.env.NEO_ENDPOINT,      // https://nos.wjv-1.neo.id
  region: 'ID',
  credentials: {
    accessKeyId: process.env.NEO_ACCESS_KEY!,
    secretAccessKey: process.env.NEO_SECRET_KEY!,
  },
  forcePathStyle: true,  // WAJIB untuk NEO (S3-compatible)
})

export const BUCKET = process.env.NEO_BUCKET_NAME!
```

## Upload File

```typescript
export async function uploadFile(params: {
  key: string        // path di bucket, contoh: 'uploads/user123/avatar.jpg'
  body: Buffer | Uint8Array
  contentType: string
  isPublic?: boolean
}) {
  await storageClient.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: params.key,
    Body: params.body,
    ContentType: params.contentType,
    ACL: params.isPublic ? 'public-read' : 'private',
  }))

  return params.isPublic
    ? `${process.env.NEO_ENDPOINT}/${BUCKET}/${params.key}`
    : null  // private: akses via presigned URL
}
```

## Presigned URL (untuk file private)

```typescript
export async function getPresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
  return getSignedUrl(storageClient, command, { expiresIn })
}

// Presigned URL untuk upload langsung dari browser (hindari upload via server)
export async function getPresignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })
  return getSignedUrl(storageClient, command, { expiresIn: 300 }) // 5 menit
}
```

## Konvensi Key (Path di Bucket)

```
uploads/
  {userId}/
    avatar/
      {timestamp}-{filename}     ← foto profil
    documents/
      {timestamp}-{filename}     ← dokumen user
products/
  {productId}/
    images/
      {timestamp}-{filename}     ← foto produk
backups/
  backup_{YYYYMMDD_HHMMSS}.sql.gz  ← backup database
```

## Validasi File Sebelum Upload

```typescript
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024  // 5MB

export function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Hanya file JPG, PNG, WebP yang diizinkan')
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Ukuran file maksimal 5MB')
  }
}
```

## Aturan Wajib

- ACL private untuk semua file user (akses via presigned URL, bukan direct link)
- ACL public-read hanya untuk aset publik statis (logo, banner produk yang memang publik)
- Data sensitif (dokumen KTP, kontrak) = SELALU private, presigned URL expire 1 jam
- Foto profil/produk = bisa public-read untuk performa CDN
- JANGAN simpan data sensitif di metadata/tag S3 — bisa ter-expose
