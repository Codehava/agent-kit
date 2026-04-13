# specs/ — Feature Spec Files

Folder ini berisi spec per fitur **sebelum** AI mulai coding.
Konsep: "blueprint dulu, coding belakangan" — AI punya konteks yang terfokus dan tidak akan salah arah.

---

## Kapan Perlu Buat Spec?

| Ukuran Fitur | Perlu Spec? |
|---|---|
| XS / S (< 3 jam, 1-2 file) | Tidak perlu — langsung bilang ke AI |
| M (3–6 jam, 3–5 file) | Ya — buat spec singkat |
| L / XL (> 6 jam, 6+ file) | Wajib — spec detail termasuk wireframe |

---

## Format File

Nama file: `NNN-nama-fitur.md`
Contoh: `001-checkout.md`, `002-profile-edit.md`

---

## Template Spec

```markdown
# [NNN] Nama Fitur

**Status:** Draft / Ready / In Progress / Done
**Sprint:** [nomor sprint]
**Assignee:** [nama atau "AI"]
**Estimasi:** S / M / L / XL
**Terkait:** [REQ-XXX dari 01-PRD.md]

---

## Tujuan

[1–2 kalimat: masalah user apa yang diselesaikan fitur ini]

---

## User Flow Fitur Ini

```mermaid
flowchart TD
    A([User di halaman X]) --> B[Klik tombol Y]
    B --> C{Kondisi Z?}
    C -- Ya --> D[Tampilkan hasil]
    C -- Tidak --> E[Tampilkan error]
    D --> F([Selesai])
```

---

## Wireframe (Text-based)

> Gambarkan layout tiap halaman/state dalam format ASCII atau deskripsi posisi.
> Untuk desain detail: tambahkan URL Figma di bagian bawah.

### State: Normal (data ada)

```
┌─────────────────────────────────────┐
│  [Header / Navbar]                  │
├─────────────────────────────────────┤
│  Judul Halaman                      │
│                                     │
│  ┌──────────┐  ┌──────────────────┐ │
│  │ [Filter] │  │ [Tombol Tambah]  │ │
│  └──────────┘  └──────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ Item 1        [Edit] [Hapus]   ││
│  ├─────────────────────────────────┤│
│  │ Item 2        [Edit] [Hapus]   ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### State: Loading

```
┌─────────────────────────────────────┐
│  [Header / Navbar]                  │
├─────────────────────────────────────┤
│  ░░░░░░░░░░░░░░  (skeleton)         │
│  ░░░░░░░░░░░░░░░░░░░░░              │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░          │
└─────────────────────────────────────┘
```

### State: Kosong (belum ada data)

```
┌─────────────────────────────────────┐
│  [Header / Navbar]                  │
├─────────────────────────────────────┤
│                                     │
│          📭                         │
│    Belum ada [item]                 │
│  Mulai dengan menambahkan yang      │
│  pertama                            │
│                                     │
│       [Tambah Item]                 │
│                                     │
└─────────────────────────────────────┘
```

### State: Error

```
┌─────────────────────────────────────┐
│  ⚠️  Gagal memuat data              │
│     [Coba Lagi]                     │
└─────────────────────────────────────┘
```

Figma: [URL jika ada — dibaca via Figma MCP]

---

## Acceptance Criteria

- [ ] [kriteria 1 — testable, konkret, bisa dicek manual]
- [ ] [kriteria 2]
- [ ] [kriteria 3 — contoh: "Saat form dikirim dengan email kosong, tampil pesan 'Email wajib diisi'"]

---

## API / Data yang Dibutuhkan

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/[resource]` | Ambil daftar, pagination wajib |
| POST | `/api/[resource]` | Tambah data baru |
| PATCH | `/api/[resource]/[id]` | Update parsial |
| DELETE | `/api/[resource]/[id]` | Soft delete |

**Request body (POST):**
```typescript
{
  field1: string   // wajib
  field2?: number  // opsional
}
```

**Response sukses:**
```typescript
{ success: true, data: { id: string, ... } }
```

**Response error:**
```typescript
{ success: false, error: "Pesan error untuk user" }
```

---

## Perubahan Database (jika ada)

```prisma
// Tabel baru atau perubahan schema
model [NamaModel] {
  id        String   @id @default(cuid())
  // ...
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  @@map("[nama_tabel]")
}
```

---

## File yang Akan Diubah

- `app/[path]/page.tsx` — halaman utama fitur
- `app/api/[resource]/route.ts` — API endpoint
- `lib/[modul]/index.ts` — business logic
- `prisma/schema.prisma` — jika ada perubahan DB

---

## Constraint

- Jangan ubah: [komponen/file yang tidak boleh disentuh]
- Dependensi: [fitur lain yang harus selesai lebih dulu]
- Performa: [target waktu load, batas ukuran data, dll]

---

## Catatan

[Hal-hal penting lainnya, edge case, atau keputusan yang perlu konfirmasi]
```

---

## Cara Pakai

**Buat spec baru:**
```
Ketik /new-feature → AI tanya nama fitur → AI generate spec ini
```

**Gunakan spec saat coding:**
```
Baca specs/001-checkout.md lalu implementasikan.
Jangan ubah file selain yang ada di "File yang Akan Diubah".
```

**Update status:**
- Saat mulai: `Status: In Progress`
- Saat selesai: `Status: Done` + centang semua Acceptance Criteria

---

## Tips Wireframe Text-based

Gunakan karakter ASCII ini untuk konsistensi:

| Elemen | Karakter |
|--------|----------|
| Box border | `┌ ─ ┐ │ └ ┘ ├ ┤ ┬ ┴ ┼` |
| Button | `[Nama Tombol]` |
| Input field | `[________________]` |
| Placeholder/skeleton | `░░░░░░░░` |
| Icon placeholder | `[🔍]` atau `[ikon]` |
| Dropdown | `[Pilih ▼]` |
| Checkbox | `☐` (belum) / `☑` (sudah) |
| Radio | `○` (belum) / `●` (dipilih) |
