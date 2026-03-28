// React
// 외부 라이브러리
import { cva } from "class-variance-authority";

import defaultAvatar from "@/assets/images/avatar.png";
import Crown from "@/components/common/Icons/Crown";
import RightArrow from "@/components/common/Icons/RightArrow";
// 내부 코드
import { cn } from "@/utils/utils";

const profileCardVariants = cva(
  "self-start inline-flex items-center gap-2 h-[45px] cursor-pointer",
  {
    variants: {
      variant: {
        gnb: "pl-3 pr-[20px] border border-gray-300 h-[64px] rounded-full",
        "gnb-sm": "py-4",
      },
    },
  },
);

type ProfileCardProps = {
  avatar: string;
  isAdmin?: boolean;
  nickName: string;
  isMe?: boolean;
  email: string;
  variant?: "default" | "gnb" | "gnb-sm";
};

const ProfileCard = ({
  avatar,
  isAdmin = false,
  nickName,
  isMe = false,
  email,
  variant = "default",
}: ProfileCardProps) => {
  const avatarSrc = avatar?.trim() ? avatar : defaultAvatar.src;
  const isGnb = variant === "gnb" || variant === "gnb-sm";

  return (
    <div
      className={cn(
        profileCardVariants({ variant: isGnb ? "gnb" : undefined }),
      )}
    >
      {/* 이미지박스 */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        <img
          src={avatarSrc}
          // alt="avatar"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        {(variant === "gnb" || variant === "gnb-sm") && isAdmin && (
          <span className="absolute top-[-3px] right-[-3px] h-4 w-4">
            <Crown />
          </span>
        )}
      </div>

      {/* info */}
      <div className={cn("flex flex-col")}>
        <div className="inline-flex items-center">
          {/* 닉네임 */}
          <span className="text-sm">{nickName}</span>
          {variant === "default" && isMe && (
            <span className="ml-[3px] rounded-lg bg-gray-100 px-[10px] py-1 text-[12px] text-gray-400">
              나
            </span>
          )}
          {isGnb && (
            <span className="flex h-4 w-4 items-center justify-center">
              <RightArrow className="text-gray-400" />
            </span>
          )}
        </div>
        {variant !== "gnb-sm" && email && (
          <span className="text-[13px] text-gray-400">{email}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
