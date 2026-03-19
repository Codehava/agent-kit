# 04 — Sprint Backlog
> Update setiap sprint (1-2 minggu). AI membaca ini untuk tahu konteks task aktif.

---

## 🗓️ Sprint Aktif

| Field | Isi |
|-------|-----|
| **Sprint #** | 1 |
| **Periode** | [tanggal mulai] → [tanggal selesai] |
| **Goal** | [1 kalimat tujuan sprint ini, contoh: user bisa login dan lihat dashboard] |
| **PIC** | [nama] |

---

## 📋 Task Sprint 1

### 🔴 In Progress
| ID | Task | PIC | Notes |
|----|------|-----|-------|
| T001 | [nama task] | [nama] | [catatan] |

### 🟡 Todo
| ID | Task | Size | Prioritas |
|----|------|------|-----------|
| T002 | Setup project monorepo + Docker | S | P0 |
| T003 | Setup PostgreSQL + Prisma schema awal | S | P0 |
| T004 | Better Auth: login email + Google | M | P0 |
| T005 | Layout dashboard + sidebar (web) | M | P1 |
| T006 | Halaman login + register (web) | M | P0 |
| T007 | Setup Flutter project + navigation | M | P1 |
| T008 | Setup Socket.io server | S | P1 |
| T009 | Setup BullMQ + Redis | S | P1 |
| T010 | Integrasi Xendit sandbox | L | P1 |

### 🟢 Done
| ID | Task | Selesai |
|----|------|---------|
| — | — | — |

### 🚫 Blocked
| ID | Task | Blocker | Butuh Apa |
|----|------|---------|-----------|
| — | — | — | — |

---

## 📦 Product Backlog

### Epic 1: Autentikasi & Onboarding
- [ ] T-001 Setup project, monorepo, Docker compose
- [ ] T-002 Better Auth: email + password
- [ ] T-003 Better Auth: Google OAuth
- [ ] T-004 Email verifikasi via Resend
- [ ] T-005 Forgot password flow
- [ ] T-006 Auth Flutter (simpan session di Hive)
- [ ] T-007 Protected routes web + Flutter

### Epic 2: [Core Feature — ganti sesuai aplikasi]
- [ ] T-010 [task]
- [ ] T-011 [task]
- [ ] T-012 [task]

### Epic 3: Pembayaran (Xendit)
- [ ] T-020 Setup Xendit SDK + credentials
- [ ] T-021 Buat payment link / invoice
- [ ] T-022 Webhook handler + verifikasi token
- [ ] T-023 BullMQ worker proses webhook
- [ ] T-024 Update order status setelah payment
- [ ] T-025 Socket.io notify client payment berhasil
- [ ] T-026 FCM push notif payment berhasil (Flutter)
- [ ] T-027 Halaman sukses/gagal payment
- [ ] T-028 Riwayat transaksi

### Epic 4: Realtime & Notifikasi
- [ ] T-030 Socket.io room management (per user)
- [ ] T-031 Realtime order status update (web)
- [ ] T-032 Realtime order status update (Flutter)
- [ ] T-033 FCM setup + Firebase project
- [ ] T-034 Push notif dari BullMQ worker
- [ ] T-035 Email notifikasi via Resend

### Epic 5: File Upload (NEO Object Storage)
- [ ] T-040 NEO S3 client setup
- [ ] T-041 Upload API route dengan validasi
- [ ] T-042 Resize/compress gambar via BullMQ job
- [ ] T-043 Flutter image picker + upload

### Epic 6: Admin & Monitoring
- [ ] T-050 Admin dashboard (order, user, transaksi)
- [ ] T-051 Uptime Kuma setup
- [ ] T-052 Sentry error tracking
- [ ] T-053 Bull Board UI (monitor BullMQ jobs)

---

## 🐛 Bug Log

| ID | Deskripsi | Severity | Status | Ditemukan |
|----|-----------|----------|--------|-----------|
| — | — | — | — | — |

---

## 📏 Size Estimation

| Size | Waktu | Contoh |
|------|-------|--------|
| XS | < 1 jam | Fix typo, update copy, minor style |
| S | 1-3 jam | Setup config, 1 komponen sederhana |
| M | 3-6 jam | 1 halaman lengkap, 1 API route dengan logic |
| L | 6-12 jam | 1 fitur end-to-end (FE + BE + DB) |
| XL | > 12 jam | Epic besar — harus dipecah jadi task lebih kecil |

---

## 📝 Keputusan Sprint

### Keputusan Teknis
- [catat keputusan teknis yang dibuat sprint ini]

### Pelajaran
- [hal yang dipelajari]

### Rencana Sprint Berikutnya
- [gambaran umum sprint selanjutnya]
