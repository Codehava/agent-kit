---
description: |
  Context compaction + PAUL UNIFY ringan — rangkum session saat ini agar bisa
  pindah ke chat baru tanpa kehilangan konteks. Gunakan saat context window
  mulai penuh atau AI mulai kehilangan fokus. Jika sudah selesai satu /apply
  phase, gunakan /unify dulu (lebih lengkap) sebelum /vibe-recap.
---

# /vibe-recap — Context Compaction + Reconciliation

Gunakan `/vibe-recap` atau `/recap` ketika:
- Context window sudah panjang dan AI mulai kehilangan fokus
- Mau pindah ke chat baru tapi tidak mau kehilangan progres
- Perlu rangkuman cepat sebelum istirahat/pause

Untuk **full reconciliation** setelah /apply — gunakan `/unify` (lebih lengkap).

---

## Langkah 1 — Buat atau Update docs/recap.md

Tulis rangkuman komprehensif dari semua yang terjadi di session ini:

```markdown
# Recap — [YYYY-MM-DD] Session [N]

## Sedang Dikerjakan
- Fitur/bug: [apa yang sedang dikerjakan]
- Phase saat ini: [planning / apply / unify]
- Task terakhir: [T00X — nama task]
- Status: [selesai / sedang jalan / blocked]

## Keputusan Arsitektur yang Disepakati
- [Keputusan 1]: [deskripsi] — karena [alasan]
- [Keputusan 2]: [deskripsi] — karena [alasan]

## Files yang Diubah Session Ini
- [path/file.ts] — [apa yang diubah]
- [path/file.tsx] — [apa yang diubah]

## Masalah yang Ditemukan
- [Masalah 1]: [status — sudah fix / belum / workaround]

## Next Steps (Tertunda)
- [ ] [Langkah 1]
- [ ] [Langkah 2]
- [ ] [Langkah 3]

## Context Penting untuk Chat Baru
- [Info kritis yang mudah terlupakan]
- [Pattern atau convention yang sedang diikuti]
- [Dependency atau constraint yang aktif]
```

---

## Langkah 2 — Update STATE.md (jika belum)

Jika `.agent/STATE.md` ada, update dengan position terkini:

```
- Current phase: [nama phase]
- Last task: [T00X]
- Session closed: [timestamp]
```

---

## Langkah 3 — Update MEMORY.md (jika ada perubahan)

Jika di session ini ada keputusan baru tentang tech stack, warna, schema, atau constraint → update `.agent/MEMORY.md` sebelum pindah chat.

---

## Langkah 4 — Informasikan User

```
✅ Recap berhasil dibuat di docs/recap.md

Untuk melanjutkan di chat baru:
1. Buka chat baru
2. Ketik: "Baca docs/recap.md dan lanjutkan dari sana"
3. AI akan restore konteks dan melanjutkan tepat dari titik berhenti

[Opsional] Jika mau full reconciliation: /unify dulu sebelum pindah chat.
```

---

## Catatan

- `docs/recap.md` adalah snapshot cepat — untuk reconciliation formal gunakan `/unify`
- Bisa dijalankan kapanpun, tidak harus setelah /apply selesai
- Aman dijalankan berulang kali — file akan di-overwrite dengan versi terbaru
