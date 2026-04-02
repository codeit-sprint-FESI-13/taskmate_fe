// 팀 상세 정보
export interface TeamDetailData {
  id: number;
  name: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

// 팀 상세 정보 성공 케이스
export interface TeamResponseSuccess {
  success: true;
  code: string;
  message: string;
  data: TeamDetailData;
  timestamp: string;
}

// 팀 상세 정보 실패 케이스
export interface TeamApiErrorResponse<
  TCode extends string = string,
  TData = unknown,
> {
  success: false;
  code: TCode;
  message: string;
  data: TData;
  timestamp: string;
}

export type UnauthorizedErrorResponse = TeamApiErrorResponse<
  "AUTH_LOGIN_REQUIRED",
  null
>;
export type TeamNotFoutdErrorResponse = TeamApiErrorResponse<
  "TEAM_NOT_FOUND",
  null
>;

// 팀 멤버 데이터
export interface MemberData {
  id: number;
  userId: number;
  profileImageUrl: string;
  userEmail: string;
  userNickname: string; // "나 팀장!";
  role: string;
  joinedAt: string;
}

// 팀 멤버 목록 조회 성공 케이스
export interface MemberListResponseSuccess {
  success: true;
  code: string;
  message: string;
  data: MemberData[];
  timestamp: string;
}

// 팀 멤버

export type MemberRole = "ADMIN" | "MEMBER";

export interface MemberRoleUpdateRequest {
  role: MemberRole;
}

// 팀 멤버 권한 변경 성공 케이스
export interface MemberRoleUpdateSuccessResponse {
  success: true;
  code: "SUCCESS";
  message: string;
  data: MemberData;
  timestamp: string;
}

// 팀 멤버 초대 성공 케이스
export interface InviteResponseSuccess {
  success: true;
  code: string;
  message: string;
  data: null;
  timestamp: string;
}

// 팀 삭제 성공 케이스
export interface TeamDeleteResponseSuccess {
  success: true;
  code: string;
  message: string;
  data: null;
  timestamp: string;
}
