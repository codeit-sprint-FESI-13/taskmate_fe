const BASE_URL: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : (process.env.NEXT_PUBLIC_API_URL ?? "");

export const API_CONFIG = {
  BASE_URL,

  TIMEOUT: 5000,
} as const;
