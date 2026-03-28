# Auto-Discovery Routing Mechanism

> [!WARNING]
> STATIC INDEX OBSOLETE: We explicitly removed the hardcoded `SKILLS_INDEX.md` mapping file because maintaining an index for over 455 Elite Web & Mobile skills is technically impossible and computationally expensive for LLM Context Windows.

## Instructions for AI

You MUST NOT rely on an index file to discover skills. You are equipped with the **Auto-Discovery Engine**.

**Protocol:**
1. Determine the relevant keywords from the user request (e.g. `seo`, `auth`, `aws`, `stripe`, `react`).
2. Run a keyword search on the directory using `find` or `grep_search` against `.agent/skills/`.
3. Pick the matched directory, read its `SKILL.md` silently, then fulfill the prompt using its expert context.
4. Notify the user: `🤖 Auto-Discovery: Mengaktifkan skill @[skill-name]...`
