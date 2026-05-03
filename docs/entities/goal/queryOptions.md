# entities/goal — queryOptions

---

## `goalQueryOptions` (`query/goal.queryOptions.ts`)

React Query option 팩토리. 컴포넌트에서 `goalApi`를 직접 호출하지 않고 아래 팩토리를 사용한다.

| 팩토리                                                    | Query Key                                     | 설명                      |
| --------------------------------------------------------- | --------------------------------------------- | ------------------------- |
| `goalQueryOptions.getPersonalGoalList()`                  | `["personal", "goals"]`                       | 개인 목표 목록            |
| `goalQueryOptions.getTeamGoalListInfinite(teamId, sort?)` | `["team", teamId, "goals", "infinite", sort]` | 팀 목표 무한 스크롤       |
| `goalQueryOptions.getSummary(goalId)`                     | `["goal", goalId, "summary"]`                 | 목표 요약                 |
| `goalQueryOptions.getFavoriteGoalListInfinite()`          | `["favoriteGoals", "infinite"]`               | 즐겨찾기 목표 무한 스크롤 |

- `sort` 기본값: `"LATEST"`. 가능한 값: `"LATEST"` | `"OLDEST"`
- `getTeamGoalListInfinite`의 `getNextPageParam`은 `lastPage.nextCursor`를 반환하며, `null`이면 다음 페이지 없음.
- `getFavoriteGoalListInfinite`의 `getNextPageParam`은 `lastPage.hasNext`가 `false`이면 `undefined`를 반환.
- `getFavoriteGoalListInfinite`의 페이지 크기는 `FAVORITE_GOALS_PAGE_SIZE`(20) 상수로 관리.
- 모든 쿼리의 `staleTime`은 `STALE_TIME.DEFAULT` (1시간).
