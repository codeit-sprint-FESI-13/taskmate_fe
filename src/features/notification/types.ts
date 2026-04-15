// 내 알림 목록 조회

export interface NotificationItem {
  id: number;
  type: "TODO_DUE_SOON" | "TEAM_TODO_CREATED";
  targetType: "TODO";
  targetId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  teamId: number | null;
  goalId: number;
  goalName: string;
  spaceName: string;
}

export interface NotificationListSuccessResponse {
  success: true;
  code: "SUCCESS";
  message: string;
  data: {
    items: NotificationItem[];
    hasNext: boolean;
    nextCursorCreatedAt: string;
    nextCursorId: number;
  };
  timestamp: string;
}

export type NotificationListErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "NOTIFICATION_CURSOR_INVALID";
      message: "커서 값이 올바르지 않습니다. cursorCreatedAt와 cursorId를 함께 전달하세요.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "NOTIFICATION_PAGE_SIZE_INVALID";
      message: "size는 1 이상 100 이하여야 합니다.";
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

// 알림 SSE 구독

export interface NotificationSSEData {
  id: number;
  type: "TODO_DUE_SOON" | "TEAM_TODO_CREATED";
  targetType: "TODO";
  targetId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// NotificationSSESuccessResponse > NotificationSSEEvent 적절
// HTTP 성공 응답이라기보다 이벤트 스트림에서 받는 이벤트 타입

export type NotificationSSEEvent =
  | {
      event: "INIT";
      data: "connected";
    }
  | {
      event: "NOTIFICATION";
      data: NotificationSSEData;
      id: number;
    };

export type NotificationSSEErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "INTERNAL_SERVER_ERROR";
      message: "서버 내부 오류가 발생했습니다.";
      data: null;
      timestamp: string;
    };

// 알림 단건 읽음 처리

export interface NotificationReadSuccessResponse {
  success: true;
  code: "SUCCESS";
  message: "알림 읽음 처리에 성공했습니다.";
  data: null;
  timestamp: string;
}

export type NotificationReadErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "NOTIFICATION_NOT_FOUND";
      message: "알림을 찾을 수 없습니다.";
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

// 알림 전체 읽음 처리

export interface NotificationReadAllSuccessResponse {
  success: true;
  code: "SUCCESS";
  message: "알림 전체 읽음 처리에 성공했습니다.";
  data: null;
  timestamp: string;
}

export type NotificationReadAllErrorResponse =
  | {
      success: false;
      code: "AUTH_LOGIN_REQUIRED";
      message: "로그인이 필요합니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "USER_ALREADY_DELETED";
      message: "탈퇴한 계정입니다.";
      data: null;
      timestamp: string;
    }
  | {
      success: false;
      code: "INTERNAL_SERVER_ERROR";
      message: "서버 내부 오류가 발생했습니다.";
      data: null;
      timestamp: string;
    };

// infinite scroll params types

// export type InfiniteScrollQueryParams = {
//   cursorId?: number;
//   cursorCreatedAt?: string;
//   size?: number;
// };
