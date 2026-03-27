---
name: feature-spec-writer
description: |
  Use when planning a new feature before coding, creating a feature brief,
  or writing acceptance criteria. Triggers on "plan this feature", "write a spec",
  "before we code", "acceptance criteria", "what files will change", or when
  a feature is size M or L. Do NOT use for small bug fixes or minor UI tweaks.
---

# Feature Spec Writer — Buat Spec Sebelum Coding

Gunakan skill ini untuk membuat file spec di `specs/NNN-nama-fitur.md`
sebelum memulai implementasi fitur besar (size M atau L).

## Langkah-Langkah

1. Tanya user: nama fitur, tujuan, siapa yang pakai
2. Identifikasi acceptance criteria yang testable dan konkret
3. List file yang akan diubah/dibuat
4. Identifikasi API endpoints baru atau perubahan DB
5. Catat constraint dan dependensi
6. Simpan ke `specs/NNN-nama-fitur.md`

## Template yang Dihasilkan

```markdown
# [NNN] Nama Fitur

**Status:** Draft
**Sprint:** [nomor]
**Assignee:** [nama atau "AI"]
**Estimasi:** S / M / L
**REQ refs:** REQ-XXX, REQ-XXX

## Tujuan
[1-2 kalimat: masalah yang diselesaikan]

## Acceptance Criteria (BDD Format)
> Wajib mendeskripsikan kriteria dengan format Given-When-Then.

- [ ] **Scenario 1 (Success Path):** 
  - **Given** [kondisi awal]
  - **When** [trigger aksi]
  - **Then** [hasil akhir / state UI / komponen yang dirender]
- [ ] **Scenario 2 (Error Handling):**
  - **Given** [kondisi bermasalah, misal: server timeout]
  - **When** [trigger aksi]
  - **Then** [perilaku fallback / error boundary yang muncul]

## UX / UI States
Wajib definisikan tampilan untuk 4 kondisi ini:
- **Loading State:** [Bentuk skeleton / spinner]
- **Empty State:** [Tampilan jika tak ada data]
- **Error State:** [Tampilan retry / error boundary]
- **Success State:** [Data normal yang tampil]

## File yang Akan Diubah/Dibuat
- [ ] `app/(dashboard)/[path]/page.tsx` — [deskripsi perubahan]
- [ ] `app/api/[resource]/route.ts` — [endpoint baru]
- [ ] `lib/[module]/index.ts` — [helper baru]
- [ ] `prisma/schema.prisma` — [perubahan model jika ada]

## Data Contract / API Endpoints
*Tuliskan JSON Requests/Responses secara konkrit (Mockup JSON).*

| Method | Path | Request JSON | Response JSON |
|--------|------|--------------|---------------|
| POST | /api/[x] | `{ "field": "string" }` | `200 OK`: `{ "data": {...} }` |

## Edge Cases & Mitigasi Taktis
- **Skenario Terburuk:** [Misal user spam klik]
- **Mitigasi:** [Misal disable button dan debounce API]

## Perubahan Database
[Jika ada — describe schema changes]

## Constraint
- Jangan ubah: [komponen yang sudah stabil]
- Dependensi: [fitur/task yang harus selesai dulu]
- Performa: [jika ada SLA atau limit]

## UU PDP Check
- Data pribadi yang terlibat: [list atau "tidak ada"]
- Consent diperlukan: Ya / Tidak
- Audit log diperlukan: Ya / Tidak
```

## Cara Pakai Spec Setelah Dibuat

Berikan ke Antigravity:
```
Baca specs/003-checkout.md lalu implementasikan sesuai acceptance criteria.
Mulai dengan membuat implementation plan, tunggu approval sebelum coding.
Jangan ubah file di luar daftar "File yang Akan Diubah".
```
