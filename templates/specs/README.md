# specs/ — Feature Spec Files

Folder ini berisi spec singkat per fitur **sebelum** AI mulai coding.
Konsep dari KhazP/vibe-coding-prompt-template — "agent handoff artifacts".

## Kenapa Perlu Ini?

Antigravity agent bekerja terbaik dengan konteks yang terfokus.
Daripada langsung bilang "buat fitur checkout", tulis spec dulu di sini —
agent punya blueprint yang jelas dan tidak akan salah arah.

## Format File

Nama file: `NNN-nama-fitur.md` (contoh: `001-checkout.md`, `002-profile-edit.md`)

```markdown
# [NNN] Nama Fitur

**Status:** Draft / Ready / In Progress / Done
**Sprint:** [nomor sprint]
**Assignee:** [nama atau "AI"]
**Estimasi:** S / M / L

## Tujuan
[1-2 kalimat: kenapa fitur ini dibangun]

## Acceptance Criteria
- [ ] [kriteria 1 — testable, konkret]
- [ ] [kriteria 2]
- [ ] [kriteria 3]

## File yang Akan Diubah
- `app/(dashboard)/[path]/page.tsx`
- `lib/[module]/index.ts`
- `prisma/schema.prisma` (jika ada perubahan DB)

## API / Data yang Dibutuhkan
- `GET /api/[resource]` — [deskripsi]
- `POST /api/[resource]` — [deskripsi]

## Constraint
- Jangan ubah: [komponen/file yang tidak boleh diubah]
- Dependensi: [fitur lain yang harus selesai dulu]

## Catatan Tambahan
[hal-hal penting lainnya]
```

## Cara Pakai di Antigravity

```
Baca specs/001-checkout.md, lalu implementasikan sesuai acceptance criteria.
Jangan ubah file selain yang tercantum di "File yang Akan Diubah".
```
