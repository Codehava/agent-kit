# 05 — Deployment Guide
> Panduan lengkap setup VPS Biznet Gio + Coolify + CI/CD.
>
> 🤖 **AI Reading Guide:** Baca dokumen ini sebelum menjalankan perintah deployment apapun. Ikuti urutan langkah secara berurutan. Jangan skip langkah keamanan. Semua perubahan environment variables harus dikonfirmasi dulu dengan user.

---

## 1. Arsitektur Deployment

```
GitHub (push to main)
    │
    ▼ GitHub Actions (lint + build check)
    │
    ▼ Coolify Webhook (auto-deploy)
    │
    ▼ Docker Build
    │
    ▼ Traefik (reverse proxy + SSL)
    │
    ▼ https://[domain].com
```

---

## 2. Setup Awal VPS Biznet Gio

### Spesifikasi Minimum

| Resource | MVP | Scaling |
|----------|-----|---------|
| CPU | 2 vCPU | 4–8 vCPU |
| RAM | 4 GB | 8–16 GB |
| Storage | 60 GB SSD | 100 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

> ⚠️ **Production:** Pisahkan VPS database dari VPS app. PostgreSQL dan Next.js di server yang sama akan menyebabkan resource contention saat traffic tinggi.

### Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw

# Firewall
sudo ufw allow 22     # SSH
sudo ufw allow 80     # HTTP
sudo ufw allow 443    # HTTPS
sudo ufw allow 8000   # Coolify (setup awal)
sudo ufw enable

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Install Coolify
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Setelah install: buka `http://[IP-VPS]:8000`, buat akun admin.

---

## 3. Coolify Configuration

### Services yang Di-deploy via Coolify

| Service | Port | Type |
|---------|------|------|
| Next.js Web | 3000 | Dockerfile |
| Socket.io + Worker | 3001 | Dockerfile |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Database |

### Setup Aplikasi di Coolify
1. New Resource → Application
2. Source: GitHub → pilih repo
3. Branch: `main`
4. Build Pack: `Dockerfile`
5. Port: sesuai service
6. Domain: `[domain].com`
7. SSL: Enable (auto via Let's Encrypt / Traefik)

### Environment Variables di Coolify
Masukkan semua env vars production di Coolify UI — **JANGAN** di `.env` yang ter-commit:
```
DATABASE_URL=postgresql://user:pass@postgres:5432/myapp_prod
REDIS_URL=redis://redis:6379
BETTER_AUTH_SECRET=[generate baru untuk prod]
BETTER_AUTH_URL=https://[domain].com
XENDIT_SECRET_KEY=xnd_production_...
XENDIT_CALLBACK_TOKEN=[random string panjang]
XENDIT_FEE_RULE_ID=
NEO_ENDPOINT=https://nos.wjv-1.neo.id
NEO_ACCESS_KEY=
NEO_SECRET_KEY=
NEO_BUCKET_NAME=myapp-prod
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://[domain].com
NODE_ENV=production
```

---

## 4. Dockerfile

### Next.js (`apps/web/Dockerfile`)
```dockerfile
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### Socket.io + Worker (`apps/worker/Dockerfile`)
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

---

## 5. GitHub Actions CI/CD

### `.github/workflows/deploy.yml`
```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint

  deploy:
    needs: check
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Coolify Deploy
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            "https://[IP-VPS]:8000/api/v1/deploy?uuid=${{ secrets.COOLIFY_APP_UUID }}"
```

### GitHub Secrets yang Diperlukan
Di: Settings → Secrets → Actions
```
COOLIFY_TOKEN       → dari Coolify: Settings → API Keys
COOLIFY_APP_UUID    → UUID aplikasi di Coolify
```

---

## 6. Database Migration (Production)

```bash
# Jalankan migration di production via Coolify terminal atau SSH
cd /app
npx prisma migrate deploy

# Jangan pernah pakai migrate dev di production!
# migrate dev = reset + seed (bahaya di prod)
# migrate deploy = apply pending migrations saja
```

### Supabase CLI untuk manage migrations
```bash
npm install -g prisma
# Generate migration baru (di local)
npx prisma migrate dev --name [nama_migration]
# Push ke production
npx prisma migrate deploy
```

---

## 7. NEO Object Storage Setup

### Buat Bucket di Portal Biznet Gio
1. Login ke https://portal.biznetgio.com
2. NEO Object Storage → Create Bucket
3. Nama bucket: `myapp-prod`
4. ACL: Private (akses via presigned URL)
5. Salin Access Key + Secret Key → masukkan ke env vars Coolify

### Konfigurasi CORS (untuk upload langsung dari browser)
```json
{
  "CORSRules": [{
    "AllowedOrigins": ["https://[domain].com"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }]
}
```

---

## 8. Backup Strategy

### Backup PostgreSQL Harian ke NEO Object Storage
```bash
#!/bin/bash
# /home/ubuntu/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql.gz"
BUCKET="myapp-backups"

# Dump database
docker exec postgres pg_dump -U produser myapp_prod | gzip > /tmp/${BACKUP_FILE}

# Upload ke NEO Object Storage
s3cmd put /tmp/${BACKUP_FILE} s3://${BUCKET}/${BACKUP_FILE} \
  --host=nos.wjv-1.neo.id \
  --host-bucket="%(bucket)s.nos.wjv-1.neo.id" \
  --access_key=${NEO_ACCESS_KEY} \
  --secret_key=${NEO_SECRET_KEY}

# Hapus backup lokal
rm /tmp/${BACKUP_FILE}

# Hapus backup lebih dari 7 hari
s3cmd ls s3://${BUCKET}/ | grep backup_ | sort | head -n -7 | \
  awk '{print $4}' | xargs -I{} s3cmd del {}
```

### Setup Cron
```bash
# Jalankan backup setiap hari jam 02:00 WIB
crontab -e
0 19 * * * /home/ubuntu/backup-db.sh >> /var/log/backup.log 2>&1
```

---

## 9. DNS & Domain Setup

### Cloudflare DNS Records
```
A     @       [IP-VPS]        # apex domain
A     www     [IP-VPS]        # www
A     api     [IP-VPS]        # API subdomain (jika terpisah)
A     ws      [IP-VPS]        # Socket.io (jika butuh subdomain)
```

### Cloudflare Settings
- **SSL/TLS:** Full (strict)
- **Auto HTTPS Redirect:** On
- **WebSocket:** On (untuk Socket.io)
- **Cache Level:** Standard

### ⚠️ Wajib: Accept Cloudflare DPA
Setelah domain aktif di Cloudflare, accept Data Processing Addendum:
1. Login Cloudflare → klik nama akun kanan atas
2. **My Profile → Privacy → Data Processing Addendum**
3. Klik "Accept DPA"

Ini menjadikan Cloudflare sub-processor sah sesuai UU PDP. Tanpa ini, IP address pengguna yang diproses Cloudflare tidak memiliki mekanisme transfer lintas negara yang sah.

> ⚠️ Socket.io butuh WebSocket support — pastikan Cloudflare proxy diaktifkan dengan setting WebSocket = On, atau bypass proxy untuk subdomain Socket.io.

---

## 10. Deployment Checklist

### Sebelum Deploy ke Production
- [ ] `npm run build` sukses tanpa error di local
- [ ] `npm run lint` bersih
- [ ] `npx prisma migrate deploy` sudah dijalankan
- [ ] Semua env vars sudah diset di Coolify
- [ ] Xendit callback URL sudah diupdate ke domain production
- [ ] Firebase project sudah switch ke production — **hanya FCM yang diaktifkan** (Analytics/Crashlytics/Performance = OFF)
- [ ] Backup database terakhir tersimpan
- [ ] Test manual di staging (jika ada)

### UU PDP Compliance (sekali saja, sebelum go-live pertama)
- [ ] **Cloudflare DPA** sudah di-accept → Dashboard → My Profile → Privacy → Data Processing Addendum
- [ ] **Firebase Data Processing Terms** sudah di-accept → Firebase Console → Project Settings → Usage and billing
- [ ] Privacy Policy mencantumkan Cloudflare, Firebase, Resend sebagai **sub-processor**
- [ ] Halaman Privacy Policy & Terms of Service tersedia dalam Bahasa Indonesia di app
- [ ] Consent flow saat registrasi aktif (checkbox **tidak** pre-checked)
- [ ] Tabel `consent_records` ada di database dan berfungsi
- [ ] Fitur **hapus akun** tersedia di settings pengguna
- [ ] Fitur **unduh data saya** tersedia di settings pengguna

### Setelah Deploy
- [ ] Aplikasi bisa diakses via domain
- [ ] SSL certificate valid (https berjalan)
- [ ] Login berhasil
- [ ] Test pembayaran Xendit (mode production)
- [ ] Cek logs tidak ada error critical di Coolify
- [ ] Uptime Kuma mendeteksi service UP
- [ ] Monitor resource VPS 15 menit pertama

---

## 11. Troubleshooting

### Container tidak mau start
```bash
# Cek logs di Coolify UI atau via SSH
docker logs [container-name] --tail 100 -f
docker ps -a   # lihat status semua container
```

### Database connection error
```bash
# Test koneksi PostgreSQL
docker exec postgres psql -U produser -d myapp_prod -c "SELECT 1"
# Cek env DATABASE_URL sudah benar
```

### Xendit webhook tidak masuk
1. Cek Xendit Dashboard → Settings → Webhooks
2. Pastikan URL sudah benar dan HTTPS
3. Test dengan Xendit webhook tester
4. Cek logs di Coolify untuk error
5. Pastikan `XENDIT_CALLBACK_TOKEN` sama antara Xendit dan env vars

### Socket.io tidak connect
1. Pastikan port 3001 tidak diblok firewall
2. Pastikan Cloudflare WebSocket = On
3. Cek CORS origin di Socket.io server sudah include domain production
