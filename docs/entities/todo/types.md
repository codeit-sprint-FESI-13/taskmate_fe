# entities/todo — types

## 타입 요약

`todoApi`는 모든 응답을 `ApiResponse<T>`로 감싼다. 아래 표의 Response 타입은 `ApiResponse`의 `data` 필드에 해당하는 payload 타입이다.

```ts
type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
  timestamp: string;
};
```

### `todo.types.ts` — 할 일 CRUD

**공통**

| 타입             | 용도                                                             |
| ---------------- | ---------------------------------------------------------------- |
| `TodoStatus`     | `"TODO" \| "DOING" \| "DONE"` — 단건 Todo 상태                   |
| `TodoListSort`   | `"DUE_DATE" \| "CREATED_LATEST" \| "CREATED_OLDEST"` — 정렬 기준 |
| `TodoListStatus` | `"TODO" \| "DOING" \| "DONE"` — 목록 필터 상태                   |

**Request**

| 타입                | 용도                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `CreateTodoRequest` | `{ title, startDate, dueDate, assigneeIds, memo }` — 생성         |
| `UpdateTodoRequest` | `{ title, startDate, dueDate, status, memo, assigneeIds }` — 수정 |

**Response data (ApiResponse의 data 필드)**

| 타입                      | 용도                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `Todo`                    | 단건 할 일 `{ id, goalId, title, startDate, dueDate, status, memo, assigneeSummary, assignees }` |
| `TodoListResponse`        | 목록 페이지 `{ sort, items: Todo[], hasNext, nextCursor* }`                                      |
| `RecentTodoListResponse`  | 최근 할 일 홈 피드 `{ items: TodoItem[], hasNext, nextCursorCreatedAt?, nextCursorId? }`         |
| `DueSoonTodoListResponse` | 마감 임박 홈 피드 `{ items: TodoItem[], hasNext, nextCursorDueDate?, nextCursorId? }`            |
| `TodoItem`                | 홈 피드 카드 단건 `{ todoId, title, teamDisplayName, goalTitle, dueDate }`                       |

**Cursor / Query Params**

| 타입                      | 용도                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| `TodoListQueryParams`     | 목록 조회 파라미터 `{ sort, mineOnly, titleContains, cursor*, limit? }` |
| `TodoInfiniteQueryParams` | 홈 피드 무한 스크롤 파라미터 `{ cursorId?, cursorCreatedAt?, size? }`   |

> `RecentTodoListResponse` / `DueSoonTodoListResponse`의 cursor 필드는 `hasNext === false`일 때 응답에 포함되지 않으므로 optional(`?`)로 선언한다.
