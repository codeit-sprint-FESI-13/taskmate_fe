## 파일 구조

```
src/entities/todo/
├── index.ts                         # Public API — 외부 import는 반드시 여기서
├── api/
│   └── todo.api.ts                  # todoApi
├── query/
│   └── todo.queryOptions.ts         # todoQueryOptions — React Query option 팩토리
└── types/
    └── todo.types.ts                # 할 일 CRUD·목록·홈 피드 타입 정의
```
