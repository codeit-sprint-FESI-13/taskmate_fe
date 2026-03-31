# TaskMate

## Description

모든 할 일을 한곳에서 관리하는 서비스. (링크)

## Features

- 메인 페이지: 팀과 유저의 할 일 한눈에 볼 수 있는 대시보드를 보여줍니다.
- 목표 페이지 : 모든 할 일들은 목표에 포함됩니다. 목표의 진행률을 확인 할 수 있으며 목표 편집, 할 일 필터링 / sorting 기능이 있습니다.
- 팀 페이지 : 팀을 생성하고 관리 / 초대 할 수 있으며, 개인과 마찬가지로 목표를 설정하고 할 일을 관리할 수 있습니다.
- 공통
  - 전체 반응형 페이지가 적용됩니다.
  - (할 일 리스트)에 대해 무한 스크롤이 적용됩니다.
  - (할 일과 팀 정보)에 브라우저 캐싱이 적용됩니다.
  - 할 일을 클릭하면 할 일 상세 UI가 보이며, 목표 / 마감기한 / 메모 등 제공하는 다양한 속성을 설정할 수 있습니다.

## Installation

```bash
# 의존성 설치 (권장: pnpm)
pnpm install

# 또는
npm install
yarn install
```

## Usage

```bash
pnpm dev
# 또는
npm run dev
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

### 기타 스크립트

| 명령어       | 설명           |
| ------------ | -------------- |
| `pnpm build` | 프로덕션 빌드  |
| `pnpm start` | 빌드된 앱 실행 |
| `pnpm lint`  | ESLint 검사    |

## Tech Stack / Built With

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router)
- **UI**: [React](https://react.dev/) 19, [Tailwind CSS](https://tailwindcss.com/) 4
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5
- **Code quality**: ESLint 9 (Flat Config), Prettier, [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) (pre-commit)
