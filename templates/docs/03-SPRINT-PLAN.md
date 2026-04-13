# 03 — Sprint Plan & Backlog
> Aplikasi: [Nama Aplikasi] | Dibuat: [tanggal]
> Berdasarkan: `docs/01-PRD.md` + `docs/02-TECH-DESIGN.md`
> Dokumen ini diperbarui setiap sprint — catat progress di sini.
>
> 🤖 **AI Reading Guide:** Baca bagian "Sprint Aktif" untuk mengetahui task yang sedang dikerjakan. Jangan kerjakan task di luar kolom "In Progress" tanpa konfirmasi. Update status task setiap selesai mengerjakan satu item.

---

## 🗓️ Sprint Aktif

| Field | Isi |
|-------|-----|
| **Sprint #** | 1 |
| **Periode** | [tanggal mulai] → [tanggal selesai] |
| **Goal** | [1 kalimat tujuan sprint ini, contoh: user bisa login dan lihat dashboard] |
| **PIC** | [nama] |

### Status Board

#### 🔴 In Progress
| ID | Task | PIC | Notes |
|----|------|-----|-------|
| T001 | [nama task] | [nama] | [catatan] |

#### 🟡 Todo
| ID | Task | Size | Prioritas |
|----|------|------|-----------|
| T002 | [nama task] | S | P0 |

#### 🟢 Done
| ID | Task | Selesai |
|----|------|---------|
| — | — | — |

#### 🚫 Blocked
| ID | Task | Blocker | Butuh Apa |
|----|------|---------|-----------|
| — | — | — | — |

---

## 📊 Ringkasan Semua Sprint

| Sprint | Durasi | Tujuan | Hasil yang Bisa Dicek | Kapasitas |
|--------|--------|--------|----------------------|-----------|
| Sprint 1 | [X minggu] | Setup + Login | App bisa login, live di staging | [X] jam |
| Sprint 2 | [X minggu] | [Fitur utama 1] | [hasil konkret] | [X] jam |
| Sprint 3 | [X minggu] | [Fitur utama 2] | [hasil konkret] | [X] jam |
| Sprint N | [X minggu] | Persiapan launch | App siap production | [X] jam |

**Total estimasi:** [N] sprint × [X] minggu = [Y] minggu  
**Target launch:** [tanggal estimasi]

---

## ✅ Checklist Sebelum Mulai Coding

Selesaikan ini dulu sebelum menyentuh kode apapun:

- [ ] Repository sudah dibuat di GitHub
- [ ] Docker Compose sudah bisa jalan (PostgreSQL + Redis)
- [ ] Domain sudah dibeli dan DNS sudah diarahkan
- [ ] VPS sudah disetup dan bisa diakses
- [ ] File `.env` sudah diisi (lihat `docs/02-TECH-DESIGN.md`)
- [ ] Database sudah bisa terkoneksi dari lokal
- [ ] Semua anggota tim sudah bisa jalankan project di lokal

---

## Sprint 1 — Setup & Login

**Tujuan:** Environment siap, fitur login berfungsi, bisa diakses di staging  
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif  
**Selesai jika:** User bisa daftar, login, dan logout. App sudah live di URL staging.

### Daftar Pekerjaan

| ID | Pekerjaan | Ukuran | Est. | Terkait | Catatan |
|----|-----------|--------|------|---------|---------|
| T001 | Setup project + Docker (database lokal) | S | 2j | — | Ikuti struktur folder di tech design |
| T002 | Koneksi database + struktur tabel User | S | 2j | — | |
| T003 | Fitur login email + Google | M | 4j | REQ-001 | Test dengan akun Google asli |
| T004 | Halaman login + daftar (dengan validasi) | M | 4j | REQ-001 | Tampilkan pesan error yang jelas |
| T005 | Halaman setelah login (dashboard kosong) | S | 2j | REQ-001 | Ada tombol logout |
| T006 | Setup deploy otomatis ke staging | S | 2j | — | Push kode → otomatis live |
| T007 | Endpoint cek server (`/api/health`) | XS | 1j | — | Return `{status: "ok"}` |
| T008 | Setup monitoring error (Sentry) | XS | 1j | — | Test dengan error sengaja |

**Total estimasi:** [sum] jam  
**Masuk dalam kapasitas [X] jam?** [ya / tidak — jika tidak, geser ke sprint 2]

### Status Pekerjaan Sprint 1

| ID | Status | Selesai Tanggal | Catatan |
|----|--------|----------------|---------|
| T001 | ⬜ Belum | — | |
| T002 | ⬜ Belum | — | |
| T003 | ⬜ Belum | — | |
| T004 | ⬜ Belum | — | |
| T005 | ⬜ Belum | — | |
| T006 | ⬜ Belum | — | |
| T007 | ⬜ Belum | — | |
| T008 | ⬜ Belum | — | |

---

## Sprint 2 — [Nama Fitur Utama 1]

**Tujuan:** [fitur utama] berjalan dari awal sampai akhir  
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif  
**Selesai jika:** [kondisi konkret yang bisa dicek — bukan "fitur selesai"]

### Daftar Pekerjaan

| ID | Pekerjaan | Ukuran | Est. | Terkait | Catatan |
|----|-----------|--------|------|---------|---------|
| T010 | Buat tabel database untuk fitur ini | XS | 1j | — | Selalu mulai dari database |
| T011 | API — ambil daftar data | S | 2j | REQ-0XX | Termasuk pagination |
| T012 | API — tambah data baru | M | 4j | REQ-0XX | Validasi input, pesan error jelas |
| T013 | Halaman daftar — tampilan | M | 4j | REQ-0XX | Loading, kosong, error state |
| T014 | Halaman detail — tampilan | M | 4j | REQ-0XX | |
| T015 | Form tambah/edit — tampilan | L | 8j | REQ-0XX | Validasi di form + di server |

**Total estimasi:** [sum] jam

### Status Pekerjaan Sprint 2

| ID | Status | Selesai Tanggal | Catatan |
|----|--------|----------------|---------|
| T010 | ⬜ Belum | — | |
| T011 | ⬜ Belum | — | |
| T012 | ⬜ Belum | — | |
| T013 | ⬜ Belum | — | |
| T014 | ⬜ Belum | — | |
| T015 | ⬜ Belum | — | |

---

## Sprint 3 — [Nama Fitur Utama 2 / Pembayaran / Notifikasi]

**Tujuan:** [deskripsi tujuan]  
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif  
**Selesai jika:** [kondisi konkret]

### Daftar Pekerjaan

| ID | Pekerjaan | Ukuran | Est. | Terkait | Catatan |
|----|-----------|--------|------|---------|---------|
| T020 | [pekerjaan] | [ukuran] | [jam] | [REQ] | [catatan] |

---

## Sprint Terakhir — Keamanan & Persiapan Launch

**Tujuan:** Semua checklist pre-launch terpenuhi, siap production  
**Durasi:** [X minggu] | **Kapasitas:** [X] jam efektif

### Wajib Sebelum Launch (Privasi Pengguna)

| ID | Pekerjaan | Ukuran | Est. | Catatan |
|----|-----------|--------|------|---------|
| TN01 | Fitur hapus akun + semua data pengguna | M | 4j | Data dihapus dalam 30 hari |
| TN02 | Fitur unduh/export data pribadi | M | 4j | Format JSON atau CSV |
| TN03 | Halaman Privacy Policy (bukan placeholder) | S | 2j | |
| TN04 | Halaman Syarat & Ketentuan | S | 2j | |
| TN05 | Persetujuan pengguna saat daftar | S | 2j | Checkbox tidak pre-centang |

### Keamanan & Performa

| ID | Pekerjaan | Ukuran | Est. | Catatan |
|----|-----------|--------|------|---------|
| TN10 | Batasi percobaan request berlebihan | S | 2j | Anti spam |
| TN11 | Security headers di semua halaman | S | 2j | |
| TN12 | Test beban — simulasi banyak pengguna | M | 4j | |
| TN13 | Audit kecepatan semua halaman utama | S | 2j | Target skor > 90 |
| TN14 | Setup backup database otomatis | S | 2j | Harian |

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

### Epic 3: Pembayaran (Xendit) — jika ada
- [ ] T-020 Setup Xendit SDK + credentials
- [ ] T-021 Buat payment link / invoice
- [ ] T-022 Webhook handler + verifikasi token
- [ ] T-023 BullMQ worker proses webhook
- [ ] T-024 Update order status setelah payment
- [ ] T-025 Socket.io notify client payment berhasil
- [ ] T-026 FCM push notif payment berhasil (Flutter)
- [ ] T-027 Halaman sukses/gagal payment
- [ ] T-028 Riwayat transaksi

### Epic 4: Realtime & Notifikasi — jika ada
- [ ] T-030 Socket.io room management (per user)
- [ ] T-031 Realtime order status update (web)
- [ ] T-032 Realtime order status update (Flutter)
- [ ] T-033 FCM setup + Firebase project
- [ ] T-034 Push notif dari BullMQ worker
- [ ] T-035 Email notifikasi via Resend

### Epic 5: File Upload — jika ada
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

## 🚫 Fitur yang Ditunda (Setelah MVP)

| ID | Fitur | Asal Dokumen | Alasan Ditunda |
|----|-------|-------------|----------------|
| B01 | [nama fitur] | REQ-0XX | [kenapa ditunda] |
| B02 | [nama fitur] | REQ-0XX | [kenapa ditunda] |

---

## 🐛 Bug Log

| ID | Deskripsi | Severity | Status | Ditemukan di |
|----|-----------|----------|--------|-------------|
| — | — | — | — | — |

---

## 📏 Estimasi Ukuran Task

| Ukuran | Waktu | Contoh |
|--------|-------|--------|
| XS | < 1 jam | Fix typo, update copy, minor style |
| S | 1–3 jam | Setup config, 1 komponen sederhana |
| M | 3–6 jam | 1 halaman lengkap, 1 API route dengan logic |
| L | 6–12 jam | 1 fitur end-to-end (FE + BE + DB) |
| XL | > 12 jam | Epic besar — harus dipecah jadi task lebih kecil |

---

## 📝 Keputusan Sprint

### Keputusan Teknis
- [catat keputusan teknis yang dibuat sprint ini]

### Pelajaran
- [hal yang dipelajari]

### Rencana Sprint Berikutnya
- [gambaran umum sprint selanjutnya]

---

## 🏗️ Panduan Build

### Cara Mengerjakan Setiap Pekerjaan

**Pekerjaan besar (ukuran M atau L):**
```
1. Ketik /new-feature
2. Sebutkan ID dan nama pekerjaannya
3. AI buat rencana teknis + syarat selesai
4. Review + setujui
5. AI kerjakan → ketik /apply
6. Setelah selesai → ketik /unify
7. Update status di sprint plan ini
```

**Pekerjaan kecil (ukuran XS atau S):**
```
1. Jelaskan langsung ke AI apa yang perlu dikerjakan
2. AI kerjakan langsung
3. Update status di sprint plan ini
```

### Urutan Build yang Benar

```
Tahap 1: FONDASI (Sprint 1)
────────────────────────────
□ Docker bisa jalan (database + cache)
□ Tabel pengguna sudah dibuat
□ Login bisa dipakai (masuk, keluar, halaman terlindungi)
□ Deploy ke staging berhasil
□ Error monitoring aktif

Tahap 2: FITUR INTI (Sprint 2 – N-1)
────────────────────────────────────
□ Buat tabel database dulu
□ Buat API (server) dulu, baru UI (tampilan)
□ Setiap fitur: uji di staging sebelum lanjut

Tahap 3: PEMBAYARAN & INTEGRASI (jika ada)
───────────────────────────────────────────
□ Setup sandbox payment gateway
□ Test skenario: berhasil, gagal, timeout, expired
□ Integrasi pihak ketiga (maps, SMS, dll)

Tahap 4: PRIVASI & KEAMANAN (wajib sebelum launch)
───────────────────────────────────────────────────
□ Fitur hapus akun (TN01)
□ Fitur unduh data (TN02)
□ Privacy Policy live
□ Rate limiting aktif
□ Backup otomatis berjalan

Tahap 5: PERSIAPAN LAUNCH
──────────────────────────
□ Test beban selesai
□ Skor kecepatan > 90 di semua halaman utama
□ Error rate < 1% di staging selama 3 hari
□ Semua bug parah sudah diperbaiki
□ Rencana rollback sudah dites
□ Backup database restore sudah dites
```

### Sebuah Pekerjaan Dianggap SELESAI Jika

- [ ] Kode sudah disimpan (commit) dengan pesan yang jelas
- [ ] Tidak ada error TypeScript
- [ ] Ada tampilan saat memuat data (loading)
- [ ] Ada tampilan saat data kosong
- [ ] Ada pesan error yang mudah dipahami pengguna
- [ ] Input divalidasi sebelum disimpan ke database
- [ ] Sudah dicoba manual di browser/device
- [ ] Status di sprint plan sudah diperbarui

---

*Dokumen ini diperbarui setiap akhir sprint.*  
*Ketik `/progress` untuk melihat posisi sekarang.*
