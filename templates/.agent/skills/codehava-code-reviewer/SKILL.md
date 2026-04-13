---
name: codehava-code-reviewer
description: "Review kode sebelum commit — cek bugs, security, duplikasi, dan scope creep. Panggil saat selesai coding dan ingin second opinion sebelum commit atau PR."
risk: low
source: codehava
date_added: "2026-04-13"
---

# Code Reviewer Skill

Review kode yang sudah dibuat sebelum di-commit. Fokus pada masalah nyata, bukan gaya penulisan.

## When to Use

- Setelah selesai mengerjakan sebuah task/fitur
- Sebelum membuat commit atau pull request
- Saat ingin memastikan tidak ada bug atau masalah keamanan yang terlewat
- Saat mau periksa apakah ada scope creep (perubahan yang tidak diminta)

## Trigger Phrases

- "review kode ini"
- "cek dulu sebelum commit"
- "ada bug gak di sini?"
- "second opinion"
- "@codehava-code-reviewer"

## Review Checklist (Urutan Prioritas)

### 1. Bug & Error Handling (KRITIS)
- Apakah semua async function punya `try/catch`?
- Apakah ada kemungkinan null/undefined yang tidak ditangani?
- Apakah response error sudah dikembalikan dengan benar ke user?

### 2. Security (KRITIS)
- Apakah ada secrets atau API keys yang hardcode di kode?
- Apakah input user divalidasi Zod sebelum masuk database?
- Apakah log tidak mencetak password, token, NIK, atau data sensitif?

### 3. Scope Creep
- Apakah ada file berubah yang tidak ada di task/spec?
- Apakah ada fitur tambahan yang tidak diminta?

### 4. Kualitas Dasar
- Apakah komponen punya loading, empty, dan error state?
- Apakah query database punya limit (`take` + `skip`)?
- Apakah ada duplikasi kode yang mudah dihindari?

## Output Format

```
## Review: [nama file / fitur]

### ✅ Sudah Baik
- [hal yang sudah benar]

### ⚠️ Perlu Diperbaiki
- [masalah] → [saran perbaikan singkat]

### 🚫 Harus Diperbaiki Sekarang
- [bug/security issue] → [cara fix]

### Verdict
[APPROVE / PERLU REVISI / TOLAK] — [1 kalimat alasan]
```

## Rules

- Gunakan bahasa Indonesia sederhana
- Jangan komentari gaya penulisan jika tidak memengaruhi kebenaran kode
- Jangan sarankan refactoring jika tidak diminta
- Jika tidak ada masalah: katakan dengan jelas "Kode ini siap di-commit"
