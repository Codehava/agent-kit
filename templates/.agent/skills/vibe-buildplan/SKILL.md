---
name: vibe-buildplan
description: |
  Use after vibe-techdesign. Generates sprint plan and initial backlog from PRD.
  Triggers on "buat sprint plan", "breakdown task", "berapa sprint",
  "buat backlog dari PRD", "rencana build", "mulai sprint pertama",
  or /vibe-plan step 4.
  Requires: docs/01-PRD.md + docs/02-TECH-DESIGN.md
  Output: docs/04-BACKLOG.md (terisi) + BUILD_PLAN.md
---

# Vibe Build Plan — Sprint Planner dari PRD

Skill ini mengubah PRD + Tech Design menjadi sprint plan yang konkret dan siap dikerjakan.
Output: backlog terisi + BUILD_PLAN.md sebagai panduan build phase.

## Persiapan

Baca kedua file ini sebelum mulai:
- `docs/01-PRD.md` — untuk user stories dan fitur
- `docs/02-TECH-DESIGN.md` — untuk stack dan ERD

---

## Pertanyaan yang Diajukan

**Q1:** "Berapa lama satu sprint? (1 minggu / 2 minggu)"

**Q2:** "Berapa jam per hari yang bisa dialokasikan untuk coding?
  (termasuk semua anggota tim — contoh: 2 developer × 4 jam/hari = 8 jam/hari)"

**Q3:** "Target berapa sprint untuk MVP yang bisa di-launch?"

**Q4:** "Ada task teknis yang sudah harus ada sebelum coding fitur?
  (setup Docker, CI/CD, domain, SSL, dll)"

---

## Logic: Kalkulasi Kapasitas

```
Total jam per sprint = jam/hari × hari kerja per sprint
Buffer factor = 0.7 (ambil 70% kapasitas untuk hal tak terduga)
Efektif per sprint = total jam × 0.7

Size → jam estimasi:
XS = 1 jam
S  = 2 jam
M  = 4 jam
L  = 8 jam
XL = 16 jam (harus dipecah)
```

---

## Output 1: `docs/04-BACKLOG.md` (TERISI dari PRD)

Generate backlog dengan task konkret dari setiap REQ di PRD:

```markdown
# 04 — Sprint Backlog — [Nama Aplikasi]
> Dibuat dari PRD [tanggal] | Update setiap sprint

## 📋 Sprint 1 — Setup & Foundation

**Goal:** Environment siap, auth berfungsi, dapat login
**Kapasitas:** [X] jam efektif

### 🔴 In Progress
| ID | Task | PIC | Notes |
|----|------|-----|-------|
| — | — | — | — |

### 🟡 Todo
| ID | Task | Size | Estimasi | REQ ref |
|----|------|------|----------|---------|
| T001 | Setup monorepo + Docker Compose (postgres:17, redis:7.4) | S | 2j | — |
| T002 | Setup Next.js 16.1 + Prisma 7 + schema awal | S | 2j | — |
| T003 | Better Auth 1.5 — login email + Google OAuth | M | 4j | REQ-001, REQ-002 |
| T004 | Layout dashboard + protected routes | M | 4j | REQ-001 |
| T005 | Halaman login + register (web) | M | 4j | REQ-001 |
| T006 | Setup GitHub Actions → Coolify CI/CD | S | 2j | — |
| [T00X] | [task lain dari PRD jika muat] | [size] | [jam] | [REQ] |

**Total estimasi Sprint 1:** [X] jam

### 🟢 Done
| ID | Task | Selesai |
|----|------|---------|
| — | — | — |

---

## 📋 Sprint 2 — [Core Feature Utama dari PRD]

**Goal:** [fitur P0 pertama berjalan end-to-end]
**Kapasitas:** [X] jam efektif

### 🟡 Todo
| ID | Task | Size | Estimasi | REQ ref |
|----|------|------|----------|---------|
| T010 | [task dari F02 di PRD] | M | 4j | REQ-010 |
| T011 | [task dari F02 lanjutan] | M | 4j | REQ-011 |
| T012 | [task dari F03 di PRD] | L | 8j | REQ-012 |
| [dst berdasarkan PRD] | | | | |

---

## 📋 Sprint 3 — [Payment + Notifikasi jika ada]

[Generate berdasarkan P0 yang tersisa di PRD]

---

## 📦 Product Backlog (P1 — Sprint Berikutnya)

[Semua fitur P1 dari PRD, dipecah jadi task]

---

## 🐛 Bug Log
| ID | Deskripsi | Severity | Status | Ditemukan |
|----|-----------|----------|--------|-----------|
| — | — | — | — | — |
```

---

## Output 2: `BUILD_PLAN.md` (baru, di root)

```markdown
# BUILD_PLAN — [Nama Aplikasi]
> Panduan build phase untuk agent dan developer
> Dibuat: [tanggal] | Berdasarkan: PRD v0.1 + Tech Design

## Overview

| Sprint | Goal | Deliverable |
|--------|------|-------------|
| Sprint 1 | Setup + Auth | App bisa login, deploy ke staging |
| Sprint 2 | [core feature] | [deliverable konkret] |
| Sprint 3 | [feature lanjut] | [deliverable] |
| Sprint N | Polish + Launch | App siap production |

**Total estimasi:** [N] sprint × [X] minggu = [Y] minggu

---

## Cara Pakai Build Plan ini dengan Antigravity

### Per Fitur Baru (size M/L)
```
1. Jalankan /new-feature
2. Agent buat spec di specs/NNN-nama-fitur.md
3. Review spec → approve
4. Agent implementasi sesuai acceptance criteria
5. /git-commit → /deploy
```

### Urutan Build yang Benar

**Phase 1: Foundation (Sprint 1)**
Jangan coding fitur sebelum ini selesai:
- [ ] Docker Compose jalan (postgres + redis)
- [ ] Prisma migrate berhasil
- [ ] Auth berjalan (bisa login + logout)
- [ ] Deploy ke staging berhasil
- [ ] Health check endpoint aktif

**Phase 2: Core Features (Sprint 2-3)**
Build fitur berdasarkan urutan REQ di PRD:
- [ ] [REQ-010] — [nama fitur]
- [ ] [REQ-011] — [nama fitur]
- [ ] dst berdasarkan PRD

**Phase 3: Payment & Notifikasi (jika ada)**
- [ ] Xendit sandbox setup
- [ ] Webhook handler + BullMQ
- [ ] FCM push notif
- [ ] Email via Resend

**Phase 4: UU PDP & Security**
Wajib sebelum launch:
- [ ] Fitur hapus akun
- [ ] Fitur unduh data
- [ ] Privacy Policy live
- [ ] Cloudflare DPA accepted
- [ ] Firebase DPT accepted

**Phase 5: Launch Preparation**
- [ ] Load testing
- [ ] Security review
- [ ] Monitoring aktif (Uptime Kuma + Sentry)
- [ ] Backup strategy running

---

## Prompt Template untuk Build Phase

Gunakan format ini di Antigravity untuk setiap task:

```
[KONTEKS] Sprint [N] — Task T0XX: [nama task]
[REQ] REQ-XXX dari PRD
[TUGAS] [deskripsi spesifik sesuai acceptance criteria]
[CONSTRAINT] Jangan ubah: [files yang tidak boleh diubah]
use context7
```

---

## Definition of Done per Task

Task dianggap selesai jika:
- [ ] Kode ter-commit dengan format benar
- [ ] TypeScript strict — tidak ada error
- [ ] Loading/Empty/Error state ada (untuk komponen UI)
- [ ] Input divalidasi dengan Zod
- [ ] Error handling ada di setiap async function
- [ ] Di-test manual di browser/device
- [ ] Di-update di backlog (pindah ke Done)
```

---

## Aturan Penting

- Task harus konkret dan bisa selesai dalam satu sesi coding (≤ 4 jam)
- XL task harus dipecah sebelum masuk sprint — jangan taruh di backlog sebagai XL
- Sprint 1 selalu: setup infrastruktur + auth — jangan ada fitur business logic di sprint 1
- Urutan task harus memperhatikan dependency: DB schema dulu, baru UI
- Setelah generate, reminder: "Build plan siap. Mulai dengan Sprint 1 Task T001 — ketik `/new-feature` jika siap."
