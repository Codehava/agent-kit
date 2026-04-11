# API/Backend — Conversation Guide

## Section 1: Purpose & Consumers
**Explore:** API ini untuk apa? Siapa yang akan consume — frontend sendiri, mobile app, third party, atau semuanya? Internal-only atau public? Apa use case utama yang paling sering dipanggil?
**Suggest:** Kalau hanya untuk frontend sendiri — tRPC atau server actions (Next.js) lebih sederhana dari REST. Kalau public atau third party → REST dengan OpenAPI spec. Kalau butuh real-time → pertimbangkan WebSocket atau SSE dari awal.
**Depth:** required

## Section 2: Core Endpoints
**Explore:** Endpoint-endpoint utama yang dibutuhkan MVP? List 5-10 yang paling penting. Mana yang paling kritis — yang kalau tidak ada, API tidak berguna?
**Suggest:** Group endpoints by resource: /users, /products, /orders. Untuk setiap endpoint: method + path + purpose + response shape. Kalau list terlalu panjang → tanda scope terlalu besar untuk MVP.
**Depth:** required

## Section 3: Auth Mechanism
**Explore:** Auth seperti apa yang dibutuhkan? JWT, API Key, OAuth 2.0, atau session-based? Apakah ada rate limiting per user/key? Perlu refresh token? Multi-tenant?
**Suggest:** API Key: paling simpel untuk internal/B2B. JWT: stateless, baik untuk mobile. OAuth 2.0: hanya kalau memang butuh third-party delegasi. Rate limiting: wajib dari awal, jangan retrofit — pakai Redis atau Upstash.
**Depth:** required

## Section 4: Data Schema
**Explore:** Tabel/collection apa yang utama? Relasi antar entitas? Field apa yang paling sering di-query? Ada soft delete requirement?
**Suggest:** Mulai minimal: tambah field lebih mudah dari hapus field. Selalu ada `createdAt`, `updatedAt`, dan `deletedAt` (soft delete). Index pada field yang sering di-filter. Hindari nested objects di PostgreSQL — normalisasi dulu.
**Depth:** required

## Section 5: Error Handling & Validation
**Explore:** Bagaimana error harus di-return? Ada standard error format? Validasi input dilakukan di layer mana — controller atau service? Bagaimana handle external API failure?
**Suggest:** Standard: `{ success: false, error: "message", code: "ERROR_CODE" }`. Validasi: Zod di entry point (controller/route handler), bukan di service. External API: retry dengan exponential backoff untuk transient errors, circuit breaker untuk persistent failures.
**Depth:** required

## Section 6: Performance & Scale
**Explore:** Berapa estimasi request per second? Ada endpoint yang berat (report generation, bulk processing)? Butuh caching? Database query yang perlu dioptimasi?
**Suggest:** MVP: jangan over-optimize. Tambahkan `take` + `skip` ke semua list endpoints dari awal. Cache dengan Redis hanya kalau ada data yang truly static atau expensive. Background jobs (BullMQ) untuk proses yang > 5 detik.
**Depth:** optional

## Section 7: Testing Strategy
**Explore:** Unit test, integration test, atau keduanya? Ada contract testing dengan consumers? Bagaimana test auth-protected endpoints? CI/CD pipeline dengan automated tests?
**Suggest:** Minimum: integration tests yang hit real database (pakai test DB, bukan mock). Setiap endpoint punya: success case + validation error case + auth error case. Gunakan `supertest` atau built-in framework test utilities.
**Depth:** required

## Section 8: Deployment
**Explore:** Deploy ke mana? Containerized dengan Docker? Butuh horizontal scaling? Ada environment variables yang perlu di-manage?
**Suggest:** Railway atau Fly.io untuk simple deployment. Docker Compose untuk local dev dari awal. Secrets di env vars SELALU — tidak pernah di kode atau git. Health check endpoint `/health` wajib untuk monitoring.
**Depth:** required
