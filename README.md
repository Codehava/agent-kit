# Codehava Agent Kit

A powerful CLI tool to scaffold custom AI Agent templates, workflows, skills, and "Vibe Coding" memory protocols into any project. Dengan alat ini, kamu bisa menyulap AI IDE apa pun (Cursor, Claude Code, GitHub Copilot) menjadi *Software Engineer* profesional yang mematuhi standar kerja timmu 100%.

## 🌟 Fitur Unggulan (The Ultimate Vibe Coding Arsenal)

- **Workflows (Slash Commands):** Perintah bawaan seperti `/vibe-plan`, `/new-feature`, `/health-check`, dan **`/vibe-recap`** (untuk merekap dan memulihkan memori konteks obrolan yang sudah terlalu panjang).
- **Skills (Konteks Spesifik):** Ratusan injeksi trik spesifik yang memanipulasi kepribadian dan pengetahuan AI. Misalnya *Skill* `nextjs-api-route`, `vibe-prd`, `backend_security`.
- **Code Snippets (`.agent/snippets/`):** Memaksa AI untuk mencontek *template* atau kerangka kode standar proyekmu tiap kali ia diminta membuat file baru (misal: `@react-component-template.tsx`).
- **Self-Improving Memory:** Menggunakan file sakti `.antigravity/rules.md` yang secara permanen **memaksa AI** untuk selalu mencatat _error_ di file `docs/troubleshooting.md`, dan melakukan langkah kerja secara bertahap menggunakan daftar Checklist `[ ]` di `docs/task_on_hand.md`.

---

## 🚀 Cara Instalasi & Penggunaan

### 1. Inisialisasi Proyek Baru
Di dalam direktori proyek aplikasimu (terminal), jalankan perintah berikut:

```bash
npx codehava-agent-kit init
```

*CLI ini akan secara otomatis menyebarkan folder `.agent`, `.antigravity`, `docs`, `specs`, dan file `AGENTS.md` langsung ke dalam proyekmu.*

### 2. Cara Menggunakannya di AI Editor (Cursor, dll)

Setelah di-inisialisasi, instruksikan AI Anda untuk mengikuti standar operasional (*SOP*) yang telah dibuat. 
Sebagai contoh, ketikkan ini di awal *chat* pada editor kamu:

> *"Mulai bekerja. Tolong baca AGENTS.md terlebih dahulu, lalu kerjakan fitur login menggunakan /new-feature."*

AI secara ajaib akan mematuhi semua aturan kode, menyelaraskan desain dengan `docs/SRS-Template.md`, dan menggunakan *Code Snippets* lokal.

### 3. Mereset / Menyegarkan Memori AI (Context Compaction)
Jika percakapan AI di dalam proyekmu sudah terlalu panjang dan ia mulai merespons sembarangan ("halusinasi"):
1. Ketik `/recap` atau `/vibe-recap` di *chat*.
2. AI akan memindahkan seluruh isi otak sementaranya ke dalam file `docs/recap.md`.
3. Buka *Chat* yang benar-benar baru, dan katakan: *"Lanjutkan pekerjaan berdasarkan docs/recap.md"*. Memori segarnya akan kembali fokus ke target utama!

---

## 🛠 Aturan Kustomisasi (Untuk Maintainer)

Jika kamu ingin memperbarui isi standar dari Agent Kit ini untuk digunakan semua orang di timmu:

1. Edit konten *markdown* yang ada di dalam folder `templates/`.
2. Jika ada *snippet* kode yang sering dipakai di perusahaanmu, masukkan ke `templates/.agent/snippets/`.
3. Test secara lokal:
   ```bash
   npm link
   codehava-agent-kit init
   ```
4. Jika sudah oke, rilis versinya secara publik:
   ```bash
   npm publish
   ```
