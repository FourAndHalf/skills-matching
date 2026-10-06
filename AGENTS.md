# AGENTS.md

## Project

Web application with a browser frontend, a backend API, and background processing.
The frontend may use React or Angular; follow the framework already selected in the
repository and do not introduce both unless explicitly requested. Keep the frontend,
backend, worker, and shared packages clearly separated when the repository contains
multiple applications.

Before starting a phase, read the relevant planning and architecture documents under
`docs/` (for example `docs/plan.md`, `docs/plan.html`, or an ADR). Treat explicit
requirements in those documents as authoritative. If the required document is absent,
record the decision in the appropriate documentation before implementing a substantial
new subsystem.

## Git workflow

- Never commit directly to `main`. Work on a branch named `feature/<short-name>`,
  `fix/<short-name>`, or `chore/<short-name>`.
- Keep commits focused and describe the user-visible or operational change.
- Do not rewrite or discard existing user changes. Inspect the working tree before
  editing and keep unrelated changes intact.
- Before merging, run the repository's formatting, lint, type-check, unit, integration,
  and build checks for every affected package.
- A feature is complete only when its frontend, API, persistence, and worker behavior
  are implemented and tested. Do not merge shells, placeholders, or unverified jobs.
- If a planning document contains a `DONE` set or checklist, update it only for fully
  implemented and verified items, and commit that update on the feature branch.
- Merge completed work with a non-fast-forward merge, then delete the feature branch:

  ```sh
  git switch main
  git merge --no-ff feature/<name>
  git branch -d feature/<name>
  ```

- If the repository is not initialized, run `git init -b main` and create the initial
  commit on `main` before creating feature branches.

## Local development and checks

- Use the package manager and scripts already declared by the repository. Prefer the
  lockfile's package manager (`npm`, `pnpm`, `yarn`, or `bun`) and do not replace the
  lockfile without a reason.
- Run the frontend, backend, database dependencies, and worker through the documented
  development commands or the repository's compose/dev-container setup.
- At minimum, run the applicable checks before handoff:
  - frontend formatting, linting, type-checking, unit tests, and production build;
  - backend formatting, linting, type-checking, unit tests, and integration tests;
  - worker tests, including retry, failure, idempotency, and shutdown behavior;
  - database migration checks and API contract checks when those systems change.
- Keep generated artifacts out of source control unless explicitly required. Never
  commit secrets, local databases, credentials, or `.env` files; update `.env.example`
  when configuration changes.

## Architecture and conventions

- Organize code by feature or domain where practical. Keep shared types, API schemas,
  validation, and utilities in an explicit shared package rather than duplicating them
  across frontend, backend, and worker code.
- Keep UI components presentational where possible. Put state management, data fetching,
  routing, and side effects in the framework's established application layers.
- Keep backend request handlers thin. Put domain rules in testable services and keep
  persistence access behind clear repositories or data-access modules.
- Validate all external input at the API boundary. Return consistent error shapes and
  never expose stack traces, secrets, internal identifiers, or database details.
- Version and document API changes. Keep frontend API clients and backend contracts in
  sync, and add an integration or contract test for behavior that crosses the boundary.
- Store monetary values as integer minor units (for example, cents), never floating
  point values. Store timestamps in UTC and convert only at presentation boundaries.
- Database schema changes must be reversible where practical, include migrations, and
  preserve existing data. Destructive migrations require an explicit backup and
  rollback plan.

## Background processing

- Treat background jobs as at-least-once delivery unless the infrastructure explicitly
  guarantees otherwise. Every job must be idempotent or use a deduplication key.
- Define a versioned job payload, timeout, retry policy, backoff, maximum attempts, and
  failure/dead-letter behavior. Do not silently drop failed work.
- Make job state observable: record enough information to diagnose status, attempts,
  errors, and timing without logging sensitive data.
- Keep long-running or blocking work out of HTTP request handlers. API endpoints should
  enqueue work and return a clear status or tracking identifier when processing is
  asynchronous.
- Ensure graceful worker shutdown, bounded concurrency, transaction-safe enqueueing,
  and safe recovery after process or machine failure.

## Security and operations

- Use least-privilege credentials and separate development, test, and production
  configuration. Secrets must come from the runtime environment or a secret manager.
- Protect authentication, authorization, CORS, CSRF, rate limiting, file uploads, and
  webhook endpoints according to the deployed architecture.
- Log structured operational events with request/job correlation IDs. Do not log
  passwords, tokens, payment data, or unnecessary personal information.
- Add health/readiness checks for the API, worker, database, and queue where applicable.
  Document required services, ports, migrations, seed data, and deployment steps.

## Definition of done

- The requested behavior works in the relevant frontend, API, persistence, and worker
  paths.
- Loading, empty, validation, authorization, error, retry, and offline/unavailable
  states are handled where applicable.
- Tests cover normal behavior and important failure paths, especially duplicate jobs,
  retries, partial failures, and migrations.
- Documentation, environment examples, API contracts, and checklists are updated.
- All relevant automated checks pass, and the final change is limited to the requested
  scope.
