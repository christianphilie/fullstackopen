# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Solutions for the [Full Stack Open](https://fullstackopen.com) course by the University of Helsinki. Organized by course part, each part contains one or more independent npm projects. Parts progress from basic React to full-stack applications.

```
0_web-fundamentals/   # Static HTML/CSS only
1_react-intro/        # Basic React components
2_server-communication/ # React + Axios + REST
3_nodejs-express/     # Express backend + Mongoose
4_backend-testing/    # Express API testing
5_frontend-testing/   # Vitest + Playwright
6_state-management/   # Redux & React Query
7_advanced-react/     # React Router, hooks, Tailwind (npm workspaces monorepo)
8_graphql/            # Apollo Server + GraphQL
```

## Commands

Each part/project has its own `package.json`. Always `cd` into the specific project before running commands.

### Frontend (React + Vite)
```bash
npm run dev       # Dev server at localhost:5173
npm run build     # Production build
npm run lint      # ESLint
npm run test      # Vitest (where configured)
```

### Backend (Express + Node)
```bash
npm run dev       # Dev server with --watch (usually localhost:3001)
npm run start     # Production
npm run test      # Node built-in test runner
npm run build:ui  # Build frontend and copy to dist/ (monorepo projects)
```

### Part 7 bloglist (npm workspaces monorepo)
```bash
npm run dev       # Runs backend + frontend concurrently
npm run test      # All tests (backend + frontend)
npm run test:e2e  # Playwright E2E tests
npm run lint      # Lint all workspaces
npm run format    # Prettier all workspaces
```

### GraphQL (Part 8)
```bash
npm run dev       # Apollo Server at localhost:4000
```

### Run a single test file
```bash
# Node test runner (backend)
node --test path/to/test.js

# Vitest (frontend)
npx vitest run path/to/test.js
```

## Code Style

Shared configs at repo root apply to all projects:
- **ESLint** (`.eslintrc.cjs`): `eslint:recommended` + `plugin:react/recommended` + `react-hooks`
- **Prettier** (`.prettierrc`): no semicolons, single quotes, 2-space tabs, trailing commas (es5), 100-char line width

## Architecture

### Part 3–5: REST Full-Stack
```
React (Vite) ──Axios──> Express ──Mongoose──> MongoDB
```
Backend serves a REST API; frontend communicates via Axios. In Part 3 the backend also serves the built frontend from `dist/`.

### Part 5: Testing Layers
The bloglist project demonstrates all three testing levels:
- **Unit/component**: Vitest + React Testing Library (`frontend/`)
- **API integration**: Supertest + Node test runner (`backend/`)
- **E2E**: Playwright (`playwright/`)

### Part 6: Dual State Management Approaches
Two parallel projects show different approaches to the same problem:
- `anecdotes-redux/` — Redux Toolkit for all state
- `anecdotes-query/` — TanStack React Query for server state + Context for UI state

### Part 7: Monorepo
`7_advanced-react/bloglist/` uses npm workspaces (`frontend/`, `backend/`, `playwright/`). Root-level scripts coordinate all workspaces. Also introduces React Router v7 and Tailwind CSS.

### Part 8: GraphQL
`8_graphql/library/index.js` is a single-file Apollo Server. Data is in-memory (plain arrays). The `Author.bookCount` field is a computed resolver (not stored). `addBook` auto-creates an author if one doesn't exist.

## Environment Variables

Backend projects require a `.env` file (git-ignored). Typical variables:
```
MONGODB_URI=...
TEST_MONGODB_URI=...   # Separate DB for tests
SECRET=...             # JWT secret
PORT=3001
```
`NODE_ENV` is set via `cross-env` in npm scripts to switch between dev/test/production configs.
