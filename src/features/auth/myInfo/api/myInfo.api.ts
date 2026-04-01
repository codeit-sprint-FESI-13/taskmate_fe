import { UserProfile } from "@/features/auth/types/auth.type";
import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/types";

export async function getMyInfo() {
  const res = await apiClient.get<ApiResponse<UserProfile>>("/api/users/me");
  return res.data;
}
