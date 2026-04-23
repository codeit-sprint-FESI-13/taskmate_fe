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

| 메서드 | 함수명                                   | 엔드포인트                          | 설명                                                                                     |
| ------ | ---------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| POST   | `createGoal(data)`                       | `POST /api/goals`                   | `CreatePersonalGoalRequest \| CreateTeamGoalRequest` → `ApiResponse<CreateGoalResponse>` |
| GET    | `getPersonalGoalList()`                  | `GET /api/goals/personal`           | → `ApiResponse<PersonalGoalListResponse>`                                                |
| GET    | `getTeamGoalList(teamId, sort, cursor?)` | `GET /api/teams/{teamId}/goals`     | `SortType`, `GoalListCursor?` → `ApiResponse<TeamGoalListResponse>`                      |
| POST   | `toggleFavorite(goalId)`                 | `POST /api/goals/{goalId}/favorite` | → `ApiResponse<ToggleGoalFavoriteResponse>`                                              |
| GET    | `getSummary(goalId)`                     | `GET /api/goals/{goalId}/summary`   | → `ApiResponse<GoalSummaryResponse>`                                                     |
| DELETE | `deleteGoal(goalId)`                     | `DELETE /api/goals/{goalId}`        | → `ApiResponse<DeleteGoalResponse>`                                                      |
| PATCH  | `updateGoal(goalId, body)`               | `PATCH /api/goals/{goalId}`         | `UpdateGoalRequest` → `ApiResponse<UpdateGoalResponse>`                                  |
| GET    | `getFavoriteGoalList(params?)`           | `GET /api/main/favorite-goals`      | `FavoriteGoalsQueryParams?` → `ApiResponse<FavoriteGoalsSuccessResponse>`                |
