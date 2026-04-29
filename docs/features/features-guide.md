# features/ — 레이어 가이드

`features/`는 **사용자 행동(mutation, form submit, 비즈니스 액션)** 을 담당하는 FSD 레이어다.  
데이터를 조회하는 것은 `entities/`의 역할이고, UI를 조합하는 것은 `widgets/`의 역할이다.  
`features/`는 그 중간에서 "사용자가 무언가를 했을 때 어떤 일이 일어나는가"를 책임진다.

---

## 현재 슬라이스 목록

| 슬라이스       | 담당 도메인                                |
| -------------- | ------------------------------------------ |
| `auth`         | 로그인·로그아웃·회원가입, 인증 상태 스토어 |
| `goal`         | 목표 생성·수정·삭제·즐겨찾기               |
| `notification` | SSE 알림 구독                              |
| `team`         | 팀 생성                                    |
| `todo`         | 할 일 생성·삭제·상태 변경·상세 보기        |
| `trash`        | 휴지통 항목 삭제·복구                      |
| `user`         | 프로필 수정·이미지 업로드·회원 탈퇴        |

---

## 슬라이스 내부 구조

슬라이스마다 필요한 세그먼트만 둔다. 모든 세그먼트가 항상 필요한 것은 아니다.

```
features/{domain}/
├── index.ts          — public API (외부에 노출할 것만 명시적으로 export)
├── mutation/         — useMutation 훅
├── hooks/            — overlay·form 등 사용자 행동 진입점 훅
├── ui/               — 이 feature 전용 모달·폼 컴포넌트
├── store/            — 도메인 UI 상태 (전역 상태가 필요한 경우만)
├── constants/        — 이 feature 내에서만 쓰는 상수
├── utils/            — 이 feature 내에서만 쓰는 순수 함수
└── mock/             — MSW 핸들러 (개발 환경 전용)
```

---

## 세그먼트별 규칙

### `mutation/`

`useMutation` 훅 하나 = 파일 하나. 파일명은 `use{Action}Mutation.ts`.

```ts
// features/goal/mutation/useCreatePersonalGoalMutation.ts

type UseCreatePersonalGoalMutationOptions = {
  onSuccess?: () => void; // UI side effect는 콜백으로 위임
};

export function useCreatePersonalGoalMutation({
  onSuccess,
}: UseCreatePersonalGoalMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, dueDate }: CreatePersonalGoalVariables) =>
      goalApi.createGoal({ name, dueDate, type: "PERSONAL" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal", "goals"] });
      onSuccess?.(); // 모달 닫기·라우팅 등은 호출 측에서 결정
    },
  });
}
```

**규칙:**

- `mutationFn`은 반드시 `entities/{domain}/api/`의 함수를 호출한다. 직접 `fetch`/`axios` 금지.
- `queryClient.invalidateQueries`는 훅 내부 `onSuccess`에서 처리한다.
- navigation·모달 닫기 등 UI side effect는 `onSuccess` 콜백으로 위임하고 훅 내부에서 처리하지 않는다.
- 에러 처리가 필요하면 `throwOnError: false` + `onError` 토스트 조합을 사용한다.

**낙관적 업데이트**가 필요한 경우 `onMutate` → `onError(rollback)` → `onSettled(invalidate)` 패턴을 쓴다.

```ts
// features/todo/mutation/usePatchTodoStatusMutation.ts
return useMutation({
  mutationFn: ...,
  onMutate: async (variables) => {
    await queryClient.cancelQueries({ queryKey });
    const previousData = queryClient.getQueryData(queryKey);
    queryClient.setQueryData(queryKey, /* 낙관적 업데이트 */);
    return { previousData };  // rollback용으로 context에 저장
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(queryKey, context?.previousData);
  },
  onSettled: (_data, _err, variables) => {
    queryClient.invalidateQueries({ queryKey });  // 성공·실패 무관 최종 동기화
  },
});
```

---

### `hooks/`

overlay(모달)를 열거나 폼 상태를 관리하는 훅. `use{Domain}{Action}Modal.tsx` 또는 `use{Action}Form.ts` 형태.

**모달 훅 패턴 (`useOverlay`):**

```tsx
// features/todo/hooks/useTodoCreateModal.tsx
export const useTodoCreateModal = () => {
  const overlay = useOverlay();

  // 모달에 사전 주입할 데이터를 여기서 조회
  const {
    data: { goalName },
  } = useSuspenseQuery(goalQueryOptions.getSummary(goalId));

  const openTodoCreateModal = () => {
    overlay.open(
      "todo-create-modal", // overlay ID — 슬라이스 내 고유 상수로 관리
      <TodoCreateModal
        onClose={() => overlay.close()}
        goalName={goalName}
        // ...
      />,
    );
  };

  return { openTodoCreateModal, closeTodoCreateModal: () => overlay.close() };
};
```

**규칙:**

- 모달에 필요한 데이터 조회는 모달 컴포넌트 안이 아니라 **이 훅 안**에서 처리한다.
- overlay ID는 훅 파일 상단에 상수로 선언한다 (`const TODO_CREATE_MODAL_ID = "todo-create-modal"`).
- `onClose`는 항상 props로 전달해 모달 컴포넌트가 닫기 방식에 의존하지 않도록 한다.

**폼 훅 패턴:**

```ts
// features/todo/hooks/useCreateTodoForm.ts
export const useCreateTodoForm = ({ goalId, onSuccess, initialAssigneeIds }) => {
  const { mutate, isPending } = useCreateTodoMutation();
  const [assigneeIds, setAssigneeIds] = useState(initialAssigneeIds);
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 검사
    if (dueDate < startDate) { showToast("error", "..."); return; }
    mutate({ goalId, todoData: { ... } }, { onSuccess });
  };

  return { assigneeIds, setAssigneeIds, startDate, handleSubmit, isPending };
};
```

---

### `ui/`

이 feature에서만 사용하는 모달·폼 컴포넌트. `widgets/`에서 재사용하지 않는다.

- 컴포넌트는 **props만 받아 렌더링**한다. 데이터 조회나 mutation 호출은 하지 않는다.
- 폼 상태는 `hooks/` 훅으로 분리하고 컴포넌트에서는 핸들러만 받는다.
- `index.ts`를 통해 외부에 노출하지 않아도 된다 (훅을 통해 간접 사용되기 때문).

---

### `store/`

도메인 UI 상태가 필요할 때만 만든다. 전역 UI 상태(`overlay` 등)는 `shared/store/`를 사용한다.

현재 프로젝트에서 `features/` 내 store는 `auth/store/auth.store.ts` 하나뿐이며, `persist` + `immer` 미들웨어를 사용한다.

```ts
// features/auth/store/auth.store.ts
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
    { name: "taskmate-auth" }, // localStorage 키
  ),
);
```

---

### `mock/`

MSW `http` 핸들러. `shared/mock/` 에서 통합 등록되며, 개발 환경에서만 활성화된다.  
새 슬라이스에 mock이 필요하면 `{domain}Handlers` 배열을 export하고 `shared/mock/`에 추가한다.

---

## index.ts — Public API

외부 레이어(widgets 등)에서 필요한 것만 명시적으로 노출한다.

```ts
// features/todo/index.ts
export type { TodoListSortLabel };
export { TODO_COLUMN_DEFAULT_SORT_LABEL };
export { TODO_COLUMN_SORT_LABEL_ORDER };
export { TODO_LIST_SORT_BY_LABEL };
export { useTodoCreateModal };
export { TodoList };
export { formatDDay };
```

- `export *` 금지 — 무엇이 노출되는지 명확하게 유지한다.
- 내부 구현(mutation 훅·모달 컴포넌트 등)은 feature 안에서만 사용하면 노출하지 않아도 된다.

---

## 금지 사항

| 규칙                                                | 이유                                                  |
| --------------------------------------------------- | ----------------------------------------------------- |
| `fetch`/`axios` 직접 호출 금지                      | API 함수는 `entities/{domain}/api/`에만 존재해야 한다 |
| 같은 레이어 cross-slice import 금지                 | `features/todo`가 `features/goal`을 import하는 것 등  |
| `shared/`에 도메인 개념 추가 금지                   | `shared`는 도메인 무관 원시 단위만 허용한다           |
| mutation 훅 내부에서 navigation·모달 닫기 처리 금지 | side effect는 `onSuccess` 콜백으로 위임한다           |

---

## 새 슬라이스 추가 순서

1. `entities/{domain}/types/` — Request/Response 타입 정의
2. `entities/{domain}/api/` — apiClient 기반 API 함수
3. `entities/{domain}/query/` — queryOptions, queryKey
4. `features/{domain}/mutation/use{Action}Mutation.ts` — 뮤테이션 훅
5. `features/{domain}/hooks/use{Action}Modal.tsx` — overlay 훅 (모달이 있을 때)
6. `features/{domain}/ui/` — 모달·폼 컴포넌트
7. `features/{domain}/index.ts` — 외부 노출 항목 정리
8. `features/{domain}/mock/` — MSW 핸들러 (개발 환경 필요 시)
