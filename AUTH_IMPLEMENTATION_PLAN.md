# Implementation Plan: Core Platform Authentication

This plan details the steps to transition from backend stubs to a fully functional authentication system using Lucia Auth, Drizzle ORM, and Next.js App Router.

## Phase 1: Authentication Infrastructure

### 1.1 Database Migration
- [ ] Ensure the `users` and `sessions` tables are correctly defined in `src/core-platform/schema.ts`.
- [ ] Run `npm run db:push` (or generate migration) to apply the schema to the database.

### 1.2 Lucia Configuration
- [ ] Create `src/core-platform/lib/auth.ts`.
- [ ] Configure Lucia with the Drizzle adapter.
- [ ] Define the `Lucia` type for TypeScript (`declare module "lucia"`).

### 1.3 Backend Actions (Server Actions)
- [ ] Create `src/core-platform/actions/auth.actions.ts`.
- [ ] Implement `signUpAction`:
  - Validate input with Zod.
  - Hash password (using `argon2` or `scrypt`).
  - Create user in database.
  - Create session and set cookie.
- [ ] Implement `loginAction`:
  - Validate input.
  - Fetch user by email.
  - Compare passwords.
  - Create session and set cookie.
- [ ] Implement `logoutAction`:
  - Invalidate session.
  - Clear cookie.

### 1.4 API / Middleware (Optional/Future)
- [ ] Configure middleware to protect sensitive routes.

## Phase 2: Authentication UI

### 2.1 UI Components
- [ ] Create `src/components/auth/login-form.tsx`.
- [ ] Create `src/components/auth/signup-form.tsx`.
- [ ] Use `shadcn/ui` components (Input, Button, Card).

### 2.2 Pages
- [ ] Create `src/app/(auth)/login/page.tsx`.
- [ ] Create `src/app/(auth)/signup/page.tsx`.

## Phase 3: Validation & Testing

### 3.1 Unit Testing
- [ ] Refactor `tests/backend/auth.spec.ts` to test the new Server Actions.
- [ ] Mock the database or use a test database instance.

### 3.2 E2E Testing
- [ ] Add a Playwright test for the full signup -> login flow.

---

## Technical Choices
- **Auth Library**: Lucia Auth (as requested in package.json).
- **ORM**: Drizzle.
- **Validation**: Zod.
- **UI**: shadcn/ui + Tailwind v4.
- **Interactions**: Server Actions for simplicity and type safety.

## References
- `RULES.md`: Modular architecture (src/core-platform).
- `INICIO.md`: Core Platform scope (Auth, Profile, Subscriptions).
