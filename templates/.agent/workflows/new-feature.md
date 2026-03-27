---
description: Mulai fitur baru dengan benar — buat spec, branch Git, dan siapkan context untuk agent. Gunakan sebelum coding fitur size M atau L.
---

1. Tanya user: "Nama fitur ini apa? Deskripsi singkat tujuannya?"

2. **Wajib BDD Spec:** Cek apakah sudah ada spec di folder `specs/` untuk fitur ini.
   Jika belum ada, **PANGGIL SKILL `feature-spec-writer`** sekarang juga untuk membuat spec baru dengan format `NNN-nama-fitur.md`. Pastikan spec mencakup *Acceptance Criteria (Given-When-Then), 4 UI States, dan Data Contract JSON* sebelum lanjut coding!

3. Tanya user: "Fitur ini terkait REQ ID berapa dari PRD? (contoh: REQ-020)"
   Tambahkan referensi REQ ID ke spec.

4. Pastikan branch `main` up-to-date:
// turbo
   `git checkout main && git pull origin main`

5. Buat feature branch baru:
// turbo
   `git checkout -b feat/[nama-fitur-singkat]`

6. Tampilkan isi spec yang baru dibuat ke user dan minta approval:
   "Spec sudah siap. Review dan konfirmasi untuk mulai implementasi."

7. Setelah user approve, mulai implementasi sesuai acceptance criteria di spec.
   Hanya ubah file yang tercantum di bagian "File yang Akan Diubah" di spec.

8. Saat implementasi selesai, jalankan type check:
// turbo
   `npm run type-check`

9. Jika tidak ada error TypeScript, commit dengan pesan yang sesuai:
   `git add -A && git commit -m "feat([scope]): [deskripsi singkat]"`
