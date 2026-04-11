# Rules — Project [Nama Proyek]
# File ini selalu dimuat Antigravity setiap sesi.
# Letakkan di: .antigravity/rules.md (root project)

## Stack & import paths

- Runtime: Node.js 22 LTS, TypeScript strict mode — no `any`
- Prisma 7: import dari `@/generated/prisma`, BUKAN dari `@prisma/client`
  (Prisma 7 generate ke `@/generated/prisma` karena custom output path di schema.prisma)
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

## Keamanan & privasi (UU PDP No. 27/2022)

UU PDP adalah Undang-Undang Perlindungan Data Pribadi Indonesia — wajib dipatuhi:
- Secrets dan API keys hanya di env vars — TIDAK PERNAH di kode
- Log tidak boleh print password, token, NIK (Nomor Induk Kependudukan), nomor rekening
- Data sensitif (NIK, rekening bank) disimpan terenkripsi dengan pgcrypto
- User harus bisa hapus akun dan download data pribadi mereka (REQ wajib di PRD)
- Firebase: hanya gunakan `firebase_messaging` — JANGAN aktifkan Analytics/Crashlytics

## Sebelum coding (Human-in-the-Loop)

- **WAJIB Validasi:** JANGAN langsung menulis file panjang secara agresif. Buat Implementation Plan singkat di chat, MINTA USER mengetik "Lanjut/Approve" sebelum edit/buat file.
- Cek komponen di `/components/ui/` sebelum buat baru
- Untuk fitur size M atau L: cek apakah ada spec di `specs/` dulu
- Satu fokus per sesi — jangan ubah hal di luar scope yang diminta
- Konfirmasi sebelum hapus atau refactor kode yang sudah ada

## Git & commit

- Format: `type(scope): deskripsi` — contoh: `feat(auth): tambah Google OAuth`
- Types: feat, fix, chore, docs, refactor, test
- Jangan push langsung ke `main` — selalu via Pull Request

## PAUL Loop — Execution Protocol (V3.0)

Gantikan Checkbox Workflow lama dengan PAUL loop:

```
/apply  → Execute/Qualify per task (ada 4-level artifact check)
/unify  → Mandatory setelah /apply — buat SUMMARY.md planned vs actual
```

**Task Tracking:** Pecah task ke `docs/task_on_hand.md` dengan format:
```
[ ] T001 — nama task
[ ] T002 — nama task
```
Eksekusi SATU PER SATU secara berurutan. Update ke `[x]` setelah selesai.

**Escalation Status (gantikan binary ✓/✗):**
- ✅ DONE — selesai, terverifikasi
- ⚠️ DONE_WITH_CONCERNS — selesai, ada catatan
- 🔍 NEEDS_CONTEXT — butuh input user
- 🚫 BLOCKED — butuh keputusan user

**Session Start Protocol:**
Di awal setiap sesi, baca:
1. `.agent/STATE.md` — current loop position
2. `.agent/MEMORY.md` — tech decisions & constraints
3. `docs/task_on_hand.md` — task yang sedang berjalan
4. `docs/recap.md` atau `docs/phases/[N]-SUMMARY.md` — context session terakhir

**Session End (HANDOFF):**
Jika sesi harus ditutup sebelum /unify selesai, buat HANDOFF file:
- Path: `docs/handoffs/HANDOFF-[YYYY-MM-DD].md`
- Gunakan template dari `.agent/.shared/HANDOFF-template.md`

## Troubleshooting — 3L5W Framework (3 Legs, 5 Whys)

Jika menemukan ERROR, JANGAN asal fix 1 file lalu lapor selesai.
Panggil `@systematic-debugging` dan terapkan:

1. **Leg 1 — 5 Whys:** Tanya "Kenapa?" 5x untuk temukan root cause struktural
2. **Leg 2 — Search & Destroy:** Grep seluruh codebase untuk pattern yang sama
3. **Leg 3 — Global Mitigation + Log:** Fix semua temuan + tambah proteksi (Zod, null checks) + catat RCA di `docs/troubleshooting.md`

Setelah fix → verifikasi 4-level: EXISTS → SUBSTANTIVE → WIRED → DATA FLOWS

## Template Code

Saat membuat komponen/file baru, periksa referensi di `templates/.agent/snippets/`.

## Context7

Saat coding Prisma 7, Next.js 16, Better Auth, BullMQ, Socket.io:
tambahkan `use context7` di prompt untuk mendapat docs terbaru.

## 🧠 Skill Auto-Discovery & The Non-Programmer Shield (WAJIB DIBACA AI)

Project ini dibekali **600+ Elite Skills** di `.agent/skills/`. User TIDAK PERLU menghafal
skill names. User adalah **Kreator Non-Programmer** yang melakukan *Vibe Coding*.

### 1. Auto-Discovery Engine (Concrete Algorithm)

Setiap kali mendapat perintah:
1. Extract keywords dari request (misal: "bikin login Google" → `auth`, `oauth`, `google`)
2. Search direktori `.agent/skills/` dengan keywords tersebut
   - Exact match dulu: `skills/google-oauth/`, `skills/clerk-auth/`
   - Lalu partial: `skills/auth-*`, `skills/*-auth`
3. Baca `SKILL.md` di direktori yang match — SEBELUM menulis satu baris kode
4. Announce: `🤖 Auto-Discovery: Mengaktifkan skill @[nama-skill]...`

JANGAN mencari `SKILLS_INDEX.md` — file itu adalah routing mechanism, bukan list statis.

### 2. The Non-Programmer Shield

- **NO DUMPING ERRORS:** DILARANG paste stack trace ke user dan tanya "Bagaimana cara fix?"
- **SILENT SELF-HEALING:** Panggil `@systematic-debugging`, fix sendiri, baru lapor hasilnya
- **VIBE FIRST:** Berikan user localhost preview atau hasil yang memukau — bukan config errors
