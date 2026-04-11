# Planning Quality Checklist

Quality gate untuk `/graduate` dan `/launch`.
Menentukan apakah PLANNING.md cukup kaya untuk graduation yang bersih
dan inisialisasi PAUL state tanpa tanya ulang.

---

## Universal Checks (Semua Types)

- [ ] **Type metadata** ada di header (Application, API/Backend, Campaign, Utility, Workflow, atau custom)
- [ ] **Problem statement** spesifik — menyebut masalah, audience, dan kenapa penting
- [ ] **Design decisions** terdokumentasi — minimal 1 keputusan resolved dengan rationale
- [ ] **Open questions** section ada (boleh kosong, tapi harus ada section-nya)
- [ ] **Next actions** terdefinisi — minimal 1 concrete next step
- [ ] **Skill loadout** dicatat — skill apa dari 600+ library yang relevan

---

## Type-Specific Checks

Referensi `data/{type}/config.md` untuk authority pada required vs optional sections.

- [ ] **Semua required sections** (per config.md) punya konten substantif — bukan hanya header atau placeholder
- [ ] **Optional sections** either terisi atau explicitly marked N/A
- [ ] **Depth sesuai rigor** — tight types (Utility) boleh brief; deep types (Application) butuh coverage thorough

### Quick Reference

| Type | Required Sections | Rigor |
|------|-------------------|-------|
| Application | 8 dari 10 | deep — coverage thorough |
| API/Backend | 7 dari 8 | standard — balanced |
| Campaign | 6 dari 7 | creative — measurable goal wajib |
| Utility | 6 dari 6 | tight — semua wajib, tapi brief |
| Workflow | 7 dari 8 | standard — idempotency non-negotiable |

---

## PAUL-Readiness Checks (untuk /launch saja)

Hanya required jika user mau `/launch` (graduate + init sekaligus).
Skip untuk `/graduate` saja.

- [ ] **Phase breakdown** ada dengan independently shippable milestones
- [ ] **Setiap phase** punya: apa yang dibangun + cara test + outcome yang diharapkan
- [ ] **Tech stack decisions** resolved — tidak ada critical "TBD" yang blocking
- [ ] **Detail cukup** untuk AI derive milestones, phases, dan tasks tanpa tanya ulang

---

## Assessment

| Hasil | Kriteria | Action |
|-------|----------|--------|
| **Pass** | Semua universal + semua required type-specific | Proceed dengan graduation |
| **Warn** | Missing optional sections atau thin content di beberapa area | Note gaps, tanya user: "Mau lengkapi dulu atau lanjut?" |
| **Fail** | Missing required sections atau tidak ada problem statement | Kembali ke `/vibe-plan` untuk complete ideation |

---

## Cara Pakai

Checklist ini direferensikan oleh:
- `workflows/graduate.md` — step quality_check sebelum buat app directory
- `workflows/launch.md` — diwarisi via graduate delegation

Ini bukan scorecard angka — ini qualitative assessment yang AI gunakan untuk
memutuskan apakah perlu warn user atau proceed langsung.
