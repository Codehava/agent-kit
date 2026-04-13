# 06 — Development Log
> File ini **append-only** — JANGAN edit entry lama, hanya tambah di bawah.
>
> 🤖 **AI Reading Guide:** Baca bagian terbaru untuk memahami keputusan teknis yang sudah dibuat. Jangan ulangi pendekatan yang sudah dicoba dan gagal. Setelah setiap keputusan penting, tambah entry baru di bagian bawah dengan format yang sudah ada.

---

## Cara Menambah Entry

```
## YYYY-MM-DD

### [KEPUTUSAN] Judul singkat
**Konteks:** Apa situasinya?
**Keputusan:** Apa yang dipilih?
**Alasan:** Kenapa ini dipilih vs alternatif lain?
**Dampak:** Apa konsekuensinya?
```

**Kategori:** `[KEPUTUSAN]` `[PERUBAHAN]` `[PROBLEM]` `[RISET]` `[REGULASI]` `[DEPLOY]`

---

## Maret 2026

### [KEPUTUSAN] Stack teknologi final
**Konteks:** Memilih stack untuk aplikasi multi-platform (Web + Mobile + Marketplace).
**Keputusan:** Next.js 16.1 + Flutter 3.41.2 + PostgreSQL 17 + Prisma 7 + Better Auth 1.5 + Coolify di Biznet Gio VPS.
**Alasan:** Next.js 16 App Router terbaik untuk SSR/SSG. Flutter untuk single codebase Android+iOS. Biznet Gio untuk data residency Indonesia. Coolify untuk self-hosted PaaS tanpa vendor lock-in.
**Dampak:** Semua developer wajib familiar dengan App Router, async params, dan async headers() di Next.js 16.

### [KEPUTUSAN] Data fetching: Server Components default + TanStack Query client
**Konteks:** Memilih strategi data fetching untuk Next.js 16.
**Keputusan:** Server Components (default, sebagian besar data) + TanStack Query (client mutations/optimistic UI/realtime).
**Alasan:** Server Components = zero bundle, SEO, langsung query Prisma. TanStack Query (12.3M weekly downloads) lebih powerful dari SWR.
**Dampak:** Default fetch di server — TanStack Query hanya untuk client interaktif.

### [KEPUTUSAN] Arsitektur: Modular Monolith
**Konteks:** Memilih arsitektur untuk tim 2–3 orang.
**Keputusan:** Modular Monolith — 1 Next.js app + 1 BullMQ Worker container.
**Alasan:** Di bawah 10 developer monolith selalu lebih produktif. Expert consensus 2025: microservices di tahap ini = "trading a cluttered closet for a burning warehouse".
**Dampak:** Kode per domain (auth/, payment/, orders/). Extract microservice hanya jika ada bottleneck teridentifikasi.

### [KEPUTUSAN] CDN: Cloudflare Free + NEO Object Storage
**Konteks:** Strategi CDN dan file storage.
**Keputusan:** Cloudflare Free (DNS/DDoS/proxy) + NEO Object Storage Biznet Gio.
**Alasan:** Cloudflare + VPS Indonesia cukup untuk user lokal. NEO sudah di stack, data di Indonesia (comply UU PDP). Catatan: November 2025 Kominfo ancam blokir Cloudflare — Bunny.net bisa jadi backup.
**Dampak:** Wajib accept Cloudflare DPA. NEO bucket = private, akses via presigned URL.

### [KEPUTUSAN] Push Notifications: Firebase FCM only
**Konteks:** Provider push notif untuk Flutter.
**Keputusan:** Firebase FCM — hanya `firebase_messaging`.
**Alasan:** Gratis, unlimited, official Google SDK Flutter. Android dari Play Store wajib FCM. OneSignal tetap pakai FCM di balik layar.
**Dampak:** JANGAN aktifkan Firebase Analytics/Crashlytics/Performance — pakai Sentry. Accept Firebase Data Processing Terms di Console.

### [KEPUTUSAN] Payment Gateway: Xendit
**Konteks:** Perlu split payment native untuk marketplace.
**Keputusan:** Xendit.
**Alasan:** Satu-satunya gateway Indonesia dengan native split payment API. Terdaftar OJK. Fee: VA Rp 4.000, QRIS 0.7%, CC 2.9%+Rp2.000.
**Dampak:** Platform tidak pernah tampung dana. Hanya install di app yang ada transaksi keuangan.

### [REGULASI] UU PDP — Cloudflare DPA + Firebase DPT
**Konteks:** UU PDP No. 27/2022 berlaku efektif Oktober 2024.
**Keputusan:** Accept Cloudflare DPA + Firebase Data Processing Terms.
**Alasan:** UU PDP tidak wajibkan semua data di Indonesia — yang wajib adalah mekanisme transfer sah. DPA/DPT memenuhi syarat. PostgreSQL tetap di Biznet Gio.
**Dampak:** Privacy Policy wajib cantumkan Cloudflare, Firebase, Resend sebagai sub-processor. Data breach: lapor Komdigi + user dalam 72 jam.

### [KEPUTUSAN] Antigravity: Rules + 8 Skills + 6 Workflows + MCP
**Konteks:** Standarisasi cara kerja AI agent.
**Keputusan:** Rules + 8 Skills + 6 Workflows + MCP servers (Context7, GitHub, PostgreSQL, Playwright, Sentry, Docker).
**Alasan:** Rules = selalu aktif. Skills = pengetahuan stack on-demand. Workflows = automation. Context7 kritis untuk Prisma 7 + Next.js 16 yang sering breaking change.
**Dampak:** Developer baru langsung dapat config yang sama. Wajib `use context7` saat coding Prisma/Next.js.

### [PERUBAHAN] Next.js 16: `headers()` harus di-await
**Konteks:** Setelah setup ditemukan Next.js 16 membuat `headers()` juga async.
**Perubahan:** Semua `headers()` harus `await` — termasuk di Better Auth `getSession()` dan Xendit webhook.
**Kenapa:** Breaking change Next.js 16.
**Dampak:** Pattern baru: `await auth.api.getSession({ headers: await headers() })` dan `(await headers()).get('x-callback-token')`. Ditambahkan ke rules dan semua code examples.
