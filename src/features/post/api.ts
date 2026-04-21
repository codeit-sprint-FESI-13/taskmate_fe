import { apiClient } from "@/shared/utils/api/client";

import type { CreatePostInput, Post } from "./types";

export const postApi = {
  // 단일 글 조회
  getById: (id: number) => apiClient.get<Post>(`/api/posts/${id}`),

  // 전체 글 조회
  getAll: () => apiClient.get<Post[]>("/api/posts"),

  // 글 생성
  create: (data: CreatePostInput) => apiClient.post<Post>("/api/posts", data),

  // 글 삭제
  delete: (id: number) => apiClient.delete<void>(`/api/posts/${id}`),
};
