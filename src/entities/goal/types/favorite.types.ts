export type FavoriteGoalsQueryParams = {
  cursorId?: number;
  cursorCreatedAt?: string;
  size?: number;
};

export interface FavoriteGoalItem {
  teamId: number;
  teamName: string;
  goalId: number;
  goalName: string;
  progressPercent: number;
  isFavorite: boolean;
  createdAt: string;
}

export interface FavoriteGoalsSuccessResponse {
  items: FavoriteGoalItem[];
  hasNext: boolean;
  nextCursorCreatedAt?: string;
  nextCursorId?: number;
}
