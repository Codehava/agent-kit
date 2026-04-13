# Dokumen Project

Folder ini berisi semua dokumen planning yang dibuat secara otomatis oleh AI selama proses `/vibe-plan`.

---

## Urutan Dokumen

| File | Dibuat oleh | Isi |
|------|-------------|-----|
| `00-research.md` | `/vibe-plan` Tahap 1 | Riset pasar, analisa kompetitor, keputusan Go/No-Go |
| `01-prd.md` | `/vibe-plan` Tahap 2 | Deskripsi produk, fitur, alur pengguna, syarat keberhasilan |
| `02-tech-design.md` | `/vibe-plan` Tahap 3 | Stack teknologi, database, API, keamanan, estimasi biaya |
| `03-sprint-plan.md` | `/vibe-plan` Tahap 4 | Rencana sprint, daftar pekerjaan, panduan build |
| `04-ui-guidelines.md` | Manual / AI | Panduan desain: warna, font, komponen UI |
| `05-deployment.md` | Manual / AI | Panduan deploy: setup server, CI/CD, checklist |
| `06-dev-log.md` | Manual / AI | Catatan development: perubahan, keputusan, masalah |

---

## Cara Pakai

Dokumen dibuat secara berurutan — jangan lewati tahap:

```
00-research.md → 01-prd.md → 02-tech-design.md → 03-sprint-plan.md
```

Setiap dokumen butuh persetujuan sebelum lanjut ke dokumen berikutnya.

---

## Catatan

- Jika ada perubahan fitur, update `01-prd.md` dulu sebelum ubah kode
- Jika ada perubahan teknologi, update `02-tech-design.md`
- `03-sprint-plan.md` diperbarui setiap akhir sprint
