# Project structure

The prototype is intentionally split into application boundaries:

- `frontend/` — React + TypeScript + Vite candidate experience.
- `backend/` — Go HTTP API boundary, currently serving the same fictional matching catalogue.
- `worker/` — background-processing boundary for durable matching workflows.
- `shared/` — versioned JSON contracts and fictional fixtures used by each boundary.
- `design/` and `docs/` — product direction, design system, and delivery plan.

## Run the interface

```sh
npm install
npm run dev
```

The API can be started separately with `go run ./cmd/api` from `backend/`. It exposes `GET /healthz` and `GET /api/v1/matches`.

## Run with Docker

The repository includes multi-stage images and a Compose application definition. It uses the current Compose Specification format and does not require a legacy `version` key.

```sh
docker compose up --build
```

Open `http://localhost:8088`. The frontend image serves the SPA and proxies `/api/*` to the Go API container. The worker is a separate process boundary, ready for the durable workflow implementation in the next plan phase.
