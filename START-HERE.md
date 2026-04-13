# START HERE — Panduan Non-Coder

Ikuti halaman ini dulu sebelum membuka AI. Tidak perlu baca semuanya — cukup ikuti urutan.

---

## 1. Sebelum Buka AI

Siapkan jawaban singkat untuk 5 hal ini (tidak perlu formal, cukup dalam kepala):

- Siapa pengguna utama aplikasi ini?
- Masalah apa yang ingin diselesaikan?
- Satu hasil utama yang harus bisa dilakukan user?
- Tiga fitur yang benar-benar wajib untuk versi pertama?
- Kapan ingin versi pertama bisa dicoba?

---

## 2. Langkah Paling Aman

```
1. Jalankan:  npx codehava-agent-kit init
2. Buka project di IDE AI Anda
3. Ketik:     /vibe-plan
4. Jawab pertanyaan AI satu per satu — pakai bahasa biasa
5. Review docs/README.md dan setujui hasilnya
6. Ketik:     /launch
7. Ketik:     /apply  (mulai coding)
8. Setiap sesi selesai, ketik: /unify
9. Bingung? Ketik: /progress
```

---

## 3. Prompt Pertama yang Bagus

Salin ini dan ganti bagian dalam kurung:

```text
Saya non-coder.
Saya ingin membangun [jenis aplikasi] untuk membantu [siapa]
agar mereka bisa [hasil utama].
Tolong mulai dengan /vibe-plan dan bantu saya jawab satu pertanyaan per langkah.
Pilih solusi paling sederhana untuk MVP.
```

---

## 4. Memahami "Memori" AI (Context Window)

Ini hal paling penting yang perlu dipahami non-coder:

> **Bayangkan AI seperti asisten yang punya meja kerja.**
> Semakin banyak yang ada di meja, semakin lambat dia berpikir — dan bisa lupa hal yang diletakkan di awal.

| Konsep | Analogi Sederhana |
|--------|-------------------|
| Context window | Ukuran meja kerja AI |
| Token | Kata-kata yang memenuhi meja (~750 kata = 1.000 token) |
| Checkpoint | Save point otomatis — seperti di video game |
| `/vibe-recap` | Bersihkan meja, simpan yang penting, mulai fresh |
| `/clear` | Meja bersih total — mulai percakapan baru |

**Kapan AI mulai "lupa"?** Saat chat sudah sangat panjang (biasanya >1 jam atau >50 pesan). Tanda-tandanya: AI menjawab hal yang sudah dijawab, atau melakukan hal yang sudah dilarang.

**Solusi:** Ketik `/vibe-recap` → AI buat ringkasan → buka chat baru → lanjut dari ringkasan.

---

## 5. Saat AI Membuat Kesalahan

Ini normal. Semua AI sesekali salah. Ini urutan penanganannya:

### AI sedang berjalan dan arahnya salah
→ Tekan **`Esc`** untuk stop AI di tengah jalan.

### AI baru saja mengubah sesuatu yang salah
→ Ketik: **`undo that`** atau **`batalkan perubahan terakhir`**
→ Atau tekan **`Esc + Esc`** (dua kali) untuk rollback ke checkpoint.

### AI mengubah banyak file dan hasilnya kacau
→ Ketik: **`/rewind`** — AI kembali ke titik sebelum sesi ini dimulai.
→ Atau di Claude Code: klik ikon ↩️ di sidebar untuk pilih checkpoint.

### AI tampak bingung atau berputar-putar
→ Ketik: **`/clear`** — bersihkan context, mulai percakapan baru.
→ Lalu ketik `/progress` untuk orientasi ulang.

### AI menghapus file penting
→ Jangan panik. Ketik: **`git status`** lalu **`git checkout -- [nama file]`**
→ Atau: **`git stash`** untuk simpan sementara semua perubahan.

> 💡 **Ingat:** Claude Code membuat **checkpoint otomatis** sebelum setiap perubahan file. Kamu bisa selalu balik ke titik aman.

---

## 6. Aturan Aman

- Jangan setujui stack yang tidak kamu pahami fungsinya — tanya AI dulu.
- Jika AI menambahkan fitur kompleks (payment, realtime, mobile) yang tidak kamu minta, tanyakan: *"Apakah ini benar-benar wajib untuk MVP?"*
- Potong scope sampai versi pertama bisa diuji secepat mungkin.
- Jika ada bagian template yang tidak relevan, hapus saja — tidak ada yang wajib dipakai semua.

---

## 7. File yang Paling Penting

| File | Fungsi |
|------|--------|
| `START-HERE.md` | Panduan ini — untuk manusia |
| `KEYWORDS-CHEATSHEET.md` | Command + prompt siap pakai |
| `MCP-SETUP.md` | Cara setup plugin AI (step-by-step) |
| `docs/README.md` | Peta urutan dokumen |
| `AGENTS.md` | Aturan kerja untuk AI |

---

> **Satu hal yang paling penting:** Jangan minta AI langsung coding banyak sebelum `docs/01-PRD.md` dan `PLANNING.md` sudah masuk akal bagimu.
> Rencana yang sederhana lebih berharga dari stack yang terlihat canggih.
