# ✅ TaskMate — 올인원 할 일 관리 서비스

<!-- 프로젝트 대표 이미지/목업 -->
<!-- ![readme_mockup](대표이미지_URL) -->

- 배포 URL : https://taskmate-fe.vercel.app/login
- Test ID : admin@admin.com
- Test PW : admin123!

<br>

## 프로젝트 소개

- TaskMate는 개인 할 일부터 팀 협업까지 하나의 서비스에서 관리할 수 있는 올인원 태스크 관리 플랫폼입니다.
- 목표(Goal) 기반으로 할 일(Todo)을 구조화하여 마감일·진척률을 한눈에 파악할 수 있습니다.
- 팀을 생성하고 초대 링크를 공유해 팀원들과 목표를 함께 관리할 수 있습니다.
- 즐겨찾기 목표, 대시보드 진행률 요약, 실시간 알림(SSE)을 통해 업무 흐름을 빠르게 파악할 수 있습니다.
- 삭제한 할 일은 휴지통에 보관되며 복구하거나 영구 삭제할 수 있습니다.

<br>

## 팀원 구성

<div align="center">

|                                                                **김종진**                                                                |                                                                 **황효진**                                                                  |                                                          **zaenny**                                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/SugarSyrup?v=4" height=150 width=150> <br/> @SugarSyrup](https://github.com/SugarSyrup) | [<img src="https://avatars.githubusercontent.com/hwanghyojin?v=4" height=150 width=150> <br/> @hwanghyojin](https://github.com/hwanghyojin) | [<img src="https://avatars.githubusercontent.com/zaenny?v=4" height=150 width=150> <br/> @zaenny](https://github.com/zaenny) |

</div>

<br>

## 1. 개발 환경

- Front : Next.js 16, React 19, TypeScript, Tailwind CSS v4, Zustand, React Query
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion, Github Wiki
- 서비스 배포 환경 : Vercel
- 디자인 : Figma

<br>

## 2. 채택한 개발 기술과 브랜치 전략

### Next.js (App Router), TypeScript

- **Next.js App Router**
  - 서버 컴포넌트와 클라이언트 컴포넌트를 명확히 분리해 불필요한 번들 크기를 줄였습니다.
  - API Route(`/api/[...path]`)를 프록시로 활용해 백엔드 URL 노출 없이 인증 토큰을 서버에서 안전하게 첨부합니다.
  - 401/403 응답 시 토큰을 자동 갱신하고 원래 요청을 재시도해 사용자가 로그인 만료를 인식하지 못하도록 처리했습니다.
- **TypeScript**
  - API Request/Response 타입을 `entities/{domain}/types/`에 정의해 런타임 에러를 사전에 방지했습니다.
  - Zod 스키마로 폼 유효성 검사 로직을 타입과 함께 관리했습니다.

### Tailwind CSS v4

- `src/app/globals.css`의 `@theme`에 디자인 토큰(색상·타이포그래피·브레이크포인트)을 중앙 관리해 일관된 UI를 유지했습니다.
- `typography-{scale}` 유틸리티 클래스(`typography-body-2`, `typography-label-1` 등)를 정의해 디자인 시스템을 코드로 강제했습니다.
- 임의값(`text-[14px]`) 사용을 금지하고 토큰 기반 스타일만 허용해 디자인 일관성을 높였습니다.

### Zustand, React Query

- **React Query** : 서버 상태를 `entities/{domain}/query/`의 `queryOptions`로 중앙 관리했습니다. `staleTime` 60초 기본값과 `throwOnError: true`로 에러를 `ErrorBoundary`에 위임했습니다.
- **Zustand** : 전역 UI 상태(모달/오버레이 스택, 인증 정보)만 담당합니다. 인증 상태는 `persist + immer` 미들웨어로 localStorage에 유지됩니다.

### Feature-Sliced Design (FSD)

- `app → widgets → features → entities → shared` 단방향 의존 흐름을 강제해 코드 변경 영향 범위를 예측 가능하게 유지했습니다.
- `pnpm steiger`로 레이어 위반을 자동 감지합니다.
- 각 slice는 `index.ts`를 통해서만 외부에 노출해 내부 구현 변경이 외부에 영향을 미치지 않도록 했습니다.

### MSW (Mock Service Worker)

- 개발 환경에서 실제 백엔드 없이 API 동작을 테스트할 수 있도록 MSW를 도입했습니다.
- `pnpm dev:full`로 Next.js 개발 서버와 json-server(port 4000)를 동시에 실행할 수 있습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 `main`, `develop`, `feat` 보조 브랜치를 운용했습니다.
  - **main** 브랜치는 배포 단계에서만 사용합니다.
  - **develop** 브랜치는 개발 단계의 통합 브랜치입니다.
  - **feat** 브랜치는 기능 단위(`feat/#이슈번호`)로 독립 개발하고 merge 후 삭제합니다.

<br>

## 3. 프로젝트 구조

```
├── docs/
└── src/
     ├── app/
     │    ├── api/
     │    │    ├── [...path]/route.ts     # API 프록시 (토큰 첨부·갱신)
     │    │    └── auth/                 # OAuth 콜백 (Google, Kakao)
     │    ├── (auth)/
     │    │    ├── login/
     │    │    └── signup/
     │    ├── taskmate/
     │    │    ├── page.tsx              # 대시보드
     │    │    ├── personal/goal/        # 개인 목표
     │    │    ├── team/                 # 팀 목록·상세·관리
     │    │    ├── my/                   # 내 프로필
     │    │    ├── trash/                # 휴지통
     │    │    └── invitations/          # 팀 초대
     │    ├── layout.tsx
     │    ├── page.tsx                   # 랜딩 페이지
     │    └── globals.css
     ├── widgets/
     │    ├── auth/
     │    ├── home/
     │    ├── landing/
     │    ├── goal/
     │    ├── team/
     │    ├── todo/
     │    ├── trash/
     │    ├── management/
     │    ├── my/
     │    └── NavigationBar/
     ├── features/
     │    ├── auth/
     │    ├── todo/
     │    ├── goal/
     │    ├── team/
     │    ├── user/
     │    ├── management/
     │    ├── trash/
     │    └── notification/
     ├── entities/
     │    ├── auth/
     │    ├── todo/
     │    ├── goal/
     │    ├── team/
     │    ├── user/
     │    ├── dashboard/
     │    ├── notification/
     │    └── trash/
     └── shared/
          ├── ui/
          │    ├── Button/
          │    ├── Input/
          │    ├── Modal/
          │    ├── Icon/
          │    ├── AsyncBoundary/
          │    ├── Toast/
          │    └── ...
          ├── hooks/
          │    ├── useOverlay/
          │    ├── useInfiniteScroll/
          │    └── ...
          ├── lib/
          │    └── api/client.ts
          ├── store/
          │    └── overlay/
          ├── mock/
          │    ├── server.ts
          │    └── browser.ts
          └── utils/
```

<br>

## 4. 역할 분담

### 김종진

- **UI**
  - 페이지 : 대시보드, 개인 목표 상세, 랜딩 페이지, 팀 목록, 팀 상세, 팀 생성
  - 공통 컴포넌트 : NavigationBar, AsyncBoundary, Overlay 시스템
- **기능**
  - API 프록시 및 토큰 자동 갱신, FSD 아키텍처 설계, MSW 목 핸들러
  - 팀 생성·조회·팀원 관리, 팀 초대 링크
  - 할 일 CRUD, 무한 스크롤,

<br>

### 황효진

- **UI**
  - 페이지 : 로그인, 회원가입, 내 프로필
  - 공통 컴포넌트 : 인증 폼, InputBox
- **기능**
  - 팀 관리
  - 알림

<br>

### zaenny

- **UI**
  - 페이지 : 할 일 상세 모달, 휴지통
  - 공통 컴포넌트 : TodoDetailModal, 필터·정렬 UI
- **기능**
  - Auth, 로그인 인증/인가
  - OAuth(Google, Kakao) 로그인, 회원가입 유효성 검사, 프로필 수정
  - 휴지통 복구·삭제

<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2026-03-12 ~ 진행 중
- 기획 및 설계 : 2026-03-12 ~ 2026-03-18
- UI 구현 : 2026-03-19 ~ 2026-04-06
- 기능 구현 : 2026-04-07 ~ 현재

<br>

### 작업 관리

- GitHub Projects와 Issues를 사용하여 기능 단위로 작업을 분배하고 진행 상황을 공유했습니다.
- 정기 회의를 통해 작업 순서와 FSD 레이어 경계에 대한 논의를 진행하고 Notion에 기록했습니다.

<br>

## 6. 신경 쓴 부분

### [API 프록시 아키텍처와 토큰 자동 갱신]

- 모든 클라이언트 요청이 `src/app/api/[...path]/route.ts`를 경유하도록 설계했습니다.
- 쿠키에서 `accessToken`을 읽어 `Authorization` 헤더를 서버에서 첨부하므로 토큰이 클라이언트 코드에 노출되지 않습니다.
- 401/403 응답 시 토큰을 자동 갱신하고 원래 요청을 재시도해 사용자가 로그인 만료를 인식하지 못하도록 처리했습니다.

### [Overlay / Modal 시스템]

- Zustand 레이어 스택으로 모달·바텀시트를 전역에서 관리합니다.
- `useOverlay().open("id", <Component />)` 한 줄로 어느 레이어에서든 모달을 열 수 있도록 추상화했습니다.
- `exitOnUnmount: true`(기본값)로 페이지 이동 시 남은 모달이 자동으로 닫힙니다.

### [FSD 아키텍처 준수]

- `pnpm steiger`로 레이어 위반을 자동 감지합니다.
- `entities` 레이어는 순수 HTTP 호출만 담당하고, 캐시 무효화·네비게이션 등 사이드 이펙트는 반드시 `features/mutation` 훅의 `onSuccess`에서 처리합니다.

<br>

## 7. 페이지별 기능

### [랜딩 페이지]

- 서비스 소개, 주요 기능 안내, 팀원 온보딩 단계를 시각적으로 전달합니다.
- 로그인 상태에 따라 대시보드 또는 로그인 페이지로 자동 이동합니다.

| 랜딩 페이지           |
| --------------------- |
| <!-- ![landing]() --> |

<br>

### [로그인 / 회원가입]

- 이메일·비밀번호 입력 시 실시간 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 표시됩니다.
- Google, Kakao OAuth 소셜 로그인을 지원합니다.
- 인증 상태는 Zustand `persist` 미들웨어로 localStorage에 유지됩니다.

| 로그인              | 회원가입             |
| ------------------- | -------------------- |
| <!-- ![login]() --> | <!-- ![signup]() --> |

<br>

### [대시보드]

- 로그인 후 첫 화면으로, 개인 진행률 요약, 즐겨찾기 목표, 오늘의 할 일 현황을 한눈에 확인할 수 있습니다.
- 즐겨찾기 목표는 무한 스크롤로 탐색할 수 있습니다.

| 대시보드                |
| ----------------------- |
| <!-- ![dashboard]() --> |

<br>

### [개인 목표]

- 목표별로 할 일(Todo)을 생성·수정·삭제할 수 있습니다.
- 마감일·생성일 기준 정렬, To Do / Done 필터를 지원합니다.
- 커서 기반 무한 스크롤로 대량의 할 일을 성능 저하 없이 탐색합니다.
- 할 일 상세 모달에서 목표 연결, 마감일, 메모, 파일 첨부를 관리합니다.

| 개인 목표 상세              | 할 일 생성                |
| --------------------------- | ------------------------- |
| <!-- ![personal-goal]() --> | <!-- ![create-todo]() --> |

<br>

### [팀 관리]

- 팀을 생성하고 초대 링크를 공유해 팀원을 추가할 수 있습니다.
- 팀 목표를 생성하고 팀원에게 할 일을 할당할 수 있습니다.
- 팀 관리 페이지에서 멤버 목록 조회 및 추방이 가능합니다.

| 팀 목록                 | 팀 상세                   |
| ----------------------- | ------------------------- |
| <!-- ![team-list]() --> | <!-- ![team-detail]() --> |

<br>

### [내 프로필]

- 프로필 이미지, 이름, 이메일 정보를 확인하고 수정할 수 있습니다.
- 로그아웃 시 저장된 인증 정보가 초기화되고 랜딩 페이지로 이동합니다.

| 내 프로필                |
| ------------------------ |
| <!-- ![my-profile]() --> |

<br>

### [휴지통]

- 삭제한 할 일이 보관되며 복구하거나 영구 삭제할 수 있습니다.

| 휴지통              |
| ------------------- |
| <!-- ![trash]() --> |

<br>

### [실시간 알림]

- SSE(Server-Sent Events)를 통해 팀 초대, 할 일 변경 등의 알림을 실시간으로 수신합니다.
- 알림 드로어에서 읽음 처리 및 목록 확인이 가능합니다.

| 알림                       |
| -------------------------- |
| <!-- ![notification]() --> |

<br>

## 8. 트러블 슈팅

<!-- 트러블 슈팅 내용 추가 예정 -->

<br>

## 9. 개선 목표

- **접근성 개선** : 키보드 네비게이션, ARIA 속성 추가로 스크린 리더 호환성 향상
- **성능 최적화**
  - 이미지 컴포넌트 `next/image` 전환 및 lazy loading 적용
  - 번들 크기 분석 후 heavy dependency 경량화
- **테스트 커버리지 확대** : 핵심 mutation 훅과 주요 컴포넌트 단위 테스트 추가
- **에러 처리 고도화** : 네트워크 에러·타임아웃 상황에 대한 사용자 피드백 개선
