# Software Requirements Specification (SRS)
> Sistem: [Nama Proyek/Sistem]
> Versi: [1.0]
> Tanggal: [YYYY-MM-DD]

## 1. Pendahuluan
### 1.1 Tujuan
Dokumen ini mendefinisikan persyaratan fungsional dan non-fungsional, serta arsitektur dari sistem [Nama Proyek]. Tujuannya adalah memastikan pemahaman yang sama antara pemangku kepentingan dan tim pengembang (termasuk AI agent) mengenai target spesifik dari pengembangan peranti lunak.

### 1.2 Ruang Lingkup (Scope)
Penjelasan ringkas mengenai batasan sistem. Apa yang akan dikembangkan dalam MVP dan apa yang termasuk di luar fase (Out of Scope).

### 1.3 Referensi
- `docs/01-PRD.md` (Product Requirements Document terkait MVP)
- `docs/tech-design.md` (Spesifikasi Teknis)

---

## 2. Deskripsi Keseluruhan
### 2.1 Konteks Sistem
Diagram tingkat tinggi atau deskripsi interaksi sistem dengan entitas eksternal (sistem pihak ketiga, pengguna akhir, layanan integrasi seperti Payment Gateway Xendit).

### 2.2 Karakteristik Pengguna
Identifikasi setiap aktor. (Contoh: Admin, End-User, Guest).

---

## 3. Spesifikasi Persyaratan Fungsi (Functional Requirements)
Spesifikasikan dengan format *Use Case* atau cerita pengguna (User Stories) dengan rincian yang lebih dalam dibandingkan MVP PRD.

### 3.1 Layanan Otentikasi
1. Sistem harus mengijinkan user masuk menggunakan OAuth Google (Better Auth).
2. Sistem wajib mengelola sesi kadaluwarsa pengguna secara otomatis.

### 3.2 Modul Utama [Nama Modul]
_Rincian setiap interaksi yang terjadi pada sistem..._

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements / NFR)
### 4.1 Keamanan (Security)
- Sistem harus mengamankan data sensitif pengguna (seperti NIK) menggunakan enkripsi pgcrypto pada database PostgreSQL.
- Transmisi data wajib dibalut di bawah HTTPS.
- Proteksi terhadap *SQL Injection* dan *XSS* wajib ditegakkan (Zod Validations & Parameterized Queries).

### 4.2 Kinerja (Performance)
1. Kecepatan *load* halaman klien (LCP - Largest Contentful Paint) harus kurang dari 2.5 detik.
2. *Webhook* transaksi harus mampu memproses antrean `BullMQ` dengan konkurensi minimal 10 task tanpa membebani thread antarmuka.

### 4.3 Privasi Data (UU PDP Compliance)
Hak pengguna untuk mengakses, mengunduh (*data portability*), dan menghapus data personal (Right to Erasure) wajib tersedia secara mandiri di halaman pengaturan akun.

---

## 5. Pemodelan Data & Lingkungan
### 5.1 Spesifikasi Skema Database
Diagram ERD secara tekstual atau penjelasan tabel utama (misal: relasi `Users` ke `Transactions` dalam rancangan Prisma 7).

### 5.2 Strategi Backup & Pemulihan
Rincian metode *snapshot* di lingkungan produksi atau penyimpanan file pengguna yang direkam menuju NEO Object Storage Biznet.
