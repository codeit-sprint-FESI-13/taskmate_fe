export type SortType = "LATEST" | "OLDEST";

export interface GoalListCursor {
  cursorCreatedAt: string;
  cursorId: number;
}

export type PersonalGoalListResponse = {
  goalId: number;
  goalName: string;
}[];

export interface TeamGoalListItem {
  goalId: number;
  name: string;
  progressPercent: number;
  isFavorite: boolean;
  createdAt: string;
}

export interface TeamGoalListResponse {
  items: TeamGoalListItem[];
  nextCursor: GoalListCursor | null;
  size: number;
}
