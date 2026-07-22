## 프로젝트 개요

- 개인 할 일부터 팀 협업까지 하나의 서비스에서 관리할 수 있는 올인원 태스크 관리 플랫폼
- 기술 스택: Next.js,
- 아키텍처: FSD (Feature-Sliced Design)

## Type Naming Convention

- 기본 : PascalCase
- Component Props: Pascal + {ComponentName}Props
- API Response : {Entity}Response / {Entity}ListResponse
- API Request : Create{Entity}Request / Update{Entity}Request

## File & Folder Naming Convention

- React Component : PascalCase
- Hooks : camelCase + `use` prefix
- utils / helpers : camelCase
- constants : UPPER_SNAKE_CASE
- zustand store: camelCase + `.store.ts`
- test : `.test.ts` or `.test.tsx`

## 코딩 규칙

- console.log 절대 커밋 금지
- 이모지 코드베이스에 사용 금지
- 파일 하나당 200줄 이내 유지
- 컴포넌트는 항상 named export

## Commands

```bash
pnpm dev              # Next.js dev server (localhost:3000)
pnpm dev:full         # Next.js + json-server mock (port 4000) concurrently
pnpm build            # Production build
pnpm lint             # ESLint (Flat Config)
pnpm test             # Jest (unit/integration)
pnpm test:watch       # Jest in watch mode
pnpm mock             # json-server only (port 4000, watches db.json)
pnpm storybook        # Storybook on port 6006
pnpm steiger          # FSD architecture lint
pnpm steiger:watch    # FSD architecture lint in watch mode
```

Run a single Jest test file:

```bash
pnpm test -- src/shared/hooks/useOverlay/index.test.tsx
```

## 언어 및 커뮤니케이션 규칙

- 기본 응답 언어: 한국어
- 코드 주석: 한국어로 작성
- 커밋 메시지: 한국어로 작성
- 문서화: 한국어로 작성
- 변수명/함수명: 영어 (코드 표준 준수)
