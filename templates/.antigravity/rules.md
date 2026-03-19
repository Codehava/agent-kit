# Rules — Project [Nama Proyek]
# File ini selalu dimuat Antigravity setiap sesi.
# Letakkan di: .antigravity/rules.md (root project)

## Stack & import paths

- Runtime: Node.js 22 LTS, TypeScript strict mode — no `any`
- Prisma 7: import dari `@/generated/prisma`, BUKAN dari `@prisma/client`
- Next.js 16: `params`, `searchParams`, dan `headers()` selalu di-`await`
- BullMQ: gunakan konstanta dari `QUEUES` object, jangan string literal

## Next.js 16 — patterns wajib

```typescript
// params — async
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
// headers() — async
const session = await auth.api.getSession({ headers: await headers() })
// webhook
const token = (await headers()).get('x-callback-token')
```

## Coding standards

- Setiap async function wajib try/catch dengan log `[module:method]` di catch
- Setiap komponen yang fetch data wajib punya loading, empty, dan error state
- Semua input user wajib divalidasi dengan Zod sebelum masuk ke database
- File upload: hanya jpg/png/webp, maksimal 5MB
- `findMany` wajib ada `take` + `skip` — jangan query tanpa limit
- Soft delete: gunakan `deletedAt DateTime?` — jangan hard delete data penting

## Keamanan & privasi (UU PDP)

- Secrets dan API keys hanya di env vars — TIDAK PERNAH di kode
- Log tidak boleh print password, token, NIK, nomor rekening
- Data sensitif (NIK, rekening) disimpan terenkripsi dengan pgcrypto
- Firebase: hanya gunakan `firebase_messaging` — JANGAN aktifkan Analytics/Crashlytics

## Sebelum coding

- Cek komponen yang ada di `/components/ui/` sebelum buat baru
- Untuk fitur size M atau L: cek apakah ada spec di `specs/` dulu
- Satu fokus per sesi — jangan ubah hal di luar scope yang diminta
- Konfirmasi sebelum hapus atau refactor kode yang sudah ada

## Git & commit

- Format: `type(scope): deskripsi` — contoh: `feat(auth): tambah Google OAuth`
- Types: feat, fix, chore, docs, refactor, test
- Jangan push langsung ke `main` — selalu via Pull Request

## Adaptive Memory & Checkbox Task Tracking (Senjata Utama AI)

- **Checkbox Workflow**: Setiap kali user memberikan perintah untuk membuat atau memperbaiki fitur, kamu WAJIB memecahkannya menjadi langkah-langkah detail di `docs/task_on_hand.md` dengan format Checkbox (`[ ] Step 1`, `[ ] Step 2`). Kamu harus mengeksekusi instruksi tersebut SATU PER SATU secara berurutan dan mengubah statusnya menjadi `[x]` setiap kodenya selesai! Jangan pernah melompat langkah!
- **Troubleshooting Log**: Setiap menemukan error dan berhasil memperbaikinya, kamu WAJIB mencatatnya di `docs/troubleshooting.md` (Pesan Error, Penyebab, Solusi). Ini mencegah pengulangan kesalahan yang sama di sesi berikutnya.
- **Template Code**: Saat disuruh membuat komponen/file baru, SELALU periksa apakah ada referensi *snippet* di `templates/.agent/snippets/` dan teladani struktur kodenya 100%.
- Di setiap awal sesi, kamu WAJIB membaca `docs/task_on_hand.md` dan `docs/recap.md` (jika ada) untuk *loading context*.

## Context7

- Saat coding Prisma 7, Next.js 16, Better Auth, BullMQ, Socket.io:
  tambahkan `use context7` di prompt untuk mendapat docs terbaru
