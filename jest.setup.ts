import "@testing-library/jest-dom";

import { server } from "@/shared/mock/server";

// 모든 테스트가 시작하기 전 MSW 서버를 시작
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
// 이전 테스트의 모의 응답이 다음 테스트에 영향을 주지 않도록 이전 테스트에서 설정된 핸들러를 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트가 완료된 후에 MSW 서버를 종료
afterAll(() => server.close());
