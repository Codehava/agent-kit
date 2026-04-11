---
description: |
  Buat HANDOFF.md dan update STATE.md sebelum menutup session.
  Gunakan sebelum mengakhiri sesi kerja, saat context window hampir penuh,
  atau saat harus switch ke task lain. Berbeda dari /vibe-recap yang hanya
  kompaksi context — /pause membuat formal handoff dengan exact resume point.
---

# /pause — Create Session Handoff

Buat HANDOFF-{tanggal}.md yang cukup detail sehingga session berikutnya
bisa resume tepat dari titik berhenti — tanpa tanya ulang apapun.

---

## Langkah 1 — Deteksi Current Position

Baca `.agent/STATE.md` untuk tahu:
- Phase apa yang sedang dikerjakan
- Task mana yang sedang jalan
- Loop status: sudah apply tapi belum unify?

Tanya user jika diperlukan: "Ada yang sedang dikerjakan yang perlu dicatat sebelum pause?"

---

## Langkah 2 — Buat HANDOFF File

Path: `docs/handoffs/HANDOFF-[YYYY-MM-DD-HHMM].md`

Gunakan template dari `.agent/.shared/HANDOFF-template.md` dan isi dengan:

```markdown
# HANDOFF — [YYYY-MM-DD HH:MM]

## Status Saat Ditutup
- Closed at: [timestamp]
- Reason: [pause / context-limit / interrupt / end-of-day]
- Loop status: [open — belum unify / closed — sudah unify]

## Yang Sedang Dikerjakan
- Active plan: [path ke PLAN.md atau task description]
- Current task: [T00X — deskripsi task]
- Progress: [sudah berapa yang selesai dari total]

[Checklist task dengan status aktual]
[✓] T001 — [nama]
[✓] T002 — [nama]
[~] T003 — [nama] (in progress — sudah selesai bagian A, belum bagian B)
[ ] T004 — [nama]

## Yang Sudah Selesai Session Ini
- [perubahan 1] — [file yang diubah]
- [perubahan 2] — [file yang diubah]
- [keputusan yang dibuat]

## Masalah yang Diketahui
- [issue 1] — severity: [Low/Medium/High]

## Exact Resume Point
1. Buka [path ke file yang sedang dikerjakan]
2. Lanjutkan dari: [titik exact — fungsi/komponen/baris mana]
3. Setelah itu: [T00X berikutnya]
4. Jangan lupa: [hal penting yang mudah terlupakan]

## Context Penting
- [constraint atau keputusan yang sedang aktif]
- [pattern yang sedang diikuti]
```

---

## Langkah 3 — Update STATE.md

```markdown
## Current Position
- Phase: [nama] (paused)
- Last handoff: docs/handoffs/HANDOFF-[timestamp].md
- Resume: run /resume untuk restore context
```

---

## Langkah 4 — Optional WIP Commit

Tanya user: "Mau commit WIP sekarang sebelum pause?"

Jika ya:
```bash
git add [files yang dimodifikasi]
git commit -m "wip([scope]): pause — [deskripsi singkat progress]"
```

---

## Langkah 5 — Closing

```
⏸️ Session di-pause dengan benar.

HANDOFF dibuat: docs/handoffs/HANDOFF-[timestamp].md
STATE.md: updated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Untuk resume di session berikutnya:
  /resume   → restore context otomatis
  atau ketik: "Baca docs/handoffs/HANDOFF-[timestamp].md dan lanjutkan"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Aturan

- HANDOFF harus cukup detail untuk zero-context resumption
- Tidak ada placeholder yang dibiarkan kosong — isi semuanya
- Satu HANDOFF per session pause (jangan overwrite yang lama)
- Jika loop masih open (apply belum unify) → catat eksplisit di status
