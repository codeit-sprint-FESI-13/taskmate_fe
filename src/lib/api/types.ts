export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "INTERNAL_ERROR"
  | "UNKNOWN_ERROR";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number>;
  body?: unknown;
}

export interface ApiError {
  status: number;
  code: ErrorCode;
  message: string;
  data?: unknown;
}
