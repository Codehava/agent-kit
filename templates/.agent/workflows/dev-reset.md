---
description: Reset environment development — bersihkan node_modules, restart containers, reset database dev. Gunakan saat ada dependency issue atau mau mulai dari awal.
---

1. Tanya user: "Reset database juga? Data dev akan hilang. (yes/no)"

2. Stop dan bersihkan containers:
// turbo
   `docker compose down -v`

3. Bersihkan node_modules dan cache:
// turbo
   `rm -rf apps/web/node_modules apps/web/.next && npm cache clean --force`

4. Reinstall dependencies:
// turbo
   `npm install`

5. Start containers baru:
// turbo
   `docker compose up -d`
   Tunggu sampai postgres dan redis healthy (sekitar 10 detik).

6. Jalankan Prisma migration:
// turbo
   `npx prisma migrate dev`

7. Jika user tadi menjawab "yes" untuk reset database, jalankan seed:
// turbo
   `npx prisma db seed`

8. Generate Prisma client:
// turbo
   `npx prisma generate`

9. Jalankan type check untuk pastikan semua baik:
// turbo
   `npm run type-check`

10. Tampilkan ringkasan: "Environment reset selesai. Siap development."
