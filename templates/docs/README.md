# Dokumen Project

Folder ini berisi semua dokumen planning yang dibuat secara otomatis oleh AI selama proses `/vibe-plan`, serta dokumen teknis yang diupdate selama build.

---

## Urutan Dokumen Utama

| File | Dibuat oleh | Isi |
|------|-------------|-----|
| `00-RESEARCH.md` | `/vibe-plan` Tahap 1 | Riset pasar, analisa kompetitor, keputusan Go/No-Go |
| `01-PRD.md` | `/vibe-plan` Tahap 2 | Deskripsi produk, fitur MVP, user stories, success metrics |
| `02-TECH-DESIGN.md` | `/vibe-plan` Tahap 3 | Stack teknologi, arsitektur, DB schema, code patterns, env vars |
| `03-SPRINT-PLAN.md` | `/vibe-plan` Tahap 4 | Sprint board, task backlog, build guide, definition of done |
| `04-UI-GUIDELINES.md` | Manual / AI | Panduan desain: warna, font, komponen shadcn, Flutter theme |
| `05-DEPLOYMENT.md` | Manual / AI | Panduan deploy: Coolify, Dockerfile, CI/CD, backup, checklist |
| `06-DEV-LOG.md` | Manual / AI | Catatan keputusan teknis — append-only, jangan edit entry lama |

---

## Cara Pakai

Dokumen dibuat secara berurutan — jangan lewati tahap:

```
00-RESEARCH → 01-PRD → 02-TECH-DESIGN → 03-SPRINT-PLAN
```

Setiap dokumen butuh **persetujuan eksplisit** sebelum lanjut ke dokumen berikutnya.

---

## Alur Update Selama Build

| Kondisi | Update dokumen |
|---------|----------------|
| Ada perubahan fitur atau scope | Update `01-PRD.md` dulu, baru ubah kode |
| Ada perubahan teknologi atau arsitektur | Update `02-TECH-DESIGN.md` dan catat di `06-DEV-LOG.md` |
| Sprint baru dimulai | Update status board di `03-SPRINT-PLAN.md` |
| Ada keputusan teknis penting | Tambah entry di `06-DEV-LOG.md` (append-only) |
| Setelah `/unify` | AI update `03-SPRINT-PLAN.md` dan `.agent/STATE.md` secara otomatis |

---

## Dokumen Lanjutan (Opsional)

Folder `advanced/` berisi template untuk project skala enterprise atau tim yang butuh dokumentasi formal:

| File | Isi |
|------|-----|
| `advanced/PROJECT-CHARTER.md` | Tujuan proyek, sponsor, milestone, stakeholder |
| `advanced/BRD.md` | Business requirements, scope, proses bisnis |
| `advanced/SRS.md` | Software requirements specification lengkap |

Dokumen di `advanced/` **tidak wajib** — buat hanya jika diperlukan oleh tim atau klien.

---

## Feature Specs

Fitur ukuran M atau L harus punya spec sebelum dikerjakan:

```
specs/
└── NNN-nama-fitur.md    ← blueprint fitur: acceptance criteria, API contracts, edge cases
```

Buat dengan perintah `/new-feature` — AI akan generate spec-nya.
