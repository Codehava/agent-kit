---
description: |
  Read-only view dari semua project di ideation pipeline.
  Scan PLANNING.md files, kategorikan status (in-progress/ready/graduated).
  Gunakan untuk review semua project aktif, pilih mana yang dikerjakan selanjutnya,
  atau konfirmasi apakah project sudah di-graduate.
---

# /pipeline — Project Ideation Pipeline View

Read-only tool. Tidak membuat atau mengubah file apapun.

---

## Langkah 1 — Scan Directories

```
Scan:
  projects/*/PLANNING.md  → ideation pipeline
  apps/*/                 → graduated projects
  .agent/ACTIVE.md        → tracking metadata (jika ada)
```

---

## Langkah 2 — Kategorikan Status

Per project, tentukan status:

| Status | Kriteria |
|--------|----------|
| **In Progress** | PLANNING.md ada tapi belum complete (ada placeholder/TBD) |
| **Ready to Graduate** | PLANNING.md ada, quality gate pass, belum ada di apps/ |
| **Graduated** | Ada di apps/ directory, git initialized |
| **Active Build** | Graduated + `.agent/STATE.md` ada dan loop belum closed |

---

## Langkah 3 — Display Pipeline

```
📊 Project Pipeline — [tanggal]

┌─────────────────────────────────────────────────────┐
│  IN PROGRESS (ideation belum selesai)               │
├─────────────────────────────────────────────────────┤
│  • [nama-project-1] (Application) — [tanggal buat]  │
│    Missing: Phase Breakdown, Tech Stack             │
│    → /vibe-plan untuk lanjut                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  READY TO GRADUATE ✅                               │
├─────────────────────────────────────────────────────┤
│  • [nama-project-2] (Utility) — [tanggal buat]      │
│    Quality: Pass                                    │
│    → /graduate [nama-project-2]                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ACTIVE BUILD 🔨                                    │
├─────────────────────────────────────────────────────┤
│  • [nama-project-3] (API/Backend) — Phase 2/4       │
│    Loop: APPLY (in progress)                        │
│    → /progress untuk next action                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  GRADUATED (siap tapi belum mulai build)            │
├─────────────────────────────────────────────────────┤
│  • [nama-project-4] (Campaign) — [tanggal graduate] │
│    → /launch [nama-project-4] untuk init build      │
└─────────────────────────────────────────────────────┘

Summary: [N] in progress, [N] ready, [N] active, [N] graduated
```

---

## Jika Pipeline Kosong

```
Pipeline kosong. Belum ada project yang sedang berjalan.

Mulai project baru:
  /vibe-plan   → mulai ideation dari ide
```

---

## Aturan

- Ini adalah **read-only** — tidak ada file yang dibuat atau diubah
- Selalu tampilkan suggested next action per project
- Jika ACTIVE.md tidak ada → derive status dari filesystem saja
