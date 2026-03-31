import { API_CONFIG } from "./config";
import { ErrorCode } from "./types";

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
) {
  const { BASE_URL } = API_CONFIG;
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  const relativePath = path.startsWith("/") ? path.slice(1) : path;

  const url = new URL(relativePath, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );
  }
  return url.toString();
}

export function mapStatusToCode(status: number): ErrorCode {
  const statusMap: Record<number, ErrorCode> = {
    400: "VALIDATION_ERROR",
    401: "AUTH_REQUIRED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    500: "INTERNAL_ERROR",
  };

  // 맵에 정의된 에러면 그대로 반환
  if (statusMap[status]) return statusMap[status];

  // 500번대는 서버 에러로
  if (status >= 500) return "INTERNAL_ERROR";

  // 그 외의 모든 상황은 알 수 없는 에러
  return "UNKNOWN_ERROR";
}
