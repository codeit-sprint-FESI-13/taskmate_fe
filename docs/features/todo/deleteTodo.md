# Delete Todo

---

## 진입점

| 위치                  | 파일                             | 조건                              |
| --------------------- | -------------------------------- | --------------------------------- |
| Todo 아이템 삭제 버튼 | `features/todo/ui/List/Item.tsx` | 각 아이템 우측 휴지통 아이콘 클릭 |

`useTodoDeleteModal({ todoId: todo.id.toString() }).openTodoDeleteModal()`을 호출한다.

---

## 데이터 흐름

```
Item.tsx — 휴지통 버튼 클릭 (e.stopPropagation으로 상세 모달 열림 방지)
  │  todoId: todo.id.toString()
  ▼
useTodoDeleteModal({ todoId })    ← useGoalId() — URL params에서 goalId 추출
  │  useDeleteTodoMutation({ onSuccess: closeTodoDeleteModal })
  │
  ▼
overlay.open(TODO_DELETE_MODAL_ID, <TodoDeleteModal onClose={...} onConfirm={...} />)
  │
  ▼  사용자가 "삭제" 버튼 클릭
onConfirm() → deleteTodo({ goalId, todoId })
  │
  ▼
useDeleteTodoMutation
  │ mutationFn                    todoApi.delete(goalId, todoId)
  │                               DELETE /api/goals/{goalId}/todos/{todoId}
  │ onSuccess                     queryClient.invalidateQueries(["todo", goalId, "list"])
  │                               성공 토스트 ("할 일 삭제 완료")
  │                               onSuccess 콜백 → overlay.close()
  │ onError                       에러 토스트 ("할 일 삭제 실패")
```

---

## API

**`DELETE /api/goals/{goalId}/todos/{todoId}`**

Request Body: 없음

Response: `ApiResponse<null>`

**캐시 무효화 키:** `["todo", goalId, "list"]`

---

## 모달 구성

확인 모달로, 폼 입력 없이 취소/삭제 버튼만 존재한다.

| 요소      | 내용                                      |
| --------- | ----------------------------------------- |
| 제목      | `"할 일을 삭제하시겠습니까?"` (고정 문구) |
| 취소 버튼 | `onClose` 호출 → 모달 닫기                |
| 삭제 버튼 | `onConfirm` 호출 → API 호출 후 모달 닫기  |

`goalId`와 `todoId`는 모두 `useTodoDeleteModal` 내부에서 처리하며, `TodoDeleteModal`에는 전달하지 않는다.

---

## 관련 파일 위치

```
src/
├── features/todo/
│   ├── hooks/
│   │   └── useTodoDeleteModal.tsx       — 모달 open/close, goalId 조회, mutation 연결
│   ├── mutation/
│   │   └── useDeleteTodoMutation.ts     — API 호출, 캐시 무효화, 토스트, onSuccess 콜백
│   └── ui/
│       ├── TodoDeleteModal/
│       │   └── TodoDeleteModal.tsx      — 삭제 확인 모달 UI
│       └── List/
│           └── Item.tsx                 — 진입점 (휴지통 버튼)
│
└── entities/todo/
    └── api/todo.api.ts                  — todoApi.delete()
```
