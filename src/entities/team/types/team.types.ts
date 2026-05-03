export const TEAM_NAME_MAX_LENGTH = 50;

export type MemberRole = "ADMIN" | "MEMBER";

export interface Member {
  id: number;
  userId: number;
  userEmail: string;
  profileImageUrl: string | null;
  userNickname: string;
  role: MemberRole;
  joinedAt: string;
}

export interface TeamSummary {
  teamId: number;
  teamName: string;
  isAdmin: boolean;
  todayProgressPercent: number;
  todayTodoCount: number;
  overdueTodoCount: number;
  doneTodoCount: number;
}

export interface TeamListItem {
  teamId: number;
  teamName: string;
  goals: { goalId: number; goalName: string }[];
}

export interface TeamDetail {
  id: number;
  name: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
