interface CreateGoalRequest {
  name: string;
  dueDate: string;
}

export interface CreatePersonalGoalRequest extends CreateGoalRequest {
  type: "PERSONAL";
}

export interface CreateTeamGoalRequest extends CreateGoalRequest {
  teamId: number;
  type: "TEAM";
}

export interface CreateGoalResponse {
  success: boolean;
}

export interface UpdateGoalRequest {
  name: string;
  dueDate: string;
}

export interface UpdateGoalResponse {
  id: number;
  name: string;
  dueDate: string;
}

export type DeleteGoalResponse = null;

export interface ToggleGoalFavoriteResponse {
  success: boolean;
}

export interface GoalSummaryResponse {
  goalId: number;
  goalName: string;
  dueDate: string;
  dDay: number;
  progressPercent: number;
}
