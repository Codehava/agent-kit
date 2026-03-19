---
description: Buat git commit dengan format Conventional Commits yang benar. Gunakan setiap kali mau commit perubahan.
---

1. Tampilkan semua perubahan yang ada:
// turbo
   `git diff --stat && git status --short`

2. Analisis perubahan dan tentukan:
   - Type yang sesuai: feat / fix / chore / docs / refactor / test / style
   - Scope (opsional): nama modul atau area — contoh: auth, payment, ui
   - Deskripsi singkat dalam Bahasa Indonesia atau English (max 72 karakter)

3. Jika ada file yang tidak perlu di-commit (misal .env, debug files), tunjukkan ke user.

4. Tampilkan commit message yang akan dibuat ke user untuk konfirmasi:
   Format: `type(scope): deskripsi`
   Contoh: `feat(payment): tambah split payment Xendit untuk marketplace`

5. Setelah user approve, stage semua perubahan dan commit:
// turbo
   `git add -A && git commit -m "[commit message yang sudah diapprove]"`

6. Tunjukkan hasil commit: `git log --oneline -1`
