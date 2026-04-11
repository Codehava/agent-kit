---
description: |
  Validasi PLANNING.md lalu promosikan project ke struktur direktori siap-coding.
  Jalankan setelah /vibe-plan selesai dan PLANNING.md sudah diisi penuh.
  Menghasilkan: app directory dengan git init + README yang disintesis dari planning.
  Gunakan /launch jika ingin graduate + langsung init STATE.md dalam satu command.
---

# /graduate — Promote Project ke Buildable Directory

Workflow ini memindahkan project dari fase ideation ke struktur siap-coding.
Hanya boleh dijalankan jika PLANNING.md sudah melewati quality gate.

---

## Langkah 1 — Deteksi Project

Cek argument atau tanya user:

```
Argument yang diterima: /graduate [nama-project]

Jika tidak ada argument:
→ Scan folder projects/ untuk semua PLANNING.md
→ Tampilkan daftar:

  Projects yang siap di-graduate:
  1. [nama-project-1] (Application) — dibuat: 2025-04-10
  2. [nama-project-2] (Utility) — dibuat: 2025-04-09

  Pilih nomor project atau ketik nama:
```

---

## Langkah 2 — Quality Gate (dari planning-quality checklist)

Baca `.agent/.shared/checklists/planning-quality.md` dan validasi PLANNING.md.

```
📋 Validasi Planning Quality — [Nama Project]

Universal Checks:
  □ Project type terdefinisi di header?
  □ Problem statement spesifik (nama masalah, audience, why)?
  □ Minimal 1 design decision dengan rationale?
  □ Open questions section ada (even if empty)?
  □ Next actions terdefinisi (minimal 1)?

Type-Specific Checks ([Type]):
  □ Semua required sections terisi (bukan placeholder)?
  □ Depth sesuai rigor level?

PAUL-Readiness (jika akan /launch):
  □ Phase breakdown ada dengan shippable milestones?
  □ Tech stack resolved (tidak ada critical TBD)?
  □ Detail cukup untuk AI derive milestones tanpa tanya ulang?
```

**Hasil:**
- **Pass** → lanjut ke Langkah 3
- **Warn** → tampilkan gap, tanya: "Ada bagian yang ingin dilengkapi, atau lanjut graduate?"
- **Fail** → "PLANNING.md belum cukup detail. Kembali ke `/vibe-plan` untuk melengkapi bagian: [list bagian yang kurang]"

---

## Langkah 3 — Synthesize README

Buat README bersih yang disintesis dari PLANNING.md (bukan copy-paste):

```markdown
# [Nama Project]

> [Elevator pitch 1-2 kalimat dari problem statement]

## Overview
[Deskripsi singkat apa yang dibangun]

## Tech Stack
[Stack yang sudah dipilih di PLANNING.md]

## Getting Started
[Placeholder — akan diisi saat development]

## Project Structure
[Placeholder — akan diisi saat development]

---
*Generated from PLANNING.md on [tanggal] — update seiring development*
```

Tampilkan ke user: "README draft sudah siap. Approve untuk graduate?"

---

## Langkah 4 — Create Project Structure

Setelah user approve:

```bash
# Buat direktori app
mkdir -p apps/[nama-project]

# Copy PLANNING.md sebagai referensi
cp projects/[nama-project]/PLANNING.md apps/[nama-project]/PLANNING.md

# Init git
cd apps/[nama-project]
git init
git add README.md PLANNING.md
git commit -m "chore: initialize project from PLANNING.md"
```

Struktur direktori yang dibuat:
```
apps/[nama-project]/
├── README.md          ← Synthesized dari planning
├── PLANNING.md        ← Copied dari projects/
├── docs/              ← Siap untuk PRD, Tech Design, dll
└── specs/             ← Siap untuk feature specs
```

---

## Langkah 5 — Update Tracking

Tandai project sebagai graduated di `.agent/ACTIVE.md`:

```
[nama-project]: graduated → apps/[nama-project]/ on [tanggal]
```

---

## Langkah 6 — Closing

```
🎓 Project [nama-project] berhasil di-graduate!

📁 Location: apps/[nama-project]/
🌿 Git: initialized (1 commit)
📄 README: synthesized dari PLANNING.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Next steps:
  /launch    → graduate + init STATE.md sekaligus (next time)
  /apply     → mulai eksekusi PLANNING.md sekarang
  /progress  → lihat status current project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
