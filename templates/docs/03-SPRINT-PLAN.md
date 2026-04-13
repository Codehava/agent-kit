# 03 — Sprint Plan & Panduan Build
> Aplikasi: [Nama Aplikasi] | Dibuat: [tanggal]
> Berdasarkan: docs/01-prd.md + docs/02-tech-design.md
> Dokumen ini diperbarui setiap sprint — catat progress di sini

---

## Ringkasan Sprint

| Sprint | Durasi | Tujuan | Hasil yang Bisa Dicek | Kapasitas |
|--------|--------|--------|----------------------|-----------|
| Sprint 1 | [X minggu] | Setup + Login | App bisa login, live di staging | [X] jam |
| Sprint 2 | [X minggu] | [Fitur utama 1] | [hasil konkret] | [X] jam |
| Sprint 3 | [X minggu] | [Fitur utama 2] | [hasil konkret] | [X] jam |
| Sprint N | [X minggu] | Persiapan launch | App siap production | [X] jam |

**Total estimasi:** [N] sprint × [X] minggu = [Y] minggu
**Target launch:** [tanggal estimasi]

---

## Checklist Sebelum Mulai Coding

Selesaikan ini dulu sebelum menyentuh kode apapun:

- [ ] Repository sudah dibuat di GitHub
- [ ] Docker Compose sudah bisa jalan (PostgreSQL + Redis)
- [ ] Domain sudah dibeli dan DNS sudah diarahkan
- [ ] VPS sudah disetup dan bisa diakses
- [ ] File `.env` sudah diisi (lihat docs/02-tech-design.md)
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

## Fitur yang Ditunda (Setelah MVP)

Fitur ini sengaja tidak dimasukkan di versi pertama — dikerjakan setelah ada pengguna nyata:

| ID | Fitur | Asal Dokumen | Alasan Ditunda |
|----|-------|-------------|----------------|
| B01 | [nama fitur] | REQ-0XX | [kenapa ditunda] |
| B02 | [nama fitur] | REQ-0XX | [kenapa ditunda] |

---

## Catatan Bug

| ID | Deskripsi | Ditemukan di | Tingkat Keparahan | Status |
|----|-----------|-------------|------------------|--------|
| — | — | — | — | — |

---

## Panduan Build

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

Jangan melompati urutan ini — setiap tahap bergantung pada tahap sebelumnya:

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
Urutan per fitur:
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
