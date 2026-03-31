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
