# AGENTS.md — Instruksi AI untuk Proyek Ini
> Letakkan file ini di **root folder project** (sejajar `package.json`).
> Dibaca otomatis oleh Antigravity, Cursor, Claude Code, dan AI IDE lainnya.
> Stack diverifikasi: Maret 2026. Detail teknis → `@docs/02-TECH-DESIGN.md`.

---

## 🎯 Identitas Proyek

> Anggap user adalah **non-coder** kecuali jelas sebaliknya.
> Jangan paksakan stack kompleks jika kebutuhan belum menuntut itu.

- **Nama Proyek:** [nama proyek]
- **Tipe:** [Web App / Mobile / Marketplace / API / Kampanye / Alat Bantu]
- **Stack:** [isi setelah planning selesai]
- **Deploy:** [isi setelah planning selesai]
- **IDE:** [Antigravity / Cursor / Claude Code / lainnya]

Detail stack, arsitektur, dan code patterns: `@docs/02-TECH-DESIGN.md`

---

## 📁 Dokumen Referensi

| Dokumen | Lokasi | Berisi |
|---------|--------|--------|
| Research | `docs/00-RESEARCH.md` | Riset pasar, kompetitor, Go/No-Go |
| PRD | `docs/01-PRD.md` | Fitur, user stories (REQ-XXX), scope MVP |
| Tech Design | `docs/02-TECH-DESIGN.md` | Stack, ERD, API contracts, code patterns |
| Sprint Plan | `docs/03-SPRINT-PLAN.md` | Sprint board, task backlog, build guide |
| UI Guidelines | `docs/04-UI-GUIDELINES.md` | Komponen shadcn, warna, Flutter design |
| Deployment | `docs/05-DEPLOYMENT.md` | Coolify, Dockerfile, CI/CD, backup |
| Dev Log | `docs/06-DEV-LOG.md` | Keputusan teknis — append-only |
| Feature Specs | `specs/NNN-nama-fitur.md` | Blueprint fitur + BDD scenarios |

---

## 🚦 Batas Tindakan — WAJIB DIPATUHI

| ✅ BOLEH langsung | ⚠️ TANYA dulu | 🚫 TIDAK PERNAH |
|---|---|---|
| Baca file apapun | Hapus atau rename file | Push ke `main` langsung |
| Buat file baru sesuai spec | Refactor kode yang ada | `git push --force` |
| Update status di sprint plan | Ubah schema database | `git reset --hard` |
| Fix bug dalam scope task | Install dependency baru | `rm -rf` apapun |
| Jalankan `lint` / `type-check` | Ubah env vars | Hard delete data user |
| Commit dengan format yang benar | Buat lebih dari 3 file sekaligus | Hardcode secrets di kode |

---

## 🧭 Mode Non-Coder (WAJIB jika user bukan programmer)

1. Tampilkan rencana sebelum ubah file — format:
   ```
   📋 Yang akan dikerjakan: [nama task]
   • Buat: [file] — [alasan awam]
   • Ubah: [file] — [apa yang berubah]
   • Tidak disentuh: [file aman]
   Ketik "Lanjut" untuk mulai atau "Stop" untuk batalkan.
   ```
2. Laporan dalam **bahasa Indonesia awam** — tidak ada jargon teknis tanpa penjelasan.
3. Jangan dump error ke user — fix sendiri, laporkan hasilnya saja.
4. Setelah tiap task: ✅ Apa yang sudah jadi | 🔗 Di mana bisa dicoba | ⏭️ Task berikutnya.
5. Jika ada hal di luar scope: catat, jangan kerjakan, tanyakan user dulu.

---

## 🎯 Protokol Kepercayaan (Confidence Protocol)

Komunikasikan ketidakpastian secara eksplisit:

- **Jika tidak yakin:** "Saya tidak 100% yakin soal ini — sebaiknya kita cek dulu di docs/coba sandbox sebelum lanjut."
- **Jika ada risiko breaking change:** Tampilkan daftar file yang akan berubah sebelum eksekusi.
- **Jika diminta sesuatu di luar specs:** "Ini sepertinya di luar scope yang disepakati. Apa kamu yakin ingin menambahkan ini sekarang?"
- **Jika menemukan ambiguitas:** Tanya satu pertanyaan spesifik — jangan asumsikan sendiri.

---

## ⚙️ Aturan Coding — 8 Aturan Inti

1. **Tanya dulu, coding belakangan** — untuk fitur M/L: cek `specs/` dulu.
2. **Satu fokus per sesi** — hanya ubah file dalam scope task aktif.
3. **Konfirmasi sebelum hapus** — tampilkan daftar yang akan dihapus, minta persetujuan.
4. **TypeScript strict** — no `any`. Import Prisma dari `@/generated/prisma`.
5. **Error handling wajib** — setiap async function punya `try/catch` + log `[module:method]`.
6. **Tiga state wajib** — setiap komponen yang fetch data harus punya: loading, empty, error.
7. **Cek komponen yang ada dulu** — sebelum buat baru, cek `/components/ui/`.
8. **Mobile-first** — semua UI web mulai dari mobile, kembangkan ke desktop.

Detail patterns (Next.js 16, Prisma 7, BullMQ, dll.): `@docs/02-TECH-DESIGN.md`

---

## 🔒 Keamanan & UU PDP

- Secrets hanya di env vars — tidak pernah di kode.
- Log tidak boleh print: password, token, NIK, nomor rekening.
- Semua input divalidasi Zod sebelum masuk DB.
- Firebase: aktifkan **hanya** `firebase_messaging`.
- Data sensitif (NIK, rekening): enkripsi dengan pgcrypto.
- User berhak hapus akun + download data pribadi — wajib ada di PRD.

---

## 🔍 Debugging — 3L5W Framework

Jika menemukan error: jangan asal fix satu file. Panggil `@systematic-debugging`:

1. **5 Whys** — tanya "Kenapa?" 5x → temukan root cause struktural.
2. **Search & Destroy** — grep seluruh codebase, fix semua instance yang sama.
3. **Mitigasi + Log** — tambah Zod/null checks + catat RCA di `docs/troubleshooting.md`.

Setelah fix → verifikasi 4-level: **EXISTS → SUBSTANTIVE → WIRED → DATA FLOWS**

---

## ⚡ Workflows

| Command | Gunakan ketika |
|---------|----------------|
| `/vibe-plan` | Mulai project baru — research → PRD → tech design → sprint plan |
| `/launch` | Planning disetujui — init state project |
| `/apply` | Mulai mengerjakan task dari plan |
| `/unify` | Tutup sesi — wajib setelah `/apply` |
| `/progress` | Bingung harus lanjut apa |
| `/new-feature` | Tambah fitur baru size M/L |
| `/vibe-recap` | Chat kepanjangan → kompres → lanjut di chat baru |
| `/debug` | Ada bug atau error |
| `/deploy` | Push ke production |

---

## 🧠 Skills — Auto-Discovery

Project ini punya **600+ skills** di `.agent/skills/`. User tidak perlu hafal nama skill.

**Algoritma auto-discovery:**
1. Extract keywords dari request → search di `.agent/skills/`.
2. Baca `SKILL.md` yang match **sebelum** menulis satu baris kode.
3. Announce: `🤖 Mengaktifkan skill @[nama-skill]...`

Skills utama yang sering relevan:

| Skill | Trigger |
|-------|---------|
| `vibe-research` | Riset pasar, validasi ide |
| `vibe-prd` | Buat PRD, scope MVP |
| `vibe-techdesign` | Pilih stack, desain arsitektur |
| `vibe-buildplan` | Sprint plan, breakdown task |
| `prisma-7-patterns` | Schema DB, migration, query |
| `nextjs-api-route` | API routes, Server Actions |
| `better-auth-patterns` | Login, session, OAuth |
| `bullmq-worker` | Background jobs, queue |
| `feature-spec-writer` | Blueprint fitur baru |
| `uu-pdp-feature-check` | Fitur yang menyentuh data pribadi |

---

## 📝 Format Prompt Efektif

```
[KONTEKS] Fitur: [nama]
[SPEC] Baca specs/NNN-nama.md jika ada
[TUGAS] Yang perlu dibuat: [deskripsi spesifik]
[CONSTRAINT] Jangan ubah: [file/komponen]
use context7
```

**Session Start Protocol:**
Baca di awal setiap sesi: `.agent/STATE.md` → `.agent/MEMORY.md` → `docs/03-SPRINT-PLAN.md`
