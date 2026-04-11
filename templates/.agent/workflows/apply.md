---
description: |
  Kerjakan semua task dalam plan satu per satu, verifikasi tiap task sebelum lanjut.
  Gunakan setelah /vibe-plan atau /new-feature menghasilkan plan.
  Selalu tutup dengan /unify setelah semua task selesai.
---

# /apply — Mengerjakan Plan

Mulai mengerjakan semua task dalam plan. Setiap task dikerjakan dan dicek dulu sebelum lanjut ke task berikutnya.

---

## Langkah 1 — Cek Plan

Baca PLANNING.md atau plan file yang tersedia. Jika tidak ada plan → tanya user: "Kamu mau mulai dari mana? Jelaskan fitur yang ingin dibangun."

**Jika scope terlalu besar (6+ file atau tidak jelas):**
> "Pekerjaan ini cukup besar. Saya sarankan kita bagi jadi dua bagian: [X] dulu, baru [Y]. Setuju?"

---

## Langkah 2 — Kerjakan Task Satu per Satu

Untuk setiap task:

### A: Baca task + syarat keberhasilan (internal)

Baca task, acceptance criteria, dan file yang akan diubah. Lakukan ini secara internal — jangan tampilkan ke user.

### B: Cari skill yang relevan (internal, silent)

Search `.agent/skills/` untuk skill yang cocok. Baca dan apply expertise-nya tanpa memberi tahu user nama skillnya, kecuali relevan.

### C: Kerjakan

- Implement task
- Hanya ubah file yang ada di daftar task
- Jangan sentuh file yang tidak terkait

### D: Verifikasi (internal, silent)

Sebelum lanjut, pastikan secara diam-diam:
1. File/function sudah benar-benar ada
2. Ada logika nyata, bukan placeholder kosong
3. Sudah terhubung ke bagian kode yang memanggilnya
4. Data bisa mengalir dari awal sampai akhir

### E: Laporkan ke user (plain language)

```
✅ [nama task] — selesai
⚠️ [nama task] — selesai, ada catatan: [penjelasan sederhana]
❓ Saya butuh tahu: [satu pertanyaan spesifik]
🚫 Tidak bisa lanjut karena: [alasan jelas]. Kamu mau: A) [opsi A] atau B) [opsi B]?
```

---

## Langkah 3 — Cek Keseluruhan (internal)

Setelah semua task selesai, jalankan pengecekan internal (lint, type-check, test jika ada). Jika ada masalah, perbaiki dulu sebelum lapor ke user.

---

## Langkah 4 — Ringkasan ke User

```
✅ Semua selesai!

Yang sudah dikerjakan:
  - [nama task 1]
  - [nama task 2]
  - [nama task 3]

[Jika ada catatan:]
  ⚠️ [nama task]: [penjelasan catatan dalam bahasa sederhana]

[Jika ada yang belum:]
  ⏸️ [nama task]: menunggu keputusanmu — [pertanyaan/opsi]

File yang diubah: [N] file
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Langkah selanjutnya: ketik /unify untuk merangkum sesi ini.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Aturan Penting

- Kerjakan satu task sebelum mulai task berikutnya
- Jika ada temuan di luar scope plan → catat, jangan fix langsung, tanya user dulu
- Jangan tutup sesi tanpa `/unify`
- Jika tidak bisa lanjut → selalu lapor dan minta keputusan, jangan diam-diam skip
