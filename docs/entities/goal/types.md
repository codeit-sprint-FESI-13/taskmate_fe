# entities/goal — types

## 타입 요약

`goalApi`는 모든 응답을 `ApiResponse<T>`로 감싼다. 아래 표의 Response 타입은 `ApiResponse`의 `data` 필드에 해당하는 payload 타입이다.

```ts
type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
  timestamp: string;
};
```

### `goal.types.ts` — 단일 목표 CRUD

**Request**

| 타입                        | 용도                                      |
| --------------------------- | ----------------------------------------- |
| `CreatePersonalGoalRequest` | `{ name, dueDate, type: "PERSONAL" }`     |
| `CreateTeamGoalRequest`     | `{ name, dueDate, teamId, type: "TEAM" }` |
| `UpdateGoalRequest`         | `{ name: string, dueDate: string }`       |

**Response**

| 타입                         | 용도                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `CreateGoalResponse`         | 생성 성공 payload (`ApiResponse<CreateGoalResponse>`의 `data`) |
| `UpdateGoalResponse`         | `{ id, name, dueDate }`                                        |
| `DeleteGoalResponse`         | `null`                                                         |
| `ToggleGoalFavoriteResponse` | 즐겨찾기 토글 결과 payload                                     |
| `PersonalGoalListResponse`   | `{ goalId, goalName }[]`                                       |
| `TeamGoalListItem`           | `{ goalId, name, progressPercent, isFavorite, createdAt }`     |
| `TeamGoalListResponse`       | `{ items, nextCursor, size }`                                  |
| `GoalSummaryResponse`        | `{ goalId, goalName, dueDate, dDay, progressPercent }`         |

폼 유효성 검사용 Zod 스키마: `createGoalSchema` — `name`(1~30자), `date`(필수).

---

### `goalList.types.ts` — 목표 목록 조회

| 타입                       | 용도                                                       |
| -------------------------- | ---------------------------------------------------------- |
| `SortType`                 | `"LATEST" \| "OLDEST"`                                     |
| `GoalListCursor`           | `{ cursorCreatedAt: string, cursorId: number }`            |
| `PersonalGoalListResponse` | `{ goalId, goalName }[]`                                   |
| `TeamGoalListItem`         | `{ goalId, name, progressPercent, isFavorite, createdAt }` |
| `TeamGoalListResponse`     | `{ items, nextCursor, size }`                              |

---

### `favorite.types.ts`

| 타입                           | 용도                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `FavoriteGoalItem`             | `{ teamId, teamName, goalId, goalName, progressPercent, isFavorite, createdAt }` |
| `FavoriteGoalsSuccessResponse` | `{ items, hasNext, nextCursorCreatedAt, nextCursorId }`                          |
