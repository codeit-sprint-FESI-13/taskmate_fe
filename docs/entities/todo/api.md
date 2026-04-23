# entities/todo — API

---

## `todoApi` (`api/todo.api.ts`)

모든 API 메서드는 `apiClient`의 공통 응답 포맷을 따른다.

```ts
type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
  timestamp: string;
};
```

| 메서드     | 함수명                            | 엔드포인트                                   | 설명                                                                |
| ---------- | --------------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| POST       | `create(goalId, todoData)`        | `POST /api/goals/{goalId}/todos`             | `CreateTodoRequest` → `ApiResponse<null>`                           |
| GET        | `getTodoList(goalId, params)`     | `GET /api/goals/{goalId}/todos?status=TODO`  | `TodoListQueryParams` → `ApiResponse<TodoListResponse>`             |
| GET        | `getDoingList(goalId, params)`    | `GET /api/goals/{goalId}/todos?status=DOING` | `TodoListQueryParams` → `ApiResponse<TodoListResponse>`             |
| GET        | `getDoneList(goalId, params)`     | `GET /api/goals/{goalId}/todos?status=DONE`  | `TodoListQueryParams` → `ApiResponse<TodoListResponse>`             |
| PATCH      | `patch(goalId, todoId, todoData)` | `PATCH /api/goals/{goalId}/todos/{todoId}`   | `UpdateTodoRequest` → `ApiResponse<null>`                           |
| DELETE     | `delete(goalId, todoId)`          | `DELETE /api/goals/{goalId}/todos/{todoId}`  | → `ApiResponse<null>`                                               |
| GET        | `getRecent(params?)`              | `GET /api/todos/recent`                      | `TodoInfiniteQueryParams?` → `ApiResponse<RecentTodoListResponse>`  |
| getDueSoon | `getDueSoon(params?)`             | `GET /api/todos/due-soon`                    | `TodoInfiniteQueryParams?` → `ApiResponse<DueSoonTodoListResponse>` |

### 파라미터 빌딩

`getTodoList` / `getDoingList` / `getDoneList`는 내부적으로 `todoListSearchParams` 헬퍼로 cursor·limit 파라미터를 조건부 포함한다. 값이 `undefined`이거나 빈 문자열이면 쿼리 파라미터에서 제외된다.
