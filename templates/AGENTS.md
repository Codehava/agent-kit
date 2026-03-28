# AGENTS.md — Instruksi AI untuk Proyek Ini
> Letakkan file ini di **root folder project** (sejajar `package.json`).
> Dibaca otomatis oleh Antigravity, Cursor, Claude Code, dan AI IDE lainnya.
> **Stack diverifikasi: Maret 2026**

---

## 🎯 Identitas Proyek

- **Nama Proyek:** [nama proyek]
- **Tipe:** [Web App / Mobile / Marketplace]
- **Stack:** Next.js **16.1** (App Router) + Flutter **3.41.2** + PostgreSQL **17** + Prisma **7** + Better Auth **1.5**
- **Runtime:** Node.js **22 LTS**
- **Data Fetching:** Server Components (default) + TanStack Query (client mutations/realtime)
- **Arsitektur:** Modular Monolith — 1 Next.js app + 1 BullMQ worker container
- **Payment:** Xendit (split payment / disbursement) — hanya app dengan transaksi keuangan
- **Realtime:** Socket.io + BullMQ **5.x** (Redis **7.4 LTS**, shared instance)
- **Push Notif:** Firebase FCM — **hanya `firebase_messaging`**, Analytics/Crashlytics JANGAN diaktifkan
- **Storage:** NEO Object Storage Biznet Gio (S3-compatible, Indonesia)
- **CDN:** Cloudflare Free (DPA wajib di-accept) + NEO untuk serve file upload
- **Deploy:** Coolify di VPS Biznet Gio (Indonesia — comply UU PDP)
- **IDE:** Antigravity
- **Stack diverifikasi:** Maret 2026

---

## 📁 Dokumen Referensi

| Dokumen | Lokasi | Berisi |
|---------|--------|--------|
| PRD | `docs/01-PRD.md` | Fitur, user stories (REQ-XXX), scope MVP |
| Tech Design | `docs/02-TECH-DESIGN.md` | Stack, schema DB, API contracts, code patterns |
| UI Guidelines | `docs/03-UI-GUIDELINES.md` | Komponen shadcn, warna, Flutter design |
| Backlog | `docs/04-BACKLOG.md` | Task aktif sprint ini |
| Deployment | `docs/05-DEPLOYMENT.md` | Coolify, Dockerfile, CI/CD, backup |
| Dev Log | `docs/06-DEVELOPMENT-LOG.md` | Kenapa setiap keputusan teknis dibuat |
| Feature Specs | `specs/NNN-nama-fitur.md` | Blueprint fitur sebelum coding |

**Antigravity agent config:**

| File | Fungsi |
|------|--------|
| `.antigravity/rules.md` | Rules selalu aktif tiap sesi |
| `.agent/skills/` | 455 Elite Skills — auto-discover & auto-load |
| `.agent/workflows/` | 6 workflows — panggil via `/nama` |
| `.agent/mcp_config.json` | Config 4 Vibe MCP servers |

---

## ⚙️ 10 Aturan Coding — WAJIB

### 1. Tanya dulu, coding belakangan
Jika ada ambiguitas → tanya sebelum generate kode panjang.
Untuk fitur size M atau L: cek `specs/` dulu — jika ada spec, ikuti acceptance criteria di sana.

### 2. Satu fokus per sesi
Jika diminta buat form login → **hanya buat form login**. Jangan ubah layout atau routing.

### 3. Jangan hapus kode tanpa konfirmasi
Tampilkan dulu apa yang akan dihapus → minta konfirmasi sebelum lanjut.

### 4. TypeScript strict — no `any`, import Prisma dari generated path
```typescript
// ❌ Prisma 7: ini sudah tidak valid
import { User } from '@prisma/client'

// ✅ Prisma 7: pakai generated path
import { User } from '@/generated/prisma'
```

### 5. Error handling wajib di setiap async function
```typescript
try {
  const data = await prisma.user.findMany({ take: 20 })
} catch (error) {
  console.error('[user:findMany]', error)
  throw error
}
```

### 6. Loading + Empty + Error state wajib
Setiap komponen yang fetch data HARUS punya ketiga state ini.

### 7. Cek komponen yang sudah ada dulu
Sebelum buat komponen baru → cek `/components/ui/` dan `/components/[feature]/`.

### 8. Mobile-first untuk semua UI Web
```tsx
<div className="flex flex-col md:flex-row gap-4">
```

### 9. Env vars tidak pernah di-hardcode
```typescript
// ❌ const url = "https://xendit.co"
// ✅ const url = process.env.XENDIT_BASE_URL
```

### 10. Next.js 16 — `params` DAN `headers()` wajib di-await
```typescript
// ❌ Next.js 14 style — error di Next.js 16
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
}
const session = await auth.api.getSession({ headers: headers() })

// ✅ Next.js 16 — params dan headers() sekarang async
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
const session = await auth.api.getSession({ headers: await headers() })
```

### Format commit
```
feat(auth): tambah login Google OAuth
fix(payment): perbaiki webhook Xendit tidak terproses
chore(deps): update Next.js ke 16.1
```

---

## 🗄️ Database (Prisma 7 + PostgreSQL 17)

### Setup Client Singleton (`lib/db/index.ts`)
```typescript
import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Schema Generator (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Aturan Query
- Selalu `take` + `skip` pada `findMany` — tidak ada query tanpa limit
- Soft delete: `deletedAt DateTime?` — jangan hard delete data penting
- Semua tabel: `createdAt @default(now())` + `updatedAt @updatedAt`
- Multi-tabel: `prisma.$transaction(async (tx) => { ... })`
- Migration dev: `npx prisma migrate dev` | Production: `npx prisma migrate deploy`

---

## 💳 Xendit Payment

```typescript
// Webhook — WAJIB await headers()
export async function POST(req: Request) {
  const callbackToken = (await headers()).get('x-callback-token')
  if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }
  const payload = await req.json()
  await paymentQueue.add('process-webhook', payload, { attempts: 3 })
  return Response.json({ received: true })
}
```

**Aturan:** Selalu verifikasi `x-callback-token`. Enqueue ke BullMQ — jangan proses langsung.

---

## 🔌 Socket.io + BullMQ

```typescript
// Worker emit ke client setelah job selesai
worker.on('completed', (job, result) => {
  io.to(`user_${result.userId}`).emit('payment:updated', result)
})

// Redis client
export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,  // required untuk BullMQ
})
```

---

## 🔒 Security + UU PDP

```typescript
// API Route — WAJIB await headers()
const session = await auth.api.getSession({ headers: await headers() })
if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
```

- ✅ Semua input divalidasi Zod sebelum masuk DB
- ✅ Firebase: hanya `firebase_messaging` — Analytics/Crashlytics = OFF
- ✅ Cloudflare DPA + Firebase DPT wajib di-accept (sekali oleh admin)
- ✅ Log tidak print password, token, NIK, nomor rekening
- ✅ Data sensitif (NIK, rekening) dienkripsi dengan pgcrypto di DB

---

## 📝 Format Prompt Efektif

```
[KONTEKS] Fitur: [nama fitur]
[SPEC] Baca specs/NNN-nama.md jika ada
[TUGAS] Yang perlu dibuat: [deskripsi spesifik]
[CONSTRAINT] Jangan ubah: [file/komponen yang tidak boleh diubah]
use context7
```

## ⚡ Workflows

### Planning (sebelum coding)
| Command | Gunakan ketika |
|---------|----------------|
| `/vibe-plan` | **Mulai project baru** — research → PRD → tech design → build plan |

### Build (saat coding)
| Command | Gunakan ketika |
|---------|----------------|
| `/new-feature` | Mulai fitur baru size M/L |
| `/db-migrate` | Ada perubahan schema Prisma |
| `/deploy` | Push ke production |
| `/health-check` | Ada masalah atau monitoring rutin |
| `/git-commit` | Commit dengan format benar |
| `/dev-reset` | Environment dev bermasalah |

## 🔌 Vibe MCP Servers (Auto-Active)

- **Brave Search** — Web scraping & live docs untuk menghindari halusinasi
- **Sequential Thinking** — Pengereman AI untuk logika memecahkan masalah rumit
- **Context7** — docs real-time Next.js 16, Prisma 7, Better Auth, BullMQ → `use context7`
- **GitHub** — issues, PR, commits dari IDE
- **Figma** — Membaca design file langsung dari URL untuk UI/UX
- **Google Stitch** — Ekstrak *Design DNA* (warna, layout) dari proyek
- **PostgreSQL** — schema dan query DB development (jangan production!)
- **Playwright** — E2E testing browser otomatis
- **Sentry** — production errors langsung ke context
- **Docker** — container logs dan status

Config lengkap di `.agent/mcp_config.json`

---

## 🧠 Skills — Daftar Lengkap

### Planning Skills (jalankan sebelum coding project baru)
| Skill | Trigger |
|-------|---------|
| `vibe-research` | "riset dulu", "validasi ide", "analisa kompetitor" |
| `vibe-prd` | "buat PRD", "definisikan fitur", "scope MVP" |
| `vibe-techdesign` | "pilih stack", "desain arsitektur", "buat ERD" |
| `vibe-buildplan` | "buat sprint plan", "breakdown task", "berapa sprint" |

### Build Skills (dipakai saat coding)
| Skill | Trigger |
|-------|---------|
| `prisma-7-patterns` | Coding DB, schema, migrate |
| `xendit-integration` | Payment, webhook, split |
| `nextjs-api-route` | Buat `route.ts`, Server Action |
| `better-auth-patterns` | Auth, login, session |
| `bullmq-worker` | Background job, queue |
| `uu-pdp-feature-check` | Fitur yang sentuh data pribadi |
| `feature-spec-writer` | Plan fitur baru, size M/L |
| `neo-storage` | Upload file, presigned URL |
