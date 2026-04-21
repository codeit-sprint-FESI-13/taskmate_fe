// 외부 라이브러리
import { cva } from "class-variance-authority";

import defaultAvatar from "@/assets/images/avatar.png";
import Button from "@/shared/ui/Button/Button/Button";
// 내부 코드
import { cn } from "@/shared/utils/styles/cn";

const profileCardVariants = cva(
  "self-start inline-flex items-center gap-2 h-[45px] cursor-pointer",
  {
    variants: {
      variant: {
        gnb: "pl-3 pr-[20px] border border-gray-300 h-[64px] rounded-full",
        "gnb-sm":
          "pl-3 pr-[20px] border border-gray-300 h-[64px] rounded-full py-4",
        team: "",
        "team-sm": "",
        admin: "",
        "admin-sm": "",
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
  variant?:
    | "default"
    | "gnb"
    | "gnb-sm"
    | "team"
    | "team-sm"
    | "admin"
    | "admin-sm";
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
  const selectedRole = isAdmin ? "어드민" : "팀원";

  return (
    <div
      className={cn(
        profileCardVariants({
          variant: variant === "default" ? undefined : variant,
        }),
      )}
    >
      {/* avatar */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        <img
          src={avatarSrc}
          alt="Avatar Image"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        {/* {isAdmin && (
          <span className="absolute -top-0.75 -right-0.75 h-4 w-4">
            <Crown />
          </span>
        )} */}
      </div>

      {/* info */}
      <div className={cn("flex flex-col")}>
        {/* NickName Wapper */}
        <div className="inline-flex items-center">
          {/* NickName */}
          <span className="text-sm">{nickName}</span>
          {(variant === "team" ||
            variant === "team-sm" ||
            variant === "admin" ||
            variant === "admin-sm") &&
            isMe && (
              <span className="ml-0.75 rounded-lg bg-gray-100 px-2.5 py-1 text-[12px] text-gray-400">
                나
              </span>
            )}

          {/* Gnb Icon */}
          {/* {isGnb && (
            <span className="flex h-4 w-4 items-center justify-center">
              <RightArrow className="text-gray-400" />
            </span>
          )} */}
        </div>

        {/* Email */}
        {variant !== "gnb-sm" && email && (
          <span className="text-[13px] text-gray-400">{email}</span>
        )}
      </div>

      {/* Admin Button */}
      {(variant === "admin" || variant === "admin-sm") && (
        <div
          className={cn(
            "flex items-center gap-1.5",
            variant === "admin" && "ml-63.25",
            variant === "admin-sm" && "ml-16",
          )}
        >
          {/* 권한 선택 */}
          {/* <Dropdown
            options={["Admin", "팀원"]}
            selected="Admin"
          /> */}

          {/* 팀원 삭제 버튼 */}
          <Button
            variant="secondary"
            size="sm"
            className="rounded-lg text-gray-500 ring-gray-200 hover:ring-gray-300"
          >
            팀원 삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
