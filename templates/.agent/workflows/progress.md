---
description: |
  Tampilkan progress visual project + suggest SATU next action.
  Mencegah decision fatigue — tidak pernah menampilkan multiple options.
  Gunakan kapanpun ingin tahu "harus ngapain sekarang?" atau untuk check-in
  di tengah sesi, setelah /resume, atau sebelum mulai session baru.
---

# /progress — Smart Progress View + Single Next Action

Baca STATE.md dan PLANNING.md, tampilkan progress visual, suggest satu langkah selanjutnya.
Tidak pernah lebih dari satu suggestion — itu intentional untuk cegah kebingungan.

---

## Langkah 1 — Load State

Baca:
- `.agent/STATE.md` — current loop position
- `.agent/MEMORY.md` — tech context
- `PLANNING.md` atau `docs/phases/` — phase progress
- `docs/task_on_hand.md` — active task checklist (jika ada)

---

## Langkah 2 — Hitung Progress

```
Milestone progress:
  Phases complete: X dari Y
  Current phase: [nama] — Z% selesai

Current loop position:
  PLAN → APPLY → UNIFY
  [✓]    [✓]    [○]    ← contoh: sudah apply, belum unify
```

---

## Langkah 3 — Routing Table (Suggest SATU Action)

| Situasi | Single Suggestion |
|---------|------------------|
| Tidak ada PLANNING.md | `/vibe-plan` |
| PLANNING.md ada, belum di-graduate | `/graduate [nama]` |
| Graduated, STATE.md belum ada | `/launch [nama]` |
| Plan belum ada untuk phase ini | `/vibe-plan` atau `/new-feature` |
| Plan ada, belum di-apply | `/apply` |
| Apply selesai, belum unify | `/unify` |
| Loop closed, ada phase berikutnya | `/apply` (phase berikutnya) |
| Semua phase done | "Siap deploy — jalankan `/deploy`" |
| Ada task BLOCKED | "Resolve blocker: [deskripsi spesifik]" |
| Context window penuh | `/vibe-recap` |

---

## Langkah 4 — Display

```
════════════════════════════════════════
PROGRESS — [Nama Project]
════════════════════════════════════════

Milestone: [nama] — [X]% complete
├── Phase 1: [nama] ████████████ Done
├── Phase 2: [nama] ████████░░░░ 70%
│   └── T001 ✅  T002 ✅  T003 🔄  T004 ⏳
├── Phase 3: [nama] ░░░░░░░░░░░░ Pending
└── Phase 4: [nama] ░░░░░░░░░░░░ Pending

Current Loop: Phase 2
┌─────────────────────────────────────┐
│  PLAN ──▶ APPLY ──▶ UNIFY          │
│    ✓        ✓        ○             │
└─────────────────────────────────────┘

────────────────────────────────────────
▶ NEXT: /unify
  Close the loop dan dokumenkan phase 2.
────────────────────────────────────────
```

---

## Jika Ada Context Advisory

Jika STATE.md menunjukkan session sudah panjang atau /vibe-recap belum dijalankan lama:

```
⚠️ Context Advisory:
   Session sudah cukup panjang. Pertimbangkan /vibe-recap
   sebelum melanjutkan agar konteks tetap segar.
```

---

## Aturan

- **Selalu suggest tepat SATU action** — tidak pernah "bisa A atau B atau C"
- Jika user provide context ("saya cuma punya 30 menit"), sesuaikan suggestion:
  - Waktu terbatas → suggest task terkecil yang bisa di-close
  - Ada bug urgent → prioritaskan itu dulu sebelum planned work
- Read-only — tidak mengubah file apapun
