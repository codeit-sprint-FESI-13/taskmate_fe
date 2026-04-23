# entities/todo — queryOptions

---

## `todoQueryOptions` (`query/todo.queryOptions.ts`)

React Query option 팩토리. 컴포넌트에서 `todoApi`를 직접 호출하지 않고 아래 팩토리를 사용한다.

| 팩토리                                                | Query Key                                                            | 설명                   |
| ----------------------------------------------------- | -------------------------------------------------------------------- | ---------------------- |
| `todoQueryOptions.todoListInfinite(goalId, filters)`  | `["todo", goalId, "infinite", "TODO", { keyword, isMyTodo, sort }]`  | TODO 목록 무한 스크롤  |
| `todoQueryOptions.doingListInfinite(goalId, filters)` | `["todo", goalId, "infinite", "DOING", { keyword, isMyTodo, sort }]` | DOING 목록 무한 스크롤 |
| `todoQueryOptions.doneListInfinite(goalId, filters)`  | `["todo", goalId, "infinite", "DONE", { keyword, isMyTodo, sort }]`  | DONE 목록 무한 스크롤  |

### `TodoListInfiniteFilters`

```ts
type TodoListInfiniteFilters = {
  keyword: string; // 제목 검색어
  isMyTodo: boolean; // 내 할 일만 보기
  sort: TodoListSort; // 정렬 기준
};
```

### Cursor 전략

| `sort`              | 다음 페이지 cursor 필드        |
| ------------------- | ------------------------------ |
| `"DUE_DATE"`        | `cursorDueDate` + `cursorId`   |
| 그 외 (생성일 기준) | `cursorCreatedAt` + `cursorId` |

- `hasNext === false` 또는 `nextCursorId === null`이면 `getNextPageParam`이 `undefined`를 반환해 스크롤을 중단한다.
- 페이지 크기는 `TODO_LIST_PAGE_LIMIT`(10) 상수로 관리한다.
- 모든 쿼리의 `staleTime`은 `STALE_TIME.DEFAULT`.
