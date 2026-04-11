# Auto-Discovery Routing Mechanism

> [!WARNING]
> STATIC INDEX OBSOLETE: File index statis dihapus karena mempertahankan index untuk
> 600+ Elite Web & Mobile skills secara teknis tidak mungkin dan mahal di context window.

## Instructions for AI

JANGAN mengandalkan file index. Gunakan **Auto-Discovery Engine**.

### Algoritma Auto-Discovery (Konkret)

```
1. EXTRACT keywords dari request user
   Contoh: "bikin login dengan Google" → keywords: [auth, oauth, google, login]

2. SEARCH direktori .agent/skills/ menggunakan keywords tersebut
   Prioritas pencarian:
   a. Exact match nama direktori: skills/google-oauth/ atau skills/clerk-auth/
   b. Partial match: skills/auth-*, skills/*-auth, skills/*-oauth*
   c. Semantic match: skills/better-auth-patterns/, skills/nextjs-supabase-auth/

3. PICK skill terbaik berdasarkan:
   - Relevansi langsung dengan request
   - Stack yang sedang dipakai (cek MEMORY.md)
   - Freshness (date_added lebih baru = lebih up to date)

4. READ skill SKILL.md secara silent

5. ANNOUNCE ke user:
   "🤖 Auto-Discovery: Mengaktifkan skill @[nama-skill]..."

6. APPLY expertise dari skill ke respons
```

### Contoh Keyword Mapping

| User Request | Keywords | Skill yang Ditemukan |
|---|---|---|
| "bikin sistem login" | auth, login | `auth-implementation-patterns`, `better-auth-patterns` |
| "optimasi query database" | database, query, optimize | `postgresql-optimization`, `database-optimizer` |
| "buat landing page" | landing, seo, ui | `seo-fundamentals`, `frontend-design`, `ui-ux-pro-max` |
| "setup Docker" | docker, devops | `docker-expert`, `cloud-devops` |
| "bikin unit test" | test, unit, testing | `testing-patterns`, `unit-testing-test-generate` |
| "error di React" | react, error, debug | `systematic-debugging`, `react-patterns` |

### Multiple Skills (Skill Chaining)

Untuk request multi-domain, chain beberapa skill:
```
"Bikin halaman dashboard dengan chart dan auth guard"
→ @ui-ux-pro-max + @react-patterns + @auth-implementation-patterns
```

### Failure Handling

Jika tidak ada skill yang match:
1. Coba kata kunci yang lebih generik (misal: "react" bukan "react-18-concurrent")
2. Coba sinonim (misal: "postgres" bukan "postgresql")
3. Jika benar-benar tidak ada → gunakan `@clean-code` + `@frontend-design` sebagai fallback
4. Jangan pernah coding tanpa setidaknya satu skill diaktifkan

---

## Notify User

Selalu announce sebelum respons:
```
🤖 Auto-Discovery: Mendeteksi dan mengaktifkan skill @[nama-skill]...
```

Untuk multi-skill:
```
🤖 Auto-Discovery: Mengaktifkan @[skill-1] + @[skill-2]...
```
