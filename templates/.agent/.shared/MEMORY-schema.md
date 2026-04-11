# .agent/MEMORY.md — Architectural Memory

> Copy file ini ke `.agent/MEMORY.md` di root project kamu.
> AI memperbarui file ini di setiap UNIFY phase jika ada keputusan arsitektur baru.
> Dibaca di AWAL setiap session sebelum menulis kode apapun.

---

## Tech Stack

| Layer | Pilihan | Versi | Catatan |
|-------|---------|-------|---------|
| **Framework** | [Next.js / Vite / Flutter / dll] | [versi] | [catatan import path, dll] |
| **Language** | [TypeScript / Python / Dart] | [versi] | [strict mode? settings?] |
| **Database** | [PostgreSQL / MongoDB / Supabase] | [versi] | [via Prisma 7? Drizzle?] |
| **Auth** | [Better Auth / Clerk / NextAuth] | [versi] | [provider apa?] |
| **Styling** | [Tailwind + shadcn / dll] | [versi] | [custom config?] |
| **State** | [Zustand / Jotai / Redux] | [versi] | [global atau local?] |
| **Queue** | [BullMQ / Inngest / dll] | [versi] | [Redis URL?] |
| **Deployment** | [Vercel / Railway / Docker] | - | [env staging/prod?] |

---

## Import Paths (Kritis — Jangan Salah)

```typescript
// Prisma
import { db } from '@/lib/db'
import type { User } from '@/generated/prisma'  // BUKAN @prisma/client

// Auth
import { auth } from '@/lib/auth'

// [Tambahkan custom path lain di sini]
```

---

## Design Tokens

| Token | Value | Notes |
|-------|-------|-------|
| **Primary color** | [#hex] | [nama, konteks penggunaan] |
| **Secondary color** | [#hex] | [nama, konteks penggunaan] |
| **Background** | [#hex] | [dark/light default] |
| **Font heading** | [font-family] | [Google Fonts? CDN?] |
| **Font body** | [font-family] | [size default?] |
| **Border radius** | [sm/md/lg / px value] | - |
| **Dark mode** | [yes/no] | [default dark atau light?] |

**Warna yang DILARANG:** [daftar warna yang tidak boleh dipakai — misal: ungu/violet per Purple Ban]

---

## Database Schema Snapshot

> Update setiap kali ada migrasi significant.

```prisma
// Tabel utama (snapshot — bukan full schema)
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  // ...
}

// [Tambahkan model penting lainnya]
```

---

## API Conventions

```typescript
// Response format standar
{ success: true, data: {...} }
{ success: false, error: "pesan error" }

// Auth pattern
// Headers yang dipakai: [Bearer? Cookie?]

// Rate limiting: [ya/tidak, provider apa]
```

---

## Constraints (WAJIB DIIKUTI)

- **UU PDP:** Jangan log NIK, nomor rekening, password, token
- **File upload:** Hanya jpg/png/webp, maksimal 5MB
- **Pagination:** Semua findMany harus ada `take` + `skip`
- **Soft delete:** Gunakan `deletedAt DateTime?` — jangan hard delete data penting
- **Secrets:** Selalu di `.env` — tidak pernah di kode
- [Tambahkan constraint spesifik project di sini]

---

## Anti-patterns (DILARANG)

- ❌ Import dari `@prisma/client` langsung (gunakan `@/generated/prisma`)
- ❌ String literal untuk queue names (gunakan konstanta QUEUES)
- ❌ `any` di TypeScript
- ❌ Query tanpa pagination
- ❌ Hard delete data user
- [Tambahkan anti-pattern spesifik project di sini]

---

## Keputusan Arsitektur Terdokumentasi

| Date | Keputusan | Alasan | Berlaku Sampai |
|------|-----------|--------|----------------|
| YYYY-MM-DD | [keputusan] | [alasan] | [permanent / sprint N] |

---

> Terakhir diupdate: [YYYY-MM-DD] oleh AI di Phase [N] UNIFY
