import { API_CONFIG } from "./config";

// 타입 정의
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number>;
  body?: unknown;
}

// API 에러 응답 형태 (공통 에러 처리용)
export interface ApiError {
  status: number;
  code: ErrorCode;
  message: string;
  data?: unknown;
}

// URL 빌더
function buildUrl(path: string, params?: Record<string, string | number>) {
  const baseUrl = API_CONFIG.BASE_URL;
  const url = new URL(path.startsWith("/") ? path.slice(1) : path, baseUrl);

  // 쿼리 파라미터 처리
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );
  }

  // 전체 URL 반환
  return url.toString();
}

// 핵심 request 함수
async function request<T>(
  method: HttpMethod,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, body, headers, ...rest } = options;

  // 1. FormData 여부 체크 (이미지 전송 대응 인터셉트 로직)
  const isFormData = body instanceof FormData;

  const res = await fetch(buildUrl(path, params), {
    method,
    headers: {
      // FormData가 아닐 때만 JSON 헤더 추가 (브라우저가 boundary를 정하게 비워둠)
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...headers,
    },
    // FormData가 아니면 직렬화, 맞으면 그대로 전달
    body: isFormData
      ? (body as FormData)
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    // 2. 응답 가공 (Response Interceptor 역할)
    const error: ApiError = {
      status: res.status,
      code: mapStatusToCode(res.status),
      message: errorData.message ?? res.statusText,
      data: errorData,
    };
    throw error;
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// 외부 노출용 apiClient
export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, options),
};

// 1. 에러 코드 타입 정의
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "INTERNAL_ERROR"
  | "UNKNOWN_ERROR";

// 2. 변환 함수를 작성
export function mapStatusToCode(status: number): ErrorCode {
  const statusMap: Record<number, ErrorCode> = {
    400: "VALIDATION_ERROR",
    401: "AUTH_REQUIRED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
  };

  return statusMap[status] ?? "INTERNAL_ERROR";
}
