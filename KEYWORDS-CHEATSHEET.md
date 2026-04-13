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

---

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
| AI mulai keluar dari rencana | `/btw` |

---

## Recovery — Saat AI Melakukan Hal Yang Salah

| Situasi | Tindakan |
|---------|----------|
| AI sedang berjalan, arahnya salah | Tekan **`Esc`** |
| AI baru ubah sesuatu yang salah | Ketik `undo that` atau `batalkan perubahan terakhir` |
| AI ubah banyak file dan kacau | Ketik `/rewind` |
| AI tampak bingung atau berputar-putar | Ketik `/clear` lalu `/progress` |
| File penting terhapus | Jalankan `git stash` atau `git checkout -- [nama file]` |

> Claude Code membuat **checkpoint otomatis** sebelum setiap perubahan file. Pilih checkpoint di sidebar ↩️ untuk kembali ke titik aman.

---

## Keyword Yang Aman Dipakai

Tambahkan keyword ini di prompt Anda:
- `Saya non-coder`
- `gunakan bahasa sederhana`
- `tanya satu hal per langkah`
- `pilih solusi paling sederhana untuk MVP`
- `jangan tambah fitur yang tidak wajib`
- `jangan ubah file lain tanpa konfirmasi`
- `jelaskan keputusan dan risikonya dengan singkat`

---

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

### "Interview Me First" — biarkan AI yang bertanya dulu

```text
Sebelum membuat apapun, interview saya dulu.
Tanya satu pertanyaan per giliran tentang:
siapa penggunanya, masalah apa yang diselesaikan,
fitur apa yang wajib, dan kapan harus selesai.
Setelah saya jawab semua, baru buat planning-nya.
```

> Pola ini berguna jika kamu belum tahu harus mulai dari mana.
> AI jadi seperti konsultan yang menggali kebutuhanmu, bukan coder yang langsung eksekusi.

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

### Saat AI mulai ngelantur (/btw)

```text
/btw — kembali ke track.
Fokus kembali ke task: [nama task dari sprint plan].
Jangan ubah hal lain di luar scope itu.
```

> `/btw` = "By The Way — balik ke tujuan semula". Pakai ini saat AI mulai
> menambahkan fitur yang tidak diminta atau mengubah file yang tidak relevan.

### Saat ada bug

```text
/debug [jelaskan masalah]
Saya non-coder.
Tolong perbaiki tanpa penjelasan teknis yang rumit.
```

### Saat mau cek ulang progress

```text
/progress
Saya ingin tahu: apa yang sudah selesai, apa yang sedang dikerjakan,
dan apa task berikutnya yang harus dilakukan.
Jelaskan dalam bahasa awam.
```

---

## Keyword Yang Sebaiknya Dihindari

Hindari kalimat seperti:
- `buat aplikasi lengkap`
- `langsung coding semuanya`
- `tambahkan semua fitur penting`
- `buat yang paling canggih`

Kalimat seperti itu biasanya membuat AI memperlebar scope.

---

## Aturan Cepat

Kalau lupa harus pakai command apa:
- belum ada plan → `/vibe-plan`
- plan sudah oke → `/launch`
- mau kerja → `/apply`
- selesai kerja → `/unify`
- bingung → `/progress`
- AI ngelantur → `/btw`
- AI salah gerak → `Esc`
- AI sudah ubah yang salah → `undo that`
- situasi kacau → `/rewind`
- mulai fresh → `/clear`
