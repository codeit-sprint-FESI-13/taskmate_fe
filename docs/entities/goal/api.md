# entities/goal — API

---

## `goalApi` (`api/api.ts`)

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

| 메서드 | 함수명                                   | 엔드포인트                          | 설명                                                                      |
| ------ | ---------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| POST   | `createPersonalGoal(data)`               | `POST /api/goals`                   | `CreatePersonalGoalRequest` → `ApiResponse<CreateGoalResponse>`           |
| POST   | `createTeamGoal(data)`                   | `POST /api/goals`                   | `CreateTeamGoalRequest` → `ApiResponse<CreateGoalResponse>`               |
| GET    | `getPersonalGoalList()`                  | `GET /api/goals/personal`           | → `ApiResponse<PersonalGoalListResponse>`                                 |
| GET    | `getTeamGoalList(teamId, sort, cursor?)` | `GET /api/teams/{teamId}/goals`     | `SortType`, `GoalListCursor?` → `ApiResponse<TeamGoalListResponse>`       |
| POST   | `toggleFavorite(goalId)`                 | `POST /api/goals/{goalId}/favorite` | → `ApiResponse<ToggleGoalFavoriteResponse>`                               |
| GET    | `getSummary(goalId)`                     | `GET /api/goals/{goalId}/summary`   | → `ApiResponse<GoalSummaryResponse>`                                      |
| DELETE | `deleteGoal(goalId)`                     | `DELETE /api/goals/{goalId}`        | → `ApiResponse<DeleteGoalResponse>`                                       |
| PATCH  | `updateGoal(goalId, body)`               | `PATCH /api/goals/{goalId}`         | `UpdateGoalRequest` → `ApiResponse<UpdateGoalResponse>`                   |
| GET    | `getFavoriteGoalList(params?)`           | `GET /api/main/favorite-goals`      | `FavoriteGoalsQueryParams?` → `ApiResponse<FavoriteGoalsSuccessResponse>` |

### `getTeamGoalList` 커서 규칙

`cursor` 파라미터는 `cursorCreatedAt`과 `cursorId`를 **반드시 함께** 전달해야 한다. 둘 중 하나만 전달하면 런타임에 `Error`를 throw한다.
