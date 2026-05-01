# Frontend Fundamentals — 코드 품질 가이드

> Toss 프론트엔드 챕터가 정리한 "변경하기 쉬운 코드"의 기준.  
> 좋은 프론트엔드 코드 = **변경하기 쉬운 코드**. 새 요구사항을 구현할 때 수정과 배포가 쉬우면 좋은 코드다.

---

## 핵심 원칙 4가지

| 원칙                             | 한 줄 정의                                                       |
| -------------------------------- | ---------------------------------------------------------------- |
| **가독성 (Readability)**         | 한 번에 파악해야 할 맥락이 적고, 위에서 아래로 자연스럽게 읽힌다 |
| **예측 가능성 (Predictability)** | 이름·파라미터·반환값만 봐도 동작을 예측할 수 있다                |
| **응집도 (Cohesion)**            | 함께 수정될 코드는 항상 함께 수정된다                            |
| **결합도 (Coupling)**            | 코드를 수정했을 때 영향 범위가 제한적이다                        |

> ⚠️ 네 가지를 동시에 만족하기는 어렵다. 상황에 따라 무엇을 우선할지 판단해야 한다.  
> 예를 들어 응집도를 높이려고 추상화하면 가독성이 낮아질 수 있고, 중복을 허용하면 결합도는 낮아지지만 응집도도 낮아진다.

---

## 1. 가독성 (Readability)

코드를 수정하려면 먼저 이해해야 한다. 가독성이 높은 코드는 한 번에 고려할 맥락이 적고, 위에서 아래로 자연스럽게 읽힌다.

### 1-1. 맥락 줄이기

#### A. 함께 실행되지 않는 코드는 분리한다

하나의 함수나 컴포넌트 안에 동시에 실행되지 않는 코드가 섞여 있으면 한눈에 파악하기 어렵다.

```tsx
// ❌ Before: viewer / 일반 유저 로직이 한 컴포넌트에 혼재
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  useEffect(() => {
    if (isViewer) return;
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}

// ✅ After: 분기를 하나로 모으고 각 컴포넌트는 한 가지 맥락만 담당
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showButtonAnimation();
  }, []);
  return <Button type="submit">Submit</Button>;
}
```

#### B. 구현 세부사항을 추상화한다

불필요한 세부사항이 노출되면 한 번에 파악해야 할 맥락이 늘어난다.

```tsx
// ❌ Before: 로그인 체크 로직이 LoginStartPage 안에 그대로 노출
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") location.href = "/home";
    },
  });
  return <>{/* 로그인 관련 컴포넌트 */}</>;
}

// ✅ After A — Wrapper 컴포넌트로 분리
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();
  useEffect(() => {
    if (status === "LOGGED_IN") location.href = "/home";
  }, [status]);
  return status !== "LOGGED_IN" ? children : null;
}

// ✅ After B — HOC로 분리
export default withAuthGuard(LoginStartPage);
```

관련 로직과 실행 버튼을 함께 추상화하면 각 컴포넌트의 역할이 명확해진다.

```tsx
// ❌ Before: FriendInvitation 안에 overlay 열기 로직이 노출
function FriendInvitation() {
  const handleClick = async () => {
    const canInvite = await overlay.openAsync(/* 복잡한 JSX */);
    if (canInvite) await sendPush();
  };
  return <Button onClick={handleClick}>Invite</Button>;
}

// ✅ After: 초대 관련 로직을 InviteButton으로 추상화
function FriendInvitation() {
  return <InviteButton name={data.name} />;
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(/* ... */);
        if (canInvite) await sendPush();
      }}
    >
      Invite
    </Button>
  );
}
```

#### C. 로직 유형이 아닌 역할 단위로 함수를 분리한다

"이 페이지의 모든 query param을 관리한다"처럼 로직 유형으로 묶으면 책임이 무한정 커진다.

```tsx
// ❌ Before: 페이지 전체의 query param을 한 훅에서 관리
function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    // ...
  });
  // ...
}

// ✅ After: query param별로 훅을 분리
function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam("cardId", NumberParam);
  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, "replaceIn");
  }, []);
  return [cardId ?? undefined, setCardId] as const;
}
```

---

### 1-2. 네이밍

#### A. 복잡한 조건에 이름을 붙인다

```tsx
// ❌ Before
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some((price) => price >= minPrice && price <= maxPrice),
  ),
);

// ✅ After
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some(
      (price) => price >= minPrice && price <= maxPrice,
    );
    return isSameCategory && isPriceInRange;
  });
});
```

네이밍이 필요한 상황: 로직이 복잡할 때, 재사용이 필요할 때, 단위 테스트가 필요할 때.  
네이밍이 불필요한 상황: 로직이 단순할 때(`arr.map(x => x * 2)`), 한 번만 쓰이고 단순할 때.

#### B. 매직 넘버에 이름을 붙인다

```tsx
// ❌ Before: 300이 왜 필요한지 알 수 없음
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}

// ✅ After
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

---

### 1-3. 위에서 아래로 읽기

#### A. 눈의 이동을 줄인다

여러 파일이나 함수를 오가며 읽어야 할수록 맥락을 유지하기 어렵다.

```tsx
// ❌ Before: canInvite를 파악하려면 getPolicyByRole → POLICY_SET 순서로 이동해야 함
function Page() {
  const user = useUser();
  const policy = getPolicyByRole(user.role);
  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
function getPolicyByRole(role) {
  /* ... */
}
const POLICY_SET = { admin: ["invite", "view"], viewer: ["view"] };

// ✅ After A: 조건을 직접 노출
function Page() {
  const user = useUser();
  switch (user.role) {
    case "admin":
      return (
        <div>
          <Button>Invite</Button>
          <Button>View</Button>
        </div>
      );
    case "viewer":
      return (
        <div>
          <Button disabled>Invite</Button>
          <Button>View</Button>
        </div>
      );
    default:
      return null;
  }
}

// ✅ After B: 컴포넌트 안에서 한눈에 파악할 수 있는 객체로 관리
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true },
  }[user.role];
  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

#### B. 삼항 연산자를 단순화한다

```tsx
// ❌ Before: 중첩 삼항 연산자
const status =
  ACondition && BCondition
    ? "BOTH"
    : ACondition || BCondition
      ? ACondition
        ? "A"
        : "B"
      : "NONE";

// ✅ After: if 문으로 풀어내기
const status = (() => {
  if (ACondition && BCondition) return "BOTH";
  if (ACondition) return "A";
  if (BCondition) return "B";
  return "NONE";
})();
```

#### C. 비교 연산은 왼쪽에서 오른쪽으로 읽히도록 작성한다

```tsx
// ❌ Before: a를 두 번 확인해야 함
if (a >= b && a <= c) {
}
if (score >= 80 && score <= 100) {
}

// ✅ After: 수학의 부등식처럼 b ≤ a ≤ c 순서로
if (b <= a && a <= c) {
}
if (80 <= score && score <= 100) {
}
if (minPrice <= price && price <= maxPrice) {
}
```

---

## 2. 예측 가능성 (Predictability)

이름·파라미터·반환값만 보고도 동작을 예측할 수 있어야 한다.

### A. 이름이 겹치지 않도록 관리한다

```tsx
// ❌ Before: http라는 이름이 라이브러리와 서비스 모듈에 동시 사용
import { http as httpLibrary } from "@some-library/http";
export const http = {
  async get(url: string) {
    const token = await fetchToken(); // 이름만 봐선 토큰 추가를 알 수 없음
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// ✅ After: 역할을 드러내는 이름으로 구분
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
```

### B. 유사한 함수는 반환 타입을 통일한다

```tsx
// ❌ Before: 같은 API 호출 훅인데 반환 타입이 다름
function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser }); // Query 객체 반환
}
function useServerTime() {
  return useQuery({ queryKey: ["serverTime"], queryFn: fetchServerTime }).data; // data만 반환
}

// ✅ After: 모두 Query 객체를 반환
function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser });
}
function useServerTime() {
  return useQuery({ queryKey: ["serverTime"], queryFn: fetchServerTime });
}
```

validation 함수도 마찬가지로 반환 타입을 통일한다.

```tsx
// ✅ Discriminated Union으로 일관된 반환 타입 정의
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  /* ... */
}
function checkIsAgeValid(age: number): ValidationResult {
  /* ... */
}
```

### C. 숨겨진 로직을 드러낸다

```tsx
// ❌ Before: fetchBalance를 호출하면 로깅이 발생하지만 이름에서 알 수 없음
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  logging.log("balance_fetched"); // 숨겨진 사이드 이펙트
  return balance;
}

// ✅ After: 함수는 이름이 나타내는 일만 한다
async function fetchBalance(): Promise<number> {
  return http.get<number>("...");
}

// 로깅은 호출부에서 명시적으로
<Button
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log("balance_fetched");
    await syncBalance(balance);
  }}
>
  Update Account Balance
</Button>;
```

---

## 3. 응집도 (Cohesion)

함께 수정될 코드는 항상 함께 수정되도록 구조화한다.

> **가독성과 응집도는 충돌할 수 있다.** 함께 수정하지 않으면 버그가 생길 위험이 크다면 응집도를 우선하고, 위험이 낮다면 가독성(중복 허용)을 우선한다.

### A. 함께 수정되는 파일은 같은 디렉터리에 둔다

```text
// ❌ Before: 모듈 유형별로 분리 → 관련 파일이 여기저기 흩어짐
src/
  components/
  hooks/
  utils/
  constants/

// ✅ After: 함께 변경되는 파일을 도메인 단위로 묶음
src/
  components/    ← 프로젝트 전체에서 사용
  hooks/
  domains/
    Domain1/     ← Domain1에서만 사용하는 코드 모음
      components/
      hooks/
      utils/
    Domain2/
      components/
      hooks/
```

같은 도메인 내 코드만 서로 참조해야 한다. 다른 도메인의 파일을 import하는 구조라면 경고 신호다.

### B. 매직 넘버를 제거한다 (응집도 관점)

```tsx
// ❌ Before: 애니메이션 시간이 300으로 하드코딩 — 애니메이션 변경 시 이 코드를 찾아 함께 바꿔야 함을 알기 어려움
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}

// ✅ After: 상수로 선언해 변경 지점을 하나로 모음
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

### C. 폼 응집도를 고려한다

폼 관리는 **필드 레벨 응집도**와 **폼 레벨 응집도** 중 상황에 맞는 방식을 선택한다.

**필드 레벨 응집도** — 각 필드가 독립적으로 검증 로직을 가짐

```tsx
// react-hook-form의 register 안에 validate를 필드별로 정의
<input {...register("name", { validate: (v) => v ? "" : "이름을 입력해주세요" })} />
<input {...register("email", { validate: (v) => isValidEmail(v) ? "" : "올바른 이메일 형식이 아닙니다" })} />
```

언제 선택: 비동기 검증이 필요하거나 필드를 다른 폼에서 재사용할 때.

**폼 레벨 응집도** — Zod 등 스키마로 전체 폼 검증을 한 곳에서 관리

```tsx
const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().min(1).email("올바른 이메일 형식이 아닙니다"),
});
useForm({ resolver: zodResolver(schema) });
```

언제 선택: 필드가 서로 의존하거나, 단일 비즈니스 로직을 구성하는 폼일 때.

---

## 4. 결합도 (Coupling)

코드를 수정했을 때 영향 범위가 넓을수록 수정하기 어렵다.

### A. 책임을 개별로 관리한다

```tsx
// ❌ Before: "페이지의 모든 query param"을 한 훅이 담당 → 이 훅에 의존하는 컴포넌트가 많아질수록 변경 위험 증가
function usePageState() {
  /* cardId, statementId, dateFrom, dateTo, statusList 전부 */
}

// ✅ After: query param별로 책임을 분리
function useCardIdQueryParam() {
  /* cardId만 */
}
function useDateRangeQueryParam() {
  /* dateFrom, dateTo만 */
}
```

### B. 중복 코드를 허용한다

공통 훅/컴포넌트로 묶으면 코드는 줄지만, 한쪽 변경이 다른 쪽에 영향을 미칠 위험이 커진다.

```tsx
// 공통 훅으로 추출 전에 스스로에게 물어본다:
// - 로깅 값이 페이지마다 달라질 가능성이 있는가?
// - 화면을 닫는 동작이 일부 페이지에서만 필요한가?
// - 바텀시트에 보여줄 텍스트/이미지가 달라질 수 있는가?
// → 하나라도 "예"라면 중복을 허용하는 것이 더 안전하다
```

중복 코드 허용이 나은 경우: 페이지마다 동작이 달라질 가능성이 있을 때.  
공통 추출이 나은 경우: 동작이 완전히 동일하고 미래에도 동일할 것이 확실할 때.

### C. Props Drilling을 제거한다

```tsx
// ❌ Before: recommendedItems, onConfirm이 ItemEditModal → ItemEditBody → ItemEditList로 전달
function ItemEditModal({ items, recommendedItems, onConfirm, onClose }) {
  return (
    <Modal>
      <ItemEditBody
        items={items}
        keyword={keyword}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </Modal>
  );
}

// ✅ After: Composition 패턴으로 중간 컴포넌트 제거
function ItemEditModal({ items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");
  return (
    <Modal onClose={onClose}>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={onClose}>Close</Button>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </Modal>
  );
}
```

---

## 판단 흐름 요약

```
코드를 작성하거나 리뷰할 때 아래 순서로 확인한다.

1. 가독성  — 한 번에 파악해야 할 맥락이 너무 많지 않은가?
2. 예측 가능성 — 이름·파라미터·반환값만 봐도 동작을 예측할 수 있는가?
3. 응집도  — 함께 변경될 코드가 흩어져 있지 않은가?
4. 결합도  — 이 코드를 바꿀 때 영향 범위가 지나치게 넓지 않은가?

네 가지를 동시에 만족하기 어려울 때는 현재 상황에서 어떤 값을
우선해야 장기적으로 변경이 쉬운지 팀과 함께 판단한다.
```

---

> 출처: [Frontend Fundamentals](https://frontend-fundamentals.com) — Toss Frontend Chapter
