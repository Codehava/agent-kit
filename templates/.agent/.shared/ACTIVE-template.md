# .agent/ACTIVE.md — Project Pipeline Tracker

> Copy file ini ke `.agent/ACTIVE.md` di root project kamu (atau workspace root).
> AI memperbarui file ini saat /vibe-plan, /graduate, /launch, dan /unify dijalankan.
> Dibaca oleh /pipeline untuk menampilkan project pipeline view.

---

## Ideation Pipeline

| Project | Type | Status | Created | Notes |
|---------|------|--------|---------|-------|
| [nama-project] | [Application/API/Campaign/Utility/Workflow] | [in-progress/ready/graduated] | YYYY-MM-DD | [catatan] |

**Status definitions:**
- `in-progress` — PLANNING.md ada tapi belum complete
- `ready` — PLANNING.md pass quality gate, siap di-graduate
- `graduated` — Sudah dipindah ke apps/, git initialized

---

## Active Builds

| Project | Type | Phase | Loop Status | Last Updated |
|---------|------|-------|-------------|--------------|
| [nama-project] | [Type] | Phase [N]/[Total] | [PLAN/APPLY/UNIFY] | YYYY-MM-DD |

**Loop status:**
- `PLAN` — Plan dibuat, menunggu /apply
- `APPLY` — Sedang di-apply
- `UNIFY` — Apply selesai, menunggu /unify
- `CLOSED` — Loop closed, siap phase berikutnya

---

## Graduated (Completed)

| Project | Type | Graduated | Location |
|---------|------|-----------|----------|
| [nama-project] | [Type] | YYYY-MM-DD | apps/[nama-project]/ |

---

> Terakhir diupdate: [YYYY-MM-DD] oleh [workflow yang mengupdate]
