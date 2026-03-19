---
description: Deploy ke production via Coolify webhook. Jalankan setelah semua tests pass dan PR merged ke main.
---

1. Pastikan kamu di branch `main` dan sudah pull latest:
// turbo
   `git checkout main && git pull origin main`

2. Jalankan type check dan lint:
// turbo
   `npm run type-check && npm run lint`
   Jika ada error, STOP dan fix dulu sebelum lanjut.

3. Cek apakah ada migration database yang perlu dijalankan.
   Jika ada perubahan schema, jalankan workflow `/db-migrate` dulu.

4. Tampilkan ringkasan commit sejak deploy terakhir:
// turbo
   `git log --oneline $(git describe --tags --abbrev=0)..HEAD`

5. Minta konfirmasi user: "Commit di atas akan di-deploy ke production. Lanjutkan? (yes/no)"

6. Jika user konfirmasi yes, trigger Coolify deploy via webhook:
// turbo
   `curl -X POST -H "Authorization: Bearer $COOLIFY_TOKEN" "https://[IP-VPS]:8000/api/v1/deploy?uuid=$COOLIFY_APP_UUID"`

7. Buka Coolify dashboard dan pantau proses deploy. URL: https://[IP-VPS]:8000

8. Setelah deploy selesai, cek health endpoint:
// turbo
   `curl https://[domain].com/api/health`
   Response harus: `{"status":"ok","db":"ok","redis":"ok"}`

9. Update Development Log di `docs/06-DEVELOPMENT-LOG.md`:
   `[DEPLOY] Deploy production [tanggal] - [ringkasan fitur yang di-deploy]`
