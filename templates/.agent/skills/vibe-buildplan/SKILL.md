---
name: vibe-buildplan
description: |
  Use after vibe-techdesign. Generates sprint plan and backlog from PRD + Tech Design.
  Triggers on "buat sprint plan", "breakdown task", "berapa sprint",
  "buat backlog dari PRD", "rencana build", "mulai sprint pertama",
  or /vibe-plan Tahap 4.
  Requires: docs/01-prd.md + docs/02-tech-design.md
  Output: docs/03-sprint-plan.md (sprint backlog + build guide — satu dokumen terpadu)
---

# Vibe Build Plan — Sprint Planner dari PRD + Tech Design

Skill ini mengubah PRD + Tech Design menjadi sprint plan yang konkret dan siap dikerjakan.
Output: **satu dokumen terpadu** `docs/03-sprint-plan.md` — backlog + panduan build dalam satu tempat.

## Persiapan

Baca kedua file ini sebelum mulai:
- `docs/01-prd.md` — untuk user stories, fitur, dan REQ IDs
- `docs/02-tech-design.md` — untuk stack, ERD, dan struktur folder

---

## Pertanyaan yang Diajukan

**Q1:** "Berapa lama satu sprint? (1 minggu / 2 minggu)"

**Q2:** "Berapa jam per hari yang bisa dialokasikan untuk coding?
  (total semua anggota tim — contoh: 2 developer × 4 jam/hari = 8 jam/hari)"

**Q3:** "Target berapa sprint untuk MVP yang bisa di-launch?"

**Q4:** "Ada task teknis yang sudah harus ada sebelum coding fitur?
  (setup Docker, CI/CD, domain, SSL, dll)"

---

## Logic: Kalkulasi Kapasitas

```
Total jam per sprint = jam/hari × hari kerja per sprint
Buffer factor        = 0.7 (ambil 70% kapasitas untuk review, bug, hal tak terduga)
Efektif per sprint   = total jam × 0.7

Ukuran task → estimasi jam:
XS = 1 jam   (konfigurasi, copy text, simple fix)
S  = 2 jam   (komponen sederhana, 1 endpoint simple)
M  = 4 jam   (fitur kecil end-to-end, 1 halaman dengan logika)
L  = 8 jam   (fitur medium — form kompleks, integrasi API, flow multi-step)
XL = 16 jam  → HARUS dipecah jadi 2–3 task L sebelum masuk sprint
```

---

## Output: `docs/03-sprint-plan.md` (SATU DOKUMEN TERPADU)

**Gabungan sprint backlog + panduan build dalam satu file.**
**Semua task harus konkret — bisa diselesaikan dalam satu sesi (≤ 4 jam).**

```markdown
# 03 — Sprint Plan & Build Guide
> Aplikasi: [Nama Aplikasi] | Dibuat: [tanggal]
> Berdasarkan: docs/01-prd.md + docs/02-tech-design.md
> Diperbarui setiap sprint — ini adalah living document

---

## Overview Sprint

| Sprint | Durasi | Goal | Deliverable | Kapasitas |
|--------|--------|------|-------------|-----------|
| Sprint 1 | [X minggu] | Setup + Auth | App bisa login, deploy ke staging | [X] jam |
| Sprint 2 | [X minggu] | [Fitur P0 pertama] | [deliverable konkret] | [X] jam |
| Sprint 3 | [X minggu] | [Fitur P0 kedua] | [deliverable] | [X] jam |
| Sprint N | [X minggu] | Polish + Launch | App siap production | [X] jam |

**Total estimasi:** [N] sprint × [X] minggu = [Y] minggu
**Target launch:** [tanggal estimasi dari hari ini + total waktu]

---

## 🔴 Prasyarat Sebelum Sprint 1 (Checklist)

Selesaikan ini sebelum mulai coding fitur apapun:

- [ ] Repository sudah dibuat di GitHub
- [ ] Docker Compose sudah bisa jalan (PostgreSQL + Redis)
- [ ] Domain sudah dibeli dan DNS sudah diarahkan
- [ ] VPS/cloud sudah disetup dan bisa diakses
- [ ] Coolify sudah terinstall di VPS
- [ ] GitHub Actions sudah terhubung ke Coolify
- [ ] `.env` file sudah diisi (semua key dari docs/02-tech-design.md)
- [ ] Prisma migrate berhasil di lokal
- [ ] Semua developer sudah bisa clone dan jalankan project di lokal

---

## 📋 Sprint 1 — Setup & Foundation

**Goal:** Environment siap, auth berfungsi, bisa login, deploy ke staging
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif
**Definition of Done Sprint 1:** User bisa register, login, dan logout. App sudah live di staging URL.

### 🟡 Todo

| ID | Task | Size | Est. | REQ | Catatan |
|----|------|------|------|-----|---------|
| T001 | Setup monorepo + Docker Compose (postgres:17, redis:7.4) | S | 2j | — | Ikuti struktur folder di tech design |
| T002 | Setup Next.js 16.1 + Prisma 7 + schema User awal | S | 2j | — | Generate dari prisma schema di tech design |
| T003 | Better Auth 1.5 — login email + Google OAuth | M | 4j | REQ-001, REQ-002 | Test dengan akun Google beneran |
| T004 | Layout utama + protected routes (redirect jika belum login) | M | 4j | REQ-001 | Termasuk loading state |
| T005 | Halaman login + register (web) — dengan validasi | M | 4j | REQ-001 | Zod validation, error messages jelas |
| T006 | Setup GitHub Actions → deploy ke Coolify staging | S | 2j | — | Auto deploy saat push ke develop |
| T007 | Health check endpoint `/api/health` | XS | 1j | — | Return `{status: "ok", timestamp}` |
| T008 | Setup Sentry (error monitoring) | XS | 1j | — | Test dengan throw error sengaja |
| [T00X] | [task teknis lain dari Q4] | [size] | [jam] | — | [catatan] |

**Total estimasi Sprint 1:** [sum] jam
**Buffer (30%):** [sum × 0.3] jam
**Masuk dalam kapasitas [X] jam?** [ya/tidak — jika tidak, geser task ke sprint berikutnya]

---

## 📋 Sprint 2 — [Core Feature P0 Pertama dari PRD]

**Goal:** [nama fitur utama] berjalan end-to-end
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif
**Definition of Done Sprint 2:** [kondisi konkret yang bisa dicek — bukan "fitur selesai"]

### 🟡 Todo

| ID | Task | Size | Est. | REQ | Catatan |
|----|------|------|------|-----|---------|
| T010 | [Prisma schema untuk fitur ini] | XS | 1j | — | migrate dulu sebelum coding |
| T011 | [API endpoint — GET list] | S | 2j | REQ-0XX | Include pagination |
| T012 | [API endpoint — POST create] | M | 4j | REQ-0XX | Validasi Zod, error handling |
| T013 | [Halaman list — UI] | M | 4j | REQ-0XX | Loading skeleton, empty state, error state |
| T014 | [Halaman detail — UI] | M | 4j | REQ-0XX | [tampilan state] |
| T015 | [Form create/edit — UI] | L | 8j | REQ-0XX | Validasi client + server |
| [T01X] | [task selanjutnya dari fitur ini] | [size] | [jam] | [REQ] | [catatan] |

**Total estimasi Sprint 2:** [sum] jam

---

## 📋 Sprint 3 — [Core Feature P0 Kedua / Payment / Notifikasi]

**Goal:** [nama fitur / payment / notifikasi] berfungsi
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif
**Definition of Done Sprint 3:** [kondisi konkret]

### 🟡 Todo

[Generate berdasarkan P0 yang tersisa di PRD + payment jika ada]

| ID | Task | Size | Est. | REQ | Catatan |
|----|------|------|------|-----|---------|
| [T020] | [task] | [size] | [jam] | [REQ] | [catatan] |

---

## 📋 Sprint [N] — UU PDP, Security & Launch Preparation

**Goal:** Semua checklist pre-launch terpenuhi, app siap production
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif

### 🟡 Todo — UU PDP (Wajib Sebelum Launch)

| ID | Task | Size | Est. | REQ | Catatan |
|----|------|------|------|-----|---------|
| T[N]01 | Fitur hapus akun + soft delete semua data user | M | 4j | REQ-040 | Data dihapus dalam 30 hari |
| T[N]02 | Fitur export/unduh data pribadi | M | 4j | REQ-041 | JSON atau CSV, kirim via email |
| T[N]03 | Halaman Privacy Policy (live, bukan placeholder) | S | 2j | — | Sesuai UU PDP |
| T[N]04 | Halaman Terms & Conditions (live) | S | 2j | — | |
| T[N]05 | Consent management saat onboarding | S | 2j | — | Checkbox yang tidak pre-checked |

### 🟡 Todo — Security & Performance

| ID | Task | Size | Est. | REQ | Catatan |
|----|------|------|------|-----|---------|
| T[N]10 | Rate limiting di semua endpoint publik | S | 2j | — | Upstash Redis atau middleware |
| T[N]11 | Security headers (CSP, HSTS, dll) | S | 2j | — | next.config.js headers |
| T[N]12 | Load testing — simulasi [X] concurrent user | M | 4j | — | k6 atau artillery |
| T[N]13 | Lighthouse audit semua halaman utama | S | 2j | — | Target > 90 performance |
| T[N]14 | Setup backup database otomatis | S | 2j | — | Cron harian ke object storage |

---

## 📦 Product Backlog — Fitur P1 (Sprint Berikutnya)

Fitur dari PRD yang sengaja ditunda — dikerjakan setelah MVP launch dan ada validasi:

| ID | Fitur | Asal REQ | Estimasi Kasar | Alasan Ditunda |
|----|-------|----------|----------------|----------------|
| B01 | [nama fitur P1] | F0X | [X sprint] | [kenapa ditunda] |
| B02 | [nama fitur P1] | F0X | [X sprint] | [kenapa ditunda] |

---

## 🐛 Bug Log

| ID | Deskripsi | Ditemukan di | Severity | Status | Assignee |
|----|-----------|-------------|----------|--------|---------|
| — | — | — | — | — | — |

---

## 📖 Panduan Build

### Cara Pakai Sprint Plan Ini

**Untuk setiap task baru (size M atau L):**
```
1. Ketik /new-feature
2. Sebutkan ID task dan nama fiturnya
3. AI buat deskripsi teknis + syarat keberhasilan
4. Review + approve
5. AI kerjakan → /apply
6. Setelah selesai → /unify
7. Update task di sprint plan ini (pindah ke Done)
```

**Untuk task kecil (size XS atau S):**
```
1. Langsung jelaskan ke AI apa yang perlu dikerjakan
2. AI kerjakan langsung
3. Update di sprint plan
```

### Urutan Build yang Benar

**JANGAN** melompati urutan ini — setiap fase bergantung pada fase sebelumnya:

```
Phase 1: FOUNDATION (Sprint 1)
─────────────────────────────
□ Docker Compose jalan (postgres + redis)
□ Prisma schema User dibuat + migration berhasil
□ Auth berjalan (bisa login + logout + protected route)
□ Deploy ke staging berhasil
□ Health check endpoint aktif
□ Monitoring aktif (Sentry + Uptime Kuma)

Phase 2: CORE FEATURES (Sprint 2–N-1)
──────────────────────────────────────
Build fitur berdasarkan urutan di sprint plan:
□ Database schema dulu → baru API → baru UI
□ Setiap fitur: backend selesai dan tested sebelum UI dikerjakan
□ [REQ-0XX] → [REQ-0XX] → dst (urutan dari sprint plan)

Phase 3: PAYMENT & INTEGRASI (jika ada)
────────────────────────────────────────
□ Payment gateway sandbox setup
□ Webhook handler + retry logic
□ Test skenario sukses, gagal, timeout, expired
□ Integrasi pihak ketiga (maps, SMS, dll)

Phase 4: UU PDP & SECURITY (wajib sebelum launch)
────────────────────────────────────────────────────
□ Fitur hapus akun (REQ-040)
□ Fitur unduh data (REQ-041)
□ Privacy Policy live
□ Rate limiting aktif
□ Security headers terpasang
□ Backup otomatis jalan

Phase 5: LAUNCH PREPARATION
────────────────────────────
□ Load testing selesai
□ Lighthouse score > 90 di semua halaman utama
□ Error rate < 1% di staging selama 3 hari
□ Semua bug severity HIGH sudah ditutup
□ Rollback plan sudah dites
□ Monitoring alerts sudah dikonfigurasi
□ Database backup restore sudah dites
```

### Prompt Template untuk Setiap Task

Gunakan format ini saat mengerjakan task:

```
Kerjakan T[XXX]: [nama task]

Konteks:
- REQ: [REQ-ID dari PRD] — [deskripsi singkat requirement]
- File yang akan diubah: [list dari tech design]
- Jangan ubah: [file yang tidak boleh disentuh]
- Stack: [teknologi yang relevan untuk task ini]

Syarat selesai:
- [kondisi 1 yang bisa dicek]
- [kondisi 2]
```

### Definition of Done per Task

Task dianggap SELESAI hanya jika:
- [ ] Kode sudah ter-commit dengan format: `[type](scope): deskripsi`
- [ ] Tidak ada TypeScript error
- [ ] Loading state ada di semua komponen yang fetch data
- [ ] Empty state ada jika data bisa kosong
- [ ] Error state ada dengan pesan yang bisa dipahami user
- [ ] Input divalidasi dengan Zod (server side) + form validation (client side)
- [ ] Sudah di-test manual di browser/device
- [ ] Task di sprint plan sudah dipindah ke Done

---
*Dokumen ini diperbarui setiap akhir sprint — tambah task, update status, pindah ke Done.*
*Gunakan /progress untuk melihat posisi sekarang.*
```

---

## Aturan Penting

- Task harus konkret dan selesai dalam ≤ 4 jam — jika lebih dari itu, pecah dulu
- XL task harus dipecah sebelum masuk sprint — jangan taruh sebagai XL di backlog
- Sprint 1 selalu: setup infrastruktur + auth — **jangan ada business logic di Sprint 1**
- Urutan task harus memperhatikan dependency: DB schema dulu, baru API, baru UI
- Jangan lupa task UU PDP (REQ-040 dan REQ-041) — wajib ada di sprint sebelum launch
- Setelah generate: "Sprint plan siap. Mulai dengan Sprint 1 — pastikan dulu prasyarat terpenuhi, lalu ketik `/new-feature` untuk task T001."
