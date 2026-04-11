# .agent/STATE.md — Session State

> Copy file ini ke `.agent/STATE.md` di root project kamu.
> AI akan membaca dan mengupdate file ini di setiap UNIFY phase.

---

## Current Position

- **Phase:** [planning / apply / unify / complete]
- **Active plan:** [path ke PLAN.md yang sedang dikerjakan]
- **Last task completed:** [T00X — nama task]
- **Next task:** [T00X — nama task berikutnya]
- **Loop status:** [open / closed]

---

## Project Overview

- **Name:** [nama project]
- **Type:** [Application / API-Backend / Campaign / Utility / Workflow]
- **Current milestone:** [Milestone N — nama milestone]
- **Current phase:** [Phase N — nama phase]

---

## Decisions Log

| Date | Decision | Reason | Impact Area |
|------|----------|--------|-------------|
| YYYY-MM-DD | [keputusan teknis] | [kenapa] | [komponen/area] |
| YYYY-MM-DD | [keputusan desain] | [kenapa] | [komponen/area] |

---

## Deferred Issues (Carry Forward)

- [ ] [Issue 1] — Priority: High — Target: [milestone/sprint]
- [ ] [Issue 2] — Priority: Medium — Target: [milestone/sprint]
- [ ] [Issue 3] — Priority: Low — Target: [milestone/sprint]

---

## Session History

| Session | Date | Phase | Summary |
|---------|------|-------|---------|
| 1 | YYYY-MM-DD | Phase 1 | [1 kalimat ringkasan] |
| 2 | YYYY-MM-DD | Phase 2 | [1 kalimat ringkasan] |

---

## Context Restoration Checklist

Saat mulai session baru, AI harus:
- [ ] Baca STATE.md ini
- [ ] Baca MEMORY.md untuk tech decisions
- [ ] Baca SUMMARY.md dari phase terakhir di `docs/phases/`
- [ ] Cek docs/task_on_hand.md jika ada task yang sedang berjalan
