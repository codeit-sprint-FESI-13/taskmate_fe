# 모든 할 일을 한곳에서 관리하는 서비스 TaskMate

- 배포 URL : https://taskmate-fe.vercel.app
- 테스트 ID :
- 테스트 PW :

## 프로젝트 소개

- Taskmate는 나의 모든 할일을 관리하는 서비스입니다.
- 할 일은 목표로 묶이며, 목표 내부에서 할일을 관리할 수 있습니다.
- 개인스페이스와 팀 스페이스가 분리되어 있으며 팀을 생성해서 여러명이 함께 할일을 관리 할 수 있습니다.
- 할일에 대한 삭제와 복구, 마감기한 및 생성에 대한 알림 기능을 제공합니다.
 
### Installation

```bash
# 의존성 설치 (권장: pnpm)
pnpm install

# 또는
npm install
yarn install
```

### Usage

```bash
pnpm dev
# 또는
npm run dev
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

## 팀원 구성

- 김종진 [@SugarSyrup](https://github.com/SugarSyrup) 
- 이재인 [@zaenny](https://github.com/zaenny) 
- 황효진 [@hwanghyojin](https://github.com/hwanghyojin) 

## 개발 환경

- framework: next
- languague: typescript
- state manegement : zustand, tanstack-query
- test: jest, react-testing-library
- styles : tailwindcss
- package manager : pnpm

- Infra : Vercel
- BackendInfra : AWS EC2, RDS
- Design : Figma
- Tools : Notion, Discord

- WIKI

### 기술 선택 이유


## 브랜치 전략

- master : 제품으로 출시될 수 있는 브랜치(직접 푸시 불가)
- develop : 다음 출시 버전을 개발하는 브랜치(직접 푸시 불가)
    - feat/#{이슈넘버} : 기능을 개발하는 브랜치(origin)
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

## 폴더 구조

```
📁 public               // 빌드시 번들링 과정을 거치지 않고 복사되는 정적인 assets 담기는 폴더
📁 src
	┣ 📁 components       // 재사용 가능한 UI 컴포넌트 
		┣ 📁 common         // 어떤 도메인의 성질을 갖고 있지 않는 공용 UI 컴포넌트 (ex: Button, Typography)
		┗ 📁 [domain]
	┣ 📁 features         // 특정 도메인 단위의 비즈니스 로직 (ex: todo, team 등)
		┣ 📁 [domain]
			┣ 📁 hooks            // 커스텀 React Hooks
			┣ 📁 types            // 타입 정의 (ex: Todo, Team, GetUserRequest 등) ( 파일명은 ~~~.type.ts )
			┗ 📁 api              // API 요청 함수 모음 ( 파일명은 ~~~.api.ts )
	┣ 📁 hooks            // 공용 커스텀 React Hooks
	┣ 📁 utils            // 순수 유틸 함수 (format, validation, helper 등) (React 의존성 금지)
	┣ 📁 store            // 전역 상태 관리 (zustand) ( 파일명은 ~~~.store.ts )
	┣ 📁 providers 
	┣ 📁 app              // Next.js App Router 라우팅을 담당하는 폴더 
  ┣ 📁 mocks            // msw 관련 폴더
	┗ 📁 constants        // 전역 상수
```

## 개발 기간 및 작업 관리

2026.02.27 ~ 2026.04.17

- Notion 을 통한 FE/BE/Design 전체 진행 상황 공유 및 일정 수립
- Github Issue와 Github Projects 를 통한 상세한 FE 작업 분리

## 페이지별 기능

( 작성 중 )
