# TEST.md

## Overview

This document outlines the testing strategy for the **RIGHUB** platform. It lists the types of tests we should implement before writing any production code, ensuring that each feature is covered by appropriate automated verification.

---

## 1. Unit Tests

### Backend (Node/TS)
- **Authentication Service**: Verify sign‑up, login, password reset flows, token generation, and expiration handling.
- **Authorization Middleware**: Ensure role‑based access control correctly allows/denies requests for Free vs. Pro features.
- **Domain Entities**: Validate constructors and invariants for core entities (User, Subscription, Vehicle, AccessoryProduct, CalculationRun, etc.).
- **Business Logic**: Test each use‑case service:
  - `CreateGarage`, `AddVehicle`, `AddMod`, `SaveSetup`
  - `CalculateLoad`, `CalculateSolar`, `ValidateSetup`
  - `GenerateReport`, `RateSetup`
- **Billing Service**: Mock Stripe interactions and verify plan upgrades/downgrades, feature gating.
- **Background Jobs**: Unit‑test job handlers for periodic calculations and email notifications.
- **Analytics Tracker**: Ensure events are emitted with correct payloads.

### Frontend (React/TS)
- **Component Rendering**: Snapshot tests for key UI components (LoginForm, VehicleCard, CalculatorWizard, ReportViewer).
- **Form Validation**: Verify validation schemas for sign‑up, vehicle entry, mod addition, and payment forms.
- **State Management**: Test reducers/store slices for auth, garage, calculators, and reporting.
- **Utility Hooks**: Ensure custom hooks (useAuth, useSubscription, useAnalytics) behave correctly under success/error conditions.

---

## 2. Integration Tests

- **API Contract**: Use OpenAPI spec to generate contract tests ensuring request/response shapes match definitions.
- **Database Layer**: Test repository methods with an in‑memory PostgreSQL (or Docker) instance for CRUD operations on all entities.
- **Auth Flow**: End‑to‑end test of sign‑up → email verification → login → token refresh.
- **Subscription Enforcement**: Verify that Pro‑only endpoints reject Free users and accept Pro users.
- **Calculator Pipelines**: Feed realistic vehicle/mod data into calculation services and assert expected output values.
- **Report Generation**: Create a full setup, generate a shareable report, and verify PDF/HTML output contains correct data.

---

## 3. End‑to‑End (E2E) Tests (Playwright / Cypress)

1. **User Onboarding**
   - Visit landing page → sign up → complete profile → create garage → add first vehicle → run first load calculation → save setup → view report.
2. **Community Interaction**
   - Post a new feed entry → comment → react → edit → delete → verify moderation actions.
3. **Forum Workflow**
   - Browse categories → start a new topic → reply → tag → report → moderator resolves.
4. **Pro Upgrade Flow**
   - Upgrade from Free to Pro via Stripe checkout → verify new UI features become available (catalog access, advanced reports).
5. **Media Upload**
   - Upload vehicle photos and YouTube links → ensure they appear in garage view and are stored in Cloudflare R2.
6. **Admin Dashboard**
   - Admin logs in → manage catalog entries → approve community submissions → ban a user → verify audit logs.
7. **Responsive Design**
   - Run the same flows on mobile viewport to confirm layout adapts gracefully.

---

## 4. Performance Tests

- **API Load Testing**: Simulate 100 concurrent users performing calculator requests; ensure response time < 500 ms.
- **Frontend Rendering**: Measure Time‑to‑Interactive (TTI) for main pages (dashboard, garage, calculator) and aim for < 1 s on typical 3G.
- **Database Query Benchmark**: Profile heavy queries (e.g., report aggregation) and verify they stay under 200 ms with proper indexing.

---

## 5. Security & Compliance Tests

- **OWASP Dependency Check**: Scan `package.json` for vulnerable packages.
- **Auth Security**: Test JWT expiration, refresh token rotation, and revocation on logout.
- **Authorization Tests**: Attempt to access Pro‑only endpoints with a Free token and expect 403.
- **Input Sanitization**: Ensure all user‑generated content (posts, comments, mod descriptions) is escaped to prevent XSS.
- **CSRF Protection**: Verify CSRF tokens are required for state‑changing POST/PUT/DELETE requests.
- **Rate Limiting**: Simulate rapid login attempts and ensure lockout after threshold.

---

## 6. Accessibility Tests

- Run axe‑core on all public pages; ensure no violations of WCAG AA.
- Keyboard navigation tests for modal dialogs, forms, and menus.
- Verify proper ARIA roles and labels on interactive components.

---

## 7. Regression Test Checklist

- After each feature implementation, run the full suite of unit, integration, and E2E tests.
- Maintain a CI pipeline that fails on any test regression before merging.

---

## 8. Infrastructure & DevOps Tests

- **Repository Structure**: Verify the existence of the planned monorepo domain folders and core configuration files (tsconfig, eslint, prettier).
- **Environment Configuration**: Check that `.env.example` contains all required keys for external services (Neon, Stripe, Sentry, PostHog, Clouflare R2, Trigger.dev).
- **CI/CD Pipeline**:
  - Test that the GitHub Actions workflow successfully triggers on PRs and merges.
  - Verify that linting, type-checking, and all tests pass in the CI environment.
  - Ensure Vercel deployment preview triggers on non-main branches and production deployment triggers on main.
- **Database Connection**: Validate that a secure connection to the PostgreSQL (Neon) instance can be established using environment variables.
- **Database Schema**: Verify that Drizzle ORM migrations can be run cleanly on a fresh database instance.
- **Storage Access**: Test authentication and write/read capabilities to Cloudflare R2 using the provided credentials.
- **Background Jobs Platform**: Confirm that the Trigger.dev/Inngest integration can successfully register and trigger a sample "ping" job.
- **Monitoring & Logs**:
  - Ensure Sentry captures a simulated error in both dev and prod environments.
  - Verify that PostHog receives sample events during verification testing.

---

*All tests should be written before any production code is merged. Once the test suite passes for a given feature, the corresponding task can be moved from `TASKS.md` to `DONE.md`.*
