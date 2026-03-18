import { API_CONFIG } from "./config";

// 타입 정의
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number>;
  body?: unknown;
}

export interface ApiError {
  status: number;
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
  const res = await fetch(buildUrl(path, params), {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error: ApiError = {
      status: res.status,
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
