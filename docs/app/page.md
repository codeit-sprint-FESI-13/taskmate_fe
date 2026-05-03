# app/page.tsx 작성 규칙

## 기본 원칙

- `page.tsx`는 웬만하면 서버 컴포넌트로 유지한다.
- 특별한 이유가 없으면 페이지 파일에 `'use client'`를 선언하지 않는다.
- 페이지는 데이터/상태 로직을 직접 가지기보다, 하위 `widgets`/`features`를 조합하는 역할에 집중한다.

## `'use client'`가 필요한 경우

아래 조건이 페이지 파일 자체에 직접 존재할 때만 허용한다.

- `useState`, `useEffect`, `useRef` 같은 클라이언트 훅을 페이지에서 직접 사용
- `onClick`, `onChange` 등 이벤트 핸들러를 페이지에서 직접 처리
- `window`, `document`, `localStorage` 같은 브라우저 API 접근
- 클라이언트 전용 컴포넌트에 함수/이벤트 핸들러를 props로 직접 전달해야 하는 경우

## 권장 패턴

- `Suspense`, `ErrorBoundary`, `AsyncBoundary` 같은 클라이언트 경계는 가능한 한 페이지가 아닌 `widgets`/`features` 내부로 내린다.
- 페이지에서는 `<Heading />`, `<Summary />`처럼 경계를 감싼 완성 컴포넌트를 조합만 한다.
- 에러/로딩 UI도 페이지에서 직접 조합하기보다 해당 위젯 내부에서 자체 처리한다.

## 예시

```tsx
// page.tsx (Server Component)
import { Heading, Summary } from "@/widgets/goal";

export default function Page() {
  return (
    <>
      <Heading />
      <Summary />
    </>
  );
}
```
