import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 제공하여 테스트 환경에서 next.config.js 및 .env 파일을 로드
  dir: "./",
});

// Jest에 전달할 사용자 정의 설정
const config: Config = {
  coverageProvider: "v8",

  // testEnvironment: 'jsdom', -> 이 설정을 아래로 변경 필요
  testEnvironment: "jest-fixed-jsdom",

  // 테스트 전에 실행할 설정 파일을 지정
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig는 비동기 방식으로 next/jest가 내부적으로 설정을 로드할 수 있도록 내보내짐
export default createJestConfig(config);
