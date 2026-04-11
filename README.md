# Codehava Agent Kit V3.0 🚀

The ultimate **Vibe Coding** Agent Kit — transforms plain-text ideas into production-ready Web and Mobile applications. Injects superhuman coding capabilities into Cursor, Antigravity, or Claude Code via the **SEED + PAUL** execution architecture.

---

## What's Inside?

### 🌱 SEED-Style Typed Incubation
Five project types with different rigor levels (Application, API/Backend, Campaign, Utility, Workflow). No more one-size-fits-all PRD — each type gets type-aware discovery questions, constraints, and quality gates before any code is written.

### 🔄 PAUL Execution Loop (Token-Efficient)
**Plan → Apply → Unify** — single-session execution with mandatory reconciliation. No token-heavy parallel subagents (~70% quality). Each session closes with a SUMMARY.md capturing planned vs. actual outcomes. No orphaned work. No state drift.

### 🤖 Auto-Discovery Engine (600+ Elite Skills)
~600 hand-picked, elite-tier skills auto-routed based on your natural language request — no memorization required. Keyword-based search with concrete algorithm defined in SKILLS_INDEX.md.

### 🧠 Long-Term Memory Protocol
`.agent/MEMORY.md` preserves colors, schemas, tech decisions, and constraints across sessions. `.agent/STATE.md` tracks current loop position. `docs/handoffs/` enables zero-context session resumption.

### ✅ 4-Level Verification (from GSD)
Every task verified at 4 levels: **Exists → Substantive → Wired → Data Flows** — before any DONE status is reported. Escalation status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED) replaces binary pass/fail.

### 🔧 Self-Healing Protocol
Autonomously fixes errors using `@systematic-debugging` and `@lint-and-validate`. Never asks users "how to fix?" — fixes silently, delivers working output.

### 📊 Model Profiles
**Quality** (Opus/Opus), **Balanced** (Opus/Sonnet, default), **Budget** (Sonnet/Haiku) — match compute to task complexity.

### 🔌 Built-in Vibe MCP Servers
Context7 (real-time docs), GitHub, Brave Search, Sequential Thinking, PostgreSQL, Playwright, Sentry, Docker — pre-configured in `mcp_config.json`.

---

## Installation & Usage

```bash
npx codehava-agent-kit init
```

This creates `.agent/`, `docs/`, and `specs/` directories in your project root.

**Then place:**
- `.agent/` → your project root
- `docs/` → your project root
- `specs/` → your project root
- `.antigravity/rules.md` → if using Antigravity IDE

---

## The PAUL Loop: How to "Vibe Code"

```
1. /vibe-plan     Start here for any new project or feature
                  → Detects project type, asks the right questions
                  → Outputs PLANNING.md with BDD acceptance criteria

2. /apply         Execute the plan, task by task
                  → Auto-discovers relevant skills from 600+ library
                  → Qualify each task before moving on

3. /unify         Close the loop (mandatory after every /apply)
                  → Documents planned vs. actual outcomes
                  → Updates STATE.md and MEMORY.md

4. /vibe-recap    Context compaction when context gets long
                  → Creates recap.md → open fresh chat to continue
```

**Example:**
> "Saya ingin buat aplikasi manajemen inventory untuk toko kecil"
> → `/vibe-plan` detects Application type → asks 8 targeted questions → produces PLANNING.md
> → `/apply` executes sprint 1 tasks → qualifies each with 4-level verification
> → `/unify` documents what was done, deferred issues, tech decisions
> → repeat for sprint 2

---

## Why SEED + PAUL (not GSD)?

| Approach | Token Cost | Quality | Crash Recovery |
|----------|-----------|---------|----------------|
| Parallel Subagents (GSD) | Heavy | ~70% | Lock files needed |
| Single Session (PAUL) | Efficient | ~95% | HANDOFF files |

PAUL's single-session approach delivers higher quality at lower token cost. SEED's typed incubation prevents hallucinated code from vague specs.

---

## What Was Pruned

Over 800+ niche/outdated community skills were pruned to keep the kit incredibly light and fast during initialization. Only elite, battle-tested skills remain.

---

## License

MIT License — Codehava
