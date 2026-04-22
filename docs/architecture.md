# Architecture

## Feature-Sliced Design (FSD)

This project follows [FSD](https://feature-sliced.design/). Each layer has a strict responsibility boundary.

### Layer Dependency Flow

```
app         (최상위)
  ↓
widgets
  ↓
features
  ↓
entities
  ↓
shared      (최하위)
```

상위 레이어는 하위 레이어만 import할 수 있다. 같은 레이어 간 cross-slice import는 금지.

---

## Layer Responsibilities

### `app/`

- Next.js route handlers, layouts, global providers
- `app/api/[...path]/route.ts` — API 프록시 (토큰 첨부 및 갱신)
- `app/layout.tsx` — MSW 초기화, Overlay 마운트, QueryClient 제공
- 비즈니스 로직 없음. 조합만.

### `widgets/`

- 여러 feature/entity를 조합한 독립적인 UI 블록
- 페이지에 바로 배치될 수 있는 단위
- 예: `TodoBoard`, `UserProfileCard`, `NotificationDrawer`
- widget 내부에서 직접 API 호출 금지 → features/entities의 hook 사용

### `features/`

- 사용자 행동(mutation, form submit, 비즈니스 액션) 단위
- 예: `CreateTodo`, `DeleteTodo`, `LoginForm`, `ToggleTodoComplete`
- 구성: `ui/`, `model/`, `store/`, `hooks/`
- **직접 fetch/axios 호출 금지** → 반드시 `entities/{domain}/query/` 사용

### `entities/`

- 도메인 모델 정의
- 구성: `api/`, `query/`, `types/`, `ui/` (선택)
- `api/` — apiClient를 사용한 API 함수
- `query/` — React Query queryOptions, queryKey
- `types/` — 도메인 타입 정의 (Request/Response)
- 예: `entities/todo/`, `entities/user/`, `entities/auth/`

### `shared/`

- 도메인 무관한 재사용 가능한 원시 단위
- 구성: `ui/`, `hooks/`, `lib/`, `utils/`, `store/`, `mock/`
- **도메인 개념(todo, user, auth 등) 절대 포함 금지**
- 예: `Button`, `Modal`, `useToggle`, `formatDate`, `apiClient`

---

## Folder Structure Example

```
src/
├── app/
│   ├── api/[...path]/route.ts
│   ├── layout.tsx
│   └── (routes)/
│       └── todo/
│           └── page.tsx
├── widgets/
│   └── todo-board/
│       ├── ui/TodoBoard.tsx
│       └── index.ts
├── features/
│   └── create-todo/
│       ├── ui/CreateTodoForm.tsx
│       ├── hooks/useCreateTodo.ts
│       └── index.ts
├── entities/
│   └── todo/
│       ├── api/todoApi.ts
│       ├── query/todo.queryOptions.ts
│       ├── types/index.ts
│       └── index.ts
└── shared/
    ├── ui/
    │   ├── Button/
    │   ├── Icon/
    │   └── AsyncBoundary/
    ├── hooks/
    │   └── useOverlay/
    ├── lib/
    │   └── api/client.ts
    ├── store/
    │   └── overlay.store.ts
    └── utils/
        └── formatDate.ts
```

---

## New Feature Checklist

새 기능을 추가할 때 다음 순서로 작업한다:

1. `entities/{domain}/types/` — Request/Response 타입 정의
2. `entities/{domain}/api/` — apiClient 기반 API 함수 작성
3. `entities/{domain}/query/` — queryOptions, queryKey 정의
4. `features/{domain-action}/` — mutation hook, form UI 작성
5. `widgets/` — feature + entity 조합 (필요 시)
6. `app/(routes)/` — page에서 widget 배치

---

## API Proxy Architecture

```
Client (browser)
  → /api/todos          (Next.js catch-all route)
  → BACKEND_URL/todos   (실제 백엔드)
```

- `src/app/api/[...path]/route.ts`가 모든 클라이언트 요청을 중계
- 쿠키에서 `accessToken`을 읽어 `Authorization` 헤더 첨부
- 401/403 응답 시 토큰 갱신 후 원래 요청 재시도
- 클라이언트는 항상 `/api/...`로만 호출 (`src/shared/lib/api/client.ts`)

---

## Data Fetching Patterns

### Query Options 작성 위치

```
entities/todo/query/todo.queryOptions.ts
```

```ts
export const todoQueryOptions = {
  list: (params: TodoListParams) =>
    queryOptions({
      queryKey: ["todo", "list", params],
      queryFn: () => getTodos(params),
      staleTime: 60_000,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: ["todo", "detail", id],
      queryFn: () => getTodoById(id),
    }),
};
```

### Infinite Scroll

- cursor-based pagination 사용
- sort mode에 따라 cursor 필드 다름:
  - 마감일 정렬: `cursorDueDate`
  - 생성일 정렬: `cursorCreatedAt` + `cursorId`

### Error Handling

- `throwOnError: true` 설정 → 에러는 `ErrorBoundary`로 전파
- 컴포넌트에서 try/catch 처리 금지, `AsyncBoundary` 사용

---

## State Management Rules

| 상태 종류                 | 위치                                     |
| ------------------------- | ---------------------------------------- |
| 서버 상태                 | React Query (`entities/{domain}/query/`) |
| 전역 UI 상태 (overlay 등) | `shared/store/`                          |
| 도메인 UI 상태            | `features/{domain}/store/`               |
| 로컬 컴포넌트 상태        | `useState`                               |
| 인증 상태                 | `features/auth/store/` (persist + immer) |
