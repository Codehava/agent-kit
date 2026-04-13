---
name: codehava-security-checker
description: "Audit keamanan kode dan kepatuhan UU PDP No. 27/2022 sebelum fitur naik ke production. Panggil saat selesai membuat fitur yang menyentuh data user, pembayaran, atau autentikasi."
risk: low
source: codehava
date_added: "2026-04-13"
---

# Security Checker Skill

Audit keamanan khusus untuk aplikasi Indonesia — termasuk kepatuhan UU PDP No. 27/2022.

## When to Use

- Setelah membuat fitur autentikasi, pembayaran, atau yang menyentuh data pribadi user
- Sebelum deploy ke production
- Saat ada fitur baru yang menerima input dari user
- Saat integrasi dengan API pihak ketiga (Xendit, Firebase, dll.)

## Trigger Phrases

- "cek keamanan"
- "audit security"
- "apakah ini sudah aman?"
- "cek UU PDP"
- "@codehava-security-checker"

## Security Checklist

### A. Secrets & Credentials
- [ ] Tidak ada API key, password, atau token hardcode di kode
- [ ] Semua secrets menggunakan env vars (`process.env.XXX`)
- [ ] File `.env` tidak masuk ke git (ada di `.gitignore`)

### B. Input Validation
- [ ] Semua input user divalidasi Zod sebelum masuk database
- [ ] File upload: hanya ekstensi yang diizinkan, max 5MB
- [ ] Query parameter dan path parameter di-sanitize

### C. Data Sensitif & UU PDP No. 27/2022
- [ ] NIK, nomor rekening, data sensitif disimpan terenkripsi (pgcrypto)
- [ ] Log tidak mencetak: password, token, NIK, nomor rekening
- [ ] User bisa hapus akun dan download data pribadi
- [ ] Ada mekanisme consent yang bisa dicabut kapan saja

### D. Autentikasi & Otorisasi
- [ ] Semua endpoint yang butuh login dilindungi middleware auth
- [ ] Role-based access control diterapkan dengan benar
- [ ] Session timeout dikonfigurasi (default: 7 hari)

### E. API Security
- [ ] Webhook callbacks diverifikasi dengan secret token
- [ ] Rate limiting ada di endpoint publik
- [ ] CORS tidak pakai wildcard `*` di production

### F. Firebase (jika digunakan)
- [ ] Hanya `firebase_messaging` yang diaktifkan
- [ ] Analytics, Crashlytics, Performance Monitoring dinonaktifkan

## Output Format

```
## Security Check: [nama fitur / endpoint]

### 🔴 KRITIS — Harus fix sebelum production
- [masalah] → [cara fix]

### 🟡 PERLU PERHATIAN — Fix di sprint berikutnya
- [masalah] → [rekomendasi]

### 🟢 Sudah Aman
- [hal yang sudah baik]

### Status UU PDP
[COMPLIANT / PERLU REVIEW / NON-COMPLIANT]
Catatan: [hal spesifik yang perlu ditindaklanjuti]
```

## Konteks UU PDP No. 27/2022

- Data pribadi harus disimpan di server Indonesia (data residency)
- User berhak akses, koreksi, dan hapus data mereka
- Consent harus eksplisit dan bisa dicabut
- Pelanggaran data harus dilaporkan dalam 14 hari kalender
