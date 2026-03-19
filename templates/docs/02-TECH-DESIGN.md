# 02 — Tech Design Document (TDD)
> Dokumen teknis utama. AI merujuk file ini untuk setiap keputusan arsitektur.
> Update setiap kali ada keputusan teknis baru — catat di `06-DEVELOPMENT-LOG.md`.
> **Versi stack diverifikasi: Maret 2026**

---

## 1. Tech Stack Final

### Runtime
| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| Runtime | Node.js | **22 LTS (Jod)** | Active LTS s/d April 2027 — pakai di semua Dockerfile |
| Language | TypeScript | **5.x** | Strict mode wajib — no `any` |

### Frontend Web
| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| Framework | Next.js | **16.1** | App Router, Turbopack default — wajib ≥16.1 (CVE di 16.0.x) |
| React | React | **19.x** | Bundled dengan Next.js 16 |
| UI Components | shadcn/ui | Latest | Source code di-copy ke `/components/ui/`, bukan dependency |
| Styling | Tailwind CSS | **3.x** | Mobile-first |
| State | Zustand | Latest | Client-side state |
| Form | React Hook Form + Zod | Latest | Validasi client + server |
| Data Fetching (default) | Server Components | built-in Next.js | Fetch di server — zero bundle, SEO |
| Data Fetching (client) | TanStack Query | Latest | Mutations, optimistic UI, realtime sync |
| Realtime | Socket.io Client | Latest | Connect ke Socket.io server |

### Mobile App
| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| Framework | Flutter | **3.41.2** | Stable channel, Dart **3.10** |
| State | Riverpod | Latest | State management modern |
| HTTP | Dio | Latest | API calls + auth interceptors |
| Realtime | socket_io_client | Latest | Flutter Socket.io client |
| Push Notif | firebase_messaging | Latest | **HANYA package ini** — jangan tambah analytics/crashlytics |
| Local Cache | Hive | Latest | Offline data storage |

### Backend & Database
| Layer | Teknologi | Versi | Keterangan |
|-------|-----------|-------|------------|
| Database | PostgreSQL | **17** | Self-hosted Docker — VPS terpisah di production |
| ORM | Prisma | **7.x** | Rust-free — import dari `@/generated/prisma` |
| Auth | Better Auth | **1.5.x** | Email/password + Google OAuth |
| Background Jobs | BullMQ | **5.x** | Redis-backed queue |
| Realtime Server | Socket.io | Latest | WebSocket — shared Redis dengan BullMQ |
| Cache / PubSub | Redis | **7.4 LTS** | Shared BullMQ + Socket.io — Redis 8 hindari (beta) |
| Email | Resend | Latest | Transactional — free 3k/bulan |
| File Storage | NEO Object Storage | — | S3-compatible, Biznet Gio, Indonesia |
| Payment | Xendit | Latest | Split payment + disbursement |
| Push Notif | Firebase FCM | — | Hanya push notif — wajib accept Firebase DPT |

### Infrastructure
| Layer | Teknologi | Keterangan |
|-------|-----------|------------|
| VPS | Biznet Gio | Ubuntu **22.04 LTS** — Indonesia, comply UU PDP |
| Platform | Coolify | Self-hosted PaaS |
| Container | Docker + Compose | Semua service containerized |
| Proxy | Traefik (via Coolify) | Auto SSL + routing |
| CDN / DNS | Cloudflare Free | DDoS + cache — **wajib accept DPA** → Dashboard → Privacy |
| CI/CD | GitHub Actions → Coolify | Auto-deploy on push ke main |
| Monitoring | Uptime Kuma + Sentry | Uptime alert + error tracking |
| IDE | Antigravity | Skills + Workflows + MCP |

---

## ⚠️ Breaking Changes Wajib Diketahui

| Paket | Perubahan | Action |
|-------|-----------|--------|
| **Next.js 16** | `params`, `searchParams`, `headers()` sekarang async | Selalu `await params` dan `await headers()` |
| **Next.js 16** | Turbopack default bundler | Tidak perlu flag manual |
| **Next.js 16** | Tidak ada caching by default | Opt-in via `use cache` |
| **Next.js 16** | CVE di 16.0.x | Wajib pakai ≥16.1 — `npx @next/codemod@canary upgrade latest` |
| **Prisma 7** | Generator: `"prisma-client"` (bukan `"prisma-client-js"`) | Update `schema.prisma` |
| **Prisma 7** | Import dari `@/generated/prisma` | Update semua import |
| **Prisma 7** | Butuh `@prisma/adapter-pg` | Install adapter |
| **Flutter 3.41** | UIScene lifecycle default untuk iOS | Ikuti Apple UIScene migration guide |
| **Better Auth 1.5** | Semua deprecated API dihapus | Cek changelog jika upgrade dari <1.4 |

---

## 2. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT LAYER                          │
│   Next.js Web App               Flutter Mobile App          │
└───────────────┬─────────────────────────┬───────────────────┘
                │ HTTPS / WebSocket        │ HTTPS / WebSocket
                ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│           Cloudflare (DNS + DDoS + Cache) [DPA ✓]          │
└─────────────────────────┬───────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Traefik Reverse Proxy + Auto SSL               │
│                  [Coolify — VPS Biznet Gio]                 │
└──────────┬──────────────────────────────────────────────────┘
           ├─────────────────────┐
┌──────────▼────────┐   ┌────────▼────────────────┐
│ Next.js :3000     │   │ BullMQ Worker :3001      │
│ App Router        │   │ Socket.io Server         │
│ API Routes        │   │ Background Jobs          │
│ Better Auth       │   └─────────────────────────┘
└──────────┬────────┘
           └──────────────────┬──────────────────────
                              │
           ┌──────────────────┼──────────────────────┐
           ▼                  ▼                       ▼
┌────────────────┐   ┌────────────────┐   ┌──────────────────────┐
│ PostgreSQL :5432│   │  Redis :6379   │   │ NEO Object Storage   │
│ (VPS terpisah) │   │ BullMQ + Socket│   │ nos.wjv-1.neo.id     │
└────────────────┘   └────────────────┘   └──────────────────────┘
```

---

## 3. Struktur Folder

```
[project-root]/
├── AGENTS.md                      ← instruksi AI (root)
├── .antigravity/rules.md
├── .agent/
│   ├── skills/                    ← 8 skills
│   ├── workflows/                 ← 6 workflows
│   └── mcp_config.json
├── docs/
│   ├── 01-PRD.md
│   ├── 02-TECH-DESIGN.md
│   ├── 03-UI-GUIDELINES.md
│   ├── 04-BACKLOG.md
│   ├── 05-DEPLOYMENT.md
│   └── 06-DEVELOPMENT-LOG.md
├── specs/
├── apps/
│   ├── web/                       ← Next.js 16
│   └── mobile/                    ← Flutter 3.41
├── docker-compose.yml
└── README.md

apps/web/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/layout.tsx     ← protected layout
│   ├── api/
│   │   ├── auth/[...all]/route.ts ← Better Auth handler
│   │   └── payment/webhook/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                        ← shadcn (source code)
│   └── [feature]/
├── lib/
│   ├── auth/auth.ts               ← Better Auth server
│   ├── auth/auth-client.ts        ← Better Auth client
│   ├── db/index.ts                ← Prisma singleton
│   ├── payment/xendit.ts
│   ├── queue/index.ts             ← BullMQ + QUEUES konstanta
│   ├── socket/index.ts
│   ├── storage/index.ts           ← NEO Object Storage
│   └── redis/index.ts
├── prisma/schema.prisma
└── src/generated/prisma/          ← generated client (jangan edit)
```

---

## 4. Prisma 7 — Setup & Patterns

### schema.prisma
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Singleton (`lib/db/index.ts`)
```typescript
import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Konvensi Schema
```prisma
model Order {
  id        String    @id @default(cuid())
  userId    String
  status    OrderStatus @default(PENDING)
  total     Decimal   @db.Decimal(12, 2)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?              // soft delete
  user      User      @relation(fields: [userId], references: [id])
  items     OrderItem[]
  @@map("orders")
}
```

### Migration Commands
```bash
npx prisma migrate dev --name nama_migration   # development
npx prisma migrate deploy                      # production (JANGAN pakai dev)
npx prisma generate                            # setelah ubah schema
```

---

## 5. Better Auth 1.5

### Server Config (`lib/auth/auth.ts`)
```typescript
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
})
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
```

### Client (`lib/auth/auth-client.ts`)
```typescript
import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({ baseURL: process.env.NEXT_PUBLIC_APP_URL })
export const { signIn, signOut, signUp, useSession } = authClient
```

### Cek Session (Next.js 16 — wajib await headers())
```typescript
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'

// ✅ Next.js 16: headers() harus di-await
const session = await auth.api.getSession({ headers: await headers() })
if (!session) redirect('/login')
```

### Route Handler
```typescript
import { auth } from '@/lib/auth/auth'
import { toNextJsHandler } from 'better-auth/next-js'
export const { GET, POST } = toNextJsHandler(auth)
```

---

## 6. Xendit Payment (Split Payment)

### Client (`lib/payment/xendit.ts`)
```typescript
import Xendit from 'xendit-node'
export const xendit = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY! })

export async function createPayment(params: {
  orderId: string; amount: number; email: string
  description: string; subMerchantId?: string
}) {
  return xendit.Invoice.create({
    externalID: params.orderId,
    amount: params.amount,
    payerEmail: params.email,
    description: params.description,
    ...(params.subMerchantId && {
      forUserID: params.subMerchantId,
      withFeeRule: process.env.XENDIT_FEE_RULE_ID,
    }),
    successRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    failureRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`,
  })
}
```

### Webhook Handler (Next.js 16 — wajib await headers())
```typescript
import { headers } from 'next/headers'
import { paymentQueue } from '@/lib/queue'

export async function POST(req: Request) {
  // ✅ Next.js 16: await headers()
  const callbackToken = (await headers()).get('x-callback-token')
  if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }
  const payload = await req.json()
  await paymentQueue.add('process-webhook', payload, {
    attempts: 3, backoff: { type: 'exponential', delay: 1000 },
  })
  return Response.json({ received: true })   // return 200 segera ke Xendit
}
```

### Alur Split Payment
```
Buyer bayar →
  Xendit split: fee → rekening platform, sisa → sub-merchant
  Xendit kirim webhook → BullMQ worker →
    Update order status → Socket.io notify client → FCM push notif
```

---

## 7. BullMQ + Redis + Socket.io

### Queue Definitions (`lib/queue/index.ts`)
```typescript
import { Queue } from 'bullmq'
import { redis } from '@/lib/redis'

export const QUEUES = {
  EMAIL: 'email', PAYMENT: 'payment',
  NOTIFICATION: 'notification', FILE: 'file',
} as const

export const emailQueue   = new Queue(QUEUES.EMAIL,        { connection: redis })
export const paymentQueue = new Queue(QUEUES.PAYMENT,      { connection: redis })
export const notifQueue   = new Queue(QUEUES.NOTIFICATION, { connection: redis })
export const fileQueue    = new Queue(QUEUES.FILE,         { connection: redis })
```

### Redis (`lib/redis/index.ts`)
```typescript
import { Redis } from 'ioredis'
export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,  // required untuk BullMQ
  enableReadyCheck: false,
})
```

### Worker Pattern
```typescript
import { Worker } from 'bullmq'
import { io } from '@/lib/socket'

const worker = new Worker(QUEUES.PAYMENT, async (job) => {
  return await processXenditWebhook(job.data)
}, { connection: redis, concurrency: 5 })

worker.on('completed', (job, result) => {
  io.to(`user_${result.userId}`).emit('payment:updated', result)
})
worker.on('failed', (job, error) => {
  console.error(`[${QUEUES.PAYMENT}] Job ${job?.id} failed:`, error)
})
```

---

## 8. Docker Compose (Local Dev)

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: myapp_dev
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7.4-alpine
    ports: ["6379:6379"]
    volumes: [redis_data:/data]

volumes:
  postgres_data:
  redis_data:
```

---

## 9. Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://devuser:devpassword@localhost:5432/myapp_dev

# Redis
REDIS_URL=redis://localhost:6379

# Better Auth
BETTER_AUTH_SECRET=    # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Xendit
XENDIT_SECRET_KEY=xnd_development_...
XENDIT_CALLBACK_TOKEN=
XENDIT_FEE_RULE_ID=
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=xnd_public_development_...

# NEO Object Storage
NEO_ENDPOINT=https://nos.wjv-1.neo.id
NEO_ACCESS_KEY=
NEO_SECRET_KEY=
NEO_BUCKET_NAME=myapp-dev

# Resend
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@[domain].com

# Firebase FCM (server-side only)
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

---

## 10. UU PDP — Sub-Processor Eksternal

| Layanan | Peran | Data Dikirim | Aksi Wajib |
|---------|-------|-------------|------------|
| **Cloudflare** | Sub-processor (CDN) | IP address, headers | Accept DPA → Dashboard → Privacy |
| **Firebase FCM** | Sub-processor (notif) | Device token, payload | Accept DPT → Firebase Console → Project Settings |
| **Resend** | Sub-processor (email) | Email address, isi email | Cantumkan di Privacy Policy |
| **Xendit** | Processor (payment) | Data transaksi | Sudah comply (OJK-registered) |

### Aturan Firebase
```
✅ Aktifkan HANYA: firebase_messaging
❌ JANGAN: Firebase Analytics, Crashlytics, Performance, Remote Config
```

---

## 11. Coding Standards

### Naming Conventions
| Hal | Konvensi | Contoh |
|-----|----------|--------|
| File React | PascalCase | `ProductCard.tsx` |
| File utils | camelCase | `formatCurrency.ts` |
| Variabel/fungsi | camelCase | `totalPrice`, `createOrder()` |
| Konstanta | SCREAMING_SNAKE | `MAX_FILE_SIZE` |
| Prisma model | PascalCase | `model Order` |
| DB table | snake_case via `@@map` | `@@map("order_item")` |
| Flutter file | snake_case | `product_card.dart` |
| API endpoint | kebab-case | `/api/order-items` |

### Next.js 16 Patterns Wajib
```typescript
// ✅ params — async
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}

// ✅ headers() — async
const session = await auth.api.getSession({ headers: await headers() })

// ✅ webhook headers — async
const token = (await headers()).get('x-callback-token')
```

### Flutter 3.41
- UIScene lifecycle wajib untuk iOS — ikuti migration guide Apple
- Dart 3.10 dot shorthands: `.center` bukan `MainAxisAlignment.center`
