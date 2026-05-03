export type AuthFormType = "login" | "signup";
export type SocialType = "google" | "kakao";

export type UserProfile = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  provider: string;
  createdAt: string;
};

export type CheckEmailResponse = {
  success: boolean;
  code: string;
  message: string;
  data: { exists: boolean };
  timestamp: string;
};

export type UpdateProfileRequest = {
  nickname: string;
  currentPassword?: string | null;
  password?: string | null;
};
