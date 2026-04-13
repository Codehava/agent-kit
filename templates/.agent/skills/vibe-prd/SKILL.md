---
name: vibe-prd
description: |
  Gunakan skill ini saat user ingin mendefinisikan requirements, membuat PRD, menentukan
  fitur MVP, menulis user stories, atau memulai planning produk baru. Aktifkan untuk
  kata kunci: "buat PRD", "definisikan fitur", "apa yang harus dibangun", "scope MVP",
  "user stories", "requirements aplikasi", "fitur apa yang perlu dibuat", atau saat
  /vibe-plan masuk ke Tahap 2. Skill ini menghasilkan docs/01-prd.md yang terisi penuh
  dengan syarat keberhasilan per fitur — output siap untuk /apply.
  Setelah PRD selesai, chain ke vibe-techdesign. Jangan skip skill ini — PRD yang buruk
  menghasilkan kode yang salah.
---

# Vibe PRD — Product Requirements Document Generator

Skill ini menghasilkan PRD yang lengkap dan siap dipakai agent untuk coding.
Bukan template kosong — output-nya sudah terisi berdasarkan jawaban user.

## Persiapan

**Pertama:** Cek apakah `docs/00-research.md` sudah ada.
- Jika ada → baca dulu, gunakan sebagai konteks, skip pertanyaan yang sudah terjawab
- Jika tidak ada → mulai dari awal dengan pertanyaan lengkap

---

## Pertanyaan yang Diajukan (satu per satu)

**Q1:** "Nama aplikasinya apa, dan dalam satu kalimat — apa yang dilakukan aplikasi ini?"

**Q2:** "Siapa yang akan menggunakan aplikasi ini?
  Deskripsikan minimal 2 tipe user (contoh: pembeli & penjual, pasien & dokter, murid & guru)"

**Q3:** "Apa 3 fitur PALING PENTING yang harus ada di MVP?
  (Yang tanpanya, aplikasi tidak bisa dipakai sama sekali)"

**Q4:** "Selain 3 fitur itu, fitur apa lagi yang ingin ada tapi bisa ditunda?
  (Yang penting tapi tidak blocking untuk launch pertama)"

**Q5:** "Untuk fitur pembayaran:
  - Apakah ada transaksi uang di aplikasi ini?
  - Jika ya: siapa yang bayar ke siapa? Ada split payment ke merchant/penjual?
  - Metode pembayaran apa yang harus didukung? (VA, QRIS, kartu, e-wallet)"

**Q6:** "Platform apa yang dibutuhkan?
  - Web app saja?
  - Mobile app saja (Android/iOS)?
  - Keduanya?
  - Apakah butuh versi desktop/tablet yang berbeda?"

**Q7:** "Ada requirement teknis atau bisnis khusus?
  - Harus offline-capable?
  - Multi-bahasa? (Indonesia/English)
  - Aksesibilitas?
  - SLA/uptime target?
  - Berapa estimasi user di bulan pertama?"

**Q8:** "Apa definisi 'sukses' untuk MVP ini?
  (Contoh: 100 user aktif, 20 transaksi, atau validasi bahwa user mau bayar)"

---

## Verification Echo

```
Saya akan buat PRD dengan:
- Aplikasi: [nama] — [deskripsi singkat]
- User types: [list user]
- MVP features (P0): [3 fitur utama]
- Nice-to-have (P1): [fitur tambahan]
- Payment: [ada/tidak, model]
- Platform: [web/mobile/keduanya]
- Target sukses: [metric]

Generate PRD sekarang? (yes/no)
```

---

## Output: `docs/01-prd.md` (TERISI PENUH)

**Semua bagian harus terisi berdasarkan jawaban user — jangan tinggalkan placeholder.**
Gunakan pengetahuan konteks Indonesia untuk melengkapi bagian yang tidak disebutkan secara eksplisit.

```markdown
# 01 — Product Requirements Document (PRD)
> Aplikasi: [Nama Aplikasi] | Versi: v0.1 MVP | Dibuat: [tanggal]
> Generated oleh skill vibe-prd — update manual jika ada perubahan scope

---

## 1. Ringkasan Produk

| Field | Isi |
|-------|-----|
| **Nama Produk** | [nama] |
| **Tipe** | [Web App / Mobile App / Keduanya] |
| **Versi** | v0.1 — MVP |
| **Tanggal** | [tanggal hari ini] |
| **Owner** | [nama dari research atau tanyakan] |

### Elevator Pitch
> [Nama Aplikasi] membantu **[target user]** untuk **[melakukan apa]**
> sehingga **[manfaat utama]** — tanpa harus **[pain point lama]**.

### Masalah yang Diselesaikan
[2–3 kalimat: masalah spesifik, siapa yang mengalami, seberapa sering, dampaknya]

---

## 2. Target Pengguna

### Persona Utama

**[Nama Persona 1]** — [role/profesi]
- Usia: [estimasi]
- Lokasi: [kota / daerah]
- Tech-savvy: [rendah / menengah / tinggi]
- Device utama: [HP Android / iPhone / Laptop]
- Pain point: [masalah utama yang relevan dengan aplikasi ini]
- Goal: [apa yang ingin dicapai]
- Kutipan tipikal: *"[kalimat yang sering diucapkan tipe user ini]"*

**[Nama Persona 2]** — [role/profesi]
- Usia: [estimasi]
- Lokasi: [kota / daerah]
- Tech-savvy: [rendah / menengah / tinggi]
- Device utama: [HP Android / iPhone / Laptop]
- Pain point: [masalah utama]
- Goal: [apa yang ingin dicapai]
- Kutipan tipikal: *"[kalimat tipikal]"*

---

## 3. Fitur MVP

### ✅ P0 — Harus Ada (MVP Blocker)
Tanpa fitur ini, aplikasi tidak bisa dipakai.

| ID | Fitur | Deskripsi | Kenapa Penting | Kompleksitas |
|----|-------|-----------|----------------|--------------|
| F01 | [nama] | [deskripsi konkret — bukan generic] | [alasan bisnis spesifik] | S/M/L |
| F02 | [nama] | [deskripsi konkret] | [alasan bisnis spesifik] | S/M/L |
| F03 | [nama] | [deskripsi konkret] | [alasan bisnis spesifik] | S/M/L |

### 🟡 P1 — Penting tapi Bisa Ditunda
Fitur ini meningkatkan value tapi tidak blocking launch.

| ID | Fitur | Deskripsi | Sprint Target | Alasan Ditunda |
|----|-------|-----------|---------------|----------------|
| F04 | [nama] | [deskripsi] | Sprint 2 | [kenapa bisa ditunda] |
| F05 | [nama] | [deskripsi] | Sprint 3 | [kenapa bisa ditunda] |

### ❌ Out of Scope MVP (dengan alasan)
| Fitur | Alasan Tidak Masuk MVP |
|-------|------------------------|
| [fitur] | [alasan konkret — terlalu kompleks, butuh validasi dulu, dll.] |
| [fitur] | [alasan] |

---

## 4. User Stories & Syarat Keberhasilan

> **Format Syarat Keberhasilan:**
> - ✅ Berhasil: [kondisi awal] + [aksi user] = [hasil yang diharapkan]
> - ❌ Gagal: [kondisi salah] + [aksi user] = [pesan/tindakan error yang benar]

### [Nama Persona 1]

**REQ-001** — [nama fitur F01]
- Sebagai [persona 1], saya ingin [aksi konkret], agar [tujuan spesifik]
- ✅ Berhasil: [kondisi] + [aksi] → [hasil konkret yang bisa dilihat/dirasakan user]
- ❌ Gagal: [kondisi error] + [aksi] → [pesan error yang jelas, bukan generic]
- 📱 Tampilan: Default (kosong) | Loading (skeleton) | Berhasil | Gagal/Error
- 🔔 Notifikasi: [trigger notifikasi jika ada — push/email/in-app]

**REQ-002** — [nama fitur F02]
- Sebagai [persona 1], saya ingin [aksi], agar [tujuan]
- ✅ Berhasil: [kondisi] + [aksi] → [hasil]
- ❌ Gagal: [kondisi error] → [respon sistem]
- 📱 Tampilan: Default | Loading | Berhasil | Gagal
- 🔔 Notifikasi: [jika ada]

### [Nama Persona 2]

**REQ-010** — [nama fitur untuk persona 2]
- Sebagai [persona 2], saya ingin [aksi], agar [tujuan]
- ✅ Berhasil: [kondisi] + [aksi] → [hasil]
- ❌ Gagal: [kondisi error] → [respon sistem]
- 📱 Tampilan: Default | Loading | Berhasil | Gagal

### Pembayaran (isi hanya jika ada transaksi)

**REQ-020** — Proses Pembayaran
- Sebagai pembeli, saya ingin membayar via [metode], agar transaksi mudah dan aman
- ✅ Berhasil: Pembayaran diterima → status order berubah, notifikasi dikirim ke pembeli dan penjual
- ❌ Gagal: Pembayaran gagal → muncul alasan jelas, opsi coba lagi, order tidak berubah status
- ❌ Timeout: Pembayaran > 24 jam tidak dikonfirmasi → order otomatis dibatalkan, refund jika dana sudah terpotong
- 📱 Tampilan: Pilih metode | Proses | Berhasil | Gagal | Expired

**REQ-021** — Rekap Transaksi (Admin)
- Sebagai admin, saya ingin lihat semua transaksi dengan filter, agar bisa rekonsiliasi
- ✅ Berhasil: Tabel transaksi dengan filter tanggal/status/user — bisa export CSV

### Hak Pengguna (UU PDP — Wajib)

**REQ-040** — Hapus Akun
- Sebagai pengguna, saya ingin bisa menghapus akun dan semua data saya
- ✅ Berhasil: Konfirmasi → semua data terhapus dalam 30 hari → email konfirmasi terkirim

**REQ-041** — Unduh Data Pribadi
- Sebagai pengguna, saya ingin mengunduh semua data pribadi saya
- ✅ Berhasil: Request → file JSON/CSV dikirim ke email dalam 24 jam

---

## 5. Alur Pengguna (User Flow)

### Alur Utama: [Nama Flow — misal: Alur Pembelian]

```
[Persona] membuka app
    │
    ▼
[Halaman Pertama yang Dilihat]
    │
    ├── [Aksi Utama]
    │       │
    │       ▼
    │   [Halaman/Modal Berikutnya]
    │       │
    │       ├── ✅ Sukses → [Hasil / Halaman Konfirmasi]
    │       └── ❌ Gagal → [Pesan Error + Opsi]
    │
    └── [Aksi Alternatif]
            │
            ▼
        [Jalur Alternatif]
```

### Alur Onboarding (User Baru)

```
Install / Buka URL
    │
    ▼
Halaman Welcome / Landing
    │
    ├── Daftar dengan Email → Verifikasi Email → Lengkapi Profil → Dashboard
    └── Login dengan Google → [Jika baru: Lengkapi Profil] → Dashboard
                                [Jika lama: langsung] → Dashboard
```

---

## 6. Matriks Notifikasi

| Event | Siapa Dinotif | Kanal | Waktu | Konten Pesan |
|-------|--------------|-------|-------|--------------|
| [event 1] | [persona] | Push / Email / In-app / WhatsApp | Realtime / Harian | [contoh teks notif] |
| [event 2] | [persona] | [kanal] | [waktu] | [teks] |
| [event 3] | [persona] | [kanal] | [waktu] | [teks] |

---

## 7. Non-Functional Requirements

| Kategori | Requirement | Target | Cara Ukur |
|----------|-------------|--------|-----------|
| Performa | Load halaman utama | < 2 detik | Lighthouse / WebVitals |
| Performa | API response time | < 500ms (p95) | Sentry Performance |
| Availability | Uptime | [99% / 99.9%] | Uptime Kuma |
| Concurrent Users | MVP launch | [estimasi dari Q7] | Load test |
| Concurrent Users | Peak (lebaran/harbolnas) | [estimasi × 5] | Load test |
| Keamanan | Auth | Session DB (Better Auth 1.5) | — |
| Keamanan | Payment (jika ada) | Xendit callback token verified | — |
| Keamanan | Data user | Encrypted at rest, HTTPS | — |
| Mobile | Platform | [Android / iOS / Keduanya] | — |
| Storage | File upload max | 5 MB per file | Validasi di frontend + backend |
| Regulasi | Compliance | UU PDP No. 27/2022 | Legal review |
| Aksesibilitas | WCAG | Level AA minimal | Automated audit |

---

## 8. Kebutuhan Konten

| Halaman / Section | Konten yang Dibutuhkan | Siapa Menyiapkan | Deadline |
|-------------------|------------------------|------------------|---------|
| Landing page | Copywriting hero, tagline, CTA | [Tim/Owner] | [sebelum Sprint X] |
| Email onboarding | Welcome email, verifikasi | [Tim/Owner] | [sebelum Sprint X] |
| Notifikasi push | Teks per event (lihat matriks) | [Tim/Owner] | [sebelum Sprint X] |
| Error messages | Pesan error tiap kondisi | Developer | Saat coding |
| Empty states | Teks + ilustrasi saat data kosong | Designer | Sprint [X] |
| Kebijakan Privasi | Sesuai UU PDP | Legal / Owner | Sebelum launch |
| Syarat & Ketentuan | Dokumen legal | Legal / Owner | Sebelum launch |

---

## 9. Success Metrics — Definition of Done untuk MVP

| Metric | Target | Cara Ukur | Frekuensi Cek |
|--------|--------|-----------|---------------|
| [dari Q8 — metric bisnis 1] | [angka] | [tool] | [harian/mingguan] |
| [dari Q8 — metric bisnis 2] | [angka] | [tool] | [harian/mingguan] |
| Uptime | [target]% | Uptime Kuma | Real-time |
| Error rate | < 1% | Sentry | Harian |
| P95 response time | < 500ms | Sentry Performance | Harian |
| User retention D7 | > [X]% | Mixpanel / GA4 | Mingguan |

---

## 10. Constraints & Asumsi

### Constraints (Tidak Bisa Diubah)
- Tim: [komposisi tim dari research]
- Timeline MVP: [tanggal target dari research]
- Budget infrastruktur: Rp [angka]/bulan
- Regulasi: UU PDP No. 27/2022 (berlaku penuh Oktober 2024)
- Platform: [dari Q6]
- [constraint spesifik lain]

### Asumsi (Perlu Divalidasi)
- [ ] [asumsi 1 tentang user behavior — belum terkonfirmasi]
- [ ] [asumsi 2 tentang pasar]
- [ ] [asumsi teknis yang mungkin perlu di-spike]
- Semua user WNI (tidak perlu multi-currency untuk MVP, kecuali disebutkan)

### Open Questions
- [ ] [pertanyaan yang perlu dijawab sebelum Sprint X]
- [ ] [keputusan bisnis yang pending]

---
*Next step: Jalankan skill `vibe-techdesign` untuk menentukan stack, arsitektur, dan struktur database.*
*Dokumen ini diperbarui setiap ada perubahan scope — beri tahu developer jika ada perubahan di sini.*
```

---

## Aturan Penting

- Output harus **terisi penuh** — tidak ada placeholder yang tersisa dari jawaban user
- REQ IDs harus unik dan sequential — agent akan merujuk ID ini saat coding
- Jangan tambahkan fitur yang tidak disebutkan user — jaga scope MVP tetap ketat
- Jika user menyebutkan fitur terlalu kompleks → masukkan ke P1, jelaskan kenapa
- Payment section: muncul hanya jika user konfirmasi ada transaksi keuangan
- **Setiap REQ wajib punya:** syarat sukses + syarat gagal + 4 tampilan (default/loading/berhasil/gagal)
- **SKILL CHAINING:** Setelah PRD selesai → tanya: *"PRD sudah siap! Lanjut ke desain teknis sekarang?"* Jika ya → langsung jalankan `vibe-techdesign`.

## Quality Gate (cek sebelum declare selesai)

```
□ Semua fitur P0 punya REQ ID unik?
□ Setiap REQ punya syarat sukses DAN syarat gagal?
□ Setiap REQ punya 4 tampilan terdefinisi (default, loading, berhasil, gagal)?
□ User flow utama sudah digambar?
□ Matriks notifikasi sudah diisi (jika ada event yang perlu notif)?
□ Kebutuhan konten sudah terdaftar?
□ REQ-040 dan REQ-041 (UU PDP) sudah ada?
□ Non-functional requirements sudah ada target angkanya?
```

Jika ada yang belum → lengkapi dulu sebelum lanjut ke tech design.

## Penyesuaian per Jenis Project

Jika skill ini dipanggil dari `/vibe-plan`, project type sudah diketahui:
- **Aplikasi** → jalankan semua Q1–Q8 + semua section output
- **Backend/API** → fokus Q3 (endpoint), Q4 (auth), skip Q6 (platform UI) dan user flow
- **Kampanye** → ganti Q3 dengan "Konten utama apa?", skip Q5 (payment), tambah section timeline
- **Alat bantu** → tanyakan Q1 dan Q3 saja (satu tujuan), skip payment dan platform
- **Workflow otomatis** → fokus Q3 (langkah-langkah) dan Q7 (penanganan error)
