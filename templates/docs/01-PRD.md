# 01 — Product Requirements Document (PRD)
> Isi dokumen ini sebelum mulai coding sprint pertama.
>
> 🤖 **AI Reading Guide:** Ini adalah sumber kebenaran utama produk. Baca bagian Fitur MVP dan User Stories sebelum mengerjakan task apapun. Jika ada permintaan fitur baru, cek dulu apakah sudah ada di In Scope — jika tidak, tanyakan user sebelum menambahkan.

---

## 1. Ringkasan Produk

| Field | Isi |
|-------|-----|
| **Nama Produk** | [nama aplikasi] |
| **Tipe** | [Web App / Mobile App / Marketplace] |
| **Versi** | v0.1 — MVP |
| **Tanggal** | [tanggal] |
| **Owner** | [nama PIC] |

### Elevator Pitch
> Aplikasi ini membantu **[siapa]** untuk **[melakukan apa]** sehingga **[manfaat utama]**.

---

## 2. Masalah & Target Pengguna

### Problem Statement
[Jelaskan masalah nyata yang ada. Apa pain point pengguna saat ini?]

### Target Pengguna
| Segmen | Deskripsi | Pain Point Utama |
|--------|-----------|--------------------|
| User Utama | [contoh: pemilik toko online] | [contoh: susah kelola pesanan] |
| User Sekunder | [contoh: pelanggan toko] | [contoh: checkout ribet] |
| Admin | [contoh: operator platform] | [contoh: rekonsiliasi manual] |

---

## 3. User Flow Utama

> Gambarkan alur pengguna dari awal hingga mencapai nilai utama aplikasi.
> AI membaca bagian ini untuk memahami urutan halaman dan logika navigasi.

### Alur Utama — [nama alur, contoh: Proses Pembayaran]

```mermaid
flowchart TD
    A([Pengguna Buka App]) --> B{Sudah Login?}
    B -- Belum --> C[Halaman Login]
    C --> D[/Input Email + Password/]
    D --> E{Login Berhasil?}
    E -- Gagal --> C
    E -- Berhasil --> F[Dashboard]
    B -- Sudah --> F

    F --> G[Pilih [Fitur Utama]]
    G --> H[/Isi Form/]
    H --> I{Validasi OK?}
    I -- Gagal --> J[Tampilkan Error]
    J --> H
    I -- OK --> K[Proses / Simpan]
    K --> L([Selesai — Tampilkan Hasil])
```

### Alur Sekunder — [nama alur lain jika ada]

```mermaid
flowchart TD
    A([User]) --> B[Halaman [X]]
    B --> C[Aksi [Y]]
    C --> D([Hasil])
```

> **Catatan:** Setiap state wajib punya handling untuk: loading, empty, error.

---

## 4. Fitur MVP

> **Prinsip:** Hanya fitur yang WAJIB untuk validasi bisnis. Sisanya masuk backlog.

### ✅ In Scope
| ID | Fitur | Deskripsi | Prioritas |
|----|-------|-----------|-----------| 
| F01 | Autentikasi | Login email, Google OAuth, session 7 hari | P0 |
| F02 | [nama fitur] | [deskripsi singkat] | P0 |
| F03 | [nama fitur] | [deskripsi singkat] | P1 |
| F04 | Pembayaran | Xendit payment link, webhook, split payment | P0 |
| F05 | Notifikasi | FCM push notif, email via Resend | P1 |

### ❌ Out of Scope MVP
- [fitur yang sengaja ditunda]
- [fitur nice-to-have]

---

## 5. User Stories

> Format: **Sebagai [siapa], saya ingin [aksi], agar [tujuan].**

### Autentikasi
- [ ] **REQ-001** Sebagai pengguna baru, saya ingin mendaftar dengan email/Google, agar bisa akses aplikasi
- [ ] **REQ-002** Sebagai pengguna, saya ingin login dan sesi tersimpan 7 hari, agar tidak perlu login ulang
- [ ] **REQ-003** Sebagai pengguna, saya ingin reset password via email, agar bisa akses akun jika lupa

### [Modul Utama — ganti sesuai aplikasi]
- [ ] **REQ-010** Sebagai [role], saya ingin [aksi], agar [tujuan]
- [ ] **REQ-011** Sebagai [role], saya ingin [aksi], agar [tujuan]

### Pembayaran (Xendit)
- [ ] **REQ-020** Sebagai pembeli, saya ingin membayar via VA/QRIS/e-wallet
- [ ] **REQ-021** Sebagai penjual, saya ingin dana langsung masuk rekening saya (split)
- [ ] **REQ-022** Sebagai admin, saya ingin melihat status semua transaksi

### Notifikasi
- [ ] **REQ-030** Sebagai pengguna, saya ingin dapat push notif saat ada update penting
- [ ] **REQ-031** Sebagai pengguna, saya ingin dapat email konfirmasi pembayaran

### UU PDP — Hak Pengguna (Wajib sesuai UU PDP No. 27/2022)
- [ ] **REQ-040** Sebagai pengguna, saya ingin dapat menghapus akun + semua data saya
- [ ] **REQ-041** Sebagai pengguna, saya ingin dapat mengunduh semua data pribadi saya
- [ ] **REQ-042** Sebagai pengguna, saya ingin dapat mencabut consent marketing kapan saja

---

## 6. Non-Functional Requirements

| Kategori | Requirement | Target |
|----------|-------------|--------|
| Performance | Load halaman utama | < 2 detik |
| Availability | Uptime | 99.9% |
| Security | Auth | Session DB (Better Auth 1.5) |
| Security | Payment | Xendit callback token verified |
| Security | Data sensitif | Enkripsi at-rest (pgcrypto) |
| Scalability | Concurrent users (MVP) | 100 users |
| Mobile | Platform | Android + iOS (Flutter 3.41.2) |
| Storage | File upload max | 5 MB |
| Regulasi | Compliance | UU PDP No. 27/2022 |

---

## 7. Success Metrics

| Metric | Target MVP (Bulan 1) | Cara Ukur |
|--------|---------------------|-----------|
| Registrasi user | [target] | DB count |
| Transaksi berhasil | [target] | Xendit dashboard |
| Uptime | 99.9% | Uptime Kuma |

---

## 8. Constraints & Asumsi

### Constraints
- Tim: 2–3 orang
- Timeline MVP: [target tanggal]
- Budget infra: [estimasi/bulan]
- Regulasi: UU PDP No. 27/2022 (berlaku penuh Oktober 2024)

### Asumsi
- User memiliki smartphone Android/iOS
- Merchant sudah terdaftar sebagai sub-merchant di Xendit
- Semua user WNI — tidak perlu multi-currency untuk MVP
- Primary database di Indonesia (Biznet Gio) untuk comply data residency
