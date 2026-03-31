import { ApiError, HttpMethod, RequestOptions } from "./types";
import { buildUrl, mapStatusToCode } from "./utils";

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
