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
- **직접 API 호출 금지** — `goalApi.createGoal(...)` 같은 호출은 widget 내부에 두지 않는다
- 데이터 조회: `entities/{domain}/query/` queryOptions 사용
- 데이터 변경(mutation): `features/{domain}/mutation/` 훅 사용

```ts
// ❌ widget에서 goalApi 직접 호출
const handleSubmit = async () => {
  await goalApi.createGoal({ ... });
  queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
};

// ✅ features의 mutation 훅 사용
const { mutate: createGoal } = useCreatePersonalGoalMutation({ onSuccess: () => router.back() });
const handleSubmit = () => createGoal({ name, dueDate });
```

### `features/`

- 사용자 행동(mutation, form submit, 비즈니스 액션) 단위
- 예: `CreateTodo`, `DeleteTodo`, `LoginForm`, `ToggleTodoComplete`
- 구성: `ui/`, `model/`, `store/`, `hooks/`, `mutation/`
- **직접 fetch/axios 호출 금지** → 반드시 `entities/{domain}/api/` 경유
- mutation 훅은 `features/{domain}/mutation/use{Action}Mutation.ts`에 작성
- `onSuccess`에서 `queryClient.invalidateQueries`로 캐시 무효화, navigation 등 side effect는 `onSuccess` 콜백으로 위임

### `entities/`

- 도메인 모델 정의
- 구성: `api/`, `query/`, `types/`, `ui/` (선택)
- `api/` — apiClient를 사용한 API 함수
- `query/` — React Query queryOptions, queryKey
- `types/` — 도메인 타입 정의 (Request/Response)
- 예: `entities/todo/`, `entities/user/`, `entities/auth/`

#### entities/api 작성 규칙

```ts
// ✅ apiClient 호출 결과를 그대로 return
export const goalApi = {
  toggleFavorite: (goalId: number) =>
    apiClient.post<{ success: boolean }>(`/api/goals/${goalId}/favorite`),
};

// ❌ async/await 래핑 금지 — 불필요한 Promise 중첩, return 누락 위험
// ❌ window.dispatchEvent, queryClient.invalidateQueries 등 사이드 이펙트 금지
//    → 캐시 무효화·이벤트 발행은 features/mutation 훅에서 처리
// ❌ throw new Error(...) 등 유효성 검사 금지
//    → 인자 유효성은 호출 측(features)에서 보장, api 함수는 순수 HTTP 호출만
export const goalApi = {
  toggleFavorite: async (goalId: number) => {
    const result = await apiClient.post(...);
    window.dispatchEvent(new CustomEvent("goal-favorite-toggled", ...)); // ❌
    return result;
  },
};
```

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

## Public API Rule (index.ts)

FSD에서 모든 slice/segment는 반드시 `index.ts`를 통해서만 외부에 노출한다.
**내부 경로 직접 import는 어떤 경우에도 금지.**

#### ❌ / ✅ 기본 규칙

```ts
// ❌ 내부 경로 직접 import 금지
import { CreateTodoForm } from "@/features/create-todo/ui/CreateTodoForm";
import { todoQueryOptions } from "@/entities/todo/query/todo.queryOptions";
import { Button } from "@/shared/ui/Button/Button";

// ✅ 반드시 index.ts를 통해 import
import { CreateTodoForm } from "@/features/create-todo";
import { todoQueryOptions } from "@/entities/todo";
import { Button } from "@/shared/ui/Button";
```

#### index.ts 위치 기준

| 레이어         | index.ts 위치 | 설명                              |
| -------------- | ------------- | --------------------------------- |
| `shared/ui`    | segment 단위  | `shared/ui/Button/index.ts`       |
| `shared/hooks` | segment 단위  | `shared/hooks/useToggle/index.ts` |
| `shared/lib`   | segment 단위  | `shared/lib/api/index.ts`         |
| `entities`     | slice 단위    | `entities/todo/index.ts`          |
| `features`     | slice 단위    | `features/create-todo/index.ts`   |
| `widgets`      | slice 단위    | `widgets/todo-board/index.ts`     |

#### index.ts 작성 규칙

```ts
// ✅ named export 명시적으로 작성
// entities/todo/index.ts
export { getTodos, getTodoById, createTodo } from "./api/todoApi";
export { todoQueryOptions } from "./query/todo.queryOptions";
export type { Todo, TodoResponse, CreateTodoRequest } from "./types";

// ❌ export * 남용 금지 — 외부에 뭐가 노출되는지 불명확해짐
export * from "./api/todoApi";
export * from "./types";
```

#### 레이어별 index.ts 예시

```ts
// shared/ui/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// entities/todo/index.ts
export { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todoApi";
export { todoQueryOptions } from "./query/todo.queryOptions";
export type {
  Todo,
  TodoResponse,
  TodoListResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "./types";

// features/create-todo/index.ts
export { CreateTodoForm } from "./ui/CreateTodoForm";
export { useCreateTodo } from "./hooks/useCreateTodo";

// widgets/todo-board/index.ts
export { TodoBoard } from "./ui/TodoBoard";
```

#### steiger로 위반 감지

```bash
pnpm steiger        # FSD 규칙 위반 전체 검사
pnpm steiger:watch  # 파일 변경 시 자동 검사
```

steiger가 자동 감지하는 항목:

- 내부 경로 직접 import
- 상위 레이어 → 하위 레이어 역방향 import
- 같은 레이어 cross-slice import

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
- infinite query도 반드시 `entities/{domain}/query/` 에 `infiniteQueryOptions`로 정의

```ts
// entities/goal/query/goal.queryOptions.ts
getFavoriteGoalListInfinite: () =>
  infiniteQueryOptions({
    queryKey: ["favoriteGoals", "infinite"],
    queryFn: async ({ pageParam }) => {
      const response = await goalApi.getFavoriteGoalList(pageParam ?? {});
      return response.data;
    },
    initialPageParam: { size: 20 } as FavoriteGoalsQueryParams,
    getNextPageParam: (lastPage): FavoriteGoalsQueryParams | undefined =>
      lastPage.hasNext
        ? { size: 20, cursorId: lastPage.nextCursorId, cursorCreatedAt: lastPage.nextCursorCreatedAt }
        : undefined,
    staleTime: STALE_TIME.DEFAULT,
  }),

// 사용 (widgets)
const { ref, data, isFetchingNextPage } = useInfiniteScroll(
  goalQueryOptions.getFavoriteGoalListInfinite(),
);
```

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
