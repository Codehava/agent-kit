---
name: vibe-stitch-prompt
description: |
  Use when the user wants to generate a UI design prompt for Google Stitch
  based on the existing PRD and UI Guidelines. Triggers on "buat prompt stitch",
  "google stitch prompt", "generate desain ui", or "prompt figma/stitch".
  Requires: docs/01-PRD.md (wajib baca).
  Optional: docs/03-UI-GUIDELINES.md.
---

# Vibe Stitch Prompt Generator

Skill ini bertugas membaca dokumen PRD (`docs/01-PRD.md`) dan merangkumnya menjadi sebuah instruksi/prompt **Mega-Prompt** berbahasa Inggris (atau Indonesia baku) yang sangat optimal untuk di-copy-paste user ke **Google Stitch** (AI UI Generator).

## Langkah-Langkah AI:

1. **Baca Konteks:** Baca `docs/01-PRD.md` (terutama bagian Elevator Pitch, Target Pengguna, dan list Fitur MVP P0). Jika ada `docs/03-UI-GUIDELINES.md`, baca juga untuk mengambil referensi warna/tema.
2. **Ekstrak Data Utama:** Ambil struktur inti yang diperlukan oleh UI Generator:
   - Nama Aplikasi & Tujuan Utama
   - Vibe / Aesthetic (misal: "Modern, Minimalist, B2B SaaS, Dark Mode, High Contrast")
   - Daftar Halaman/Screen Utama (berdasarkan fitur MVP P0)
   - Komponen wajib (Tabel, Form, Dashboard, dsb)
3. **Format Prompt:** Hasilkan blok teks yang siap disalin oleh user.

## Template Output (Mega-Prompt untuk Google Stitch)

Berikan output kepada user dalam blok verbatim teks yang mudah di-copy, persis seperti ini:

```text
Act as an expert UI/UX Designer. Generate a high-fidelity, production-ready UI design system and screen layouts for my application called "[Nama Aplikasi]":

**Overview:**
[Elevator pitch dari PRD, 1-2 kalimat]

**Target Audience:**
[Ringkasan persona utama dari PRD]

**Design Theme & Vibe (Aesthetic):**
- Style: Modern, clean, professional [sesuaikan jika B2B/B2C/SaaS]
- Colors: [sebutkan primary color/brand jika ada, atau minta Stitch pilih yang harmonis]
- Typography: Highly readable sans-serif (e.g., Inter, Roboto, atau Plus Jakarta Sans)
- Radius & Spacing: [misal: Soft rounded corners, breathable padding]
- Vibe: Trustworthy, fast, intuitive, and accessible.

**Key Screens to Generate (MVP Scope):**

1. **[Nama Screen 1, misal: Main Dashboard]**
   - Layout: [Sidebar / Top-nav]
   - Must include: [List data point penting: metric cards, recent activity table, dll]
   - Actions: [Call to Action Button yang harus ada]
   - Focus: Provide the "Empty State" if no data is present, and the "Success State" with dummy data.

2. **[Nama Screen 2, misal: Transaction/Form Input]**
   - Must include: [Input fields yang relevan]
   - Focus: [Validasi visual / Clear visual hierarchy]

**Additional Constraints:**
- Ensure all screens use real-world descriptive dummy data (no "lorem ipsum").
- Ensure high contrast for accessibility (WCAG standard).
- Design for [Desktop / Mobile / Responsive] first.
- Provide a summary of all Design Tokens (Colors, Typography, Spacing hierarchy) in Markdown format so I can easily copy it to my engineering workspace.
```

## Aturan Penting Saat Menjalankan Skill:
- Pastikan variabel `[Nama Aplikasi]`, `[Nama Screen 1]`, dll **seluruhnya sudah tergantikan dengan fakta spesifik dari PRD Anda** (tidak boleh ada kurung siku `[ ... ]` yang tersisa).
- Prompt haruslah spesifik, tajam, dan siap pakai.
- Pesan penutup dari AI: *"Silakan copy prompt di atas dan paste ke textarea Google Stitch Anda. Setelah mendapatkan hasilnya, Anda bisa mengekstrak `DESIGN.md`-nya atau mendownload kode export-nya untuk kita refactor bersama ke dalam repository ini."*
