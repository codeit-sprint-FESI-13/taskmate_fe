# Create Todo

---

## 진입점

| 위치                   | 파일                                       | 조건            |
| ---------------------- | ------------------------------------------ | --------------- |
| Todo 컬럼 하단 버튼    | `features/todo/ui/List/CreateButton.tsx`   | 항상 표시       |
| Todo 컬럼 빈 상태 버튼 | `widgets/todo/TodoSection/state/Empty.tsx` | 할 일이 없을 때 |

두 진입점 모두 `useTodoCreateModal().openTodoCreateModal()`을 호출한다.

---

## 폼 필드 스펙

| 필드          | 타입     | 필수 | 제약                         | 비고               |
| ------------- | -------- | ---- | ---------------------------- | ------------------ |
| `title`       | string   | ✅   | —                            | 할 일 제목         |
| `startDate`   | string   | ✅   | `YYYY-MM-DD`                 | 시작 날짜          |
| `dueDate`     | string   | ✅   | `YYYY-MM-DD`, `>= startDate` | 마감 날짜          |
| `assigneeIds` | number[] | —    | 빈 배열 허용                 | 담당자 userId 목록 |
| `memo`        | string   | —    | 최대 80자                    | 메모               |

### 담당자 필드 — 개인 목표 vs 팀 목표

| 구분      | 조건 (`isPersonal`)           | 동작                                                    |
| --------- | ----------------------------- | ------------------------------------------------------- |
| 개인 목표 | `true` (URL에 `teamId` 없음)  | 로그인 유저로 고정, 수정 불가 (`AssigneeSelect` 미표시) |
| 팀 목표   | `false` (URL에 `teamId` 있음) | `AssigneeSelect` 드롭다운으로 팀 멤버 중 선택           |

`initialAssigneeIds`:

- 개인 목표: `[myInfo.id]`
- 팀 목표: `[]`

---

## 유효성 검사

| 검사                                             | 시점    | 처리                                                                                         |
| ------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------- |
| 필수 필드 누락 (`title`, `startDate`, `dueDate`) | submit  | HTML `required` — 브라우저 기본 검사                                                         |
| `dueDate < startDate`                            | submit  | 브라우저 `min={startDate}` 속성으로 1차 차단, `useToast` 에러 토스트로 2차 차단 후 제출 중단 |
| `memo` 최대 80자                                 | 입력 중 | `<textarea maxLength={80}>`                                                                  |

---

## 데이터 흐름

```
CreateButton / Empty
  │
  ▼
useTodoCreateModal                    ← useGoalId() — URL params에서 goalId 추출
  │ useSuspenseQuery                    goalQueryOptions.getSummary(goalId) → goalName
  │ useQuery (팀 목표일 때만)           teamQueryOptions.summary(teamId) → teamName
  │ useQuery (개인 목표일 때만)         userQueries.myInfo() → myInfo
  │ useQuery (팀 목표일 때만)           teamQueryOptions.memberList(teamId) → memberList
  │
  ▼
overlay.open(TODO_CREATE_MODAL_ID, <TodoCreateModal ...props />)
  │
  ▼
TodoCreateModal                       ← useGoalId() — URL params에서 goalId 직접 읽음 (prop 아님)
  │                                   ← useCreateTodoForm({ goalId, onSuccess: onClose, initialAssigneeIds })
  │                                       assigneeIds state — 선택된 담당자 ID 목록
  │                                       startDate state — 마감일 min 동기화용
  │                                       handleSubmit — 유효성 검사 + createTodo 호출
  │
  ▼
useCreateTodoMutation
  │ mutationFn                          todoApi.create(goalId, todoData)
  │                                     POST /api/goals/{goalId}/todos
  │ onSuccess                           queryClient.invalidateQueries(["todo", goalId, "list"])
  │                                     성공 토스트
  │ onError                             에러 토스트
  │
  ▼
onSuccess 콜백 → overlay.close()
```

---

## API

**`POST /api/goals/{goalId}/todos`**

Request Body (`CreateTodoRequest`):

```ts
{
  title: string;         // 필수
  startDate: string;     // 필수, "YYYY-MM-DD"
  dueDate: string;       // 필수, "YYYY-MM-DD"
  assigneeIds: number[]; // 담당자 userId 목록 (빈 배열 허용)
  memo: string;          // 선택, 최대 80자
}
```

Response: `ApiResponse<null>`

**캐시 무효화 키:** `["todo", goalId, "list"]`

---

## 모달에 사전 주입되는 데이터

`useTodoCreateModal`이 `overlay.open()` 시 `TodoCreateModal`에 props로 전달한다.  
`goalId`는 props로 전달하지 않고, `TodoCreateModal` 내부에서 `useGoalId()`로 직접 읽는다.

| prop                    | 타입     | 출처                                                                   |
| ----------------------- | -------- | ---------------------------------------------------------------------- |
| `goalName`              | string   | `goalQueryOptions.getSummary(goalId)`                                  |
| `teamName`              | string   | `teamQueryOptions.summary(teamId).teamName` (팀) / `"개인"` (개인)     |
| `memberList`            | Member[] | `teamQueryOptions.memberList(teamId)` (팀) / `[personalMember]` (개인) |
| `isAssigneeFixed`       | boolean  | `isPersonal` 여부                                                      |
| `fixedAssigneeNickname` | string?  | `myInfo.nickname` (개인 목표에서만, 없으면 `"나"` 폴백)                |
| `initialAssigneeIds`    | number[] | `[myInfo.id]` (개인) / `[]` (팀)                                       |

---

## 미완성 항목 (TODO)

> `features/todo/ui/CreateTodoModal/TodoCreateModal.tsx` 참고

- 할 일 생성 실패 시 UI 처리 미구현 (현재 뮤테이션 에러 토스트만 표시)
- 팀 멤버 리스트 연동 미완성

---

## 관련 파일 위치

```
src/
├── features/todo/
│   ├── index.ts                           — public API (useTodoCreateModal, TodoList 등 외부 노출)
│   ├── hooks/
│   │   ├── useTodoCreateModal.tsx         — 모달 open/close, 사전 데이터 조회, overlay 관리
│   │   └── useCreateTodoForm.ts           — 폼 상태, 유효성 검사, submit 핸들러
│   ├── mutation/
│   │   └── useCreateTodoMutation.ts       — API 호출, 캐시 무효화, 토스트
│   └── ui/
│       ├── CreateTodoModal/
│       │   ├── TodoCreateModal.tsx        — 모달 UI (폼 레이아웃)
│       │   └── AssigneeSelect/
│       │       └── index.tsx             — 팀 목표 담당자 선택 드롭다운
│       └── List/
│           └── CreateButton.tsx          — 할 일 추가 버튼 (컬럼 하단)
│
├── entities/todo/
│   ├── api/todo.api.ts                   — todoApi.create()
│   └── types/todo.types.ts              — CreateTodoRequest 타입
│
└── widgets/todo/TodoSection/
    └── state/Empty.tsx                   — 빈 상태 진입점
```
