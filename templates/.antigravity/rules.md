# Rules — Project [Nama Proyek]
# File ini selalu dimuat Antigravity setiap sesi.
# Letakkan di: .antigravity/rules.md (root project)
# Aturan kolaborasi lengkap → AGENTS.md

---

## Stack & Import Paths

- Runtime: Node.js 22 LTS, TypeScript strict mode — no `any`
- Prisma 7: import dari `@/generated/prisma`, BUKAN dari `@prisma/client`
- Next.js 16: `params`, `searchParams`, dan `headers()` selalu di-`await`
- BullMQ: gunakan konstanta dari `QUEUES` object, jangan string literal

```typescript
// Next.js 16 — params async
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
// headers() async
const session = await auth.api.getSession({ headers: await headers() })
```

Detail lengkap stack & code patterns: `@docs/02-TECH-DESIGN.md`

---

## Batas Tindakan

| ✅ BOLEH langsung | ⚠️ TANYA dulu | 🚫 TIDAK PERNAH |
|---|---|---|
| Baca file apapun | Hapus atau rename file | Push ke `main` langsung |
| Buat file baru sesuai spec | Refactor kode yang ada | `git push --force` |
| Update status di sprint plan | Ubah schema database | `git reset --hard` |
| Fix bug dalam scope task | Install dependency baru | `rm -rf` apapun |
| Jalankan `lint` / `type-check` | Ubah env vars | Hardcode secrets di kode |
| Commit dengan format yang benar | Buat lebih dari 3 file sekaligus | Hard delete data user |

---

## Coding Standards

- Setiap async function wajib try/catch dengan log `[module:method]`
- Setiap komponen yang fetch data wajib punya loading, empty, dan error state
- Semua input user wajib divalidasi Zod sebelum masuk ke database
- File upload: hanya jpg/png/webp, maksimal 5MB
- `findMany` wajib ada `take` + `skip` — jangan query tanpa limit
- Soft delete: gunakan `deletedAt DateTime?` — jangan hard delete data penting
- Cek komponen di `/components/ui/` sebelum buat komponen baru

---

## Keamanan & UU PDP No. 27/2022

- Secrets dan API keys hanya di env vars — TIDAK PERNAH di kode
- Log tidak boleh print: password, token, NIK, nomor rekening
- Data sensitif (NIK, rekening): enkripsi dengan pgcrypto
- Firebase: hanya aktifkan `firebase_messaging`
- User harus bisa hapus akun dan download data pribadi (wajib di PRD)

---

## Non-Programmer Mode (WAJIB)

Tampilkan rencana sebelum setiap task besar:

```
📋 Yang akan dikerjakan: [nama task]
• Buat: [file] — [alasan awam]
• Ubah: [file] — [apa yang berubah]
• Tidak disentuh: [file aman]
Ketik "Lanjut" untuk mulai atau "Stop" untuk batalkan.
```

- Laporan dalam bahasa Indonesia awam — tanpa jargon teknis
- Jangan dump error ke user — fix sendiri, laporkan hasilnya
- Setelah task: ✅ Apa yang sudah jadi | 🔗 Di mana bisa dicoba | ⏭️ Task berikutnya

---

## Git & Commit

- Format: `type(scope): deskripsi` — contoh: `feat(auth): tambah Google OAuth`
- Types: feat, fix, chore, docs, refactor, test
- Jangan push langsung ke `main` — selalu via Pull Request

---

## PAUL Loop — Session Protocol

**Session Start:** Baca → `.agent/STATE.md` → `.agent/MEMORY.md` → `docs/03-SPRINT-PLAN.md`

**Task tracking:** `docs/task_on_hand.md` — satu task per satu, format:
```
[ ] T001 — nama task
[x] T002 — nama task (selesai)
```

**Escalation status:**
- ✅ DONE — selesai, terverifikasi
- ⚠️ DONE_WITH_CONCERNS — selesai, ada catatan
- 🔍 NEEDS_CONTEXT — butuh input user
- 🚫 BLOCKED — butuh keputusan user

**Session end:** Jalankan `/unify` → buat summary planned vs actual.

---

## Troubleshooting — 3L5W

Jika error: panggil `@systematic-debugging`, jangan asal fix 1 file.

1. **5 Whys** — temukan root cause struktural
2. **Search & Destroy** — grep seluruh codebase untuk pattern sama
3. **Mitigasi + Log** — fix semua + tambah Zod/null checks + catat di `docs/troubleshooting.md`

Verifikasi setelah fix: **EXISTS → SUBSTANTIVE → WIRED → DATA FLOWS**

---

## Skill Auto-Discovery

Skills ada di `.agent/skills/`. Setiap terima perintah:
1. Extract keywords → search `.agent/skills/`
2. Baca `SKILL.md` yang match **sebelum** menulis kode
3. Announce: `🤖 Mengaktifkan skill @[nama-skill]...`

Untuk Prisma 7, Next.js 16, Better Auth, BullMQ: tambahkan `use context7` di prompt.
