---
description: Cek status semua service — app, database, Redis, worker, backup. Gunakan saat ada masalah atau monitoring rutin.
---

1. Cek apakah app Next.js merespons:
// turbo
   `curl -s https://[domain].com/api/health | python3 -m json.tool`

2. Cek status containers di Docker:
// turbo
   `docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`

3. Cek koneksi PostgreSQL:
// turbo
   `docker exec postgres pg_isready -U produser -d myapp_prod`

4. Cek Redis berjalan dan merespons:
// turbo
   `docker exec redis redis-cli ping`

5. Cek log error terbaru di Next.js (50 baris terakhir):
// turbo
   `docker logs nextjs --tail 50 2>&1 | grep -i "error\|warn\|critical"`

6. Cek disk usage VPS:
// turbo
   `df -h / && du -sh /var/lib/docker/`

7. Cek backup database terakhir di NEO Object Storage:
// turbo
   `s3cmd ls s3://myapp-backups/ --host=nos.wjv-1.neo.id --host-bucket="%(bucket)s.nos.wjv-1.neo.id" | tail -5`

8. Tampilkan ringkasan status semua service kepada user.
   Jika ada yang bermasalah, identifikasi root cause dan sarankan langkah fix.
