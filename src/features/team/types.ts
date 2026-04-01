export interface ResponseCreateTeam {
  success: true;
}

export interface ResponseCreateTeamError {
  success: false;
  error: {
    message: string;
  };
}

export interface TeamSummary {
  teamId: number;
  teamName: string;
  isAdmin: boolean;
  todayProgressPercentage: number;
  todayTodoCount: number;
  overdueTodoCount: number;
  doneTodoCount: number;
}

export interface ResponseTeamSummary {
  success: boolean;
  code: string;
  message: string;
  data: TeamSummary;
  timestamp: Date;
}

export interface ResponseQuitTeam {
  success: boolean;
}

export interface ResponseTeamList {
  success: boolean;
  code: string;
  message: string;
  data: {
    teamId: number;
    teamName: string;
    goals: {
      goalId: number;
      goalName: string;
    }[];
  }[];
}

export interface Member {
  id: number;
  userId: number;
  userEmail: string;
  userNickname: string;
  role: "ADMIN" | "MEMBER";
  joinedAt: string;
}

export interface ResponseMemberList {
  success: boolean;
  code: string;
  message: string;
  data: Member[];
}

export interface ResponseTeamList {
  success: boolean;
  code: string;
  message: string;
  data: {
    teamId: number;
    teamName: string;
    goals: {
      goalId: number;
      goalName: string;
    }[];
  }[];
}
