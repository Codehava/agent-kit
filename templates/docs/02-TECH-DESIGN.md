# 02 — Desain Teknis
> Aplikasi: [Nama Aplikasi] | Dibuat: [tanggal]
> Berdasarkan: docs/01-prd.md
> Status: [Draft / Disetujui]

---

## Teknologi yang Dipakai

| Bagian | Teknologi | Versi | Alasan Dipilih |
|--------|-----------|-------|----------------|
| Frontend (tampilan) | [Next.js / React Native / dll] | [versi] | [alasan] |
| Backend (server) | [Node.js / Python / dll] | [versi] | [alasan] |
| Database | [PostgreSQL / MySQL / dll] | [versi] | [alasan] |
| Autentikasi (login) | [Better Auth / Clerk / dll] | [versi] | [alasan] |
| Styling (desain UI) | [Tailwind CSS / dll] | [versi] | [alasan] |
| File storage | [Cloudflare R2 / S3 / dll] | [versi] | [alasan] |
| Deployment | [Coolify / Vercel / dll] | — | [alasan] |
| Monitoring error | [Sentry / dll] | — | [alasan] |

---

## Struktur Folder Project

```
[nama-project]/
├── src/
│   ├── app/              ← halaman-halaman aplikasi
│   ├── components/       ← komponen UI yang dipakai ulang
│   ├── lib/              ← koneksi database, helper functions
│   └── server/           ← logika server (API, auth, dll)
├── prisma/
│   └── schema.prisma     ← definisi tabel database
├── public/               ← gambar, ikon, file statis
├── docs/                 ← semua dokumen planning
└── docker-compose.yml    ← konfigurasi database lokal
```

---

## Struktur Database

### Tabel: [NamaTabel1]
| Kolom | Tipe | Wajib? | Keterangan |
|-------|------|--------|------------|
| id | UUID | Ya | Primary key, auto-generate |
| [kolom] | [tipe] | [Ya/Tidak] | [keterangan] |
| created_at | Timestamp | Ya | Waktu dibuat, auto-fill |
| updated_at | Timestamp | Ya | Waktu diubah, auto-fill |

### Tabel: [NamaTabel2]
| Kolom | Tipe | Wajib? | Keterangan |
|-------|------|--------|------------|
| id | UUID | Ya | Primary key |
| [kolom] | [tipe] | [Ya/Tidak] | [keterangan] |

### Relasi Antar Tabel
```
[Tabel A] 1 ──── N [Tabel B]      (satu A punya banyak B)
[Tabel B] N ──── 1 [Tabel C]      (banyak B milik satu C)
[Tabel D] N ──── N [Tabel E]      (via tabel penghubung)
```

---

## Halaman & Endpoint API

### Halaman (Frontend)

| Halaman | URL | Siapa yang Bisa Akses | Deskripsi |
|---------|-----|----------------------|-----------|
| Beranda | `/` | Semua | Halaman utama |
| Login | `/login` | Tamu | Form login |
| Dashboard | `/dashboard` | User login | Ringkasan data user |
| [halaman] | `/[path]` | [siapa] | [deskripsi] |

### Endpoint API (Backend)

| Method | URL | Autentikasi? | Fungsi |
|--------|-----|-------------|--------|
| GET | `/api/health` | Tidak | Cek server berjalan |
| POST | `/api/auth/login` | Tidak | Login user |
| GET | `/api/[resource]` | Ya | Ambil daftar data |
| POST | `/api/[resource]` | Ya | Buat data baru |
| PUT | `/api/[resource]/[id]` | Ya | Update data |
| DELETE | `/api/[resource]/[id]` | Ya | Hapus data |

---

## Keamanan

### Ancaman & Perlindungan

| Ancaman | Risiko | Perlindungan yang Dipakai |
|---------|--------|--------------------------|
| Login tidak sah | Tinggi | Rate limiting + captcha |
| Data bocor | Tinggi | Enkripsi + HTTPS |
| Input berbahaya | Sedang | Validasi di server |
| Sesi dicuri | Sedang | Token expire + refresh |
| [ancaman lain] | [tinggi/sedang/rendah] | [perlindungan] |

### Data yang Wajib Dilindungi
- Password: tidak disimpan langsung, selalu di-hash
- Token sesi: disimpan di cookie HttpOnly
- Data pribadi: [NIK / nomor HP / dll] — enkripsi saat disimpan

---

## Infrastruktur & Biaya

### Setup Server

| Komponen | Spesifikasi | Provider | Biaya/Bulan |
|----------|-------------|----------|-------------|
| VPS | [2 CPU, 4GB RAM] | [provider] | Rp [X] |
| Database | [PostgreSQL managed / self-hosted] | [provider] | Rp [X] |
| CDN / Storage | [Cloudflare / R2] | [provider] | Rp [X] |
| Domain | [.com / .id] | [provider] | Rp [X]/tahun |
| **Total estimasi** | | | **Rp [X]/bulan** |

### Estimasi Biaya per Jumlah Pengguna
| Pengguna | Biaya Server/Bulan | Biaya per Pengguna |
|----------|-------------------|-------------------|
| 100 | Rp [X] | Rp [X] |
| 1.000 | Rp [X] | Rp [X] |
| 10.000 | Rp [X] | Rp [X] |

---

## Alur CI/CD (Otomatisasi Deploy)

```
Developer push kode ke GitHub
  ↓
GitHub Actions jalankan test otomatis
  ↓
Jika test lulus → otomatis deploy ke staging
  ↓
Review manual di staging
  ↓
Approve → otomatis deploy ke production
```

**Branch strategy:**
- `main` → production (live)
- `develop` → staging (testing)
- `feature/*` → fitur baru (per developer)

---

## Environment Variables (Konfigurasi Rahasia)

File `.env` yang perlu diisi sebelum mulai:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Auth
AUTH_SECRET="[random string panjang]"
GOOGLE_CLIENT_ID="[dari Google Console]"
GOOGLE_CLIENT_SECRET="[dari Google Console]"

# App
NEXT_PUBLIC_APP_URL="https://[domain-anda].com"

# Storage (jika ada upload file)
STORAGE_ACCESS_KEY="[dari provider]"
STORAGE_SECRET_KEY="[dari provider]"
STORAGE_BUCKET="[nama bucket]"

# Monitoring
SENTRY_DSN="[dari Sentry dashboard]"
```

---

## Keputusan Teknis & Trade-off

| Keputusan | Pilihan yang Dipilih | Alternatif yang Ditolak | Alasan |
|-----------|---------------------|------------------------|--------|
| [keputusan 1] | [pilihan] | [alternatif] | [alasan] |
| [keputusan 2] | [pilihan] | [alternatif] | [alasan] |

---

## Checklist Sebelum Lanjut ke Sprint Plan

- [ ] Stack teknologi sudah dikonfirmasi user
- [ ] Semua tabel database sudah didefinisikan
- [ ] Semua endpoint API sudah tercantum
- [ ] Ancaman keamanan sudah ada perlindungannya
- [ ] Estimasi biaya server sudah ada
- [ ] Environment variables sudah terdaftar semua
- [ ] Tidak ada keputusan teknis yang masih menggantung

---

*Dokumen ini adalah panduan teknis untuk tim developer.*
*Update dokumen ini jika ada perubahan arsitektur yang signifikan.*
