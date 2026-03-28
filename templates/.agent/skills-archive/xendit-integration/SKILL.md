---
name: xendit-integration
description: |
  Use when working with Xendit payment integration: creating payment links,
  handling webhooks, implementing split payment, or managing disbursements.
  Triggers on "xendit", "payment", "invoice", "webhook", "split payment",
  "disbursement", or "VA/QRIS/e-wallet". Do NOT use for non-payment features.
---

# Xendit Integration — Pola Wajib Project Ini

## Client Setup (`lib/payment/xendit.ts`)

```typescript
import Xendit from 'xendit-node'
export const xendit = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY! })
```

## Buat Payment Link dengan Split

```typescript
export async function createPayment(params: {
  orderId: string
  amount: number
  email: string
  description: string
  subMerchantId?: string
}) {
  return xendit.Invoice.create({
    externalID: params.orderId,
    amount: params.amount,
    payerEmail: params.email,
    description: params.description,
    // Split payment — hanya jika subMerchantId ada
    ...(params.subMerchantId && {
      forUserID: params.subMerchantId,
      withFeeRule: process.env.XENDIT_FEE_RULE_ID,
    }),
    successRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    failureRedirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`,
  })
}
```

## Webhook Handler (`app/api/payment/webhook/route.ts`)

```typescript
import { headers } from 'next/headers'
import { paymentQueue } from '@/lib/queue'

export async function POST(req: Request) {
  // STEP 1: Verifikasi callback token — WAJIB, jangan skip
  const callbackToken = (await headers()).get('x-callback-token')
  if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const payload = await req.json()

  // STEP 2: Enqueue ke BullMQ — JANGAN proses langsung (bisa timeout 30s)
  await paymentQueue.add('process-webhook', payload, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
  })

  // STEP 3: Return 200 segera ke Xendit (mereka retry jika tidak dapat 200)
  return Response.json({ received: true })
}
```

## Status Payment

```typescript
// Status standar Xendit yang harus ditangani:
type XenditStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED'

// Di database, simpan:
// - xendit_id (Invoice ID dari Xendit)
// - xendit_external_id (externalID yang kita set)
// - status (map dari XenditStatus)
```

## Aturan Wajib

- SELALU verifikasi `x-callback-token` sebelum proses webhook apapun
- SELALU simpan `xendit_id` dan `external_id` di database
- JANGAN trust status dari client — always verify dari webhook
- JANGAN proses webhook langsung di handler — gunakan BullMQ queue
- Xendit retry webhook jika tidak dapat HTTP 200 dalam 30 detik

## Testing di Sandbox

```bash
# Set di .env.local untuk development
XENDIT_SECRET_KEY=xnd_development_...
XENDIT_CALLBACK_TOKEN=test_callback_token_123

# Test webhook via Xendit Dashboard:
# Settings → Webhooks → Test → pilih event → send
```
