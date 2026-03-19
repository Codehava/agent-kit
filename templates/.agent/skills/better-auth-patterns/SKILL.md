---
name: better-auth-patterns
description: |
  Use when implementing authentication, authorization, session management,
  login/register flows, Google OAuth, or protected routes. Triggers on
  "auth", "login", "session", "register", "OAuth", "protected route",
  "useSession", or "getSession". Do NOT use for non-auth features.
---

# Better Auth 1.5 — Pola Wajib Project Ini

## Server Config (`lib/auth/auth.ts`)

```typescript
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/db'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,  // 7 hari
    updateAge: 60 * 60 * 24,       // refresh tiap 24 jam
  },
  // Better Auth 1.5: rate limiting aktif by default
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
```

## Client (`lib/auth/auth-client.ts`)

```typescript
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export const { signIn, signOut, signUp, useSession } = authClient
```

## Route Handler (`app/api/auth/[...all]/route.ts`)

```typescript
import { auth } from '@/lib/auth/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)
```

## Cek Session di Server Component / API Route

```typescript
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'

// Di Server Component atau API Route
const session = await auth.api.getSession({ headers: await headers() })
if (!session) redirect('/login')

const userId = session.user.id
const userRole = session.user.role // 'user' | 'admin' | 'merchant'
```

## Cek Session di Client Component

```typescript
'use client'
import { useSession } from '@/lib/auth/auth-client'

export function ProfileButton() {
  const { data: session, isPending } = useSession()
  if (isPending) return <Spinner />
  if (!session) return <LoginButton />
  return <span>{session.user.name}</span>
}
```

## Protected Layout (App Router)

```typescript
// app/(dashboard)/layout.tsx
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/login')
  return <>{children}</>
}
```

## Generate Schema Better Auth ke Prisma

```bash
# Jalankan sekali untuk generate tabel auth
npx @better-auth/cli generate --adapter prisma

# Lalu migrate
npx prisma migrate dev --name add-better-auth-tables
```

## Aturan Penting

- Better Auth 1.5: semua deprecated API dihapus — tidak ada compatibility layer
- Rate limiting untuk endpoint auth aktif by default — tidak perlu custom rate limiter
- Session token disimpan sebagai HTTP-only cookie secara otomatis
- JANGAN expose `BETTER_AUTH_SECRET` ke client — hanya server-side
