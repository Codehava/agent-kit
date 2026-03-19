---
description: Jalankan database migration Prisma di production via Coolify. Gunakan sebelum setiap deploy yang ada perubahan schema.
---

1. Pastikan kamu sudah commit dan push semua perubahan schema.prisma ke Git.

2. Buat backup database production sebelum migration.
// turbo
3. Run `git status` untuk konfirmasi tidak ada perubahan yang belum di-commit.

4. Tampilkan migration yang pending dengan menjalankan:
   `npx prisma migrate status`
   Tunggu hasilnya dan tunjukkan ke user.

5. Minta konfirmasi user sebelum lanjut: "Migration di atas akan dijalankan. Lanjutkan? (yes/no)"

6. Jika user konfirmasi yes, jalankan migration:
   `npx prisma migrate deploy`
   Jangan gunakan `prisma migrate dev` — itu hanya untuk development.

7. Verifikasi migration berhasil dengan menjalankan:
   `npx prisma migrate status`
   Pastikan tidak ada migration yang pending.

8. Update Development Log di `docs/06-DEVELOPMENT-LOG.md` dengan entry baru:
   `[DEPLOY] Migration [nama migration] dijalankan di production - [tanggal]`
