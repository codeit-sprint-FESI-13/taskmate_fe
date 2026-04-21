import defaultAvatar from "@/assets/images/avatar.png";
// @TODO: Icon Convention 위반
// import Crown from "@/components/common/Icons/Crown";

type ProfileCardProps = {
  avatar?: string;
  hasCrownIcon?: boolean;
  name: string;
  tag?: string;
  email: string;
};

// @TODO: 이전에 에러 해결한다고 만든 임시 파일. 해당 파일이 필요한지 판단 필요
const ProfileCard = ({
  avatar,
  hasCrownIcon = false,
  tag,
  name,
  email,
}: ProfileCardProps) => {
  const avatarSrc = avatar?.trim() ? avatar : defaultAvatar.src; // 기본값 처리

  return (
    <div className="flex w-fit items-center gap-2">
      {/* avatar */}
      <div className="relative h-10 w-10">
        {/* @TODO: next/image 사용 */}
        {/* @TODO: 향후 useAvatar 로 리팩토링 */}
        <img
          src={avatarSrc}
          alt="Avatar Image"
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        {/* {hasCrownIcon && (
          <span className="absolute -top-0.75 -right-0.75 h-4 w-4">
            <Crown />
          </span>
        )} */}
      </div>

      {/* info */}
      <div className="flex flex-col">
        <div className="inline-flex items-center">
          {/* NickName */}
          <span className="text-sm">{name}</span>
          {tag && (
            <span className="ml-0.75 rounded-lg bg-gray-100 px-2.5 py-1 text-[12px] text-gray-400">
              {tag}
            </span>
          )}
        </div>

        {/* Email */}
        <span className="text-[13px] text-gray-400">{email}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
