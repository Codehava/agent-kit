---
description: Gunakan ini saat memperbaiki bug/error untuk melacak akar masalah dan mitigasi global. Triggers on "/3l5w" atau "/fix-bug".
---

# 3L5W Debugging Workflow (Root Cause Analysis & Global Mitigation)

Ketika user melaporkan sebuah error atau kamu menemukan bug, JANGAN langsung memperbaiki satu file saja dan berhenti. Terapkan SOP "3 Legs 5 Whys" berikut:

## Leg 1: 5 Whys Analysis (Mencari Akar Masalah)
1. Tuliskan analisa **5 tingkat penyebab** di chat. Tanya "Kenapa ini terjadi?" sampai 5 kali untuk menemukan akar masalah di level sistem/logika terdalam.
2. Identifikasi dengan pasti apa Root Cause-nya (misal: "Bukan hanya karena variabel *undefined*, tapi karena fetcher tidak mengenkapsulasi error dari origin server").
3. Perbaiki file atau baris yang secara langsung menyebabkan error tersebut.

## Leg 2: Search & Destroy (Menyapu Codebase)
4. Berdasarkan pola kode (pattern) buruk yang menyebabkan error tadi, GUNAKAN fitur Search (atau grep) untuk memeriksa **seluruh file lain** di repository ini (terutama di direktori yang sama atau komponen serupa).
5. Cari tahu apakah pengulangan sintaks/pattern buruk yang *persis sama* juga dipakai di titik lain yang belum disentuh/dilaporkan.
6. Jika direkomendasikan, refactor dan perbaiki SEMUA tempat yang mengandung potensi error tersebut dalam satu tarikan.

## Leg 3: Guardrails & Documentation (Mitigasi Masa Depan)
7. Tambahkan proteksi arsitektural. (Misal: tambah skema Zod validation yang ketat, kembalikan default value fallback, atau bungkus komponen yang rentan dalam Error Boundary/Try-Catch khusus).
8. **WAJIB:** Catat hasil temuan ini di `docs/troubleshooting.md` dengan format:
   - **[Error]:** Pesan error atau gejala awal
   - **[Akar Masalah (5 Whys)]:** Ringkasan dari analisa Leg 1
   - **[Mitigasi Global]:** Daftar tempat lain yang juga diperbaiki dan *guardrails* yang dipasang agar error serupa Mustahil terulang.

*Reminder: Pastikan sebelum mengubah banyak file di Leg 2, kamu meminta persetujuan ("Approve") dari user mengenai list file tambahan yang akan direfactor.*
