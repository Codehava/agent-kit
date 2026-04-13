---
name: vibe-research
description: |
  Use at the START of a new project, before PRD or coding.
  Triggers on "riset aplikasi ini", "research dulu", "validasi ide",
  "analisa kompetitor", "apakah ide ini layak", "sebelum mulai project",
  or /vibe-plan step 1.
  Output: docs/00-research.md
---

# Vibe Research — Validasi Ide Sebelum Coding

Skill ini memandu riset mendalam sebelum menulis satu baris kode.
Tujuan: pastikan ide layak dibangun, ada pasarnya, dan stack-nya realistis.

## Cara Kerja

Tanya user **satu pertanyaan per giliran**. Tunggu jawaban sebelum lanjut.
Setelah semua pertanyaan dijawab, lakukan **Verification Echo**, lalu generate dokumen.

---

## Pertanyaan yang Diajukan (satu per satu)

**Q1:** "Ceritakan ide aplikasinya — masalah apa yang diselesaikan, dan untuk siapa?"

**Q2:** "Siapa target pengguna utamanya? (usia, profesi, lokasi, tingkat tech-savvy)"

**Q3:** "Aplikasi sejenis apa yang sudah ada? Apa kekurangan mereka menurut kamu?"

**Q4:** "Bagaimana rencana monetisasinya? (gratis, freemium, subscription, marketplace fee, dll)"

**Q5:** "Apa yang membuat aplikasi ini berbeda atau lebih baik dari yang sudah ada?"

**Q6:** "Ada constraint teknis atau bisnis yang perlu diperhatikan?
  - Budget infrastruktur per bulan?
  - Timeline target MVP?
  - Tim berapa orang?
  - Ada regulasi khusus? (fintech, kesehatan, anak-anak, dll)"

**Q7 (opsional):** "Ada fitur AI atau integrasi khusus yang diinginkan?"

---

## Verification Echo (sebelum generate)

Sebelum generate, tampilkan ringkasan ke user:

```
Saya akan riset berdasarkan:
- Ide: [ringkasan ide]
- Target: [target user]
- Kompetitor: [yang disebutkan]
- Monetisasi: [model bisnis]
- Diferensiasi: [keunggulan]
- Constraint: [budget, timeline, tim]

Lanjut generate riset? (yes/no)
```

---

## Output: `docs/00-research.md`

Generate dokumen dengan struktur berikut. **Semua bagian harus terisi penuh — jangan tinggalkan placeholder.**
Gunakan pengetahuan kamu tentang pasar Indonesia untuk mengisi bagian yang tidak disebutkan user secara eksplisit.

```markdown
# 00 — Research & Validasi Ide
> Aplikasi: [Nama Aplikasi]
> Dibuat: [tanggal] | Status: Draft / Final
> Generated oleh skill vibe-research

---

## 1. Ringkasan Ide

### Problem Statement
[1–2 paragraf: masalah spesifik yang diselesaikan, siapa yang mengalaminya, seberapa sering, dan dampaknya]

### Solusi yang Ditawarkan
[1 paragraf: bagaimana aplikasi ini menyelesaikan masalah tersebut — konkret, bukan generic]

### Unique Value Proposition
> "[Nama Aplikasi] adalah satu-satunya aplikasi yang [diferensiasi utama] untuk [target user] di Indonesia."

---

## 2. Analisa Pasar Indonesia

### Target Segmen

| Segmen | Deskripsi | Ukuran Estimasi | Willingness to Pay |
|--------|-----------|-----------------|-------------------|
| [Segmen Primer] | [usia, profesi, lokasi, kebiasaan digital] | [estimasi jumlah di Indonesia] | [rendah/menengah/tinggi — alasan] |
| [Segmen Sekunder] | [deskripsi] | [estimasi] | [rendah/menengah/tinggi] |

### Ukuran Pasar (TAM/SAM/SOM — Estimasi Indonesia)

| Level | Definisi | Estimasi |
|-------|----------|----------|
| **TAM** (Total Addressable Market) | Semua orang yang punya masalah ini di Indonesia | [angka + cara hitung] |
| **SAM** (Serviceable Addressable Market) | Yang bisa dijangkau dengan aplikasi digital | [angka + % dari TAM] |
| **SOM** (Serviceable Obtainable Market) | Target realistis tahun 1–2 | [angka + % dari SAM] |

### Tren Pasar yang Mendukung
- [tren 1 — dengan data atau referensi]
- [tren 2]
- [tren 3]

---

## 3. Analisa Kompetitor

| Kompetitor | Jenis | Kelebihan | Kekurangan | Model Bisnis | Rating Toko |
|------------|-------|-----------|------------|--------------|-------------|
| [nama] | [lokal/global] | [konkret] | [konkret] | [model] | [jika ada] |
| [nama] | [lokal/global] | [konkret] | [konkret] | [model] | [jika ada] |
| [nama] | [lokal/global] | [konkret] | [konkret] | [model] | [jika ada] |

### Peta Posisi Kompetitif

```
         Harga Tinggi
              │
[Kompetitor A]│        [Kompetitor B]
              │
──────────────┼──────────────── Fitur Lengkap
              │
  [Target     │
   Kita]      │[Kompetitor C]
              │
         Harga Rendah
```

### Celah yang Bisa Diisi
- **Celah 1:** [masalah yang belum diselesaikan kompetitor — spesifik]
- **Celah 2:** [segmen yang belum dilayani dengan baik]
- **Celah 3:** [kelemahan UX/pricing yang bisa dieksploitasi]

---

## 4. Model Bisnis & Monetisasi

### Model yang Direkomendasikan
[Pilih dan jelaskan 1–2 model yang paling cocok, dengan alasan berdasarkan konteks aplikasi]

| Model | Cara Kerja | Proyeksi Revenue | Risiko |
|-------|-----------|-----------------|--------|
| [model utama] | [penjelasan] | [estimasi] | [risiko] |
| [model alternatif] | [penjelasan] | [estimasi] | [risiko] |

### Proyeksi Revenue (Kasar, Tahun 1)

Asumsi: [tuliskan asumsi yang dipakai]

| Skenario | User Aktif | ARPU | MRR Bulan 12 | ARR |
|----------|-----------|------|--------------|-----|
| Konservatif | [N] | Rp [X]/bulan | Rp [Y] | Rp [Z] |
| Moderat | [N] | Rp [X]/bulan | Rp [Y] | Rp [Z] |
| Optimis | [N] | Rp [X]/bulan | Rp [Y] | Rp [Z] |

### Unit Economics (jika berlaku)
- Customer Acquisition Cost (CAC): Rp [estimasi]
- Lifetime Value (LTV): Rp [estimasi]
- LTV/CAC Ratio: [angka] (target: > 3x)
- Payback period: [bulan]

---

## 5. Diferensiasi & Keunggulan Kompetitif

### Defensible Advantages
- **[Keunggulan 1]:** [konkret — bukan "lebih bagus", tapi spesifik apa yang berbeda]
- **[Keunggulan 2]:** [konkret]
- **[Keunggulan 3]:** [konkret]

### Moat Jangka Panjang
[Apa yang membuat sulit ditiru kompetitor dalam 12–24 bulan ke depan?
Contoh: network effect, data moat, brand, switching cost, partnership eksklusif]

---

## 6. User Journey Awal (Sebelum PRD)

### Persona Primer: [Nama Persona]
**Latar:** [1 kalimat deskripsi singkat]

```
TRIGGER → DISCOVERY → ONBOARDING → CORE ACTION → VALUE → RETENTION
   │            │            │             │          │         │
[apa yang   [bagaimana  [langkah    [aksi utama  [hasil   [kenapa
memicu      mereka      pertama]    yang sering  yang     kembali]
kebutuhan]  temukan     ]           dilakukan]   dirasakan]
            kita]
```

**Pain points sepanjang journey:**
1. [pain di tahap X]
2. [pain di tahap Y]

---

## 7. Risiko & Mitigasi

| Risiko | Kategori | Tingkat | Mitigasi |
|--------|----------|---------|----------|
| [risiko teknis] | Teknis | Tinggi/Medium/Rendah | [cara konkret] |
| [risiko pasar] | Pasar | ... | ... |
| [risiko regulasi] | Regulasi | ... | ... |
| [risiko tim] | Eksekusi | ... | ... |
| [risiko funding] | Finansial | ... | ... |

---

## 8. Regulasi & Compliance Indonesia

[Isi bagian yang relevan, skip yang tidak berlaku:]

### UU PDP No. 27/2022 (Wajib untuk semua aplikasi yang simpan data user)
- Kewajiban: informed consent, hak hapus data, hak akses data
- Berlaku penuh: Oktober 2024
- Implikasi teknis: fitur hapus akun, export data, consent management

### [Jika Fintech]
- Izin OJK diperlukan jika: simpan uang user, pinjam-meminjam, investasi
- Alternatif: partnership dengan licensed entity
- Payment gateway: Xendit/Midtrans sudah licensed

### [Jika Kesehatan]
- Regulasi Kemenkes untuk telemedicine
- Data kesehatan = data sensitif di UU PDP

### [Jika Marketplace]
- Pajak platform: PMK 68/2022
- Kewajiban pelaporan transaksi ke DJP

### [Jika Aplikasi Anak-anak]
- Usia minimum 13 tahun (perlu verifikasi)
- Parental consent untuk usia < 17 tahun

---

## 9. Rekomendasi Stack Awal (Preview — Final di Tech Design)

| Layer | Rekomendasi | Alasan |
|-------|-------------|--------|
| Frontend Web | [rekomendasi] | [alasan singkat] |
| Mobile | [rekomendasi atau N/A] | [alasan] |
| Backend | [rekomendasi] | [alasan] |
| Database | [rekomendasi] | [alasan] |
| Auth | [rekomendasi] | [alasan] |
| Payment | [rekomendasi atau N/A] | [alasan] |
| Hosting | [rekomendasi] | [alasan] |

**Estimasi biaya infrastruktur/bulan (MVP):** Rp [estimasi]

---

## 10. Go/No-Go Assessment

| Faktor | Score (1–5) | Catatan |
|--------|-------------|---------|
| Ukuran pasar | [1–5] | [catatan konkret] |
| Intensitas kompetisi | [1–5] | [5 = mudah masuk, 1 = sangat ketat] |
| Feasibility teknis | [1–5] | [berdasarkan tim dan budget] |
| Potensi monetisasi | [1–5] | [berdasarkan WTP segmen] |
| Kesesuaian tim | [1–5] | [seberapa siap tim eksekusi] |
| **Total** | **/25** | |

**Keputusan:** ✅ GO / ⚠️ PIVOT / ❌ NO-GO

**Rekomendasi:**
[2–3 kalimat — jika GO: apa yang harus divalidasi lebih dulu;
jika PIVOT: ke arah mana yang lebih menjanjikan;
jika NO-GO: kenapa dan apa alternatif yang lebih baik]

---

## 11. Pertanyaan yang Masih Terbuka

Hal-hal yang perlu divalidasi sebelum atau saat build MVP:
- [ ] [asumsi tentang pasar yang belum terkonfirmasi]
- [ ] [asumsi tentang user behavior yang belum terkonfirmasi]
- [ ] [hal teknis yang perlu di-spike dulu]
- [ ] [keputusan bisnis yang masih pending]

---
*Next step: Jalankan skill `vibe-prd` untuk membuat PRD berdasarkan riset ini.*
*Dokumen ini diperbarui jika ada perubahan strategi atau temuan baru.*
```

---

## Aturan Penting

- Jadilah jujur jika ide punya risiko tinggi — lebih baik tau sekarang daripada setelah coding 3 bulan
- Fokus pada konteks **Indonesia**: pasar lokal, payment lokal (Xendit), regulasi UU PDP, infrastruktur lokal
- Jika user belum menyebut kompetitor → suggest yang paling relevan berdasarkan deskripsi ide
- Estimasi angka harus realistis dan ada cara hitungnya — jangan asal tulis tanpa basis
- **Semua bagian harus terisi** — jika informasi tidak tersedia, gunakan estimasi dengan label "[estimasi]"
- **SKILL CHAINING:** Setelah riset selesai, tanya: *"Riset selesai! Lanjut buat PRD sekarang?"* Jika ya → langsung jalankan `vibe-prd`.
