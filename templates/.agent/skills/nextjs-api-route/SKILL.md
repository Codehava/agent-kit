---
name: nextjs-api-route
description: |
  Use when creating or modifying Next.js App Router API routes (route.ts files),
  Server Actions, or Server Components that fetch data. Triggers on "api route",
  "route.ts", "server action", "GET/POST/PUT/DELETE handler", or "server component
  fetch". Do NOT use for client components or pages.
---

# Next.js 16 API Route — Pola Wajib Project Ini

## Template API Route dengan Auth + Zod

```typescript
// app/api/[resource]/route.ts
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'
import { z } from 'zod'
import { NextResponse } from 'next/server'

// Schema validasi input
const CreateSchema = z.object({
  name: z.string().min(1).max(255),
  // tambah field sesuai kebutuhan
})

export async function GET(req: Request) {
  try {
    // 1. Auth check
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Query dengan limit
    const data = await prisma.resource.findMany({
      where: { userId: session.user.id, deletedAt: null },
      take: 20,
      skip: 0,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('[GET /api/resource]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // 1. Auth check
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse + validasi body
    const body = await req.json()
    const parsed = CreateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
    }

    // 3. Business logic
    const result = await prisma.resource.create({
      data: { ...parsed.data, userId: session.user.id },
    })

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/resource]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

## Async Params — Next.js 16 WAJIB

```typescript
// ❌ SALAH — Next.js 14 style (error di Next.js 16)
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
}

// ✅ BENAR — Next.js 16, params adalah Promise
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
}
```

## Server Component Data Fetching

```typescript
// Untuk data yang tidak butuh interaktivitas — gunakan Server Component langsung
// Tidak perlu TanStack Query untuk ini
export default async function ProductList() {
  const products = await prisma.product.findMany({
    take: 20,
    where: { deletedAt: null },
  })

  return <div>{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
}
```

## Kapan Pakai TanStack Query vs Server Component

| Situasi | Gunakan |
|---------|---------|
| Data statis, tidak ada interaksi | Server Component |
| Data berubah berdasarkan user action | TanStack Query |
| Optimistic updates, mutations | TanStack Query |
| Realtime via Socket.io | TanStack Query + Socket.io |
| SEO critical | Server Component |

## Caching di Next.js 16

```typescript
// Next.js 16: TIDAK ada caching by default (berbeda dari Next.js 14)
// Opt-in eksplisit jika perlu cache:
import { unstable_cache } from 'next/cache'

const getCachedProducts = unstable_cache(
  async () => prisma.product.findMany({ take: 20 }),
  ['products'],
  { revalidate: 60 } // 60 detik
)
```
