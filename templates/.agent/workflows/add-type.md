---
description: |
  Buat custom project type baru untuk /vibe-plan.
  Gunakan saat 5 default types (Application, API/Backend, Campaign, Utility, Workflow)
  tidak cocok dengan kategori project kamu, atau ada pola project berulang yang
  butuh guided conversation sendiri. Output: 3 file di .agent/.shared/types/{type}/
---

# /add-type — Create Custom Project Type

Extend /vibe-plan dengan project type baru yang sepenuhnya customizable.

---

## Langkah 1 — Nama Type

```
Berikan nama untuk project type baru kamu:
- Format: lowercase, hyphen untuk spasi
- Contoh: "chrome-extension", "microservice", "mobile-game", "saas-landing"
- Singular (bukan plural)
```

Cek apakah type sudah ada di `.agent/.shared/types/`:
- Jika sudah ada → "Type '[nama]' sudah ada. Mau edit yang existing atau buat nama baru?"
- Jika belum ada → lanjut

---

## Langkah 2 — Definisikan Sections

```
List topik percakapan untuk type ini, dalam urutan prioritas:

Contoh untuk "chrome-extension":
1. Problem & Target User
2. Extension Permissions
3. Content Script vs Background Worker
4. Storage Strategy (chrome.storage vs IndexedDB)
5. Distribution (personal/team/Chrome Web Store)
6. Done Criteria & Test Cases

Rigor level:
  tight    — Fast-moving, tahan scope creep (seperti Utility)
  standard — Balanced exploration (seperti Workflow)
  deep     — Thorough, architecture-focused (seperti Application)
  creative — Generative, loose approach (seperti Campaign)
```

---

## Langkah 3 — Generate 3 Files

Buat di `.agent/.shared/types/[nama-type]/`:

### File 1: guide.md

```markdown
# [Type Name] — Conversation Guide

## Section 1: [Nama Section]
**Explore:** [Pertanyaan-pertanyaan yang perlu dijawab untuk section ini]
**Suggest:** [Rekomendasi proaktif jika user stuck — "For X, biasanya Y karena..."]
**Depth:** required/optional

## Section 2: [Nama Section]
**Explore:** [...]
**Suggest:** [...]
**Depth:** required/optional

[... ulangi untuk semua sections ...]
```

### File 2: config.md

```markdown
# [Type Name] — Configuration

| Setting | Value |
|---------|-------|
| Rigor | [tight/standard/deep/creative] |
| Demeanor | "[Deskripsi cara AI coaching untuk type ini]" |
| Sections | [N] |

## Required Sections
- [Section 1]
- [Section 2]
...

## Optional Sections
- [Section N]
```

### File 3: skill-loadout.md

```markdown
# [Type Name] — Skill Loadout

## Recommended Skills from 600+ Library

| Skill | Priority | Why |
|-------|----------|-----|
| [skill-name] | required | [alasan] |
| [skill-name] | recommended | [alasan] |
| [skill-name] | optional | [alasan] |
```

---

## Langkah 4 — Konfirmasi

```
✅ Custom type '[nama]' siap digunakan!

Files dibuat:
  .agent/.shared/types/[nama]/guide.md
  .agent/.shared/types/[nama]/config.md
  .agent/.shared/types/[nama]/skill-loadout.md

Type baru langsung tersedia tanpa perlu modifikasi file lain.

Test sekarang: /vibe-plan
→ Saat ditanya project type, ketik '[nama]'
```

---

## Aturan

- Type baru tidak menimpa type default (composable design)
- Rigor **tight** = aktif resist expansion — gunakan untuk single-purpose types
- Rigor **deep** = butuh coverage luas sebelum graduate — untuk complex projects
- Sections optional boleh di-skip jika user sudah punya jawabannya
