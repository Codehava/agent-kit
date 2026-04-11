---
description: |
  Tutup sesi dengan merangkum apa yang sudah dikerjakan, keputusan yang dibuat, dan langkah berikutnya.
  Wajib dijalankan setelah /apply selesai agar sesi berikutnya bisa dilanjutkan dengan mulus.
  Update STATE.md dan MEMORY.md jika ada perubahan penting di sesi ini.
---

# /unify — Rangkuman Sesi

Menutup sesi dengan rapi. Dokumentasi apa yang terjadi agar sesi berikutnya bisa lanjut dari titik yang benar.

---

## Langkah 1 — Buat Ringkasan Sesi

Buat atau update file: `docs/phases/[nomor-fase]-SUMMARY.md`

Template:

```markdown
# Ringkasan Sesi [N]

**Tanggal:** [YYYY-MM-DD]
**Status:** [Selesai / Sebagian / Terhenti]

---

## Yang Direncanakan vs Yang Dikerjakan

| Pekerjaan | Rencana | Hasil | Status |
|-----------|---------|-------|--------|
| [nama task] | [apa yang mau dilakukan] | [apa yang terjadi] | ✅ Selesai |
| [nama task] | [apa yang mau dilakukan] | [apa yang terjadi] | ⚠️ Selesai, ada catatan |
| [nama task] | [apa yang mau dilakukan] | Belum dikerjakan | 🚫 Tertunda |

---

## Keputusan yang Dibuat

- [Keputusan 1]: [kenapa diputuskan begini]
- [Keputusan 2]: [kenapa diputuskan begini]

---

## Yang Belum Selesai

- [ ] [nama task] — akan dikerjakan di: [sesi berikutnya / setelah X]

---

## Catatan Teknis (untuk AI, bukan user)

- [ ] [catatan] — prioritas: rendah/sedang/tinggi

---

## File yang Diubah

- [path/file] — [apa yang berubah]

---

## Langkah Selanjutnya

**Aksi berikutnya:** [apa yang perlu dilakukan di sesi berikutnya]
**Yang harus ada dulu:** [prasyarat jika ada]
```

---

## Langkah 2 — Update STATE.md (internal)

Update `.agent/STATE.md`:

```markdown
## Posisi Sekarang
- Status: sesi selesai
- Ringkasan terakhir: [path ke SUMMARY.md]
- Fase berikutnya: [nama atau "belum ditentukan"]

## Riwayat Sesi
- [YYYY-MM-DD]: [ringkasan 1 kalimat]
```

---

## Langkah 3 — Update MEMORY.md jika ada perubahan penting (internal, silent)

Jika sesi ini membuat keputusan baru tentang:
- Teknologi yang dipakai (ganti atau tambah layanan)
- Struktur database (tambah tabel, ubah kolom)
- Tampilan (warna, font, gaya)
- Batasan baru (keamanan, performa, aturan)

→ Update `.agent/MEMORY.md` secara diam-diam.

Jika tidak ada perubahan → skip langkah ini.

---

## Langkah 4 — Laporan ke User

```
✅ Sesi selesai!

Yang sudah dikerjakan:
  ✅ [N] pekerjaan selesai
  ⚠️ [N] selesai dengan catatan
  ⏸️ [N] ditunda / menunggu keputusan

Catatan:
  - [catatan penting dalam bahasa sederhana jika ada]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sesi berikutnya: ketik /resume untuk lanjut dari titik ini.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Aturan Penting

- Wajib dijalankan setelah setiap /apply — meskipun semua task selesai
- Jika sebagian besar belum selesai, tetap buat ringkasan dengan status apa adanya
- MEMORY.md hanya diupdate jika ada perubahan nyata — jangan tambah noise
- Ringkasan ini adalah panduan untuk sesi berikutnya — tulis dengan jelas
