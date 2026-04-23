# entities 레이어 작성 가이드

`entities/goal`을 기준 구현으로 삼아 모든 entity slice에 공통으로 적용하는 규칙을 정리한다.

---

## 폴더 구조

```
src/entities/{domain}/
├── index.ts                    # Public API — 외부 import는 반드시 여기서
├── api/
│   └── {domain}.api.ts         # apiClient 기반 API 함수 모음
├── query/
│   └── {domain}.queryOptions.ts  # React Query option 팩토리
├── types/
│   └── {domain}.types.ts       # Request / Response 타입 정의
└── model/                      # (선택) Zod 스키마 및 파생 타입
    └── {domain}.model.ts
```

- `types/`는 관심사가 명확히 다를 때 파일을 분리한다 (`goal.types.ts`, `goalList.types.ts`, `favorite.types.ts`).
- `model/`은 폼 유효성 검사 스키마가 필요한 경우에만 추가한다. 없으면 만들지 않는다.
- `ui/`는 entity 전용 표시 컴포넌트가 필요한 경우에만 추가한다.

---

## `api/` — API 함수 작성 규칙

### 기본 원칙

```ts
// ✅ apiClient 호출 결과를 그대로 return — 표현식 한 줄
export const goalApi = {
  deleteGoal: (goalId: string) =>
    apiClient.delete<ApiResponse<DeleteGoalResponse>>(`/api/goals/${goalId}`),
};
```

### ❌ 금지 사항

```ts
export const goalApi = {
  // ❌ async/await 래핑 금지 — return 누락 위험 + 불필요한 Promise 중첩
  deleteGoal: async (goalId: string) => {
    const res = await apiClient.delete(...);
    return res;
  },

  // ❌ 사이드 이펙트 금지 — 캐시 무효화·이벤트는 features/mutation에서 처리
  toggleFavorite: async (goalId: string) => {
    const res = await apiClient.post(...);
    queryClient.invalidateQueries(...); // ❌
    window.dispatchEvent(...);          // ❌
    return res;
  },

  // ❌ 유효성 검사·throw 금지 — 인자 유효성은 호출 측(features)에서 보장
  getTeamGoalList: (teamId: string, cursor?: Partial<Cursor>) => {
    if (!cursor?.cursorCreatedAt && cursor?.cursorId != null) {
      throw new Error(...); // ❌
    }
    return apiClient.get(...);
  },
};
```

### 파라미터 빌딩이 필요한 경우

조건에 따라 쿼리 파라미터를 구성할 때는 블록 바디를 허용한다. 단, 로직은 파라미터 조립에만 한정한다.

```ts
getTeamGoalList: (teamId: string, sort: SortType, cursor?: Partial<GoalListCursor>) => {
  const params: Record<string, string | number> = { sort };
  if (cursor?.cursorCreatedAt && cursor.cursorId != null) {
    params.cursorCreatedAt = cursor.cursorCreatedAt;
    params.cursorId = cursor.cursorId;
  }
  return apiClient.get<ApiResponse<TeamGoalListResponse>>(
    `/api/teams/${teamId}/goals`,
    { params },
  );
},
```

### 동일 엔드포인트, 다른 타입

같은 엔드포인트를 공유하는 메서드는 union 타입으로 통합한다.

```ts
// ❌ 중복
createPersonalGoal: (data: CreatePersonalGoalRequest) => apiClient.post(...),
createTeamGoal:     (data: CreateTeamGoalRequest)     => apiClient.post(...),

// ✅ 통합
createGoal: (data: CreatePersonalGoalRequest | CreateTeamGoalRequest) =>
  apiClient.post<ApiResponse<CreateGoalResponse>>("/api/goals", data),
```

---

## `types/` — 타입 정의 규칙

### 네이밍 컨벤션

| 종류          | 패턴                    | 예시                       |
| ------------- | ----------------------- | -------------------------- |
| 생성 요청     | `Create{Entity}Request` | `CreateGoalRequest`        |
| 수정 요청     | `Update{Entity}Request` | `UpdateGoalRequest`        |
| 목록 응답     | `{Entity}ListResponse`  | `TeamGoalListResponse`     |
| 단건 응답     | `{Entity}Response`      | `GoalSummaryResponse`      |
| 목록 아이템   | `{Entity}ListItem`      | `TeamGoalListItem`         |
| 커서          | `{Entity}Cursor`        | `GoalListCursor`           |
| 쿼리 파라미터 | `{Entity}QueryParams`   | `FavoriteGoalsQueryParams` |

### 페이지네이션 응답 타입

```ts
// cursor-based 페이지네이션 응답
export interface TeamGoalListResponse {
  items: TeamGoalListItem[];
  nextCursor: GoalListCursor | null; // 다음 페이지 없으면 null
  size: number;
}

// hasNext 방식 응답
export interface FavoriteGoalsSuccessResponse {
  items: FavoriteGoalItem[];
  hasNext: boolean;
  nextCursorId?: number; // hasNext=false일 때 없을 수 있으므로 optional
  nextCursorCreatedAt?: string; // hasNext=false일 때 없을 수 있으므로 optional
}
```

> cursor 필드는 `hasNext`가 `false`일 때 응답에 없을 수 있다. 반드시 optional(`?`)로 선언한다.

### 공통 베이스 타입 활용

여러 Request 타입이 공통 필드를 공유할 때 private base interface로 추출한다.

```ts
// 외부에 노출하지 않는 베이스 — export 하지 않음
interface CreateGoalRequest {
  name: string;
  dueDate: string;
}

export interface CreatePersonalGoalRequest extends CreateGoalRequest {
  type: "PERSONAL";
}

export interface CreateTeamGoalRequest extends CreateGoalRequest {
  teamId: number;
  type: "TEAM";
}
```

---

## `model/` — Zod 스키마

폼 유효성 검사가 필요한 entity에만 추가한다.

```ts
// entities/goal/model/goal.model.ts
import z from "zod";

export const createGoalSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "목표 이름을 입력해주세요.")
    .max(30, "목표 이름은 30자 이내로 입력해주세요."),
  dueDate: z.string().min(1, "날짜를 선택해주세요."),
});

// 스키마에서 파생 타입을 반드시 export한다
export type CreateGoalInput = z.infer<typeof createGoalSchema>;
```

**규칙:**

- 스키마 필드명은 API Request 타입의 필드명과 일치시킨다 (`dueDate` ↔ `dueDate`).
- `z.infer<>` 파생 타입은 스키마와 같은 파일에서 export한다.
- 파생 타입명: `{Action}{Entity}Input` (예: `CreateGoalInput`).

---

## `query/` — queryOptions 작성 규칙

### 기본 구조

```ts
// entities/goal/query/goal.queryOptions.ts
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { STALE_TIME } from "@/shared/constants/query/staleTime";
import { goalApi } from "../api/api"; // 슬라이스 내부는 상대 경로
import type { SortType } from "../types/goalList.types";

export const goalQueryOptions = {
  getSummary: (goalId: string) =>
    queryOptions({
      queryKey: ["goal", goalId, "summary"],
      queryFn: async () => {
        const response = await goalApi.getSummary(goalId);
        return response.data; // ApiResponse의 data 필드만 반환
      },
      staleTime: STALE_TIME.DEFAULT,
    }),
};
```

### 슬라이스 내부 import는 상대 경로

```ts
// ❌ 슬라이스 내부를 절대 경로로 참조
import { goalApi } from "@/entities/goal/api/api";
import type { SortType } from "@/entities/goal/types/goalList.types";

// ✅ 상대 경로 사용
import { goalApi } from "../api/api";
import type { SortType } from "../types/goalList.types";
```

### staleTime은 항상 상수 사용

```ts
// ❌ 매직 넘버
staleTime: 60_000,

// ✅ 공유 상수
import { STALE_TIME } from "@/shared/constants/query/staleTime";
staleTime: STALE_TIME.DEFAULT,
```

### 무한 스크롤 (Infinite Scroll)

페이지 크기는 모듈 상단에 named constant로 선언한다.

```ts
const FAVORITE_GOALS_PAGE_SIZE = 20; // 파일 상단에 선언

getFavoriteGoalListInfinite: () =>
  infiniteQueryOptions({
    queryKey: ["favoriteGoals", "infinite"],
    queryFn: async ({ pageParam }) => {
      const response = await goalApi.getFavoriteGoalList(pageParam ?? {});
      return response.data;
    },
    initialPageParam: { size: FAVORITE_GOALS_PAGE_SIZE } as FavoriteGoalsQueryParams,
    getNextPageParam: (lastPage): FavoriteGoalsQueryParams | undefined =>
      lastPage.hasNext
        ? {
            size: FAVORITE_GOALS_PAGE_SIZE,
            cursorId: lastPage.nextCursorId,
            cursorCreatedAt: lastPage.nextCursorCreatedAt,
          }
        : undefined,
    staleTime: STALE_TIME.DEFAULT,
  }),
```

### 단일 페이지 vs 무한 스크롤 선택

UI가 무한 스크롤이면 `infiniteQueryOptions`만 작성한다. 동일 데이터에 대해 일반 `queryOptions`도 함께 추가하지 않는다(미사용 dead code).

```ts
// ❌ 같은 데이터에 두 가지 옵션 중복 정의
getTeamGoalList: (...) => queryOptions({ ... }),          // 실제 쓰이지 않음
getTeamGoalListInfinite: (...) => infiniteQueryOptions({ ... }),

// ✅ 실제로 사용하는 것만
getTeamGoalListInfinite: (...) => infiniteQueryOptions({ ... }),
```

---

## Query Key 규칙

query key는 계층 구조로 설계해 `invalidateQueries`의 prefix 매칭을 활용한다.

```ts
// 도메인 → 식별자 → 구체성 순서
["goal", goalId, "summary"][("personal", "goals")][ // 단건 조회 // 개인 목표 목록
  ("team", teamId, "goals", "infinite", sort)
][("favoriteGoals", "infinite")]; // 팀 목표 무한 스크롤 // 즐겨찾기 무한 스크롤
```

**invalidateQueries prefix 활용 예시:**

```ts
// ["team", teamId, "goals"] 로 무효화하면 아래 키 전부 매칭됨
// → ["team", teamId, "goals", sort]
// → ["team", teamId, "goals", "infinite", sort]
queryClient.invalidateQueries({ queryKey: ["team", teamId, "goals"] });
```

---

## `index.ts` — Public API 규칙

### 기본 원칙

```ts
// ✅ named export를 명시적으로 작성
export { goalApi } from "./api/api";
export { createGoalSchema } from "./model/goal.model";
export type { CreateGoalInput } from "./model/goal.model";
export { goalQueryOptions } from "./query/goal.queryOptions";
export type {
  CreateGoalResponse,
  UpdateGoalRequest,
  GoalSummaryResponse,
} from "./types/goal.types";

// ❌ export * 남용 — 외부에 무엇이 노출되는지 불명확
export * from "./api/api";
export * from "./types/goal.types";
```

### 외부에서 실제로 쓰이는 것만 export한다

```ts
// ❌ 정의는 있지만 어디서도 import하지 않는 타입 노출
export type { DeleteGoalResponse } from "./types/goal.types"; // 미사용

// ✅ 외부 소비자가 실제로 필요한 것만
```

---

## 새 entity 추가 체크리스트

```
□ src/entities/{domain}/types/{domain}.types.ts   — Request / Response 타입 정의
□ src/entities/{domain}/api/{domain}.api.ts        — apiClient 기반 API 함수
□ src/entities/{domain}/query/{domain}.queryOptions.ts  — queryOptions / infiniteQueryOptions
□ src/entities/{domain}/model/{domain}.model.ts    — Zod 스키마 (필요 시)
□ src/entities/{domain}/index.ts                   — Public API (named export만)

검증:
□ api 함수가 async/await 없이 apiClient 호출을 직접 return 하는가?
□ api 함수 내부에 throw, queryClient, window 등 사이드 이펙트가 없는가?
□ queryOptions 내부 import가 상대 경로인가?
□ staleTime에 STALE_TIME 상수를 사용하는가?
□ 페이지 크기가 named constant로 선언되어 있는가?
□ 페이지네이션 응답의 cursor 필드가 optional인가?
□ Zod 스키마가 있다면 z.infer<> 파생 타입도 export 하는가?
□ index.ts에 export *가 없는가?
□ index.ts에 실제로 사용되지 않는 타입이 노출되지 않는가?
□ 사용하지 않는 queryOptions 메서드(dead code)가 없는가?
```
