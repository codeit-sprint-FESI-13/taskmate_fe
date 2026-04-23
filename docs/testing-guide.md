# 테스트 도구 이해 가이드

> Jest + RTL / Storybook Chromatic / Storybook play 각각이 무엇이고, 왜 쓰고, 언제 쓰는가

---

## 1. Jest + RTL (React Testing Library)

### 무엇인가

- **Jest** — 테스트 실행 엔진. `expect`, `mock`, `spy` 등을 제공
- **RTL** — 컴포넌트를 jsdom(가상 DOM)에 렌더링하고 사용자 관점으로 쿼리

### 왜 쓰는가

브라우저 없이 **동작과 로직을 빠르게 검증**하기 위해 쓴다.  
실제 브라우저를 띄우지 않기 때문에 수백 개의 테스트를 수십 초 안에 실행할 수 있고, CI에서 가볍게 돌릴 수 있다.

### 무엇을 검증하는가

- 컴포넌트가 올바르게 렌더링되는가
- 클릭, 입력 등 인터랙션 후 상태가 바뀌는가
- API 호출 후 데이터가 표시되는가
- 에러/로딩/빈 상태 처리가 올바른가
- 커스텀 훅의 로직이 올바른가
- 유틸 함수의 입출력이 올바른가

### 할 수 없는 것

- CSS가 실제로 적용됐는지 (jsdom은 스타일을 계산하지 않음)
- 시각적으로 올바르게 보이는지
- 반응형 레이아웃

### 예시

```tsx
// 동작 검증
test("로그인 버튼 클릭 시 API가 호출된다", async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText("이메일"), "test@test.com");
  await userEvent.type(screen.getByLabelText("비밀번호"), "1234");
  await userEvent.click(screen.getByRole("button", { name: "로그인" }));
  expect(await screen.findByText("환영합니다")).toBeInTheDocument();
});

// 에러 처리 검증
test("이메일 형식이 틀리면 에러 메시지가 표시된다", async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText("이메일"), "abc");
  await userEvent.click(screen.getByRole("button", { name: "로그인" }));
  expect(screen.getByText("올바른 이메일 형식이 아닙니다")).toBeInTheDocument();
});
```

### FSD 기준 작성 대상

```
shared/lib      → 반드시 (순수 함수, 유틸)
shared/api      → 반드시 (MSW + RTL)
entities/model  → 반드시 (상태 로직, 셀렉터)
features/       → 반드시 (비즈니스 로직 핵심)
widgets/        → 핵심 인터랙션만
shared/ui       → 내부 로직이 있을 때만
pages/          → 통합 테스트로 대체
```

---

## 2. Storybook play()

### 무엇인가

Story 안에 `play` 함수를 작성하면 **브라우저에서 인터랙션을 자동으로 실행**하고 결과를 검증할 수 있다.  
RTL과 거의 동일한 문법(`within`, `userEvent`, `expect`)을 사용하지만, 실제 브라우저에서 실행된다는 점이 다르다.

`@storybook/addon-vitest` 를 사용하면 `play()` 함수가 Vitest 테스트로도 실행된다. 즉, **Story 하나가 문서이자 테스트**가 된다.

### 왜 쓰는가

- 별도의 `.test.tsx` 없이 Story의 `play()` 만으로 인터랙션 검증 가능
- 실행되는 과정을 Storybook UI에서 **눈으로 볼 수 있음**
- CSS, 레이아웃, 실제 렌더링까지 반영됨 (RTL의 jsdom과 다른 점)

### 무엇을 검증하는가

- 버튼 클릭 후 UI가 바뀌는가
- 폼 제출 후 에러 메시지가 표시되는가
- 특정 상태에서 올바른 요소가 보이는가

### 예시

```tsx
// LoginForm.stories.tsx
export const SubmitWithEmptyFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 빈 폼 제출
    await userEvent.click(canvas.getByRole("button", { name: "로그인" }));

    // 에러 메시지 확인
    await expect(canvas.getByText("이메일을 입력해주세요")).toBeInTheDocument();
  },
};

export const SubmitWithValidData: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("이메일"), "test@test.com");
    await userEvent.type(canvas.getByLabelText("비밀번호"), "1234");
    await userEvent.click(canvas.getByRole("button", { name: "로그인" }));

    await expect(canvas.findByText("환영합니다")).toBeInTheDocument();
  },
};
```

### Jest + RTL과의 차이

|                  | Jest + RTL | Storybook play()        |
| ---------------- | ---------- | ----------------------- |
| 실행 환경        | jsdom      | 실제 브라우저           |
| CSS 반영         | 안됨       | 됨                      |
| 속도             | 빠름       | 느림                    |
| 시각 확인        | 불가       | 가능                    |
| 별도 테스트 파일 | 필요       | 불필요 (Story가 테스트) |

### FSD 기준 작성 대상

```
shared/ui      → 인터랙션이 있는 컴포넌트 (Modal, Dropdown 등)
entities/ui    → 상태에 따른 UI 변화가 있는 것
features/      → 폼 제출, 버튼 인터랙션 등
```

---

## 3. Storybook Chromatic

### 무엇인가

Storybook과 연동하는 **시각적 회귀 테스트(Visual Regression Test) 서비스**다.  
각 Story의 스크린샷을 찍어 이전 버전과 픽셀 단위로 비교하고, 변경된 부분을 PR 코멘트로 알려준다.

### 왜 쓰는가

CSS 한 줄을 수정했을 때 의도치 않게 다른 컴포넌트의 스타일이 바뀌는 것을 **배포 전에 감지**하기 위해 쓴다.  
코드 리뷰만으로는 시각적 변경을 확인하기 어렵기 때문에, Chromatic이 자동으로 diff를 만들어 리뷰어가 로컬 실행 없이 확인할 수 있게 해준다.

### 무엇을 검증하는가

- 컴포넌트의 시각적 상태가 이전과 동일한가
- 의도치 않은 스타일 변경이 없는가
- 반응형 레이아웃이 깨지지 않았는가

### 할 수 없는 것

- 로직/동작 검증 (스크린샷 비교만 함)
- 인터랙션 후 상태 검증 (정적 스냅샷)

### 동작 방식

```
PR 생성
  ↓
GitHub Actions에서 Chromatic 실행
  ↓
각 Story의 스크린샷 촬영
  ↓
이전 승인된 스크린샷과 픽셀 비교
  ↓
변경 있음 → PR에 diff 코멘트
변경 없음 → 자동 통과
  ↓
리뷰어가 변경 승인 or 거부
```

### CI 설정 예시

```yaml
# .github/workflows/ci.yml
- name: Chromatic
  uses: chromaui/action@latest
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    storybookBuildDir: storybook-static
```

### FSD 기준 작성 대상

```
shared/ui      → 반드시 (디자인 시스템의 핵심)
entities/ui    → 반드시 (도메인 상태별 시각 검증)
features/      → 복잡한 UI 상태가 있는 것만
widgets/       → 레이아웃이 복잡한 것만
```

---

## 세 가지 도구 한눈에 비교

|               | Jest + RTL     | Storybook play() | Chromatic         |
| ------------- | -------------- | ---------------- | ----------------- |
| **목적**      | 동작/로직 검증 | 인터랙션 검증    | 시각적 회귀 감지  |
| **실행 환경** | jsdom          | 실제 브라우저    | 클라우드 스크린샷 |
| **CSS 반영**  | 안됨           | 됨               | 됨                |
| **속도**      | 빠름           | 중간             | 중간              |
| **주 사용자** | 개발자         | 개발자           | 개발자 + 디자이너 |
| **검증 방식** | assertion      | assertion        | 픽셀 diff         |

---

## 언제 무엇을 쓰는가

```
"버튼 클릭 시 API가 호출되는가"
  → Jest + RTL

"폼 제출 시 에러 메시지가 뜨는 것을 눈으로 확인하고 싶다"
  → Storybook play()

"CSS 수정 후 버튼이 의도치 않게 바뀌지 않았는가"
  → Chromatic

"disabled 상태일 때 회색으로 보이는가"
  → Chromatic

"로딩/에러/빈 상태를 디자이너에게 보여줘야 한다"
  → Storybook Story + Chromatic
```

---

## MSW와의 관계

세 도구 모두 MSW 핸들러를 공유한다.

```
handlers.ts
  ├── vitest.setup.ts       → Jest + RTL에서 사용
  ├── .storybook/preview.ts → Storybook play()에서 사용
  └── Chromatic             → Storybook 빌드 시 함께 포함
```

핸들러를 한 번만 작성하면 세 곳에서 동일한 모킹 데이터로 동작한다.
