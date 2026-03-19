---
name: vibe-research
description: |
  Use at the START of a new project, before PRD or coding.
  Triggers on "riset aplikasi ini", "research dulu", "validasi ide",
  "analisa kompetitor", "apakah ide ini layak", "sebelum mulai project",
  or /vibe-plan step 1.
  Output: docs/research-[AppName].md
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

## Output: `docs/research-[AppName].md`

Generate dokumen dengan struktur berikut:

```markdown
# Research — [Nama Aplikasi]
> Dibuat: [tanggal] | Diperbarui: [tanggal]

## 1. Ringkasan Ide
[1 paragraf deskripsi aplikasi, masalah, dan solusi]

## 2. Analisa Pasar

### Target Pengguna
| Segmen | Karakteristik | Pain Point |
|--------|---------------|------------|
| [segmen 1] | [deskripsi] | [masalah utama] |
| [segmen 2] | [deskripsi] | [masalah utama] |

### Ukuran Pasar (estimasi)
[Estimasi TAM/SAM/SOM berdasarkan konteks Indonesia jika relevan]

## 3. Analisa Kompetitor

| Kompetitor | Kelebihan | Kekurangan | Model Bisnis |
|------------|-----------|------------|--------------|
| [nama] | [+] | [-] | [model] |
| [nama] | [+] | [-] | [model] |

### Celah yang Bisa Diisi
- [peluang 1]
- [peluang 2]

## 4. Model Bisnis & Monetisasi

### Opsi yang Direkomendasikan
[Rekomendasi berdasarkan konteks aplikasi dan pasar Indonesia]

### Estimasi Revenue (kasar, tahun 1)
| Skenario | Asumsi | Estimasi |
|----------|--------|----------|
| Konservatif | [asumsi] | [angka] |
| Moderat | [asumsi] | [angka] |

## 5. Diferensiasi & Competitive Advantage
- [keunggulan 1 — konkret dan defensible]
- [keunggulan 2]

## 6. Risiko & Mitigasi

| Risiko | Tingkat | Mitigasi |
|--------|---------|----------|
| [risiko teknis] | Tinggi/Medium/Rendah | [cara mitigasi] |
| [risiko pasar] | ... | ... |
| [risiko regulasi] | ... | ... |

## 7. Regulasi & Compliance

[Jika fintech → OJK, Xendit, UU PDP]
[Jika kesehatan → regulasi Kemenkes]
[Jika marketplace → UU PDP, pajak platform]
[Jika aplikasi anak → COPPA equivalent Indonesia]

## 8. Rekomendasi Stack Awal (preview)
[Bukan final — hanya arah. Tech Design akan lebih detail]
- Platform: [Web / Mobile / Keduanya]
- Backend: [estimasi]
- Database: [estimasi]
- Payment: [jika perlu]

## 9. Go/No-Go Assessment

| Faktor | Score (1-5) | Catatan |
|--------|-------------|---------|
| Ukuran pasar | [1-5] | [catatan] |
| Kompetisi | [1-5] | [catatan] |
| Feasibility teknis | [1-5] | [catatan] |
| Potensi monetisasi | [1-5] | [catatan] |
| **Total** | **/20** | |

**Rekomendasi:** GO / PIVOT / NO-GO
**Alasan:** [1-2 kalimat]

## 10. Pertanyaan yang Masih Terbuka
- [hal yang perlu divalidasi lebih lanjut sebelum build]
- [asumsi yang belum terkonfirmasi]

---
*Next step: Jalankan skill `vibe-prd` untuk membuat PRD berdasarkan riset ini.*
```

---

## Aturan Penting

- Jadilah jujur jika ide punya risiko tinggi — lebih baik tau sekarang daripada setelah coding 3 bulan
- Fokus pada konteks **Indonesia**: pasar lokal, payment local (Xendit/Midtrans), regulasi UU PDP
- Jika user belum menyebut kompetitor, suggest yang paling relevan berdasarkan deskripsi ide
- Estimasi angka harus realistis, bukan overly optimistic
- Setelah generate, reminder user: "Simpan file ini, lalu jalankan `/vibe-prd` untuk langkah berikutnya"
