---
description: |
  Satu command untuk graduate PLANNING.md + langsung init STATE.md dan MEMORY.md.
  Eliminasi friction antara planning dan execution — tidak perlu tanya ulang apa
  yang sudah dijawab di /vibe-plan. Gunakan ini sebagai shortcut dari
  /graduate → /apply setup untuk project yang sudah planning-complete.
---

# /launch — Graduate + Init Sekaligus

One command yang menggabungkan `/graduate` + inisialisasi PAUL state files.

---

## Fase 1 — Graduate

Eksekusi penuh workflow `/graduate` termasuk:
- Quality gate validation
- README synthesis + user approval
- App directory creation + git init
- Tracking update

*Jika graduate gagal (quality fail) → stop di sini, jangan lanjut ke Fase 2.*

---

## Fase 2 — Confirm PAUL Init

Setelah graduate berhasil, tanya user:

```
✅ Project di-graduate ke apps/[nama-project]/

Inisialisasi STATE.md dan MEMORY.md sekarang untuk managed build?
(Ini membaca PLANNING.md dan mengisi state files tanpa tanya ulang)

[Y/n]
```

Jika **N** → berikan instruksi manual:
```
Untuk init manual nanti:
→ Buka apps/[nama-project]/
→ Jalankan /apply lalu /unify untuk mulai build
→ State files akan dibuat otomatis saat pertama kali /apply dijalankan
```

---

## Fase 3 — Headless State Init

Baca PLANNING.md dan README (hasil synthesis) untuk derive:
- Project type + rigor level
- Tech stack decisions
- Phase breakdown
- Constraints dan anti-patterns

**Populate `.agent/STATE.md`:**
```markdown
## Current Position
- Phase: planning (complete)
- Active plan: (none yet — run /apply to start)
- Next task: T001 dari phase pertama

## Project Overview
- Name: [dari PLANNING.md]
- Type: [Application/API/Campaign/Utility/Workflow]
- Current milestone: Milestone 1 — [nama dari phase breakdown]
```

**Populate `.agent/MEMORY.md`:**
```markdown
## Tech Stack
[Dari PLANNING.md — tech decisions yang sudah dikonfirmasi]

## Constraints
[Dari PLANNING.md — constraints dan batasan]

## Anti-patterns
[Dari type config — anti-patterns untuk project type ini]
```

---

## Fase 4 — Approval Gate

Tampilkan proposed structure ke user:

```
📋 Proposed Build Structure — [Nama Project]

Phase 1: [nama] → [goal]
  Task T001: [task pertama dari PLANNING.md]
  Task T002: [task kedua]

Phase 2: [nama] → [goal]
  ...

MEMORY.md initialized dengan:
  Framework: [stack]
  Database: [database]
  Constraints: [list singkat]

Approve untuk mulai? (Y/n)
```

Jika **N** → "Tidak ada masalah. State files tetap tersimpan. Edit manual di `.agent/MEMORY.md` atau `.agent/STATE.md`, lalu jalankan `/apply` kapanpun siap."

---

## Fase 5 — Closing

```
🚀 [Nama Project] siap untuk build!

Files initialized:
  ✅ apps/[nama-project]/README.md
  ✅ apps/[nama-project]/PLANNING.md
  ✅ .agent/STATE.md
  ✅ .agent/MEMORY.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mulai coding:
  /apply   → eksekusi task pertama dari PLANNING.md
  /progress → lihat full plan dan next action
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
