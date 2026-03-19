---
name: prisma-7-patterns
description: |
  Use when writing ANY Prisma database code, creating models, running queries,
  setting up the Prisma client, or running migrations. Triggers on "prisma",
  "database query", "db.", "schema.prisma", or "migrate". Do NOT use for
  raw SQL unrelated to Prisma.
---

# Prisma 7 — Pola Wajib Project Ini

## Breaking Changes dari Prisma 6 (CRITICAL)

```typescript
// ❌ SALAH — Prisma 6 style, akan error di project ini
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ✅ BENAR — Prisma 7 style
import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
```

```prisma
// ❌ SALAH — generator lama
generator client {
  provider = "prisma-client-js"
}

// ✅ BENAR — Prisma 7
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

## Singleton Client (`lib/db/index.ts`)

```typescript
import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Aturan Query Wajib

```typescript
// SELALU ada limit — jangan findMany tanpa take
const users = await prisma.user.findMany({ take: 20, skip: 0 })

// SELALU gunakan transaction untuk operasi multi-tabel
await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ data: orderData })
  await tx.orderItem.createMany({ data: items.map(i => ({ ...i, orderId: order.id })) })
  return order
})

// SELALU error handling
try {
  const data = await prisma.user.findMany({ take: 20 })
} catch (error) {
  console.error('[user:findMany]', error)
  throw error
}
```

## Konvensi Schema

- Nama model: `PascalCase` (model User, model Order)
- Nama tabel: `snake_case` via `@@map("order_item")`
- Semua tabel wajib: `createdAt DateTime @default(now())` + `updatedAt DateTime @updatedAt`
- Soft delete: `deletedAt DateTime?` — jangan hard delete data penting
- ID: `@id @default(cuid())`

## Migration Commands

```bash
# Development (local) — reset + seed
npx prisma migrate dev --name nama_migration

# Production — apply only, JANGAN pakai migrate dev
npx prisma migrate deploy

# Setelah ubah schema — regenerate client
npx prisma generate
```
