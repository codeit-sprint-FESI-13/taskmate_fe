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

테스트 대상 파일의 import 경로를 확인해, mock 경로도 **반드시 현재 실제 import 경로와 동일하게** 맞춘다.
(예: `@/components/...` 구경로가 아니라 `@/widgets/...` 등 현재 경로 사용)

### 2단계 — FSD 레이어 판단 및 도구 선택

경로에서 레이어를 확인하고 `docs/testing-guide.md`의 기준으로 도구를 결정한다.

**도구 선택 전 판단 기준 (Jest + RTL):**

다음 중 하나라도 해당되면 Jest + RTL 테스트를 작성한다.

- 버그가 생기면 치명적인가?
- 이 코드가 바뀔 가능성이 높은가?
- 로직이 복잡한가?

**도구 선택 전 판단 기준 (Story 정의):**

다음 중 하나라도 해당되면 Story를 작성한다.

- 다른 UI에서 재사용될 가능성이 있는가?
- props나 상태 변경에 따른 UI 변화가 있는가?

**레이어별 도구 선택표:**

| 경로 패턴                             | Jest + RTL            | Storybook Chromatic | Storybook play() |
| ------------------------------------- | --------------------- | ------------------- | ---------------- |
| `shared/lib`, `shared/utils`          | 반드시                | —                   | —                |
| `shared/hooks`, `shared/store`        | 반드시 (`renderHook`) | —                   | —                |
| `shared/ui`                           | 내부 로직이 있을 때만 | 항상                | 검토             |
| `entities/model`, `entities/api`      | 반드시                | —                   | —                |
| `entities/ui`                         | 검토                  | 항상                | 항상             |
| `entities/query`                      | **작성 금지**         | —                   | —                |
| `features/ui`                         | 반드시                | 검토                | 검토             |
| `features/mutation`, `features/hooks` | 반드시 (MSW 모킹)     | —                   | —                |
| `widgets/`                            | 핵심 인터랙션만       | 검토                | 검토             |

> `entities/query` — React Query 훅처럼 외부 라이브러리에 의존하는 레이어는 테스트 작성 금지.  
> Chromatic은 CI 설정이므로 코드로 작성하지 않는다. 해당 레이어라면 주석으로 언급만 한다.

### 3단계 — Jest + RTL 테스트 작성

**파일 위치:** 소스 파일과 같은 디렉터리에 `{SourceFile}.test.tsx` (또는 `.test.ts`)

**공통 보일러플레이트 (React Query가 필요한 경우):**

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return Wrapper;
};
```

**Next.js 라우터 모킹:**

```ts
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useParams: () => ({}),
}));
```

`useParams`, `useRouter`를 테스트 내에서 케이스별로 바꾸어야 하면 `jest.fn()`으로 모킹하고 `mockReturnValue`로 제어한다.

```ts
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
mockUseParams.mockReturnValue({ teamId: "1" } as ReturnType<typeof useParams>);
```

**훅 반환값 mock 시 타입 단언 규칙:**

`UseMutationResult`, `UseQueryResult` 같이 필드 수가 많은 타입은 일부 필드만 제공한 객체를 `as ReturnType<...>` 단일 단언으로 캐스팅하면 TS 에러가 발생한다.
테스트에 필요한 필드만 제공할 때는 반드시 `as unknown as ReturnType<...>` 이중 단언을 사용한다.

```ts
// ❌ 단일 단언 — UseMutationResult와 구조가 충분히 겹치지 않아 TS 에러
mockUseXxxMutation.mockReturnValue({
  mutate: mockMutate,
  isPending: false,
} as ReturnType<typeof useXxxMutation>);

// ✅ 이중 단언 — unknown을 경유해 타입 검사를 우회
mockUseXxxMutation.mockReturnValue({
  mutate: mockMutate,
  isPending: false,
} as unknown as ReturnType<typeof useXxxMutation>);
```

**커스텀 훅 테스트 (renderHook) 기본 패턴:**

```ts
import { renderHook } from "@testing-library/react";

describe("useSomething", () => {
  test("조건 A에서 기대값을 반환한다", () => {
    const { result } = renderHook(() => useSomething());
    expect(result.current).toBe(...);
  });
});
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

### 4단계 — Story 작성

2단계에서 Story 기준에 해당한다고 판단한 컴포넌트에 대해 `{SourceFile}.stories.tsx`를 작성한다.

**파일 위치:** 소스 파일과 같은 디렉터리

**기본 구조:**

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComponentName } from "./ComponentName";

const meta = {
  title: "{layer}/{domain}/{ComponentName}",
  component: ComponentName,
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { ... } };
export const AnotherVariant: Story = { args: { ... } };
```

**Story 케이스 선정 기준:**

- props 값에 따른 시각적 상태 변화 (예: status별 색상, 개수별 레이아웃)
- 빈 상태 / 경계값 (예: 담당자 0명, 최대 초과)
- 이미 커버된 케이스는 작성하지 않는다

**복잡한 hook 의존성이 있는 경우:**

React Query가 필요한 컴포넌트는 전역 `preview.tsx`에 `QueryClientProvider` + `Suspense` 데코레이터가 있는지 확인한다.
없으면 story에 로컬 decorator로 추가한다.

```tsx
decorators: [
  (Story) => (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <Suspense fallback={null}><Story /></Suspense>
    </QueryClientProvider>
  ),
],
```

MSW로 API를 인터셉트해야 하는 컴포넌트(`useSuspenseQuery` 내부 호출 포함)는
`.storybook/preview.tsx`에 `beforeAll`로 worker가 시작되는지 먼저 확인한다.
없으면 추가한 뒤 story를 작성한다.

```tsx
// .storybook/preview.tsx
import { worker } from "@/shared/mock/browser";
beforeAll: async () => {
  await worker.start({ onUnhandledRequest: "bypass" });
},
```

`useParams`가 필요한 경우 `parameters.nextjs.navigation.segments`로 공급한다.

```tsx
parameters: {
  nextjs: {
    appDirectory: true,
    navigation: {
      segments: { goalId: "1" },
    },
  },
},
```

### 5단계 — 실행 및 검증

작성 후 아래 명령으로 실행한다.

```bash
pnpm test -- {작성한 테스트 파일 경로}
```

실패하면 에러를 읽고 수정한다. 모든 케이스가 통과할 때까지 반복한다.
테스트 통과 후, 수정 파일에 대한 lint 에러도 확인한다.

### 6단계 — 결과 보고

- 작성한 파일 목록 (Jest 테스트 + Story 파일 모두)
- 파일별 커버한 시나리오 요약
- 의도적으로 제외한 케이스가 있으면 이유 명시
  <<<<<<< HEAD
  =======
- Storybook play / Chromatic이 추가로 필요하다 판단되면 언급
  > > > > > > > 0ffca3f (docs(#245): test 기준 수정)
