# START HERE

Panduan ini untuk pengguna non-coder. Jika bingung, ikuti langkah di bawah tanpa meloncat.

## Sebelum Buka AI

Siapkan jawaban singkat untuk 5 hal ini:
- Siapa pengguna utama aplikasi Anda
- Masalah apa yang ingin diselesaikan
- Apa satu hasil utama yang harus bisa dilakukan user
- Tiga fitur yang benar-benar wajib untuk MVP
- Kapan Anda ingin versi pertama siap dicoba

## Langkah Paling Aman

1. Jalankan `npx codehava-agent-kit init` di root project Anda.
2. Buka project di IDE AI Anda.
3. Ketik `/vibe-plan`.
4. Jawab pertanyaan AI satu per satu dengan bahasa biasa.
5. Review hasil `docs/README.md` lalu buka dokumen sesuai urutannya.
6. Jika sudah cocok, ketik `/launch`.
7. Setelah itu baru ketik `/apply`.
8. Setiap sesi selesai, ketik `/unify`.
9. Jika bingung lanjut apa, ketik `/progress`.

## Prompt Pertama yang Bagus

```text
Saya non-coder.
Saya ingin membangun [jenis aplikasi] untuk membantu [siapa]
agar mereka bisa [hasil utama].
Tolong mulai dengan /vibe-plan dan bantu saya jawab satu pertanyaan per langkah.
Pilih solusi paling sederhana untuk MVP.
```

## Kalau Bingung Harus Mengetik Apa

Buka [`KEYWORDS-CHEATSHEET.md`](./KEYWORDS-CHEATSHEET.md).
Di situ ada:
- urutan command yang sudah divalidasi
- keyword yang aman untuk non-coder
- prompt siap pakai yang tinggal copy-paste

## Aturan Aman

- Jangan setujui stack yang Anda tidak pahami fungsinya
- Jika AI menambahkan mobile app, payment, realtime, atau fitur kompleks lain, tanyakan apakah itu benar-benar wajib
- Potong scope sampai versi pertama bisa diuji secepat mungkin
- Jika sebuah bagian template tidak relevan, hapus saja

## File yang Paling Penting

- `START-HERE.md`: panduan manusia
- `KEYWORDS-CHEATSHEET.md`: command + prompt siap pakai
- `docs/README.md`: peta urutan dokumen
- `AGENTS.md`: aturan kerja untuk AI
- `PLANNING.md`: urutan kerja

Kalau Anda hanya ingat satu hal: jangan langsung minta AI coding banyak sebelum `PRD` dan `PLANNING` Anda sudah masuk akal.
