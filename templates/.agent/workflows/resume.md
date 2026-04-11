---
description: |
  Restore context dari HANDOFF.md setelah session break.
  Merge handoff dengan STATE.md terkini, lalu suggest SATU next action.
  Gunakan di awal session setelah /pause, atau ketik "resume" untuk trigger otomatis.
  Selalu suggest satu action saja — tidak pernah overwhelm user dengan pilihan.
---

# /resume — Restore Session Context

Baca HANDOFF file terbaru, merge dengan state saat ini, dan langsung tunjukkan
satu langkah yang harus dikerjakan — tanpa decision fatigue.

---

## Langkah 1 — Temukan HANDOFF File

```
Cek argument: /resume [path-ke-handoff]

Jika tidak ada argument:
→ Scan docs/handoffs/ untuk file terbaru
→ Pilih HANDOFF-*.md dengan timestamp terbaru
→ Jika tidak ada → cek docs/recap.md sebagai fallback
→ Jika tidak ada keduanya → "Tidak ada handoff ditemukan. Gunakan /progress untuk check state."
```

---

## Langkah 2 — Load dan Merge Context

Baca secara berurutan:
1. `docs/handoffs/HANDOFF-[latest].md` — context dari session terakhir
2. `.agent/STATE.md` — posisi loop saat ini
3. `.agent/MEMORY.md` — tech decisions yang aktif

Merge untuk deteksi:
- Apakah ada perubahan STATE.md sejak HANDOFF dibuat?
- Apakah loop sudah di-close oleh session lain?
- Apakah ada task baru yang ditambahkan?

---

## Langkah 3 — Display Context Restoration

```
🔄 Context Restored — [Nama Project]

Session terakhir: [YYYY-MM-DD HH:MM]
Loop status saat pause: [open/closed]

Yang sudah selesai:
  ✅ [task yang sudah done dari HANDOFF]
  ✅ [task yang sudah done dari HANDOFF]

Yang belum selesai:
  🔄 [task yang in-progress saat pause]
  ⏳ [task yang belum dimulai]

Tech context aktif:
  Framework: [dari MEMORY.md]
  Constraint penting: [dari MEMORY.md]
```

---

## Langkah 4 — Single Next Action

Suggest tepat SATU action berdasarkan loop position:

| Loop State | Single Suggestion |
|-----------|-------------------|
| Apply belum selesai, task in-progress | Lanjutkan T00X dari exact resume point |
| Apply selesai, belum unify | `/unify` — close loop dulu |
| Loop closed, phase berikutnya ada | `/apply` untuk phase berikutnya |
| BLOCKED dari session lalu | "Resolve blocker: [deskripsi]" |

```
────────────────────────────────────────
▶ NEXT: [satu action yang disarankan]
  [1 kalimat penjelasan mengapa ini yang pertama]
────────────────────────────────────────

Ketik "lanjut" atau jalankan command di atas untuk mulai.
```

---

## Langkah 5 — Archive HANDOFF

Setelah user konfirmasi resume, pindahkan HANDOFF ke folder archive:
```
docs/handoffs/archive/HANDOFF-[timestamp].md
```

*Jika user belum konfirmasi → biarkan HANDOFF di tempat sampai mereka proceed.*

---

## Aturan

- **Satu next action** — tidak pernah "bisa pilih A atau B"
- Jika ada conflict antara HANDOFF dan STATE.md → percaya STATE.md (lebih baru)
- Jangan overwhelm dengan recap panjang — cukup yang essential
- Jika context sangat stale (>7 hari) → tambahkan note: "Session cukup lama. Pertimbangkan `/vibe-recap` untuk refresh full context."
