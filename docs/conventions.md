## Component Patterns

### 기본 컴포넌트 구조

```tsx
// 1. imports
// 2. type 정의
// 3. 컴포넌트 함수
// 4. export default

type UserCardProps = {
  name: string;
  age: number;
};

export default function UserCard({ name, age }: UserCardProps) {
  return <div className="...">...</div>;
}
```

### `'use client'` 사용 기준

```
✅ 추가해야 하는 경우:
  - onClick, onChange 등 이벤트 핸들러 사용
  - useState, useEffect, useRef 등 React 훅 사용
  - 브라우저 API (window, document, localStorage) 접근

❌ 추가하면 안 되는 경우:
  - 데이터만 fetch해서 렌더링하는 서버 컴포넌트
  - props를 받아 정적으로 렌더링하는 순수 컴포넌트
```

### index.ts (Public API)

각 slice/segment는 `index.ts`로 public interface를 명시한다.

```ts
// features/create-todo/index.ts
export { CreateTodoForm } from "./ui/CreateTodoForm";
export { useCreateTodo } from "./hooks/useCreateTodo";
```

외부에서는 내부 경로 직접 import 금지:

```ts
// ❌
import { CreateTodoForm } from "@/features/create-todo/ui/CreateTodoForm";

// ✅
import { CreateTodoForm } from "@/features/create-todo";
```

---

## Styling (Tailwind CSS v4)

### Design Token 사용

`src/app/globals.css`의 `@theme` 토큰을 항상 사용한다.

```tsx
// ❌ arbitrary value 금지
<p className="text-[14px] text-[#111827]">

// ✅ 정의된 토큰 사용
<p className="typography-label-1 text-label-normal">
```

### Typography

`typography-{scale}` utility class 사용:

```tsx
<h1 className="typography-title-2">제목</h1>
<p className="typography-body-2">본문</p>
<span className="typography-caption-1">캡션</span>
```

| 클래스                 | 크기 | 용도        |
| ---------------------- | ---- | ----------- |
| `typography-display-1` | 56px | 최대 타이틀 |
| `typography-title-2`   | 28px | 섹션 타이틀 |
| `typography-heading-2` | 20px | 카드 헤딩   |
| `typography-body-1`    | 18px | 주요 본문   |
| `typography-body-2`    | 16px | 일반 본문   |
| `typography-label-1`   | 14px | 라벨, 버튼  |
| `typography-caption-1` | 12px | 부가 정보   |

### Color Tokens

```tsx
// 텍스트
text - label - normal; // 기본 텍스트 (#111827)
text - label - alternative; // 보조 텍스트 (40% opacity)
text - inverse - normal; // 반전 텍스트 (#ffffff)

// 배경
bg - background - normal;
bg - background - normal - alternative;
bg - background - elevated - normal;

// 브랜드
bg - blue - 800; // Primary (#6c63ff)
bg - green - 800; // Secondary (#2ec4b6)
```

### Scrollable Container

```tsx
<div className="custom-scroll overflow-y-auto">...</div>
```

---

## Zod Schema

```ts
// camelCase + Schema suffix
const emailSchema = z.string().email();

const createTodoSchema = z.object({
  title: z.string().min(1).max(100),
  dueDate: z.string().optional(),
});

// 타입 추출
type CreateTodoInput = z.infer<typeof createTodoSchema>;
```

---

## Zustand Store

```ts
// features/auth/store/auth.store.ts
import { create } from "zustand";
import { persist, immer } from "...";

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),
      clearUser: () =>
        set((state) => {
          state.user = null;
        }),
    })),
    { name: "taskmate-auth" },
  ),
);
```

---

## React Query

```ts
// entities/todo/query/todo.queryOptions.ts
export const todoQueryOptions = {
  list: (params: TodoListParams) =>
    queryOptions({
      queryKey: ["todo", "list", params],
      queryFn: () => getTodos(params),
      staleTime: 60_000,
    }),
};

// 사용 (features or widgets)
const { data } = useSuspenseQuery(todoQueryOptions.list(params));
```

Mutation은 `features/{domain}/mutation/use{Action}Mutation.ts` 에 작성:

```ts
// features/goal/mutation/useCreatePersonalGoalMutation.ts
type UseCreatePersonalGoalMutationOptions = {
  onSuccess?: () => void;
};

export function useCreatePersonalGoalMutation({
  onSuccess,
}: UseCreatePersonalGoalMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, dueDate }: { name: string; dueDate: string }) =>
      goalApi.createGoal({ name, dueDate, type: "PERSONAL" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      onSuccess?.();
    },
  });
}

// 사용 (widgets)
const { mutate: createGoal } = useCreatePersonalGoalMutation({
  onSuccess: () => router.back(),
});
```

규칙:

- navigation, modal 닫기 등 UI side effect는 `onSuccess` 콜백으로 위임 — 훅 내부에서 처리 금지
- `queryClient.invalidateQueries`는 훅 내부 `onSuccess`에서 처리
