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
