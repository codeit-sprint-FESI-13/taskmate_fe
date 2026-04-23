---
name: write-tests
description: docs/testing-guide.md 기준으로 지정한 경로의 코드에 맞는 테스트를 작성한다. FSD 레이어를 판단해 Jest+RTL / Storybook play 중 적합한 도구를 선택하고, 테스트 실행까지 확인한다.
arguments: [path]
---

# write-tests

테스트 전략 가이드와 대상 소스를 읽고, 누락된 테스트를 작성한다.

**참조 문서:**

- @docs/testing-guide.md — 도구 선택 기준 (Jest+RTL / Storybook play / Chromatic)
- @docs/architecture.md — FSD 레이어별 책임 범위
- @docs/conventions.md — 파일 네이밍 규칙

---

## 실행 절차

### 1단계 — 대상 파일 파악

`$path` 경로 아래의 모든 소스 파일을 읽는다.
이미 존재하는 `*.test.ts(x)`, `*.stories.tsx`가 있으면 함께 읽어 커버된 케이스를 파악한다.

### 2단계 — FSD 레이어 판단 및 도구 선택

경로에서 레이어를 확인하고 `docs/testing-guide.md`의 기준으로 도구를 결정한다.

| 경로 패턴                             | 도구                             |
| ------------------------------------- | -------------------------------- |
| `shared/lib`, `shared/utils`          | Jest + RTL (필수)                |
| `shared/hooks`, `shared/store`        | Jest + RTL (`renderHook`)        |
| `shared/ui`                           | Jest + RTL + Storybook play 검토 |
| `entities/model`                      | Jest + RTL                       |
| `features/mutation`, `features/hooks` | Jest + RTL (MSW 모킹)            |
| `widgets/`                            | Jest + RTL (핵심 인터랙션만)     |

Chromatic은 CI 설정이므로 코드로 작성하지 않는다. 해당 컴포넌트라면 주석으로 언급만 한다.

### 3단계 — 테스트 작성

**파일 위치:** 소스 파일과 같은 디렉터리에 `{SourceFile}.test.tsx` (또는 `.test.ts`)

**공통 보일러플레이트 (React Query가 필요한 경우):**

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
```

**Next.js 라우터 모킹:**

```ts
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useParams: () => ({}),
}));
```

**테스트 케이스 선정 기준:**

- 정상 동작 (happy path)
- 에러 / 빈 상태 / 로딩 상태
- 경계값 (빈 문자열, null, 최댓값)
- 사용자 인터랙션 후 상태 변화
- 이미 커버된 케이스는 작성하지 않는다

**describe / test 네이밍:**

```tsx
describe("{컴포넌트 또는 훅 이름}", () => {
  describe("{기능 또는 상황}", () => {
    test("{기대 동작을 한국어로}", () => { ... });
  });
});
```

### 4단계 — 실행 및 검증

작성 후 아래 명령으로 실행한다.

```bash
pnpm test -- {작성한 테스트 파일 경로}
```

실패하면 에러를 읽고 수정한다. 모든 케이스가 통과할 때까지 반복한다.

### 5단계 — 결과 보고

- 작성한 파일 목록
- 파일별 커버한 시나리오 요약
- 의도적으로 제외한 케이스가 있으면 이유 명시
- Storybook play가 추가로 필요하다 판단되면 언급
