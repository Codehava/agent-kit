# Workflow/Automation — Conversation Guide

## Section 1: Trigger & Purpose
**Explore:** Workflow ini trigger dari mana — webhook, jadwal (cron), event, atau manual? Apa yang terjadi setelah trigger — satu aksi atau chain of actions? Berapa sering diharapkan jalan?
**Suggest:** Tentukan trigger type dulu karena ini mempengaruhi architecture. Webhook: event-driven, harus respond cepat. Cron: batch processing, bisa lama. Manual: sync atau async?
**Depth:** required

## Section 2: Steps & Actions
**Explore:** Steps/actions apa yang dilakukan secara berurutan? Ada branching (kalau A maka B, kalau C maka D)? Ada parallel steps yang bisa jalan bersamaan?
**Suggest:** Gambar sebagai flowchart sederhana: Trigger → Step 1 → Step 2 → [kondisi] → Step 3a/3b → Output. Parallel steps meningkatkan kompleksitas — pastikan benar-benar dibutuhkan.
**Depth:** required

## Section 3: Idempotency
**Explore:** Kalau workflow ini dijalankan dua kali untuk input yang sama, apa yang terjadi? Apakah workflow harus idempotent (aman dijalankan ulang)? Ada deduplication yang diperlukan?
**Suggest:** Sebagian besar workflows HARUS idempotent — network retry, duplicate events, dan manual re-runs sangat umum. Track processed events dengan unique ID. "At-least-once delivery" + idempotent handler = safe.
**Depth:** required

## Section 4: Error Handling & Retry
**Explore:** Kalau satu step gagal, apa yang terjadi — stop, retry, atau skip? Berapa kali retry sebelum consider failed? Ada dead letter queue atau alert? Partial success dianggap success?
**Suggest:** Exponential backoff untuk transient errors (network, rate limits). Circuit breaker untuk persistent failures. Dead letter queue untuk events yang gagal setelah max retry — jangan buang silently. Alert saat failure rate melebihi threshold.
**Depth:** required

## Section 5: External Integrations
**Explore:** Service apa yang diintegrasikan (Slack, email, database, third-party API)? Ada rate limits yang perlu direspect? Bagaimana kalau satu integration down?
**Suggest:** List setiap integration: arah data flow, auth yang diperlukan, rate limits. Degrade gracefully: kalau Slack down, log saja — jangan fail seluruh workflow. Secrets di env vars, tidak pernah di kode.
**Depth:** required

## Section 6: Monitoring & Observability
**Explore:** Bagaimana tahu kalau workflow ini berjalan dengan benar? Perlu alert kalau gagal? Log apa yang diperlukan? Ada SLA untuk execution time?
**Suggest:** Minimum: log setiap trigger dengan unique ID, log setiap step completion/failure, alert kalau failure rate > threshold. Tambahkan execution time tracking — berguna untuk performance monitoring.
**Depth:** required

## Section 7: State Management
**Explore:** Apakah workflow perlu menyimpan state antar runs? Ada data yang perlu di-persist antar step? Bagaimana handle long-running workflows (> 30 detik)?
**Suggest:** Stateless ideal untuk simple workflows. State yang perlu persist: simpan di database atau Redis dengan TTL. Long-running: gunakan BullMQ atau Temporal — jangan blocking HTTP request.
**Depth:** optional

## Section 8: Testing Strategy
**Explore:** Bagaimana test workflow ini tanpa trigger nyata? Ada cara untuk mock external integrations? Bagaimana reproduce bug di production?
**Suggest:** Unit test setiap step secara terpisah. Integration test dengan mock integrations. Pastikan ada cara untuk manually trigger workflow di staging. Log yang cukup detail untuk reproduce production issues.
**Depth:** required
