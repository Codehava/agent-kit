---
name: vibe-techdesign
description: |
  Use after vibe-prd, or when deciding architecture and stack.
  Triggers on "pilih stack", "desain arsitektur", "database apa yang cocok",
  "tech design", "buat ERD", "struktur folder", "pilih framework",
  or /vibe-plan step 3.
  Requires: docs/01-PRD.md (baca dulu sebelum mulai).
  Output: mengisi docs/02-TECH-DESIGN.md dengan stack dan arsitektur spesifik proyek ini.
---

# Vibe Tech Design — Architecture & Stack Decision Maker

Skill ini membantu memilih stack yang tepat dan merancang arsitektur
berdasarkan PRD yang sudah ada. Output-nya mengisi `docs/02-TECH-DESIGN.md`
dengan keputusan spesifik proyek ini — bukan template kosong.

## Persiapan

**Pertama:** Baca `docs/01-PRD.md` (wajib ada).
**Kedua:** Baca `docs/research-[AppName].md` jika ada.

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
  - [Generate pertanyaan spesifik berdasarkan fitur di PRD]
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

Gunakan decision tree ini untuk rekomendasikan stack yang tepat:

### Platform
```
PRD: mobile only → Flutter + minimal web (admin panel saja)
PRD: web only → Next.js only
PRD: keduanya → Next.js + Flutter (stack yang sudah kita punya)
PRD: web-heavy dengan admin → Next.js + Flutter untuk end-user mobile
```

### Database
```
Data relasional, perlu ACID transaction → PostgreSQL 17 (default)
Perlu full-text search → PostgreSQL + pg_trgm extension (tidak perlu Elasticsearch untuk MVP)
Perlu real-time → PostgreSQL + Socket.io (sudah di stack)
Ada data semi-structured → PostgreSQL dengan JSONB column (cukup untuk MVP)
```

### Background Jobs
```
Perlu email, notif, payment processing → BullMQ + Redis (sudah di stack)
Perlu scheduled jobs (laporan harian, dll) → BullMQ dengan cron option
Tidak perlu background processing → Skip BullMQ, simplify stack
```

### Storage
```
Upload file/gambar → NEO Object Storage (sudah di stack, Indonesia)
Tidak ada file upload → Skip storage setup
Video content heavy → Pertimbangkan Mux atau Cloudflare Stream (bukan NEO)
```

### Auth
```
Login biasa + Google OAuth → Better Auth 1.5 (sudah di stack)
Perlu multi-tenant (SaaS) → Better Auth dengan organizations plugin
Perlu 2FA → Better Auth dengan TOTP plugin
Perlu magic link → Better Auth sudah support
```

### Payment
```
Ada transaksi keuangan → Xendit (wajib, satu-satunya dengan native split payment Indonesia)
Split ke merchant/seller → Xendit dengan forUserID
Tidak ada transaksi → Hapus Xendit dari stack, hemat kompleksitas
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
Infra: [Biznet Gio + Coolify / alternatif jika beda]

Penyesuaian dari stack standar:
- [list hal yang berbeda dari template default]

Setuju dengan stack ini? (yes/no/ada yang mau diubah)
```

---

## Output: Update `docs/02-TECH-DESIGN.md`

Setelah user setuju, update `docs/02-TECH-DESIGN.md` dengan:

1. **Bagian 1 (Tech Stack)** — isi tabel dengan versi konkret, tambahkan/hapus baris sesuai keputusan
2. **Bagian 3 (Struktur Folder)** — sesuaikan dengan nama app dan fitur yang ada di PRD
3. **Bagian 4 ke bawah** — tambahkan section spesifik jika ada integrasi unik (maps, KYC, dll)

Juga generate **ERD awal** berdasarkan user stories di PRD:

```markdown
## ERD Awal — [Nama Aplikasi]

### Tabel Utama

```prisma
// Berdasarkan fitur di PRD — generate model Prisma yang relevan

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  // tambah field sesuai kebutuhan aplikasi
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  @@map("users")
}

// [tambah model lain berdasarkan fitur di PRD]
// Contoh: jika marketplace → model Product, Order, OrderItem, Review
// Jika booking: → model Booking, Service, TimeSlot, Provider
// Jika SaaS: → model Organization, Subscription, Plan
```
```

Dan **API Endpoints awal**:

```markdown
## API Contracts Awal

| Method | Endpoint | Auth | Deskripsi | REQ ref |
|--------|----------|------|-----------|---------|
| POST | /api/auth/sign-up | public | Registrasi | REQ-001 |
| POST | /api/auth/sign-in | public | Login | REQ-002 |
| GET | /api/[resource] | user | [dari PRD] | REQ-XXX |
| POST | /api/[resource] | user | [dari PRD] | REQ-XXX |
```

---

## Aturan Penting

- Stack default kita (Next.js 16 + Flutter + Prisma 7 + Better Auth) adalah titik awal — modifikasi seperlunya
- Jangan over-engineer: jika fitur bisa pakai PostgreSQL saja, jangan tambahkan Redis
- Setiap keputusan stack harus punya alasan bisnis/teknis yang jelas
- ERD harus mencerminkan user stories di PRD — bukan generic template
- Setelah generate, tambahkan entry ke `docs/06-DEVELOPMENT-LOG.md`:
  `[KEPUTUSAN] Stack [AppName] dipilih: [ringkasan stack] — Alasan: [ringkasan]`
- Reminder user: "Tech design sudah jadi. Jalankan `/vibe-buildplan` untuk buat rencana sprint."
