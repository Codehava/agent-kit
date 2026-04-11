---
name: systematic-debugging
description: "Gunakan skill ini ketika menemukan error, bug, crash, test failure, atau
  performa yang tidak diharapkan. Skill ini mencakup 3L5W root cause analysis (5 Whys +
  Search & Destroy + Global Mitigation), 4-level artifact verification, dan silent
  self-healing protocol agar user tidak terbebani error teknis. Aktifkan secara otomatis
  saat ada stack trace, TypeScript error, runtime crash, compilation failure, atau saat
  @lint-and-validate menemukan masalah. Jangan tanya user cara fix — fix sendiri dulu."
risk: low
source: internal
date_added: "2025-04-10"
---

# Systematic Debugging

> Bukan sekadar fix satu file — temukan dan eliminasi akar masalah dari seluruh codebase.
> Subagent bekerja ~70% kualitas. Gunakan skill ini dalam satu session untuk hasil terbaik.

---

## Kapan Menggunakan Skill Ini

- Ada error terminal, stack trace, atau crash
- TypeScript / ESLint melaporkan error
- Unit test atau E2E test gagal
- Komponen render salah atau data tidak muncul
- Performance drastis menurun setelah perubahan
- `@lint-and-validate` mendeteksi masalah

---

## Protokol: 3L5W (3 Legs, 5 Whys)

### LEG 1 — Root Cause via 5 Whys

**Tanya "Kenapa?" minimal 5x berturut-turut sampai ketemu akar masalah struktural.**

```
Error: Cannot read property 'id' of undefined

Kenapa 1: Kenapa 'id' undefined? → Object tidak di-return dari query
Kenapa 2: Kenapa query tidak return? → findFirst() return null jika tidak ada data
Kenapa 3: Kenapa data tidak ada? → User belum onboarded, field wajib belum diisi
Kenapa 4: Kenapa bisa sampai ke halaman ini tanpa onboarding? → Guard middleware tidak ada
Kenapa 5: Kenapa guard tidak ada? → Spec tidak mendefinisikan edge case ini

Root Cause: Missing onboarding guard → fix di middleware, bukan di component
```

**Aturan Leg 1:**
- Jangan stop di simptom — terus gali sampai structural cause
- Jika tidak bisa 5x, minimal 3x
- Catat root cause sebelum lanjut ke Leg 2

---

### LEG 2 — Search & Destroy

**Cari pattern yang sama di SELURUH codebase — jangan fix hanya satu file.**

```bash
# Contoh: jika root cause adalah missing null check
grep -r "\.id" src/ --include="*.ts" | grep -v "?.id"

# Jika root cause adalah missing await
grep -r "headers()" src/ --include="*.ts" | grep -v "await headers()"

# Jika root cause adalah missing error boundary
grep -r "fetch(" src/ --include="*.tsx" | grep -v "try {"
```

**Yang harus dicari:**
- File lain yang pakai pattern/sintaks yang sama
- Komponen serupa yang mungkin terkena masalah sama
- Import yang salah path di seluruh project
- Environment variable yang missing di tempat lain

**Output Leg 2:** Daftar semua file yang perlu diperbaiki

---

### LEG 3 — Global Mitigation + Log

**Perbaiki SEMUA temuan + buat proteksi struktural + catat RCA.**

**Buat proteksi:**
```typescript
// Null check
const userId = session?.user?.id ?? null
if (!userId) return redirect('/login')

// Zod validation
const schema = z.object({ id: z.string().min(1) })
const parsed = schema.safeParse(params)
if (!parsed.success) return notFound()

// Error boundary
try {
  const result = await fetchData()
  return result
} catch (error) {
  logger.error('[module:method]', { error: error.message })
  return null
}
```

**Catat RCA di `docs/troubleshooting.md`:**
```markdown
## [YYYY-MM-DD] — [Judul Error Singkat]

**Simptom:** [apa yang terlihat]
**Root Cause:** [hasil 5 Whys]
**Files Affected:** [daftar file]
**Fix Applied:** [ringkasan fix]
**Prevention:** [apa yang ditambahkan agar tidak terulang]
```

---

## 4-Level Artifact Verification (setelah fix)

Sebelum lapor "sudah diperbaiki" ke user, verifikasi:

| Level | Check | Cara Verify |
|-------|-------|-------------|
| **1. EXISTS** | File/function/fix sudah ada | Baca file, konfirm perubahan ada |
| **2. SUBSTANTIVE** | Logic benar, bukan stub kosong | Review konten — ada real logic? |
| **3. WIRED** | Connected ke caller yang benar | Cek import + invocation di caller |
| **4. DATA FLOWS** | Data benar-benar mengalir | Trace dari input → proses → output |

**Jangan laporkan DONE sebelum level 4 terpenuhi.**

---

## Escalation Status

| Status | Kondisi | Action |
|--------|---------|--------|
| **DONE** | Fix complete, 4-level verified | Lapor ke user dengan ringkasan |
| **DONE_WITH_CONCERNS** | Fix works tapi ada technical debt | Lapor + beri catatan recommendation |
| **NEEDS_CONTEXT** | Butuh info dari user untuk lanjut | Tanya 1 pertanyaan spesifik |
| **BLOCKED** | Tidak bisa lanjut tanpa keputusan user | Jelaskan opsi A vs B, minta pilihan |

---

## Silent Self-Healing Protocol (Non-Programmer Shield)

**DILARANG:**
- ❌ Paste stack trace mentah ke user
- ❌ Tanya "Bagaimana cara memperbaikinya?"
- ❌ Bilang "Ada error, tolong cek terminal"
- ❌ Fix parsial lalu lapor selesai

**WAJIB:**
- ✅ Telan error, analisis sendiri
- ✅ Jalankan 3L5W sampai selesai
- ✅ Fix semua temuan, bukan hanya satu file
- ✅ Baru lapor ke user setelah fix terverifikasi

**Format laporan ke user (setelah fix):**

```
✅ Error ditemukan dan diperbaiki.

Root cause: [1 kalimat jelas]
Fix: [apa yang diubah, di mana]
Files affected: [N] file
[Opsional] Catatan: [jika ada concern atau recommendation]
```

---

## Decision Framework: Pilih Pendekatan

| Situasi | Pendekatan |
|---------|-----------|
| Error jelas, 1 file | Fix langsung + verify 4-level |
| Error sistemik, multiple files | 3L5W full + Search & Destroy |
| Error intermittent / race condition | Tambahkan logging dulu, reproduce, baru fix |
| Error di library/dependency | Check versi, cek breaking changes via context7, update imports |
| TypeScript error banyak sekaligus | Fix root type dulu, biarkan cascade resolve sendiri |
| Test failure setelah refactor | Check jika test masih relevan vs implementation sudah benar |

---

## Anti-patterns yang Harus Dihindari

- ❌ **Whack-a-mole fixing** — Fix simptom tanpa cari root cause
- ❌ **Single-file tunnel vision** — Fix satu file, ignore yang lain
- ❌ **Suppress errors** — `catch(e) {}` atau `as any` untuk skip error
- ❌ **Optimistic reporting** — Lapor selesai sebelum 4-level verified
- ❌ **Over-engineering fix** — Tambah abstraksi baru untuk masalah yang butuh null check biasa

---

## Integrasi dengan Skill Lain

- Setelah fix → panggil `@lint-and-validate` untuk confirm tidak ada regresi
- Jika root cause ada di database schema → konsultasi `@database-design`
- Jika root cause ada di auth flow → konsultasi `@auth-implementation-patterns`
- Jika performa issue → panggil `@performance-profiling`
- Catat semua fix di `docs/troubleshooting.md` untuk referensi session berikutnya
