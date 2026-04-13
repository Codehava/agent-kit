---
name: vibe-techdesign
description: |
  Use after vibe-prd, or when deciding architecture and stack.
  Triggers on "pilih stack", "desain arsitektur", "database apa yang cocok",
  "tech design", "buat ERD", "struktur folder", "pilih framework",
  or /vibe-plan Tahap 3.
  Requires: docs/01-prd.md (baca dulu sebelum mulai).
  Output: docs/02-tech-design.md dengan stack dan arsitektur spesifik proyek ini.
---

# Vibe Tech Design — Architecture & Stack Decision Maker

Skill ini memilih stack yang tepat dan merancang arsitektur berdasarkan PRD.
Output: `docs/02-tech-design.md` dengan keputusan spesifik proyek — bukan template kosong.

## Persiapan

**Pertama:** Baca `docs/01-prd.md` (wajib ada).
**Kedua:** Baca `docs/00-research.md` jika ada.

Gunakan informasi dari kedua dokumen untuk skip pertanyaan yang sudah terjawab.

---

## Pertanyaan yang Diajukan (satu per satu)

**Q1:** "Tim kamu terdiri dari siapa?
  - Berapa developer?
  - Level experience? (junior, mid, senior)
  - Ada yang pernah pakai stack tertentu?"

**Q2:** "Untuk deployment dan infrastruktur:
  - Punya VPS sendiri atau mau pakai cloud provider?
  - Budget infra per bulan kira-kira berapa?
  - Perlu data center Indonesia? (untuk regulasi atau latency)"

**Q3:** "Untuk database:
  - Tipe data apa yang paling banyak disimpan? (relasional, dokumen, file media)
  - Perlu pencarian teks/full-text search?
  - Ada kebutuhan data real-time? (chat, notifikasi live, tracking)"

**Q4:** "Untuk fitur khusus dari PRD:
  [Generate pertanyaan spesifik berdasarkan fitur di PRD]
  Contoh jika ada marketplace: 'Siapa yang bisa upload produk? Berapa max foto per produk?'
  Contoh jika ada chat: 'Berapa peserta per conversation? Perlu history chat?'
  Contoh jika ada laporan: 'Format laporan apa? PDF, Excel, atau dashboard?'"

**Q5:** "Ada integrasi pihak ketiga yang sudah diputuskan?
  (Selain payment — payment sudah diputuskan dari PRD)
  Contoh: maps, SMS/WhatsApp, e-KYC, logistik (JNE, Sicepat), dll"

**Q6:** "Untuk skala dan performa:
  - Berapa user aktif yang ditarget di tahun pertama?
  - Ada fitur yang akan sangat banyak dipakai? (heavy read vs heavy write)
  - Perlu handle file upload besar? (video, dokumen besar)"

---

## Logic: Rekomendasi Stack Berdasarkan Jawaban

### Platform
```
PRD: mobile only           → Flutter + minimal web (admin panel saja)
PRD: web only              → Next.js only
PRD: keduanya              → Next.js + Flutter
PRD: web-heavy dengan admin → Next.js + Flutter untuk end-user mobile
```

### Database
```
Data relasional, ACID transaction  → PostgreSQL 17 (default)
Perlu full-text search             → PostgreSQL + pg_trgm (tidak perlu Elasticsearch untuk MVP)
Perlu real-time                    → PostgreSQL + Socket.io
Ada data semi-structured           → PostgreSQL dengan JSONB column
```

### Background Jobs
```
Perlu email, notif, payment processing → BullMQ + Redis
Perlu scheduled jobs (laporan harian)  → BullMQ dengan cron option
Tidak perlu background processing      → Skip BullMQ, simplify stack
```

### Storage
```
Upload file/gambar  → NEO Object Storage (Indonesia, S3-compatible)
Video content heavy → Cloudflare Stream atau Mux
Tidak ada upload    → Skip storage setup
```

### Auth
```
Login biasa + Google OAuth    → Better Auth 1.5
Multi-tenant (SaaS)           → Better Auth + organizations plugin
2FA                           → Better Auth + TOTP plugin
Magic link                    → Better Auth (built-in)
```

### Payment
```
Ada transaksi keuangan    → Xendit (split payment Indonesia)
Split ke merchant/seller  → Xendit dengan forUserID
Tidak ada transaksi       → Hapus dari stack
```

---

## Verification Echo

```
Rekomendasi stack untuk [Nama Aplikasi]:

Platform: [Web/Mobile/Keduanya]
Stack utama: Next.js 16.1 + [Flutter 3.41.2 jika mobile]
Database: PostgreSQL 17 + [ekstensi jika perlu]
Auth: Better Auth 1.5
Payment: [Xendit / tidak ada]
Background jobs: [BullMQ / tidak perlu]
Storage: [NEO Object Storage / tidak perlu]
Realtime: [Socket.io / tidak perlu]
Infra: [Biznet Gio + Coolify / alternatif lain]

Estimasi biaya infra/bulan: Rp [angka]

Setuju dengan stack ini? (yes/no/ada yang mau diubah)
```

---

## Output: `docs/02-tech-design.md`

**Semua bagian harus terisi. Tidak boleh ada TBD yang blocking.**

```markdown
# 02 — Technical Design & Architecture
> Aplikasi: [Nama Aplikasi] | Versi: v0.1 MVP | Dibuat: [tanggal]
> Berdasarkan: docs/01-prd.md | Generated oleh skill vibe-techdesign

---

## 1. Tech Stack

| Layer | Teknologi | Versi | Alasan Dipilih |
|-------|-----------|-------|----------------|
| Frontend Web | Next.js | 16.1 | [alasan spesifik — misal: SSR untuk SEO, App Router sudah stable] |
| Mobile | Flutter | 3.41.2 | [atau N/A] |
| Backend | Next.js API Routes | 16.1 | [atau server terpisah — sebutkan alasannya] |
| Database | PostgreSQL | 17 | [alasan] |
| ORM | Prisma | 7 | [alasan] |
| Auth | Better Auth | 1.5 | [alasan] |
| Payment | Xendit | latest | [atau N/A] |
| Background Jobs | BullMQ | 5 | [atau N/A] |
| Cache/Queue | Redis | 7.4 | [atau N/A] |
| Storage | NEO Object Storage | — | [atau N/A] |
| Realtime | Socket.io | 4 | [atau N/A] |
| Email | Resend | latest | [atau N/A] |
| Push Notif | FCM (Firebase) | — | [atau N/A] |
| Monitoring Error | Sentry | latest | [alasan] |
| Uptime | Uptime Kuma | latest | self-hosted |
| Deployment | Coolify | latest | self-hosted di [provider] |
| CI/CD | GitHub Actions | — | [trigger: push ke main] |
| Container | Docker Compose | latest | dev + production |

### Yang Sengaja Tidak Dipakai (dan Kenapa)
| Teknologi | Alasan Tidak Dipakai |
|-----------|----------------------|
| [misal: Elasticsearch] | PostgreSQL + pg_trgm cukup untuk MVP — kurangi kompleksitas |
| [misal: Redis Cluster] | Single Redis cukup untuk skala MVP |
| [dst] | [alasan] |

---

## 2. Arsitektur Sistem

### Diagram High-Level

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  [Web Browser / Next.js SSR]    [Mobile App / Flutter]      │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│                    GATEWAY LAYER                             │
│           Cloudflare (CDN + DDoS Protection)                 │
│                   Nginx Reverse Proxy                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  Next.js App (SSR + API Routes)  [Socket.io jika realtime]  │
│                  Better Auth Session                         │
└──────┬──────────────┬────────────────────┬──────────────────┘
       │              │                    │
┌──────▼──────┐ ┌─────▼──────┐ ┌──────────▼───────┐
│  PostgreSQL │ │   Redis    │ │ NEO Object Store │
│     + Prisma│ │  + BullMQ │ │   (File/Gambar)  │
└─────────────┘ └────────────┘ └──────────────────┘
```

### Keputusan Arsitektur Utama

| Keputusan | Pilihan | Alasan | Trade-off |
|-----------|---------|--------|-----------|
| [Monolith vs Microservice] | [pilihan] | [alasan] | [trade-off] |
| [SSR vs CSR vs Static] | [pilihan] | [alasan] | [trade-off] |
| [Realtime vs Polling] | [pilihan] | [alasan] | [trade-off] |
| [SQL vs NoSQL] | [pilihan] | [alasan] | [trade-off] |

---

## 3. Struktur Folder

```
[nama-aplikasi]/
├── apps/
│   ├── web/                    # Next.js app
│   │   ├── app/
│   │   │   ├── (auth)/         # Route group: halaman login/register
│   │   │   ├── (dashboard)/    # Route group: halaman setelah login
│   │   │   │   ├── [fitur-1]/
│   │   │   │   └── [fitur-2]/
│   │   │   └── api/
│   │   │       ├── auth/       # Better Auth endpoints
│   │   │       ├── [resource]/ # API routes per resource
│   │   │       └── webhook/    # Webhook handlers (Xendit, dll)
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   └── [domain]/       # Domain-specific components
│   │   └── lib/
│   │       ├── auth.ts         # Better Auth config
│   │       ├── db.ts           # Prisma client
│   │       └── [domain].ts     # Domain logic
│   └── mobile/                 # Flutter app (jika ada)
│       ├── lib/
│       │   ├── screens/
│       │   ├── widgets/
│       │   └── services/
│       └── pubspec.yaml
├── packages/
│   └── database/
│       ├── prisma/
│       │   └── schema.prisma
│       └── src/
│           └── generated/      # Prisma generated client
├── docker-compose.yml          # PostgreSQL + Redis (dev)
├── docker-compose.prod.yml     # Production setup
└── .github/
    └── workflows/
        └── deploy.yml          # CI/CD pipeline
```

---

## 4. Database Schema (ERD)

### Model Prisma — [Nama Aplikasi]

Berdasarkan user stories di PRD — setiap model mencerminkan kebutuhan nyata, bukan generic:

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider        = "prisma-client-js"
  output          = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// === AUTH (Better Auth — jangan diubah tanpa alasan kuat) ===

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  image         String?
  role          Role      @default(USER)
  // [tambah field spesifik aplikasi ini berdasarkan PRD]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // soft delete untuk UU PDP
  
  sessions      Session[]
  accounts      Account[]
  // [relasi ke model lain berdasarkan PRD]

  @@map("users")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("sessions")
}

model Account {
  id           String  @id @default(cuid())
  userId       String
  provider     String
  providerAccountId String
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@unique([provider, providerAccountId])
  @@map("accounts")
}

enum Role {
  USER
  ADMIN
  // [tambah role lain sesuai PRD]
}

// === DOMAIN MODELS (dari fitur P0 di PRD) ===

// [Model 1 — sesuai fitur F01 di PRD]
model [NamaModel] {
  id        String   @id @default(cuid())
  // [field berdasarkan data yang perlu disimpan]
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("[nama_tabel]")
}

// [Model 2 — sesuai fitur F02]
// [dst — generate berdasarkan REQ di PRD]
```

### Relasi Antar Model

```
[NamaModel1] ──< [NamaModel2]   (one-to-many: satu X bisa punya banyak Y)
[NamaModel2] >──< [NamaModel3]  (many-to-many: melalui tabel junction)
User ──< [NamaModel1]           (user bisa punya banyak X)
```

### Indexing Strategy

| Tabel | Index | Alasan |
|-------|-------|--------|
| [tabel] | `@@index([field])` | [query yang sering dijalankan] |
| [tabel] | `@@index([field1, field2])` | [query compound] |

---

## 5. API Contracts

| Method | Endpoint | Auth | Deskripsi | REQ Ref | Response |
|--------|----------|------|-----------|---------|---------|
| POST | /api/auth/sign-up | public | Registrasi email | REQ-001 | `{user, session}` |
| POST | /api/auth/sign-in | public | Login | REQ-002 | `{user, session}` |
| DELETE | /api/auth/sign-out | user | Logout | — | `{success}` |
| GET | /api/[resource] | user | List [resource] | REQ-XXX | `{data[], total}` |
| POST | /api/[resource] | user | Buat [resource] | REQ-XXX | `{data}` |
| GET | /api/[resource]/[id] | user | Detail [resource] | REQ-XXX | `{data}` |
| PATCH | /api/[resource]/[id] | user | Update [resource] | REQ-XXX | `{data}` |
| DELETE | /api/[resource]/[id] | user | Hapus [resource] | REQ-XXX | `{success}` |
| POST | /api/webhook/[provider] | public+verify | Webhook handler | — | `200 OK` |

### Error Response Format (Standar)

```typescript
// Semua error menggunakan format ini:
{
  error: {
    code: string,      // misal: "UNAUTHORIZED", "NOT_FOUND", "VALIDATION_ERROR"
    message: string,   // pesan untuk developer
    details?: object   // detail validasi jika ada
  }
}
```

---

## 6. Model Keamanan

### Autentikasi & Otorisasi
- Session disimpan di database (bukan JWT stateless) — lebih aman, bisa di-revoke
- Role-based access: [daftar role dari PRD dan apa yang bisa mereka lakukan]
- Rate limiting: [X] request/menit per IP untuk endpoint publik
- CSRF protection: built-in di Better Auth

### Keamanan Data
- Semua data sensitif di-encrypt at rest (fitur PostgreSQL)
- Password tidak pernah disimpan (hanya hash bcrypt)
- File upload: validasi tipe MIME + max size di frontend DAN backend
- SQL injection: tidak mungkin dengan Prisma (parameterized queries)
- XSS: Next.js escape output secara default

### Payment Security (jika ada)
- Webhook Xendit diverifikasi dengan callback token (header `x-callback-token`)
- Tidak ada data kartu kredit yang menyentuh server kita — semua via Xendit hosted
- Idempotency key untuk setiap transaksi — hindari double charge

### Threat Model Sederhana

| Ancaman | Mitigasi | Status |
|---------|----------|--------|
| Brute force login | Rate limiting + lockout | Better Auth built-in |
| SQL injection | Prisma parameterized queries | ✅ otomatis |
| XSS | React/Next.js auto-escape | ✅ otomatis |
| CSRF | Better Auth CSRF protection | ✅ built-in |
| Kebocoran data | Soft delete, enkripsi at rest | Perlu implementasi |
| DDoS | Cloudflare WAF | ✅ by default |
| Unauthorized access | Row-level security di query | Perlu review tiap endpoint |

---

## 7. Strategi Error Handling

### Hierarki Error

```
User Error (4xx)           → Tampilkan pesan yang bisa dipahami user
  400 Bad Request          → "Input tidak valid: [detail]"
  401 Unauthorized         → "Silakan login untuk melanjutkan"
  403 Forbidden            → "Kamu tidak punya akses ke ini"
  404 Not Found            → "[Resource] tidak ditemukan"
  409 Conflict             → "Data sudah ada: [detail]"
  422 Unprocessable Entity → "Data tidak valid: [field] — [alasan]"
  429 Too Many Requests    → "Terlalu banyak percobaan, coba lagi dalam [X] detik"

System Error (5xx)         → Log ke Sentry, tampilkan pesan generic ke user
  500 Internal Server Error → "Terjadi kesalahan, kami sedang diperbaiki"
  503 Service Unavailable   → "Sistem sedang maintenance"
```

### Async Error (Background Jobs)
- BullMQ retry: maksimal [X] kali, backoff exponential
- Setelah max retry: pindah ke dead letter queue, alert ke Sentry
- Critical jobs (payment): alert ke Slack/WhatsApp admin

---

## 8. Estimasi Biaya Infrastruktur

### Setup MVP (Bulanan)

| Komponen | Provider | Spesifikasi | Estimasi/Bulan |
|----------|----------|-------------|----------------|
| VPS / Cloud | [Biznet Gio / Hetzner / dll] | [spec: CPU, RAM, Storage] | Rp [X] |
| Database | Self-hosted di VPS | PostgreSQL 17 | Sudah termasuk VPS |
| Object Storage | NEO Object Storage | [estimasi GB] | Rp [X] |
| CDN | Cloudflare | Free tier | Rp 0 |
| Email | Resend | 3000 email/bulan gratis | Rp 0 |
| Error Monitoring | Sentry | Free tier 5000 events | Rp 0 |
| Domain | [Niagahoster / Cloudflare] | .com / .id | Rp [X]/tahun |
| **Total MVP** | | | **Rp [total]/bulan** |

### Proyeksi Biaya Setelah Tumbuh

| Fase | User Aktif | Estimasi Biaya/Bulan |
|------|-----------|---------------------|
| MVP | [N] user | Rp [X] |
| Growth (6 bulan) | [N×5] user | Rp [Y] |
| Scale (12 bulan) | [N×20] user | Rp [Z] |

---

## 9. Development Environment

### Prerequisites
```bash
# Yang harus terinstall di laptop developer:
- Node.js v22+ (gunakan fnm atau nvm)
- Docker Desktop
- Git
- [Flutter SDK jika mobile]
```

### Setup Lokal (First Time)

```bash
# 1. Clone dan install
git clone [repo-url]
cd [nama-project]
npm install

# 2. Setup environment
cp .env.example .env.local
# isi DATABASE_URL, BETTER_AUTH_SECRET, dll

# 3. Jalankan database
docker-compose up -d

# 4. Setup database
cd packages/database
npx prisma migrate dev
npx prisma db seed  # jika ada seed data

# 5. Jalankan dev server
cd apps/web
npm run dev
```

### Environment Variables yang Dibutuhkan

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/[appname]_dev

# Auth
BETTER_AUTH_SECRET=[random 32 char string]
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (untuk login dengan Google)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Payment — Xendit (jika ada)
XENDIT_SECRET_KEY=
XENDIT_CALLBACK_TOKEN=

# Storage — NEO (jika ada)
NEO_ACCESS_KEY=
NEO_SECRET_KEY=
NEO_BUCKET_NAME=
NEO_ENDPOINT=

# Email — Resend (jika ada)
RESEND_API_KEY=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## 10. Rencana Deployment

### Environment

| Environment | URL | Branch | Deploy Trigger |
|-------------|-----|--------|----------------|
| Development | localhost:3000 | semua branch | Manual |
| Staging | staging.[domain] | `develop` | Auto push |
| Production | [domain] | `main` | Manual approve |

### CI/CD Pipeline (GitHub Actions)

```
Push ke branch
    │
    ▼
[Test] TypeScript check + ESLint + Unit tests
    │
    ├── Gagal → Notify developer, STOP
    │
    ▼
[Build] Docker image build
    │
    ▼
[Deploy Staging] Auto-deploy ke Coolify staging
    │
    ▼
[Manual Approval] Required sebelum deploy production
    │
    ▼
[Deploy Production] Deploy ke Coolify production
    │
    ▼
[Health Check] Ping /api/health — rollback jika gagal
```

---
*Next step: Jalankan skill `vibe-buildplan` untuk membuat sprint plan dan backlog dari PRD + Tech Design ini.*
*Dokumen ini adalah source of truth untuk keputusan teknis — update jika ada perubahan stack.*
```

---

## Aturan Penting

- Stack default (Next.js 16 + Flutter + Prisma 7 + Better Auth) adalah titik awal — modifikasi seperlunya
- Jangan over-engineer: jika fitur bisa pakai PostgreSQL saja, jangan tambah Redis
- Setiap keputusan stack harus punya alasan bisnis/teknis yang jelas — isi kolom "Alasan Dipilih"
- ERD harus mencerminkan user stories di PRD — bukan generic template
- Semua endpoint di API Contracts harus ada REQ ref-nya jika terkait fitur di PRD
- **SKILL CHAINING:** Setelah Tech Design selesai → tanya: *"Arsitektur sudah final! Lanjut buat sprint plan?"* Jika ya → langsung jalankan `vibe-buildplan`.
