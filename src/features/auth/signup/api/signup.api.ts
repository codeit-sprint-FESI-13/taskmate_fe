import {
  CheckEmailResponse,
  SignupFormData,
} from "@/features/auth/signup/types/signup.type";
import { apiClient } from "@/shared/utils/api/client";

import { UserProfile } from "../../types/auth.type";

type SignupRequest = Omit<SignupFormData, "passwordConfirm">;

export async function checkEmailDuplicate(email: string) {
  return apiClient.get<CheckEmailResponse>(`/api/users/exists`, {
    params: { email },
  });
}

export async function signupMutationFn(data: SignupRequest) {
  return apiClient.post<UserProfile>(`/api/users`, data);
}
