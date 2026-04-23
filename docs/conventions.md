# Conventions

## File & Folder Naming

| 종류            | 규칙                        | 예시                                   |
| --------------- | --------------------------- | -------------------------------------- |
| React 컴포넌트  | PascalCase                  | `UserCard.tsx`, `LoginForm.tsx`        |
| Hooks           | camelCase + `use` prefix    | `useAuth.ts`, `useToggle.ts`           |
| utils / helpers | camelCase                   | `formatDate.ts`, `validateEmail.ts`    |
| constants       | UPPER_SNAKE_CASE            | `MAX_RETRY_COUNT`, `API_BASE_URL`      |
| Zustand store   | camelCase + `.store.ts`     | `user.store.ts`, `auth.store.ts`       |
| 도메인 타입     | camelCase + `.types.ts`     | `goal.types.ts`, `goalList.types.ts`   |
| Zod schema      | camelCase + `Schema` suffix | `emailSchema`, `createTodoSchema`      |
| Test 파일       | 원본 파일 옆에 위치         | `UserCard.test.tsx`, `useAuth.test.ts` |

---

## TypeScript Naming

### 기본 타입 / 인터페이스

```ts
// PascalCase 사용
type User = { ... }
interface TodoItem { ... }
```

### Props 타입

```ts
// {ComponentName}Props
type UserCardProps = {
  name: string;
  age: number;
};
```

### API Response 타입

```ts
// {Entity}Response / {Entity}ListResponse
type UserResponse = {
  id: number;
  name: string;
};

type UserListResponse = {
  users: User[];
  nextCursor?: string;
};
```

### API Request 타입

```ts
// Create{Entity}Request / Update{Entity}Request
type CreateTodoRequest = {
  title: string;
  dueDate?: string;
};

type UpdateTodoRequest = {
  title?: string;
  completed?: boolean;
};
```

---

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

Mutation은 `features/{domain}/hooks/` 에 작성:

```ts
// features/create-todo/hooks/useCreateTodo.ts
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
}
```

---

## Test

```tsx
// UserCard.test.tsx — 컴포넌트 옆에 위치
import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
  it("이름을 렌더링한다", () => {
    render(
      <UserCard
        name="홍길동"
        age={30}
      />,
    );
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });
});
```
