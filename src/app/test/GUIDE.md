1. 테스트 진행시 /test에 있는 샘플 테스트 페이지 참고
   컴포넌트 테스트: [name].test.tsx
   페이지 테스트: page.test.tsx
   API 테스트: [name].api.test.ts

2. 폴더 및 파일 명명 규칙
   위치: 테스트 대상 파일과 동일한 위치
   파일명: [파일명].test.tsx (예: login.api.ts -> login.api.test.ts)

3. 테스트 작성 공식 (AAA 패턴)
   모든 테스트 코드는 준비(Arrange) - 실행(Act) - 단언(Assert) 순서로 작성하여 일관성을 유지

```ts
test("로그인 버튼 클릭 시 로딩 상태가 된다", async () => {
  // 1. Arrange: 렌더링 및 초기 상태 설정
  render(<LoginPage />);
  const loginButton = screen.getByRole("button", { name: "로그인" });

  // 2. Act: 사용자 인터렉션 발생
  await userEvent.click(loginButton);

  // 3. Assert: 예상 결과 검증
  expect(loginButton).toBeDisabled();
  expect(screen.getByText(/로딩 중/i)).toBeInTheDocument();
});
```

4. MSW 사용 가이드 (비동기 데이터)
   비동기 데이터를 검증할 때는 반드시 findBy 쿼리를 사용하며, 데이터 응답은 mocks/handlers/를 기준으로 함

[테스트 흐름]
컴포넌트가 fetch를 호출
mocks/server.ts가 요청을 가로챔
mocks/handlers/에 정의된 응답값을 반환
데이터가 렌더링되면 await screen.findByText(...)가 이를 찾아냄

성공 모킹: mocks/handlers.ts에 정의된 기본값 사용.
실패 모킹: 테스트 파일 내에서 일시적으로 핸들러를 덮어씌워(Override) 검증.

```ts
// 특정 테스트에서만 에러 상황을 만들고 싶을 때
server.use(
  http.get("/api/posts/1", () => {
    return new HttpResponse(null, { status: 500 });
  }),
);
```

5. 로컬 개발 서버와 동시에 런타임 실행

동시 실행

```bash
pnpm dev:full
```

서버 개별 실행

```bash
pnpm mock
```
