---
description: |
  Rencanakan project baru dari ide ke rencana kerja yang siap dikerjakan.
  Deteksi jenis project secara otomatis, ajukan pertanyaan yang relevan per jenis.
  Output: PLANNING.md berisi rencana kerja + syarat keberhasilan per fitur.
  Jalankan di awal project baru atau saat memulai tahap baru.
  Selalu diikuti dengan /apply → /unify.
---

# /vibe-plan — Rencanakan Project Baru

Dari ide ke rencana kerja yang siap dikerjakan.
Setiap jenis project punya pertanyaan yang berbeda — kita tidak akan tanya hal yang tidak relevan.

**Output utama:** `PLANNING.md` + `docs/01-PRD.md` + `docs/02-TECH-DESIGN.md`

---

## Langkah 0 — Kenali Jenis Project

Tanya user (jika belum jelas dari konteks):

> "Project ini kira-kira jenis apa? Pilih yang paling sesuai:
> 1. **Aplikasi** — Web app atau mobile app dengan pengguna, login, dan database
> 2. **Backend/API** — Server atau layanan yang melayani data ke aplikasi lain
> 3. **Kampanye** — Landing page, website marketing, atau kampanye konten
> 4. **Alat bantu** — Script, automation, atau tool untuk satu tujuan spesifik
> 5. **Workflow otomatis** — Integrasi otomatis antar layanan (seperti Zapier, n8n)"

| Jenis | Fokus Pertanyaan | Yang Dijaga |
|-------|-----------------|-------------|
| **Aplikasi** | Login, tampilan, database, deploy, kondisi error | Jangan tambah fitur tak terduga |
| **Backend/API** | Endpoint, struktur data, autentikasi, testing | Jangan over-engineer |
| **Kampanye** | Timeline, konten, platform, target audiens | Jangan tambah fitur teknis berlebih |
| **Alat bantu** | Satu tujuan, input/output yang jelas | Jangan meluaskan scope |
| **Workflow otomatis** | Trigger, langkah-langkah, penanganan error | Jangan coupling ketat |

---

## Langkah 1 — Cek Status Project

Cek file yang sudah ada (internal):

```
Cek keberadaan:
- PLANNING.md           → jika ada dan terisi, planning sudah selesai
- docs/00-RESEARCH.md   → jika terisi (bukan template), research sudah selesai
- docs/01-PRD.md        → jika terisi (bukan template), PRD sudah selesai
- docs/02-TECH-DESIGN.md → jika terisi, tech design sudah selesai
- docs/03-SPRINT-PLAN.md → jika terisi, sprint plan sudah selesai
```

Tampilkan status ke user:

```
📊 Status Planning — [Nama Project]:

Tahap 1 — Riset:        [✅ Selesai / ⏳ Belum]
Tahap 2 — Deskripsi:    [✅ Selesai / ⏳ Belum]
Tahap 3 — Desain teknis:[✅ Selesai / ⏳ Belum]
Tahap 4 — Rencana kerja:[✅ Selesai / ⏳ Belum]

Mulai dari Tahap [N]?
```

---

## Langkah 2 — Gali Kebutuhan (Sesuai Jenis Project)

Baca file panduan sesuai jenis project yang dipilih (internal):

```
.agent/.shared/types/[type]/guide.md         → pertanyaan yang relevan per jenis
.agent/.shared/types/[type]/config.md        → seberapa detail yang dibutuhkan
.agent/.shared/types/[type]/skill-loadout.md → skill yang akan dipakai
```

### Cara Bertanya

- Tanya **satu pertanyaan** di satu waktu — jangan langsung banyak sekaligus
- Jika user stuck atau jawabannya samar → berikan rekomendasi proaktif ("Untuk kebanyakan kasus seperti ini, biasanya X karena...")
- Jika pertanyaan sudah terjawab dari konteks → langsung skip, jangan tanya ulang
- Jika user mention hal di luar scope → "Itu sepertinya ide bagus untuk project terpisah. Untuk sekarang, kita fokus ke [tujuan utama] dulu ya."

### Panduan per Jenis (internal reference)

| Jenis | File panduan | Topik yang digali |
|-------|-------------|-------------------|
| Aplikasi | `types/application/guide.md` | Masalah → Stack → Data → Login → Tampilan → API → Deploy → Keamanan |
| Backend/API | `types/api-backend/guide.md` | Tujuan → Endpoint → Autentikasi → Struktur data → Error → Performa → Testing → Deploy |
| Kampanye | `types/campaign/guide.md` | Tujuan → Platform → Timeline → Pesan → Konten → Metrik → Budget |
| Alat bantu | `types/utility/guide.md` | Masalah → Batasan scope → Pengguna → Dependensi → Antarmuka → Kriteria selesai |
| Workflow otomatis | `types/workflow/guide.md` | Trigger → Langkah-langkah → Penanganan error → Integrasi → Monitoring |

---

## Langkah 3 — Buat Dokumen Planning Secara Berurutan

### Tahap 1: Riset (untuk Aplikasi dan Backend saja)
```
Gunakan skill: vibe-research
Output: docs/00-RESEARCH.md
Setelah selesai → minta persetujuan user → lanjut Tahap 2
```

### Tahap 2: Deskripsi Produk
```
Gunakan skill: vibe-prd
Input: docs/00-RESEARCH.md (jika ada) + jawaban dari pertanyaan tadi
Output: docs/01-PRD.md

Untuk setiap fitur utama, tulis:
  - Apa yang user bisa lakukan
  - Bagaimana kita tahu fitur ini berhasil (kapan dianggap selesai)

Setelah selesai → minta persetujuan user → lanjut Tahap 3
```

### Tahap 3: Desain Teknis
```
Gunakan skill: vibe-techdesign
Input: docs/01-PRD.md + jawaban dari pertanyaan
Output: docs/02-TECH-DESIGN.md (teknologi + arsitektur + ERD + security model + estimasi biaya)

Setelah selesai → minta persetujuan user → lanjut Tahap 4
```

### Tahap 4: Buat Rencana Kerja
```
Gunakan skill: vibe-buildplan
Input: docs/01-PRD.md + docs/02-TECH-DESIGN.md
Output: docs/03-SPRINT-PLAN.md (sprint board + backlog + panduan build — satu dokumen terpadu)

Isi docs/03-SPRINT-PLAN.md:
- Status board sprint aktif (In Progress / Todo / Done / Blocked)
- Overview semua sprint dengan goal dan deliverable
- Prasyarat sebelum mulai coding
- Task per sprint dengan estimasi jam
- Product backlog per epic
- Panduan build (urutan phase yang benar)
- Size estimation dan definition of done
```

---

## Langkah 4 — Validasi Rencana (internal)

Sebelum maju, cek PLANNING.md secara internal:

```
□ Semua fitur utama punya ukuran keberhasilan yang jelas?
□ Teknologi yang dipakai sudah dipilih dan dikonfirmasi user?
□ Batasan-batasan sudah jelas dituliskan?
□ Pekerjaan pertama sudah cukup detail untuk langsung dikerjakan?
□ File yang tidak boleh diubah sudah ditandai?
□ [Aplikasi] Alur login sudah didesain?
□ [Aplikasi] Kondisi loading, kosong, dan error sudah dipikirkan?
□ [Kampanye] Timeline dan deadline sudah dikonfirmasi?
□ [Alat bantu] Hanya satu tujuan — tidak meluas?
```

Jika semua ✅ → lanjut.
Jika ada ❌ → lengkapi dulu sebelum lanjut.

---

## Langkah 5 — Ringkasan & Siap Mulai

```
🎉 Planning selesai! [Jenis: Aplikasi/Backend/Kampanye/Alat bantu/Workflow]

Dokumen yang dibuat:
✅ docs/00-RESEARCH.md      — Riset pasar + analisa kompetitor + Go/No-Go
✅ docs/01-PRD.md           — [N] fitur + syarat keberhasilan + user flow
✅ docs/02-TECH-DESIGN.md   — Teknologi + ERD + security model + estimasi biaya
✅ docs/03-SPRINT-PLAN.md   — Sprint board + backlog + panduan build (siap dieksekusi)

Sprint pertama: [N] pekerjaan, tujuan: [tujuan sprint pertama]
Pekerjaan pertama: [nama pekerjaan]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Langkah berikutnya:
  /apply   → mulai mengerjakan pekerjaan satu per satu
  /unify   → wajib dijalankan setelah /apply selesai
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sebelum mulai coding, pastikan:
□ .agent/STATE.md sudah diisi
□ .agent/MEMORY.md sudah diisi (keputusan teknologi dari planning ini)
□ .env.local sudah ada (API keys, database URL, dll)
```

---

## Aturan Penting

- Jangan mulai coding sebelum minimal Tahap 2 (deskripsi produk) selesai
- Setiap tahap butuh **persetujuan eksplisit** dari user sebelum lanjut
- PLANNING.md bisa diupdate jika ada perubahan rencana
- Workflow ini bisa dilanjutkan: jalankan `/vibe-plan` lagi untuk cek progress
- **Kampanye dan alat bantu:** Aktif tolak penambahan fitur di luar tujuan utama
