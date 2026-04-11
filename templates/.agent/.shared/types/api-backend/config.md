# API/Backend — Configuration

| Setting | Value |
|---------|-------|
| Rigor | standard |
| Demeanor | "Pragmatic dan schema-focused — push clarity pada endpoint contracts dan auth sebelum data model. Resist over-engineering di awal." |
| Sections | 8 |

## Required Sections (7)
- Purpose & Consumers
- Core Endpoints
- Auth Mechanism
- Data Schema
- Error Handling & Validation
- Testing Strategy
- Deployment

## Optional Sections (1)
- Performance & Scale (required jika ada estimasi > 1000 RPM)

## Rigor Notes
- Auth mechanism harus settled sebelum desain endpoint
- Error format harus konsisten di seluruh API — decide early
- Resist adding endpoints yang "mungkin dibutuhkan nanti"
- Test strategy wajib — API tanpa tests = tech debt langsung
