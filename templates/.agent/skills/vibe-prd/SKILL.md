---
name: vibe-prd
description: |
  Use after vibe-research, or when starting to define product requirements.
  Triggers on "buat PRD", "definisikan fitur", "apa yang harus dibangun",
  "scope MVP", "user stories", "requirements aplikasi",
  or /vibe-plan step 2.
  Requires: docs/research-[AppName].md (jika ada, baca dulu).
  Output: docs/01-PRD.md (terisi penuh, bukan template kosong)
---

# Vibe PRD — Product Requirements Document Generator

Skill ini menghasilkan PRD yang lengkap dan siap dipakai agent untuk coding.
Bukan template kosong — output-nya sudah terisi berdasarkan jawaban user.

## Persiapan

**Pertama:** Cek apakah `docs/research-[AppName].md` sudah ada.
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

## Output: `docs/01-PRD.md` (TERISI PENUH)

```markdown
# 01 — Product Requirements Document (PRD)
> Nama: [Nama Aplikasi] | Versi: v0.1 MVP | Dibuat: [tanggal]
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

---

## 2. Target Pengguna

### Persona Utama
**[Nama Persona 1]** — [role/profesi]
- Usia: [estimasi]
- Tech-savvy: [rendah/menengah/tinggi]
- Pain point: [masalah utama]
- Goal: [apa yang ingin dicapai]

**[Nama Persona 2]** — [role/profesi]
- Usia: [estimasi]
- Tech-savvy: [rendah/menengah/tinggi]
- Pain point: [masalah utama]
- Goal: [apa yang ingin dicapai]

---

## 3. Fitur MVP

### ✅ P0 — Harus Ada (MVP Blocker)
| ID | Fitur | Deskripsi | Kenapa Penting |
|----|-------|-----------|----------------|
| F01 | [nama] | [deskripsi konkret] | [alasan bisnis] |
| F02 | [nama] | [deskripsi konkret] | [alasan bisnis] |
| F03 | [nama] | [deskripsi konkret] | [alasan bisnis] |

### 🟡 P1 — Penting tapi Bisa Ditunda
| ID | Fitur | Deskripsi | Sprint Target |
|----|-------|-----------|---------------|
| F04 | [nama] | [deskripsi] | Sprint 2 |
| F05 | [nama] | [deskripsi] | Sprint 3 |

### ❌ Out of Scope MVP
- [fitur yang sengaja ditunda — dengan alasan]
- [fitur yang butuh validasi lebih dulu]

---

## 4. User Stories

> Format: Sebagai [siapa], saya ingin [aksi], agar [tujuan].
> ID REQ-XXX untuk traceability ke backlog dan kode.

### [Nama Persona 1]
- [ ] **REQ-001** Sebagai [persona 1], saya ingin [aksi dari F01], agar [tujuan]
- [ ] **REQ-002** Sebagai [persona 1], saya ingin [aksi dari F02], agar [tujuan]
- [ ] **REQ-003** Sebagai [persona 1], saya ingin [lanjutan], agar [tujuan]

### [Nama Persona 2]
- [ ] **REQ-010** Sebagai [persona 2], saya ingin [aksi], agar [tujuan]
- [ ] **REQ-011** Sebagai [persona 2], saya ingin [aksi], agar [tujuan]

### Pembayaran (jika ada)
- [ ] **REQ-020** Sebagai pembeli, saya ingin membayar via [metode], agar transaksi mudah
- [ ] **REQ-021** Sebagai [penerima dana], saya ingin dana masuk otomatis, agar tidak perlu manual transfer
- [ ] **REQ-022** Sebagai admin, saya ingin melihat semua transaksi, agar bisa rekonsiliasi

### Notifikasi
- [ ] **REQ-030** Sebagai pengguna, saya ingin dapat notifikasi saat [event penting], agar tidak ketinggalan
- [ ] **REQ-031** Sebagai pengguna, saya ingin dapat email konfirmasi [aksi], agar ada bukti

### UU PDP — Hak Pengguna (Wajib)
- [ ] **REQ-040** Sebagai pengguna, saya ingin dapat menghapus akun dan semua data saya
- [ ] **REQ-041** Sebagai pengguna, saya ingin dapat mengunduh semua data pribadi saya
- [ ] **REQ-042** Sebagai pengguna, saya ingin dapat mencabut consent marketing kapan saja

---

## 5. Non-Functional Requirements

| Kategori | Requirement | Target |
|----------|-------------|--------|
| Performance | Load halaman utama | < 2 detik |
| Availability | Uptime | [99% / 99.9%] |
| Concurrent Users | MVP | [estimasi dari Q7] |
| Security | Auth | Session DB (Better Auth 1.5) |
| Security | Payment (jika ada) | Xendit callback token verified |
| Mobile | Platform | [Android / iOS / Keduanya] |
| Storage | File upload max | 5 MB |
| Regulasi | Compliance | UU PDP No. 27/2022 |
| [spesifik] | [dari Q7] | [target] |

---

## 6. Success Metrics (Definition of Done untuk MVP)

| Metric | Target | Cara Ukur |
|--------|--------|-----------|
| [dari Q8 — metric sukses 1] | [angka] | [tool/cara ukur] |
| [dari Q8 — metric sukses 2] | [angka] | [tool/cara ukur] |
| Uptime | [target]% | Uptime Kuma |
| Error rate | < 1% | Sentry |

---

## 7. Constraints & Asumsi

### Constraints
- Tim: [dari research]
- Timeline MVP: [dari research]
- Budget infrastruktur: [dari research]
- Regulasi: UU PDP No. 27/2022 (berlaku penuh Oktober 2024)
- [constraint lain dari Q6]

### Asumsi
- [asumsi 1 yang perlu divalidasi]
- [asumsi 2]
- Semua user WNI (tidak perlu multi-currency untuk MVP, kecuali disebutkan)

---
*Next step: Jalankan skill `vibe-techdesign` untuk menentukan stack dan arsitektur.*
```

---

## Aturan Penting

- Output harus **terisi penuh** — tidak ada placeholder `[isi di sini]` yang tersisa dari jawaban user
- REQ IDs harus unik dan sequential — agent akan merujuk ID ini saat coding
- Jangan tambahkan fitur yang tidak disebutkan user — scope creep adalah musuh MVP
- Jika user menyebutkan fitur yang terlalu kompleks untuk MVP, masukkan ke P1 dan jelaskan kenapa
- Payment section: muncul hanya jika user konfirmasi ada transaksi keuangan
- **STRUKTUR DOKUMEN WAJIB**: Selaraskan dan lengkapi hierarki PRD yang dihasilkan dengan elemen-elemen profesional dari `docs/SRS-Template.md`.
- Setelah generate, reminder: "Simpan PRD ini, lalu jalankan `/vibe-techdesign` untuk langkah berikutnya"
