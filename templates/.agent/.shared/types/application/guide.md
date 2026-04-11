# Application — Conversation Guide

## Section 1: Problem Statement
**Explore:** Apa yang diselesaikan app ini? Untuk siapa — kamu sendiri, tim, atau publik? Kenapa membangun daripada beli solusi yang sudah ada? Apa pain point yang membuat ini layak dibangun?
**Suggest:** Jika user masih vague, coba: "Apa satu hal yang user lakukan di 5 menit pertama pakai app ini?" Jika solving masalah sendiri — itu valid, catat sebagai "dogfooding" dan lanjut.
**Depth:** required

## Section 2: Tech Stack
**Explore:** Sudah ada stack di pikiran, atau masih eksplorasi? Target deployment mana — lokal, cloud, edge? Ada constraint dari tim atau infrastruktur yang ada? Kenapa stack ini dibanding alternatif?
**Suggest:** Solo builder: Next.js + PostgreSQL (via Prisma 7) cepat untuk ship. Tim: pertimbangkan apa yang semua orang sudah tahu. Kalau mention tech yang unfamiliar → sarankan research dulu via context7 sebelum commit.
**Depth:** required

## Section 3: Data Model
**Explore:** Apa entitas utama yang ditrack app ini? Bagaimana mereka berelasi satu sama lain? Mana entitas terpenting — yang semua lainnya terhubung ke sana?
**Suggest:** Mulai dengan 3-5 entitas saja. Gambar relasi: "User punya banyak X, setiap X milik satu Y." Kalau makin kompleks → sarankan mulai dengan schema minimal dan evolve. Jangan over-design di planning.
**Depth:** required

## Section 4: Auth & Roles
**Explore:** Siapa yang bisa akses apa? Ada role berbeda (admin, user biasa, guest)? Auth via email/password, Google OAuth, atau keduanya? Ada multi-tenancy (satu instance untuk banyak organisasi)?
**Suggest:** MVP: Better Auth atau Clerk untuk speed. Role sederhana dulu (admin vs user) — jangan over-engineer RBAC di awal. Multi-tenancy: simpan `organizationId` di setiap tabel dari awal — sangat sulit ditambah belakangan.
**Depth:** required

## Section 5: UI/UX Utama
**Explore:** Halaman/view apa yang dibutuhkan? Ada design system atau freestyle? Perlu responsive mobile? Ada real-time requirements (dashboard live, notifikasi)?
**Suggest:** MVP: Tailwind + shadcn/ui untuk 80% kebutuhan. Kalau ada ide desain → sarankan @ui-ux-pro-max skill untuk implementation. Dark mode: default on — jauh lebih mudah dari awal daripada retrofit.
**Depth:** required

## Section 6: API Surface
**Explore:** Endpoint apa yang dibutuhkan MVP? Internal-only atau public API? REST, tRPC, atau GraphQL? Endpoint paling kritis — yang deliver core value?
**Suggest:** MVP: REST atau tRPC lebih cepat dibangun. Auth pattern: session-based (Better Auth) lebih simpel dari JWT untuk web app. Kalau perlu real-time: mulai dengan polling, baru upgrade ke WebSocket kalau benar-benar dibutuhkan.
**Depth:** required

## Section 7: Deployment & Infrastructure
**Explore:** App ini jalan di mana? Ada setup staging vs production? Butuh CI/CD pipeline? Database managed atau self-hosted?
**Suggest:** Solo project: Vercel (frontend) + Railway (backend + DB) = zero-config. Database: managed (Railway/Supabase) jauh lebih baik dari self-hosted untuk MVP. Docker: mulai dengan compose file sedini mungkin.
**Depth:** required

## Section 8: Keamanan & Compliance
**Explore:** Model auth-nya apa? Data sensitif apa yang disimpan? Ada compliance requirement (UU PDP, GDPR, HIPAA)? OWASP risk apa yang spesifik untuk app ini?
**Suggest:** Minimum: input validation (Zod), parameterized queries (Prisma handle ini), rate limiting, CSRF protection. Kalau handle PII: encryption at rest (pgcrypto). UU PDP Indonesia: wajib jika ada data NIK/rekening.
**Depth:** required

## Section 9: Phase Breakdown
**Explore:** Slice terkecil yang membuktikan konsep ini? Apa yang datang setelahnya? Bisa ship sesuatu yang berguna dalam 3-5 phase? Apa "moment it works" untuk setiap phase?
**Suggest:** Phase 1 = hal terkecil yang deliver value nyata. Setiap phase harus independently testable. Kalau planning lebih dari 7 phases → scope terlalu besar, pertimbangkan scope cut.
**Depth:** required

## Section 10: Skill Loadout & Tools
**Explore:** Tool ecosystem mana yang masuk akal untuk build ini? Butuh code quality scanning? UI design help? Workflow terstruktur?
**Suggest:** Baca `.agent/.shared/types/application/skill-loadout.md` untuk rekomendasi. Untuk aplikasi: @prisma-7-patterns + @nextjs-react-expert + @auth-implementation-patterns adalah trio utama.
**Depth:** optional
