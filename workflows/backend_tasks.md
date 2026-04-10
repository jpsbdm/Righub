---
description: Execute all backend tasks in order with test-first workflow
---

# Backend Tasks Execution Workflow

## Overview
This workflow automates the execution of all backend tasks listed in `TASKS.md` following the rules defined in `RULES.md`. For each task, it:
1. Adds/updates corresponding tests in `TEST.md`.
2. Creates stub implementation files (if not existent).
3. Runs the test suite.
4. Moves the completed task from `TASKS.md` to `DONE.md`.

## Steps
1. **Read backend tasks** from `TASKS.md` (lines under "## Backend Tasks").
2. **For each task**:
   - // turbo
   - **Add test placeholder** in `TEST.md` under the appropriate section (Unit Tests → Backend). Use a clear test name matching the task description.
   - **Create stub file** in `src/backend/` (e.g., `src/backend/auth.ts` for authentication task) if it does not exist.
   - // turbo
   - **Run tests** using `npm test` (or `pnpm test`).
   - **If tests pass**, move the task line from `TASKS.md` to `DONE.md` preserving its category.
   - // turbo
3. **Commit changes** (optional) and push to repository.

## Notes
- All steps that involve `run_command` are marked with `// turbo` to allow safe auto‑execution.
- Ensure the test suite is updated before any code changes, adhering to the test‑first rule.
- The workflow assumes a Node/TypeScript backend with Jest configured.

---

*Run this workflow by opening it in the IDE and executing the listed commands.*
