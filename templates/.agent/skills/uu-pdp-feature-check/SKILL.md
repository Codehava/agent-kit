---
name: uu-pdp-feature-check
description: |
  Use when building any feature that collects, stores, displays, or processes
  user personal data. Triggers on "user data", "personal info", "profile",
  "upload", "store user", "collect", "privacy", "consent", or when creating
  new database models with user-related fields. Do NOT use for pure UI/styling tasks.
---

# UU PDP Compliance — Checklist Fitur Baru

Setiap fitur yang menyentuh data pribadi pengguna WAJIB melewati checklist ini.

## 1. Identifikasi Data

Sebelum coding, tentukan:
- **Data apa** yang dikumpulkan fitur ini?
- **Kategori mana**: Data Umum (nama, email, HP, alamat) atau Data Spesifik/Sensitif (NIK, rekening, kesehatan, biometrik, data anak)?
- **Tujuan**: untuk apa data ini dipakai?
- **Retensi**: berapa lama data disimpan?

## 2. Checklist Implementasi

```
□ Consent tersedia sebelum data dikumpulkan
  → Jika data baru yang belum ada consent-nya, update consent flow

□ Data minimization — hanya kumpulkan yang benar-benar dibutuhkan
  → Hapus field yang "nice to have" tapi tidak essential

□ Data sensitif dienkripsi di kolom database
  → NIK, nomor rekening, data kesehatan: gunakan pgcrypto

□ Audit log tersedia untuk akses ke data ini
  → Siapa mengakses, kapan, dari IP mana

□ User bisa lihat/edit/hapus data ini dari settings
  → Terhubung ke fitur "Unduh Data" dan "Hapus Akun"

□ Data TIDAK dikirim ke layanan luar negeri dalam bentuk raw
  → Cloudflare/Firebase/Resend: pastikan hanya metadata, bukan data sensitif

□ Log tidak mengandung data PII
  → console.log TIDAK boleh print NIK, password, nomor rekening, token
```

## 3. Pola Enkripsi Kolom Sensitif (PostgreSQL)

```sql
-- Aktifkan pgcrypto (sekali saja)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Simpan data terenkripsi
UPDATE users
SET nik_encrypted = pgp_sym_encrypt(nik_plaintext, current_setting('app.encryption_key'))
WHERE id = $1;

-- Baca data terenkripsi
SELECT pgp_sym_decrypt(nik_encrypted::bytea, current_setting('app.encryption_key'))
FROM users WHERE id = $1;
```

```prisma
// Di schema.prisma: simpan sebagai Bytes untuk data terenkripsi
model User {
  nikEncrypted Bytes?   // Terenkripsi via pgcrypto
  // JANGAN buat field nikPlaintext
}
```

## 4. Audit Log Pattern

```typescript
// lib/audit/index.ts
export async function logDataAccess(params: {
  actorId: string
  action: 'VIEW' | 'EDIT' | 'DELETE' | 'EXPORT'
  resourceType: string
  resourceId: string
  ipAddress: string
}) {
  await prisma.auditLog.create({
    data: {
      ...params,
      createdAt: new Date(),
      // Audit log: append-only, tidak ada updatedAt
    },
  })
}
```

## 5. Yang TIDAK BOLEH Dilakukan

```typescript
// ❌ Log data sensitif
console.log('User NIK:', user.nik)
console.log('Payment token:', token)

// ❌ Kirim data sensitif ke Resend sebagai email content
await resend.emails.send({ html: `NIK kamu: ${user.nik}` })

// ❌ Simpan PII di URL/query params
router.push(`/verify?nik=${nik}`)

// ❌ Hard-code data sensitif di kode
const adminNIK = '3201...'
```

## 6. Layanan Luar Negeri — Batasan

| Layanan | Boleh Kirim | JANGAN Kirim |
|---------|-------------|--------------|
| Cloudflare | Headers, IP (sudah ada DPA) | Konten body yang terenkripsi |
| Firebase FCM | Device token, notif payload | NIK, data rekening, data kesehatan |
| Resend | Alamat email, teks notifikasi umum | NIK, nomor rekening, data medis |
| Sentry | Error message, stack trace | Password, token auth, NIK |
