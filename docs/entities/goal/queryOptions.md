# entities/goal — queryOptions

---

## `goalQueryOptions` (`query/goal.queryOptions.ts`)

React Query option 팩토리. 컴포넌트에서 `goalApi`를 직접 호출하지 않고 아래 팩토리를 사용한다.

| 팩토리                                                    | Query Key                                     | 설명                       |
| --------------------------------------------------------- | --------------------------------------------- | -------------------------- |
| `goalQueryOptions.getPersonalGoalList()`                  | `["personal", "goals"]`                       | 개인 목표 목록             |
| `goalQueryOptions.getTeamGoalList(teamId, sort?)`         | `["team", teamId, "goals", sort]`             | 팀 목표 목록 (단일 페이지) |
| `goalQueryOptions.getTeamGoalListInfinite(teamId, sort?)` | `["team", teamId, "goals", "infinite", sort]` | 팀 목표 무한 스크롤        |
| `goalQueryOptions.getSummary(goalId)`                     | `["goal", goalId, "summary"]`                 | 목표 요약                  |

- `sort` 기본값: `"LATEST"`. 가능한 값: `"LATEST"` | `"OLDEST"`
- `getTeamGoalListInfinite`의 `getNextPageParam`은 `lastPage.nextCursor`를 반환하며, `null`이면 다음 페이지 없음.
- 모든 쿼리의 `staleTime`은 `STALE_TIME.DEFAULT` (60초).

---
