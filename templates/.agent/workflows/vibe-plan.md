---
description: |
  Orchestrator workflow untuk planning phase lengkap — dari ide ke siap coding.
  Jalankan di awal project baru sebelum coding apapun.
  Memandu: Research → PRD → Tech Design → Build Plan (4 langkah, ~1-2 jam total).
---

# /vibe-plan — Planning Phase Orchestrator

Workflow ini memandu kamu dari ide mentah ke dokumen planning lengkap
yang siap dipakai agent untuk coding.

**Total waktu estimasi:** 60–90 menit
**Output:** 4 dokumen siap pakai + backlog terisi

---

## Langkah 1 — Cek Status Project

Pertama, cek dokumen apa yang sudah ada:

```
Cek keberadaan file berikut:
- docs/research-*.md     → jika ada, research sudah selesai
- docs/01-PRD.md         → jika terisi (bukan template), PRD sudah selesai
- docs/02-TECH-DESIGN.md → jika terisi, tech design sudah selesai
- BUILD_PLAN.md          → jika ada, build plan sudah selesai
```

Berdasarkan apa yang ditemukan, langsung lompat ke step yang belum selesai.
Tampilkan status ke user:

```
📊 Status Planning [Nama Aplikasi]:

Step 1 — Research:      [✅ Selesai / ⏳ Belum]
Step 2 — PRD:           [✅ Selesai / ⏳ Belum]
Step 3 — Tech Design:   [✅ Selesai / ⏳ Belum]
Step 4 — Build Plan:    [✅ Selesai / ⏳ Belum]

Mulai dari Step [N]? (yes/no)
```

---

## Langkah 2 — Jalankan Planning Secara Berurutan

### Step 1: Research (~20 menit)
```
Tujuan: Validasi ide, analisa pasar, identifikasi risiko
Skill: vibe-research
Output: docs/research-[AppName].md

Jalankan skill vibe-research sekarang.
Setelah selesai dan user approve → lanjut ke Step 2.
```

### Step 2: PRD (~20 menit)
```
Tujuan: Definisikan fitur, user stories, scope MVP
Skill: vibe-prd
Input: docs/research-[AppName].md (baca dulu)
Output: docs/01-PRD.md (terisi penuh)

Jalankan skill vibe-prd sekarang.
Setelah selesai dan user approve → lanjut ke Step 3.
```

### Step 3: Tech Design (~20 menit)
```
Tujuan: Pilih stack, desain arsitektur, buat ERD awal
Skill: vibe-techdesign
Input: docs/01-PRD.md + docs/research-*.md
Output: docs/02-TECH-DESIGN.md (terisi + ERD + API contracts)

Jalankan skill vibe-techdesign sekarang.
Setelah selesai dan user approve → lanjut ke Step 4.
```

### Step 4: Build Plan (~15 menit)
```
Tujuan: Breakdown task per sprint, siapkan backlog
Skill: vibe-buildplan
Input: docs/01-PRD.md + docs/02-TECH-DESIGN.md
Output: docs/04-BACKLOG.md (terisi) + BUILD_PLAN.md

Jalankan skill vibe-buildplan sekarang.
Setelah selesai → tampilkan summary.
```

---

## Langkah 3 — Summary Akhir

Setelah semua step selesai, tampilkan:

```
🎉 Planning Phase Selesai!

Dokumen yang sudah dibuat:
✅ docs/research-[AppName].md    — Validasi ide & analisa pasar
✅ docs/01-PRD.md                — Product Requirements (N user stories)
✅ docs/02-TECH-DESIGN.md        — Stack: [ringkasan stack] + ERD
✅ docs/04-BACKLOG.md            — [N] sprint, [M] total task
✅ BUILD_PLAN.md                 — Panduan build phase

Stack yang dipilih:
- [ringkasan 1-liner stack]

Sprint 1 Goal: [goal sprint 1]
Task pertama: T001 — [nama task pertama]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Siap coding! Mulai dengan:
  /new-feature  → untuk fitur size M/L
  /dev-reset    → jika butuh setup environment dari awal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sebelum coding, pastikan:
□ AGENTS.md sudah ada di root project
□ .env.local sudah diisi credentials
□ Docker Compose sudah jalan (docker compose up -d)
```

---

## Aturan Penting

- Jangan skip ke coding sebelum minimal Step 2 (PRD) selesai
- Setiap step harus dapat **approval eksplisit** dari user sebelum lanjut
- Jika user ingin ubah sesuatu di step sebelumnya, kembali ke step itu dulu
- Workflow ini bisa di-resume kapanpun — cukup jalankan `/vibe-plan` lagi dan ia akan cek progress
- Dokumen yang dihasilkan adalah **living documents** — update setiap sprint jika ada perubahan scope
