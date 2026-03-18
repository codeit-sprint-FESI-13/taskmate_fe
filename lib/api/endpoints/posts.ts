import { apiClient } from "../client";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const postsApi = {
  getById: (id: number) => apiClient.get<Post>(`/posts/${id}`),
  getAll: () => apiClient.get<Post[]>("/posts"),
  create: (body: Omit<Post, "id">) => apiClient.post<Post>("/posts", body),
};
