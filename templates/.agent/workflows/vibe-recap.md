---
description: Rangkum percakapan saat ini agar bisa pindah ke chat baru tanpa hilang konteks
---

# Vibe Recap — Context Compaction

Gunakan workflow `/vibe-recap` atau `/recap` saat percakapan AI (context window) sudah terlalu panjang atau AI mulai kehilangan fokus.

Sebagai AI, tugasmu:
1. Buat atau perbarui file `docs/recap.md`.
2. Tulis rangkuman komprehensif dari semua hal yang kita diskusikan di sesi kerja ini.
3. Struktur wajib di dalam `recap.md`:
   - Fitur / Bug apa yang sedang dikerjakan tadi.
   - Keputusan arsitektur terakhir yang disepakati.
   - Daftar file apa saja yang sudah diubah di sesi ini.
   - Langkah selanjutnya yang tertunda (*Next Steps*).
4. Beritahu user: "Recap berhasil dibuat di `docs/recap.md`. Silakan buka obrolan baru (*New Chat*) dan perintahkan saya untuk membaca file tersebut agar kita bisa melanjutkan dengan memori yang lebih segar!"
