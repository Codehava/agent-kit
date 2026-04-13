# Codehava Agent Kit V3.0 🚀
> **Untuk siapa saja** — coder maupun non-coder — yang ingin membangun aplikasi web dan mobile dengan bantuan AI.

Ubah ide plain-text menjadi aplikasi production-ready. Menginjeksikan kemampuan coding superhuman ke Antigravity, Cursor, atau Claude Code via arsitektur **SEED + PAUL**.

---

## 🙋 Baru Pertama Kali? Mulai di Sini

🧭 **[START-HERE.md](./START-HERE.md)** — Panduan utama untuk mulai  
🗂️ **[KEYWORDS-CHEATSHEET.md](./KEYWORDS-CHEATSHEET.md)** — Command dan prompt yang aman dipakai  
🔌 **[MCP-SETUP.md](./MCP-SETUP.md)** — Cara setup plugin AI (dengan panduan API key langkah demi langkah)

---

## Apa yang Ada di Dalam Kit Ini?

### 🌱 SEED — Tanya Dulu, Coding Belakangan
Lima jenis project (Aplikasi, API/Backend, Kampanye, Alat Bantu, Workflow) dengan pertanyaan yang berbeda-beda. AI tidak akan langsung coding sebelum kebutuhan kamu jelas — ini yang membuat hasilnya tepat sasaran.

### 🔄 PAUL Loop — Siklus Kerja yang Teratur
Untuk non-coder, jalur paling aman adalah:
**Plan → Launch → Apply → Unify → Progress**

```
/vibe-plan  →  AI tanya & buat rencana kerja
/launch     →  kunci hasil planning jadi titik mulai project
/apply      →  AI coding task per task
/unify      →  AI rangkum & simpan hasil sesi ini
/progress   →  AI beri tahu langkah berikutnya
/vibe-recap →  Kompres sesi panjang → lanjut di chat baru
```

### 🛡️ Non-Programmer Shield
- AI **tidak akan dump error** ke kamu dan tanya "bagaimana fix?"
- AI **fix sendiri** secara diam-diam, baru lapor hasilnya
- AI bicara dalam **bahasa Indonesia awam** — tidak ada jargon teknis
- AI **tampilkan rencana** sebelum mengubah file apapun

### 🤖 Auto-Discovery Engine (600+ Elite Skills)
Ketik request dalam bahasa Indonesia biasa → AI otomatis temukan dan aktifkan skill yang relevan. Kamu tidak perlu hafal nama skill apapun.

### 🧠 Memory Lintas Sesi
- `.agent/MEMORY.md` — ingat warna, keputusan teknis, stack
- `.agent/STATE.md` — tahu lagi di sprint dan task nomor berapa
- `docs/handoffs/` — jika sesi terpotong, AI lanjut dari titik yang sama

### ✅ Verifikasi 4 Level
Setiap task diverifikasi: **Ada → Berisi → Terhubung → Data Mengalir** — sebelum dinyatakan selesai.

### 🔌 9 MCP Servers Siap Pakai
Context7, GitHub, Brave Search, Sequential Thinking, PostgreSQL, Playwright, Sentry, Docker, Figma — sudah dikonfigurasi, tinggal isi API key.

---

## Cara Install

```bash
npx codehava-agent-kit init
```

Ini akan membuat folder `.agent/`, `docs/`, dan `specs/` di project kamu.

Lalu salin:
- `.agent/` → root project
- `docs/` → root project
- `specs/` → root project
- `.antigravity/rules.md` → jika pakai Antigravity IDE

---

## Cara Pakai (Ringkas)

```
1. /vibe-plan     → AI tanya kebutuhanmu → buat PLANNING.md
                    Jawab dalam bahasa Indonesia biasa!

2. /launch        → setelah planning disetujui, init state project

3. /apply         → AI coding satu task per satu

4. /unify         → WAJIB setelah /apply — tutup sesi dengan benar

5. /progress      → jika bingung harus lanjut apa

6. /vibe-recap    → Jika chat makin panjang & AI mulai lambat
                    → buat ringkasan → buka chat baru → lanjutkan
```

**Contoh nyata:**
> "Saya ingin buat aplikasi manajemen laundry untuk toko kecil"
> → `/vibe-plan` deteksi tipe Aplikasi → tanya 8 pertanyaan → buat PLANNING.md
> → `/launch` kunci planning jadi titik mulai
> → `/apply` eksekusi sprint 1 → verifikasi 4 level
> → `/unify` dokumentasi yang sudah dibuat, keputusan teknis, deferred issues
> → ulangi untuk sprint 2

---

## Kenapa PAUL Lebih Baik dari Parallel Agents?

| Pendekatan | Token | Kualitas | Recovery jika error |
|-----------|-------|----------|---------------------|
| Parallel Subagents | Boros | ~70% | Butuh lock files |
| **PAUL (Single Session)** | **Efisien** | **~95%** | **HANDOFF files** |

PAUL bekerja dalam satu sesi, terurut, dengan memory yang dijaga. Tidak ada "orphaned work" atau state drift.

---

## Dokumen Referensi

| Dokumen | Isi |
|---------|-----|
| `docs/README.md` | Peta dan urutan baca dokumen |
| `START-HERE.md` | Panduan onboarding utama untuk non-coder |
| `KEYWORDS-CHEATSHEET.md` | Command dan prompt yang sudah divalidasi |
| `MCP-SETUP.md` | 🆕 Panduan API key step-by-step |
| `AGENTS.md` | Instruksi AI untuk project ini |

---

## License

MIT License — Codehava
