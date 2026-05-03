# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.
Always read [@docs/architecture.md](@docs/architecture.md) and [@docs/conventions.md](@docs/conventions.md) before generating or modifying code.

---

## Commands

```bash
pnpm dev              # Next.js dev server (localhost:3000)
pnpm dev:full         # Next.js + json-server mock (port 4000) concurrently
pnpm build            # Production build
pnpm lint             # ESLint (Flat Config)
pnpm test             # Jest (unit/integration)
pnpm test:watch       # Jest in watch mode
pnpm mock             # json-server only (port 4000, watches db.json)
pnpm storybook        # Storybook on port 6006
pnpm steiger          # FSD architecture lint
pnpm steiger:watch    # FSD architecture lint in watch mode
```

Run a single Jest test file:

```bash
pnpm test -- src/shared/hooks/useOverlay/index.test.tsx
```

---

## Architecture

### Feature-Sliced Design (FSD)

The `src/` directory follows [FSD](https://feature-sliced.design/) with strict top-to-bottom dependency flow:

```
app       → pages, layouts, providers, Next.js route handlers
widgets   → composite UI blocks composed from features/entities
features  → business actions (mutations, forms, hooks per domain)
entities  → domain models: api functions, query options, types
shared    → reusable primitives: ui, hooks, lib, utils, store
```

Upper layers may import from lower layers only. Cross-slice imports at the same layer are forbidden.
See [@docs/architecture.md](@docs/architecture.md) for detailed layer rules and examples.

### ❌ NEVER DO (Critical Rules)

- **DO NOT** call `fetch` or `axios` directly in `features` or `widgets` — always use `entities/{domain}/query/` options
- **DO NOT** put business logic (domain-specific code) in `shared` — `shared` must be domain-agnostic
- **DO NOT** import across slices at the same layer (e.g., `features/todo` importing from `features/auth`)
- **DO NOT** add `'use client'` to components that don't need browser APIs or event handlers
- **DO NOT** create a new Zustand store outside of `shared/store/` or `features/{domain}/store/`
- **DO NOT** use raw hex colors or inline styles — always use design tokens from `globals.css`

### API Proxy

All client-side API calls go through `src/app/api/[...path]/route.ts`. This handler:

- Attaches `Authorization: Bearer <accessToken>` from cookies
- Automatically refreshes the token on 401/403 and retries
- Proxies to `BACKEND_URL` (server-side env var)

The frontend `apiClient` (`src/shared/lib/api/client.ts`) always calls `/api/...`.

### Data Fetching

- **React Query** for all server state. Query options live in `entities/{domain}/query/`
- Infinite scroll uses cursor-based pagination (`cursorDueDate` or `cursorCreatedAt` + `cursorId`)
- Default `staleTime`: 60s. `throwOnError: true` routes errors to `ErrorBoundary`

### Client State

- Zustand stores: `shared/store/` (global) or `features/{domain}/store/` (domain-scoped)
- Auth state uses `persist` + `immer` middleware, stored in `localStorage` under `taskmate-auth`

### Overlay / Modal System

```ts
const { open, close } = useOverlay();
open("modal-id", <MyModal />);
```

- Managed via Zustand layer stack
- `<Overlay />` in root layout renders the stack
- `exitOnUnmount: true` (default) clears all layers on unmount

### AsyncBoundary

```tsx
<AsyncBoundary
  loadingFallback={<Spinner />}
  errorFallback={(err, reset) => <ErrorUI />}
>
  <DataComponent />
</AsyncBoundary>
```

Wraps `ErrorBoundary` + `Suspense` + `QueryErrorResetBoundary`. Always use this for data-fetching components.

### Styling

- **Tailwind CSS v4** with custom design tokens defined in `src/app/globals.css`
- Use `@theme` tokens: `--color-*`, `--text-*`, `typography-*` utilities
- Use `typography-{scale}` utility classes for text (e.g., `typography-body-2`, `typography-label-1`)
- Use `custom-scroll` class for scrollable containers
- **DO NOT** use arbitrary Tailwind values like `text-[14px]` — use defined tokens

### SVG Icons

SVGs under `shared/ui/Icon/svg/` are imported as React components via `@svgr/webpack`.

### MSW Mocking

MSW runs in `development` only. Initialized via `initMocks()` in `app/layout.tsx`.

- Server handler: `shared/mock/server.ts`
- Client handler: `shared/mock/browser.ts`

### Testing

- **Jest** (`pnpm test`): unit/integration tests. Config in `jest.config.ts`. Path alias `@/` → `src/`
- **Vitest** (`pnpm vitest`): Storybook story tests via `@storybook/addon-vitest` + Playwright

### Environment Variables

| Variable                   | Side        | Purpose                  |
| -------------------------- | ----------- | ------------------------ |
| `BACKEND_URL`              | Server only | Proxied backend base URL |
| `NEXT_PUBLIC_API_URL`      | Client      | Public API base URL      |
| `NEXT_PUBLIC_SSE_BASE_URL` | Client      | SSE endpoint base URL    |
| `GOOGLE_CLIENT_ID`         | Server      | Google OAuth             |
| `KAKAO_CLIENT_ID`          | Server      | Kakao OAuth              |

---

## References

- Architecture & layer rules: @docs/architecture.md
- Naming & code conventions: @docs/conventions.md
- Code quality: @docs/code-quality.md
