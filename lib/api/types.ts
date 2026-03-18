// API 에러 응답 형태 (공통 에러 처리용)
export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}
