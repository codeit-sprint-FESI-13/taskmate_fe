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
