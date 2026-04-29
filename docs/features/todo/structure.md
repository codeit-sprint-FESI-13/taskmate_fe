# features/todo — 디렉터리 구조

`src/features/todo`는 할 일(Todo) 도메인의 사용자 행동(생성·삭제·상태 변경·상세 보기)을 담당하는 feature slice다.

---

## 디렉터리 트리

```
src/features/todo/
├── index.ts                          — public API (외부 노출 진입점)
│
├── constants/
│   └── todoColumnSort.ts             — 컬럼별 정렬 옵션·기본값 상수
│
├── hooks/
│   ├── useCreateTodoForm.ts          — 할 일 생성 폼 상태 및 submit 핸들러
│   ├── useTodoCreateModal.tsx        — 생성 모달 open/close 및 사전 데이터 조회
│   ├── useTodoDeleteModal.tsx        — 삭제 확인 모달 open/close
│   └── useTodoDetailModal.tsx        — 상세 모달 open/close 및 사전 데이터 조회
│
├── mutation/
│   ├── useCreateTodoMutation.ts      — POST /api/goals/:goalId/todos
│   ├── useDeleteTodoMutation.ts      — DELETE /api/goals/:goalId/todos/:todoId
│   └── usePatchTodoStatusMutation.ts — PATCH /api/goals/:goalId/todos/:todoId (낙관적 업데이트)
│
├── utils/
│   └── formatDDay.ts                 — 날짜 → D-day 문자열 변환
│
├── mock/
│   └── todos.ts                      — MSW 핸들러 (개발 환경 전용)
│
└── ui/
    ├── List/
    │   ├── index.tsx                 — TodoList.List 컨테이너 (정렬 셀렉터 + 스크롤 영역)
    │   ├── Item.tsx                  — TodoList.Item (상태 뱃지·제목·D-day·담당자·삭제 버튼)
    │   ├── CreateButton.tsx          — TodoList.CreateButton ("할 일 추가" 버튼)
    │   ├── TodoAssigneeAvatars.tsx   — 담당자 아바타 오버랩 표시 (최대 4개)
    │   └── TodoStatusSelect.tsx     — 상태 변경 드롭다운 + 색상 뱃지
    │
    ├── CreateTodoModal/
    │   ├── TodoCreateModal.tsx       — 할 일 생성 폼 모달 UI
    │   └── AssigneeSelect/
    │       └── index.tsx             — 팀 목표용 담당자 멀티 셀렉트 드롭다운
    │
    ├── TodoDeleteModal/
    │   └── TodoDeleteModal.tsx       — 삭제 확인 모달 UI (취소/삭제 버튼만)
    │
    ├── TodoDetailModal/
    │   └── TodoDetailModal.tsx       — 할 일 상세 읽기 전용 모달 UI
    │
    └── TodoItem/
        ├── index.tsx                 — TodoItem 복합 객체 (하위 컴포넌트 묶음)
        ├── Row.tsx                   — 가로 배치 flex 컨테이너
        ├── Wrapper.tsx               — 라운드 카드 컨테이너
        ├── Name/Name.tsx             — 제목 텍스트
        ├── Day/Day.tsx               — D-day 색상 뱃지 (blue·red·gray)
        ├── Goal/Goal.tsx             — 목표명 텍스트
        └── Team/Team.tsx             — 팀명 뱃지
```

---

## index.ts — Public API

외부 레이어(widgets 등)는 `features/todo/index.ts`를 통해서만 import한다.

```ts
// features/todo/index.ts 노출 목록
export type { TodoListSortLabel };
export { TODO_COLUMN_DEFAULT_SORT_LABEL };
export { TODO_COLUMN_SORT_LABEL_ORDER };
export { TODO_LIST_SORT_BY_LABEL };
export { useTodoCreateModal };
export { TodoList }; // { List, Item, CreateButton }
export { formatDDay };
```

> `useTodoDeleteModal`, `useTodoDetailModal`, `usePatchTodoStatusMutation` 등 내부에서만 사용되는 항목은 노출하지 않는다.

---

## 세그먼트별 책임

### `constants/`

정렬 레이블(`"마감일 순"`, `"최신순"`, `"오래된순"`)과 API 값(`DUE_DATE`, `CREATED_LATEST`, `CREATED_OLDEST`) 간 매핑, 그리고 컬럼 상태(`TODO` / `DOING` / `DONE`)별 기본 정렬 및 노출 순서를 관리한다.

### `hooks/`

각 사용자 행동에 진입하는 overlay 열기 로직과 폼 상태를 캡슐화한다.

| 훅                   | 역할                                                             |
| -------------------- | ---------------------------------------------------------------- |
| `useCreateTodoForm`  | 폼 상태(담당자·시작일), 날짜 유효성 검사, submit → mutation 연결 |
| `useTodoCreateModal` | 목표·팀·유저·팀 멤버 사전 조회 후 `TodoCreateModal` overlay open |
| `useTodoDeleteModal` | goalId 조회 후 `TodoDeleteModal` overlay open, mutation 연결     |
| `useTodoDetailModal` | 목표·팀 사전 조회 후 `TodoDetailModal` overlay open              |

### `mutation/`

React Query `useMutation` 기반. 캐시 무효화와 토스트는 훅 내부 `onSuccess`/`onError`에서 처리한다.

| 훅                           | 특이사항                                       |
| ---------------------------- | ---------------------------------------------- |
| `useCreateTodoMutation`      | 성공 시 `["todo", goalId, "list"]` 무효화      |
| `useDeleteTodoMutation`      | `onSuccess` 콜백 위임 지원 (모달 닫기용)       |
| `usePatchTodoStatusMutation` | 낙관적 업데이트 적용, 에러 시 이전 캐시로 롤백 |

### `ui/`

| 디렉터리           | 역할                                                      |
| ------------------ | --------------------------------------------------------- |
| `List/`            | 컬럼 컨테이너(리스트·정렬·푸터)와 아이템 행 UI            |
| `CreateTodoModal/` | 생성 폼 모달 및 담당자 멀티 셀렉트                        |
| `TodoDeleteModal/` | 삭제 확인 모달                                            |
| `TodoDetailModal/` | 상세 읽기 전용 모달                                       |
| `TodoItem/`        | 아이템 내 각 요소(이름·날짜·목표·팀)의 원시 표현 컴포넌트 |

### `utils/`

`formatDDay(dueDate: string): string` — ISO 날짜 문자열을 D-day 표기로 변환한다.

| 입력               | 출력      |
| ------------------ | --------- |
| 오늘 이전          | `"D+N"`   |
| 오늘               | `"D-day"` |
| 오늘 이후          | `"D-N"`   |
| 유효하지 않은 형식 | `"D-?"`   |

### `mock/`

MSW `http` 핸들러 모음. 개발 환경에서 실제 백엔드 없이 todo CRUD를 시뮬레이션한다. `shared/mock/`에서 통합 등록되며 프로덕션 빌드에는 포함되지 않는다.

---

## 의존 관계

```
features/todo
  ↓ (import)
entities/todo          — todoApi, todoQueryOptions, Todo 타입
entities/goal          — goalQueryOptions.getSummary
entities/team          — teamQueryOptions.summary, teamQueryOptions.memberList
entities/user          — userQueries.myInfo
shared/hooks/useOverlay
shared/hooks/useGoalId
shared/ui/             — Button, Icon, Modal 등
```

같은 레이어의 다른 slice(`features/auth` 등)는 import하지 않는다.
