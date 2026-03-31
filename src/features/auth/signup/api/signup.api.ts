import {
  CheckEmailResponse,
  SignupFormData,
  SignupResponse,
} from "@/features/auth/signup/types/signup.type";
import { apiClient } from "@/lib/api/client";

type SignupRequest = Omit<SignupFormData, "passwordConfirm">;

export async function checkEmailDuplicate(email: string) {
  return apiClient.get<CheckEmailResponse>(`/api/users/exists`, {
    params: { email },
  });
}

export async function signupMutationFn(data: SignupRequest) {
  return apiClient.post<SignupResponse>(`/api/users`, data);
}
