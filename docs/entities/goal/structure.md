## 파일 구조

```
src/entities/goal/
├── index.ts                      # Public API — 외부 import는 반드시 여기서
├── api/
│   └── api.ts                    # goalApi
├── query/
│   └── goal.queryOptions.ts      # goalQueryOptions — React Query option 팩토리
└── types/
    ├── goal.types.ts             # 단일 목표 CRUD 타입 (생성·수정·삭제·요약·즐겨찾기)
    ├── goalList.types.ts        # 목표 목록 조회 타입 (개인·팀 리스트, 커서, 정렬)
    └── favorite.types.ts         # 즐겨찾기 목표 목록 타입
```
