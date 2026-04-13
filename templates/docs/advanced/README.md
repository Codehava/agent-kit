# Dokumen Lanjutan (Advanced)

Folder ini berisi template dokumentasi formal untuk project skala enterprise, klien korporat, atau tim yang memerlukan standar dokumentasi yang lebih lengkap.

**Tidak wajib diisi** untuk project personal atau startup yang menggunakan alur `/vibe-plan` standar.

---

## Daftar Dokumen

| File | Isi | Kapan Dibutuhkan |
|------|-----|-----------------|
| `PROJECT-CHARTER.md` | Tujuan proyek, sponsor, stakeholder, milestone | Proyek dengan sponsor/klien eksternal |
| `BRD.md` | Business requirements, scope, proses bisnis As-Is/To-Be | Tim product + bisnis terpisah |
| `SRS.md` | Software requirements specification detail | Tim besar, audit, atau kontrak formal |

---

## Cara Pakai

1. Salin file yang dibutuhkan ke folder `docs/` utama
2. Isi sesuai project
3. Referensikan dari `AGENTS.md` jika ingin AI membacanya

Urutan yang disarankan jika semua dipakai:

```
PROJECT-CHARTER → BRD → SRS → 01-PRD.md → 02-TECH-DESIGN.md → ...
```
