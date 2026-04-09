import { UserProfile } from "@/features/auth/types/auth.type";
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/types";

export async function getMyInfo() {
  const res = await apiClient.get<ApiResponse<UserProfile>>("/api/users/me");
  return res.data;
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiClient.put<ApiResponse<UserProfile>>(
    "/api/users",
    formData,
  );
  return res.data;
}
