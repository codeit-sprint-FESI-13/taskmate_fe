# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm dev:full     # Dev server + JSON mock server (port 4000) concurrently
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm test         # Jest unit tests
pnpm test:watch   # Jest watch mode
pnpm storybook    # Storybook (port 6006)
```

Run a single test file:

```bash
pnpm test -- path/to/file.test.ts
```

## Architecture

**TaskMate** is a task/goal management app built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. Package manager: **pnpm**.

### Routing Structure

```
src/app/
├── (auth)/          # Login, signup pages
├── taskmate/        # Main authenticated app
│   ├── personal/    # Personal goals & todos
│   ├── team/        # Team workspace
│   └── my/          # User dashboard
├── api/             # Route handlers (OAuth callbacks, API proxy)
└── layout.tsx       # Root layout with providers
```

### State Management

- **Zustand** (`src/store/auth.store.ts`) — client state only (auth user, persisted to localStorage)
- **React Query** (`src/providers/ReactQueryProvider.tsx`) — all server state; staleTime 1min, 1 retry; browser singleton pattern to preserve cache across Suspense boundaries

### Data Fetching Pattern

All API calls go through a typed fetch wrapper at `src/lib/api/client.ts` (no axios). Feature-level API modules live at `src/features/{feature}/api.ts`.

```
src/features/{feature}/
├── api.ts       # API calls using apiClient
├── types.ts     # TypeScript types
├── hooks/       # useQuery / useMutation wrappers
└── query/       # React Query key factory
```

Base URL is `/api` (`NEXT_PUBLIC_API_URL`), which proxies to the backend (`BACKEND_URL`).

### Component Organization

```
src/components/
├── common/      # Shared UI (Button, Input, Modal, Toast, Spinner…)
└── {feature}/   # Feature-specific components
```

Components use **class-variance-authority** for variant patterns, **clsx + tailwind-merge** for class composition.

### Testing

Tests use **Jest + React Testing Library + MSW**. MSW is set up globally in `jest.setup.ts` via `src/mocks/server.ts` — no separate mock layer needed. Mock handlers are in `src/mocks/handlers/`.

### Environment Variables

```
NEXT_PUBLIC_API_URL=/api      # Public API base URL
NEXT_PUBLIC_APP_URL=          # App public URL
BACKEND_URL=                  # Backend server (server-side only)
GOOGLE_CLIENT_ID=
KAKAO_CLIENT_ID=
```

### Code Conventions

- **Imports**: Auto-sorted via `simple-import-sort` (std → packages → `@/` → relative)
- **Validation**: Zod for runtime schema validation (forms, API responses)
- **Forms**: Manual state + Zod validation (no form library)
- **Path alias**: `@/` maps to `src/`
- **SVGs**: Imported as React components via SVGR (`import Icon from './icon.svg'`)
- **Pre-commit**: Husky runs ESLint + Prettier on staged files automatically

### OAuth Flow

Google and Kakao OAuth are handled via `/api/auth/{provider}/route.ts` Next.js route handlers.
