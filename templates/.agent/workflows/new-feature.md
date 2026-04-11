---
description: |
  Tambahkan fitur baru ke project yang sudah berjalan.
  Untuk project yang belum ada, gunakan /vibe-plan dulu.
  Output: deskripsi fitur yang jelas + siap untuk /apply.
---

1. Tanya user: "Fitur apa yang ingin ditambahkan? Ceritakan tujuannya."

2. **Tentukan besarnya fitur (internal):**
   - **Kecil** (1 file) → langsung kerjakan, tidak perlu deskripsi panjang
   - **Sedang** (2–5 file) → buat deskripsi fitur, minta persetujuan, baru kerjakan
   - **Besar** (6+ file atau belum jelas) → sarankan pecah jadi 2 fitur terpisah:
     > "Fitur ini cukup besar. Lebih baik kita bagi: [bagian A] dulu, baru [bagian B]. Setuju?"

3. **Buat deskripsi fitur (untuk fitur Sedang dan Besar):**
   Cek apakah sudah ada deskripsi di `specs/` untuk fitur ini.
   Jika belum, buat `[nomor]-[nama-fitur].md` yang berisi:
   - Apa yang fitur ini lakukan (dari sudut pandang user)
   - Bagaimana tampilannya: kondisi normal, loading, berhasil, error
   - File mana yang tidak boleh diubah

4. Tunjukkan deskripsi ke user, minta konfirmasi:
   > "Ini rencana fiturnya. Sudah sesuai? Kalau iya, kita mulai."

5. Setelah user setuju → jalankan `/apply`.

6. Setelah `/apply` selesai → jalankan `/unify` untuk merangkum sesi.

7. Setelah unify → simpan perubahan ke git.
