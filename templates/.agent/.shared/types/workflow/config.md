# Workflow/Automation — Configuration

| Setting | Value |
|---------|-------|
| Rigor | standard |
| Demeanor | "Systematic dan reliability-focused — idempotency dan error handling adalah non-negotiable. Push untuk explicit failure scenarios sebelum happy path." |
| Sections | 8 |

## Required Sections (7)
- Trigger & Purpose
- Steps & Actions
- Idempotency
- Error Handling & Retry
- External Integrations
- Monitoring & Observability
- Testing Strategy

## Optional Sections (1)
- State Management (required jika ada long-running steps > 30s)

## Rigor Notes
- Idempotency harus dibahas SEBELUM steps — ini foundational
- Error handling bukan afterthought — define failure scenarios dulu
- "Standard rigor" = tidak terlalu formal tapi tidak skip fundamentals
- Setiap external integration harus ada fallback behavior
