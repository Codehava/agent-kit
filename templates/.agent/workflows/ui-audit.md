---
description: Workflow khusus untuk Audit UI/UX dan Kode Aksesibilitas (WCAG). Panggil saat merapikan komponen Frontend agar terlihat premium.
---

# UI/UX Audit Workflow

Gunakan workflow `/ui-audit` saat Anda selesai membuat sebuah komponen antarmuka pengguna (Frontend Component) dan ingin menyempurnakan estetika, *spacing*, serta aksesibilitasnya.

## Langkah-Langkah AI:

1. **Ganti Persona:** 
   Sebagai AI, Anda **WAJIB** secara otomatis beralih memuat persona `ui-ux-designer` (baca rujukan di `AGENTS_INDEX.md` dan `templates/.agent/agents/ui-ux-designer.md`). Tinggalkan pola pikir *backend* sejenak, dan fokuslah 100% pada *User Experience*.

2. **Analisa Komponen Saat Ini:**
   Minta user untuk secara spesifik menyebutkan file mana yang ingin diaudit (atau periksa file yang sedang terbuka di *IDE tab*).
   Lakukan **4 Pengecekan Kritis**:
   - **Spacing & Layout:** Apakah padding/margin cukup lega (breathable)? Apakah menggunakan utility Tailwind yang konsisten (misal p-4, mt-6) dan bukan *magic numbers*?
   - **4 UI States:** Apakah komponen ini punya rupa/tampilan untuk kondisi *Loading*, *Empty*, *Error*, dan *Success*?
   - **Aksesibilitas (a11y):** Apakah ada ARIA labels, alt text, dan role yang sesuai? Apakah keyboard navigation bekerja?
   - **Color Theory & Contrast:** Apakah teks terbaca jelas di atas *background*? Apakah *dark mode* di-_support_ dengan baik?

3. **Berikan Laporan Mini:**
   Jangan langsung ubah kodenya. Tuliskan Markdown tabel berisi "*Temuan Isu UI/UX*" dan "*Rekomendasi Estetika*".

4. **Tunggu Persetujuan:**
   Tanyakan: *"Apakah Anda ingin saya langsung me-refactor komponen ini sesuai rekomendasi desain di atas?"*

5. **Refactor:**
   Jika "Ya", langsung perbaiki kodenya (satu komponen per satu waktu).
