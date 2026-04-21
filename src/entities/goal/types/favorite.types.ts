// favoriteGoalsApi - GET / query params

export type FavoriteGoalsQueryParams = {
  cursorId?: number;
  cursorCreatedAt?: string;
  size?: number;
};

// FavoriteGoalItem

export interface FavoriteGoalItem {
  teamId: number;
  teamName: string;
  goalId: number;
  goalName: string;
  progressPercent: number;
  isFavorite: boolean;
  createdAt: string;
}

// FavoriteGoalsSuccessResponse

export interface FavoriteGoalsSuccessResponse {
  success: true;
  code: string;
  message: string;
  data: {
    items: FavoriteGoalItem[];
    hasNext: boolean;
    nextCursorCreatedAt: string;
    nextCursorId: number;
  };
  timestamp: string;
}

// FavoriteGoalsErrorResponse

export type FavoriteGoalsErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "GOAL_CURSOR_INVALID";
      message: "커서 값이 올바르지 않습니다. cursorCreatedAt와 cursorId를 함께 전달하세요.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "MAIN_PAGE_SIZE_INVALID";
      message: "size는 1 이상이어야 합니다.";
      data: null;
      timestamp: string;
    };

export type FavoriteGoalsResponse =
  | FavoriteGoalsSuccessResponse
  | FavoriteGoalsErrorResponse;
