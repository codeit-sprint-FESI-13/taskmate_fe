export interface ProgressItem {
  teamId: number;
  teamName: string;
  todayProgressPercent: number;
}

export interface ProgressData {
  teamProgress: ProgressItem[];
  myProgressPercent: number;
}

// @TODO: 정의되어있는 ApiResponse | ApiError 로 묶기

export interface ProgressSuccessResponse {
  success: true;
  code: "SUCCESS";
  message: string;
  data: ProgressData;
  timestamp: string;
}

// @TODO: 정의되어있는 ApiResponse | ApiError 로 묶기

export type ProgressErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "USER_NOT_FOUND";
      message: "사용자를 찾을 수 없습니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "USER_ALREADY_DELETED";
      message: "탈퇴한 계정입니다.";
      data: null;
      timestamp: string;
    };

export type ProgressResponse = ProgressSuccessResponse | ProgressErrorResponse;
