import { UserProfile } from "@/features/auth/types/auth.type";
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/types";

import { MyProfileFormData } from "../types/myProfile.type";

export async function getMyInfo() {
  const res = await apiClient.get<ApiResponse<UserProfile>>("/api/users/me");
  return res.data;
}

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiClient.put<ApiResponse<UserProfile>>(
    "/api/users/image",
    formData,
  );
  return res.data;
}

export async function updateProfile(data: MyProfileFormData) {
  const res = await apiClient.put<ApiResponse<UserProfile>>("/api/users", data);
  return res.data;
}

export async function deleteMe() {
  const res = await apiClient.delete<ApiResponse<null>>("/api/users/me");
  return res.data;
}
