---
name: bullmq-worker
description: |
  Use when creating background jobs, queues, workers, or scheduling tasks.
  Also use when connecting background job results to Socket.io realtime events
  or FCM push notifications. Triggers on "queue", "job", "worker", "background",
  "BullMQ", "async task", or "scheduled". Do NOT use for synchronous API handlers.
---

# BullMQ 5 + Socket.io — Pola Wajib Project Ini

## Queue Definitions (`lib/queue/index.ts`)

```typescript
import { Queue } from 'bullmq'
import { redis } from '@/lib/redis'

// Queue names — gunakan konstanta, jangan string literal di mana-mana
export const QUEUES = {
  EMAIL: 'email',
  PAYMENT: 'payment',
  NOTIFICATION: 'notification',
  FILE: 'file',
  REPORT: 'report',
} as const

export const emailQueue      = new Queue(QUEUES.EMAIL,        { connection: redis })
export const paymentQueue    = new Queue(QUEUES.PAYMENT,      { connection: redis })
export const notifQueue      = new Queue(QUEUES.NOTIFICATION, { connection: redis })
export const fileQueue       = new Queue(QUEUES.FILE,         { connection: redis })
```

## Enqueue Job (dari API Route / Server Action)

```typescript
import { emailQueue } from '@/lib/queue'

// Enqueue dengan retry policy
await emailQueue.add('send-welcome', {
  userId,
  email,
  name,
}, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { count: 100 },  // jaga queue bersih
  removeOnFail: { count: 50 },
})
```

## Worker dengan Socket.io Emit (`worker/index.ts`)

```typescript
import { Worker } from 'bullmq'
import { redis } from '@/lib/redis'
import { io } from '@/lib/socket'

// Pattern: job selesai → emit realtime ke user
export function setupPaymentWorker() {
  const worker = new Worker(QUEUES.PAYMENT, async (job) => {
    // Proses job
    const result = await processXenditWebhook(job.data)
    return result
  }, { connection: redis, concurrency: 5 })

  // Setelah job selesai — notify client via Socket.io
  worker.on('completed', (job, result) => {
    if (result.userId) {
      io.to(`user_${result.userId}`).emit('payment:updated', {
        orderId: result.orderId,
        status: result.status,
      })
    }
  })

  // Log errors — jangan silent fail
  worker.on('failed', (job, error) => {
    console.error(`[${QUEUES.PAYMENT}] Job ${job?.id} failed:`, error)
  })

  return worker
}
```

## Alur Lengkap: User Action → Queue → Socket → FCM

```
1. User action → POST /api/[resource]
2. API Route: enqueue job ke BullMQ
3. Return 202 Accepted segera ke client
4. Worker: proses job async
5. Worker.on('completed'): emit via Socket.io ke browser/Flutter
6. Worker: enqueue notif ke notification queue
7. Notification Worker: kirim FCM push notif
```

## Socket.io Room Convention

```typescript
// SELALU join room berdasarkan userId setelah auth
// Di client:
socket.emit('join', { userId: session.user.id })

// Di server:
io.on('connection', (socket) => {
  socket.on('join', ({ userId }) => {
    socket.join(`user_${userId}`)
  })
})

// Emit ke user spesifik:
io.to(`user_${userId}`).emit('event:name', data)
```

## Redis Client (`lib/redis/index.ts`)

```typescript
import { Redis } from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,  // required untuk BullMQ
  enableReadyCheck: false,
})
```
