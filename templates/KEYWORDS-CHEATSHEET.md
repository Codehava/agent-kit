# Keywords Cheat Sheet

Panduan ini untuk non-coder yang bingung harus mengetik apa ke AI.

## Alur Yang Sudah Divalidasi

Untuk project baru, pakai urutan ini:

1. `/vibe-plan`
2. `/launch`
3. `/apply`
4. `/unify`
5. `/progress`

Arti singkatnya:
- `/vibe-plan` = ubah ide menjadi plan
- `/launch` = kunci hasil planning jadi titik mulai
- `/apply` = mulai mengerjakan task
- `/unify` = tutup sesi dan rapikan hasil
- `/progress` = cek langkah berikutnya

## Command Berdasarkan Situasi

| Situasi | Command |
|---------|---------|
| Baru mulai project | `/vibe-plan` |
| Planning sudah disetujui | `/launch` |
| Mau mulai coding | `/apply` |
| Selesai sesi coding | `/unify` |
| Bingung harus lanjut apa | `/progress` |
| Mau tambah fitur baru | `/new-feature` |
| Ada bug atau error | `/debug [masalahnya]` |
| Chat sudah kepanjangan | `/vibe-recap` |
| Mau deploy | `/deploy` |

## Keyword Yang Aman Dipakai

Tambahkan keyword ini di prompt Anda:
- `Saya non-coder`
- `gunakan bahasa sederhana`
- `tanya satu hal per langkah`
- `pilih solusi paling sederhana untuk MVP`
- `jangan tambah fitur yang tidak wajib`
- `jangan ubah file lain tanpa konfirmasi`
- `jelaskan keputusan dan risikonya dengan singkat`

## Prompt Siap Pakai

### Memulai project baru

```text
Saya non-coder.
Saya ingin membangun [jenis aplikasi] untuk membantu [siapa]
agar mereka bisa [hasil utama].
Tolong mulai dengan /vibe-plan.
Gunakan bahasa sederhana, tanya satu hal per langkah,
dan pilih solusi paling sederhana untuk MVP.
```

### Saat planning terasa terlalu rumit

```text
Saya non-coder.
Tolong review ulang planning ini.
Tandai bagian yang terlalu rumit, tidak wajib, atau belum jelas.
Sederhanakan untuk MVP.
```

### Saat mulai coding

```text
Planning sudah saya setujui.
Tolong lanjut dengan /launch lalu /apply.
Kerjakan satu task per satu task.
Jelaskan dulu apa yang akan dibuat sebelum mulai coding.
```

### Saat ada bug

```text
/debug [jelaskan masalah]
Saya non-coder.
Tolong perbaiki tanpa penjelasan teknis yang rumit.
```

## Keyword Yang Sebaiknya Dihindari

Hindari kalimat seperti:
- `buat aplikasi lengkap`
- `langsung coding semuanya`
- `tambahkan semua fitur penting`
- `buat yang paling canggih`

Kalimat seperti itu biasanya membuat AI memperlebar scope.

## Aturan Cepat

Kalau lupa harus pakai command apa:
- belum ada plan: `/vibe-plan`
- plan sudah oke: `/launch`
- mau kerja: `/apply`
- selesai kerja: `/unify`
- bingung: `/progress`
