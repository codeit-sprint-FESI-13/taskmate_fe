// formatNotificationType
export const formatNotificationType = (type: string) => {
  switch (type) {
    case "TODO_DUE_SOON":
      return "마감일 알림";

    case "TEAM_TODO_CREATED":
      return "할 일 생성 알림";
  }
};

// formatRelativeTime

export const formatRelativeTime = (createdAt: string) => {
  const now = new Date().getTime(); // 현재 시간 (ms)
  const created = new Date(createdAt).getTime(); // 생성 시간 (ms)

  const diff = now - created; // 시간 차이 (ms)

  if (diff < 0) return "방금 전"; // 미래 방어

  const minutes = Math.floor(diff / (1000 * 60)); // 분

  if (minutes < 1) return "방금 전"; // 1분 미만
  if (minutes < 60) return `${minutes}분 전`; // 1시간 미만

  const hours = Math.floor(minutes / 60); // 시간

  if (hours < 24) return `${hours}시간 전`; // 1일 미만

  const days = Math.floor(hours / 24); // 일

  if (days < 7) return `${days}일 전`; // 1주 미만

  const weeks = Math.floor(days / 7); // 주

  return `${weeks}주 전`;
};

// buildNotificationUrl

type BuildUrlParams = {
  goalId: number;
  teamId?: number | null;
};

export const buildNotificationUrl = ({ goalId, teamId }: BuildUrlParams) => {
  if (teamId) {
    return `/taskmate/team/${teamId}/goal/${goalId}`;
  }

  return `/taskmate/personal/goal/${goalId}`;
};

// 무한스크롤 옵션 객체 생성 유틸 함수
// todo: main utils에 중복 정의 하나의 공통유틸로 분리

type CursorParams = {
  size?: number;
  cursorId?: number;
  cursorCreatedAt?: string;
};

type CursorPage = {
  hasNext: boolean;
  nextCursorId?: number;
  nextCursorCreatedAt?: string;
};

export function createPaginationOptions<
  Params extends CursorParams = CursorParams,
  Page extends CursorPage = CursorPage,
>(apiKey: string, apiFunction: (param: Params) => Promise<{ data: Page }>) {
  const size = 20;

  return {
    queryKey: [apiKey],
    initialPageParam: { size } as Params,

    queryFn: async ({ pageParam }: { pageParam: Params }) => {
      const res = await apiFunction(pageParam);
      return res.data;
    },

    getNextPageParam: (lastPage: Page): Params | undefined =>
      lastPage.hasNext
        ? ({
            size,
            cursorId: lastPage.nextCursorId,
            cursorCreatedAt: lastPage.nextCursorCreatedAt,
          } as Params)
        : undefined,
  };
}
