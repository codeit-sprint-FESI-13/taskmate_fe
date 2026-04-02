// 외부 라이브러리
import { cva } from "class-variance-authority";

import defaultAvatar from "@/assets/images/avatar.png";
import Button from "@/components/common/Button/Button";
import Crown from "@/components/common/Icons/Crown";
import RightArrow from "@/components/common/Icons/RightArrow";
import { memberRoleApi } from "@/features/management/api";
import { memberApi } from "@/features/management/api";
import { MemberRole } from "@/features/management/types";
import Dropdown from "@/hooks/useDropdown/Dropdown";
// 내부 코드
import { cn } from "@/utils/utils";

const profileCardVariants = cva(
  "self-start flex h-[45px] cursor-pointer justify-between w-full",
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
  id: number;
  teamId: number;
  avatar: string;
  isAdmin?: boolean;
  nickName: string;
  isMe?: boolean;
  email: string;
  onDeleteMember?: () => void;
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
  id,
  teamId,
  avatar,
  isAdmin = false,
  nickName,
  isMe = false,
  email,
  variant = "default",
  onDeleteMember,
}: ProfileCardProps) => {
  const avatarSrc = avatar?.trim() ? avatar : defaultAvatar.src;
  const isGnb = variant === "gnb" || variant === "gnb-sm";
  const selectedRole = isAdmin ? "어드민" : "팀원";

  // 팀원 권한 변경 / 팀원 삭제 api 추후 refactoring예정
  // 여기서 함수를 만들어야 하나??
  // TODO: useMutations로 변경 필요
  // value: "어드민" : "팀원";
  const updateRole = async (value: typeof selectedRole) => {
    // 역할 변경하는 API 주소
    // 에러 처리 & mutation 변경
    // "어드민" -> "ADMIN"
    // "팀원" -> "MEMBER"
    let role: MemberRole = "MEMBER";

    // TODO: 추후 로직 더 좋게 수정해도 됨
    if (value === "어드민") {
      role = "ADMIN";
    } else if (value === "팀원") {
      role = "MEMBER";
    } else {
      return;
    }

    await memberRoleApi.update(teamId, id, role);
  };

  const deleteMember = async (memberId: number): Promise<void> => {
    try {
      await memberApi.delete(teamId, memberId);
    } catch (error) {
      console.error("delete member error", error);
    }
  };

  return (
    <div
      className={cn(
        profileCardVariants({
          variant: variant === "default" ? undefined : variant,
        }),
      )}
    >
      <div className="inline-flex h-11.25 cursor-pointer items-center gap-2 self-start">
        {/* avatar */}
        <div className="relative flex h-10 w-10 justify-center">
          <img
            src={avatarSrc}
            alt="Avatar Image"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          {isAdmin && (
            <span className="absolute -top-0.75 -right-0.75 h-4 w-4">
              <Crown />
            </span>
          )}
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
            {isGnb && (
              <span className="flex h-4 w-4 items-center justify-center">
                <RightArrow className="text-gray-400" />
              </span>
            )}
          </div>

          {/* Email */}
          {variant !== "gnb-sm" && email && (
            <span className="text-[13px] text-gray-400">{email}</span>
          )}
        </div>
      </div>
      {/* Admin Button */}
      {(variant === "admin" || variant === "admin-sm") && (
        <div
          className={cn(
            "",
            variant === "admin" && "flex items-center gap-1.5",
            variant === "admin-sm" && "",
          )}
        >
          {/* 권한 선택 */}
          <div className="flex items-center self-center">
            <Dropdown
              options={["어드민", "팀원"]} // T: "어드민" 혹은 "팀원"
              selected={selectedRole}
              onSelect={updateRole}
            />
          </div>

          {/* 팀원 삭제 버튼 */}
          <Button
            onClick={onDeleteMember}
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
