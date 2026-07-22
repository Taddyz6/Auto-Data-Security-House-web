# Pure Static Site Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing Next.js MVP into a database-free static export while preserving all public pages, the six-step assessment, animations, and the supplied PDF download.

**Architecture:** Next.js App Router remains the presentation framework, with `output: "export"` producing `out/`. Database-backed public content moves to typed constants, and the assessment calls the existing scoring function in the browser and renders its result inline without persistence.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui-style components, Framer Motion, React Hook Form, Zod, Vitest.

## Global Constraints

- No administrator pages, API routes, middleware, Prisma, SQLite, authentication, analytics, or server persistence.
- Assessment values and results exist only in React component memory and clear on refresh.
- Static build output must be generated in `out/` by `npm run build`.
- The supplied PDF must replace the second placeholder resource card and download directly from `/downloads/`.
- Public visuals, responsive behavior, reduced-motion support, company information, and contacts must remain intact.
- Do not fabricate regulations, cases, qualifications, or quantified outcomes.

---

### Task 1: Add Static Architecture Regression Tests

**Files:**
- Modify: `src/lib/public-content.test.ts`
- Create: `src/lib/static-site.test.ts`

**Interfaces:**
- Consumes: source files and `scoreAssessment(input: AssessmentInput): AssessmentResult`.
- Produces: regression checks for static export, no server routes, inline assessment scoring, and static downloads.

- [ ] **Step 1: Write failing tests**

Assert that `next.config.ts` contains `output: "export"`, `package.json` has no Prisma scripts or dependencies, `AssessmentForm` imports `scoreAssessment` and contains no `/api/assessment`, and the static content module includes the supplied PDF path.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm run test -- --run src/lib/static-site.test.ts`

Expected: FAIL because the project still uses Prisma and API routes.

- [ ] **Step 3: Keep tests focused on externally observable architecture**

Avoid snapshots of styling and assert only required paths, imports, scripts, and copy.

### Task 2: Move Public Content to Typed Constants

**Files:**
- Create: `src/lib/public-content.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/cases/page.tsx`

**Interfaces:**
- Produces: `siteSettings`, `caseItems`, `faqItems`, `qualificationItems`, and `downloadResources`.
- Consumers: home, about, and cases pages.

- [ ] **Step 1: Define typed static records**

Move the published seed content into immutable arrays with stable string IDs and no database-specific types.

- [ ] **Step 2: Replace page database queries**

Make each page synchronous and import fixed content directly.

- [ ] **Step 3: Implement static download cards**

Render an `<a href={fileUrl} download>` for the supplied PDF. Replace the old download-statistics copy with static-download wording.

- [ ] **Step 4: Run typecheck and targeted tests**

Run: `npm run typecheck`

Expected: PASS for public pages after database imports are removed.

### Task 3: Render Assessment Results Inline

**Files:**
- Create: `src/components/public/assessment-result.tsx`
- Modify: `src/components/public/assessment-form.tsx`
- Modify: `src/app/assessment/page.tsx`
- Modify: `src/lib/validation.ts`
- Delete: `src/app/assessment/result/[id]/page.tsx`

**Interfaces:**
- `AssessmentResultView` consumes `{ input: AssessmentInput; result: AssessmentResult; onReset(): void }`.
- `AssessmentForm` calls `scoreAssessment(values)` after final validation and stores `{ input, result }` in component state.

- [ ] **Step 1: Add a failing inline-scoring regression assertion**

Verify that no assessment network request or result-ID route remains.

- [ ] **Step 2: Extract the result UI**

Port result level copy, score cards, summary, recommendations, focus items, contacts, print, and reset controls into a client-compatible component.

- [ ] **Step 3: Replace API submission with local scoring**

Call `scoreAssessment(values)` inside the existing form submit handler. On error, preserve input and show a retry message.

- [ ] **Step 4: Verify assessment tests**

Run: `npm run test -- --run src/lib/assessment-score.test.ts src/lib/static-site.test.ts`

Expected: PASS.

### Task 4: Remove Server and Database Surface

**Files:**
- Delete: `src/app/admin/`
- Delete: `src/app/api/`
- Delete: `src/components/admin/`
- Delete: `src/components/public/contact-form.tsx`
- Delete: `src/components/public/page-tracker.tsx`
- Delete: `src/lib/analytics.ts`
- Delete: `src/lib/auth.ts`
- Delete: `src/lib/db.ts`
- Delete: `src/lib/rate-limit.ts`
- Delete: `src/lib/site.ts`
- Delete: `middleware.ts`
- Delete: `prisma/`
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Public routes must have no imports from deleted modules.

- [ ] **Step 1: Remove server-only route trees and modules**

Delete admin, API, authentication, analytics, database, and middleware code.

- [ ] **Step 2: Remove dead imports and admin-only constants**

Remove `PageTracker` from the root layout and remove labels used only by the admin UI.

- [ ] **Step 3: Search for server references**

Run: `rg -n "@/lib/db|@prisma|/api/|cookies\\(|redirect\\(" src package.json next.config.ts`

Expected: no matches.

### Task 5: Configure Static Export and Add the PDF

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`
- Modify: `.env.example`
- Modify: `README.md`
- Create: `public/downloads/data-cross-border-security-foundation-v1.1.pdf`
- Create: `public/downloads/.gitkeep` only if the directory otherwise has no files.

**Interfaces:**
- `npm run build` produces `out/index.html` and static route directories.

- [ ] **Step 1: Copy the validated PDF**

Copy the supplied 24-page PDF to the stable public path and verify its size and SHA-256 hash.

- [ ] **Step 2: Remove backend packages and scripts**

Use `npm uninstall @prisma/client prisma bcryptjs jose tsx`, then update scripts so build runs only `next build`.

- [ ] **Step 3: Enable export mode**

Set `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true` in `next.config.ts`.

- [ ] **Step 4: Update documentation**

Document local development, static build, `out/` preview, deployment targets, no persistence, and how to add future downloads.

### Task 6: Validate, Preview, Commit, and Push

**Files:**
- Verify all modified files and generated static output.

**Interfaces:**
- Produces: a clean Git commit pushed to `origin/agent/complete-mvp` and updates PR #1.

- [ ] **Step 1: Run complete checks**

Run: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.

Expected: all pass and `out/` contains the public routes.

- [ ] **Step 2: Serve the static output**

Run a local static HTTP server rooted at `out/`. Verify home, cases, assessment, static PDF response, and no admin/API route in the build manifest.

- [ ] **Step 3: Browser-check critical flows**

Verify the cases download card, direct PDF URL, six-step assessment result, reset behavior, navigation, and no failed network requests.

- [ ] **Step 4: Commit and push**

Commit the complete conversion with a concise message and push `agent/complete-mvp`, updating the existing draft PR.
