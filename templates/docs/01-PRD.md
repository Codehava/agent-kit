# 01 — Deskripsi Produk (PRD)
> Aplikasi: [Nama Aplikasi] | Dibuat: [tanggal]
> Berdasarkan: docs/00-research.md + hasil diskusi dengan user
> Status: [Draft / Disetujui]

---

## Ringkasan Produk

**Satu kalimat:**
[Nama Aplikasi] adalah [jenis produk] yang membantu [target pengguna] untuk [melakukan apa] sehingga [manfaat utama].

**Masalah yang diselesaikan:**
[2-3 kalimat menjelaskan masalah nyata]

**Siapa penggunanya:**
[Deskripsi singkat target pengguna — bukan demografi teknis]

---

## Fitur Utama

### Fitur 1: [Nama Fitur]
**REQ-001**

**Apa yang bisa dilakukan user:**
[Deskripsi dari sudut pandang pengguna — tanpa jargon teknis]

**Alur penggunaan:**
```
User membuka [halaman] → [melakukan apa] → [melihat apa] → [hasil]
```

**Syarat keberhasilan:**
- User bisa [kondisi 1 yang bisa dicek]
- User bisa [kondisi 2 yang bisa dicek]
- Jika [kondisi gagal]: [pesan yang ditampilkan]

**4 kondisi UI yang wajib ada:**
- Tampilan normal: [deskripsi]
- Saat memuat: [deskripsi — loading indicator, dll]
- Saat berhasil: [deskripsi — konfirmasi, pesan sukses]
- Saat gagal: [deskripsi — pesan error yang mudah dipahami]

---

### Fitur 2: [Nama Fitur]
**REQ-002**

**Apa yang bisa dilakukan user:**
[Deskripsi]

**Alur penggunaan:**
```
[Langkah 1] → [Langkah 2] → [Hasil]
```

**Syarat keberhasilan:**
- [kondisi yang bisa dicek]
- [kondisi yang bisa dicek]

**4 kondisi UI yang wajib ada:**
- Tampilan normal: [deskripsi]
- Saat memuat: [deskripsi]
- Saat berhasil: [deskripsi]
- Saat gagal: [deskripsi]

---

### Fitur 3: [Nama Fitur]
**REQ-003**

[Isi sesuai pola di atas]

---

## Notifikasi

| Kejadian | Siapa yang Diberitahu | Cara | Isi Pesan |
|----------|----------------------|------|-----------|
| [event 1] | [pengguna / admin] | Email / Push / SMS | [isi notifikasi] |
| [event 2] | [pengguna / admin] | Email / Push / SMS | [isi notifikasi] |

---

## Konten yang Dibutuhkan

| Halaman / Bagian | Konten yang Perlu Disiapkan | Siapa yang Siapkan |
|------------------|----------------------------|--------------------|
| Halaman utama | [copywriting, gambar] | [user / AI] |
| Email sambutan | [teks email] | [user / AI] |
| [halaman lain] | [konten] | [user / AI] |

---

## Yang Sengaja Tidak Dimasukkan (MVP)

Fitur berikut **tidak** ada di versi pertama — akan ditambahkan nanti setelah ada pengguna:

- [Fitur yang ditunda] — alasan: [kenapa ditunda]
- [Fitur yang ditunda] — alasan: [kenapa ditunda]

---

## Batasan & Aturan Penting

- [Batasan 1 — contoh: hanya tersedia di Indonesia]
- [Batasan 2 — contoh: pengguna harus berusia 17+]
- [Aturan privasi — contoh: data tidak dibagikan ke pihak ketiga]

---

## Checklist Sebelum Lanjut ke Desain Teknis

- [ ] Semua fitur utama punya syarat keberhasilan yang jelas
- [ ] Semua fitur punya 4 kondisi UI (normal / muat / berhasil / gagal)
- [ ] Fitur yang ditunda sudah dicatat alasannya
- [ ] User sudah menyetujui daftar fitur ini
- [ ] Tidak ada fitur yang masih ambigu atau belum jelas alurnya

---

*Dokumen ini adalah kontrak antara tim dan stakeholder tentang apa yang akan dibangun.*
*Ubah dokumen ini jika ada perubahan scope — jangan ubah kode langsung tanpa mengubah dokumen ini dulu.*
