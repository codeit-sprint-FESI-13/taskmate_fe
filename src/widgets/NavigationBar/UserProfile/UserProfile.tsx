import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

import defaultAvatar from "@/assets/images/avatar.png";
import { userQueries } from "@/constants/queryKeys";
import { Icon } from "@/shared/ui/Icon";

export const UserProfile = () => {
  const {
    data: { profileImageUrl, nickname },
  } = useSuspenseQuery(userQueries.myInfo());
  const avatarSrc = profileImageUrl?.trim()
    ? profileImageUrl
    : defaultAvatar.src;
  const router = useRouter();

  return (
    <div
      className="relative flex w-[150px] cursor-pointer items-center justify-start gap-2 rounded-full border border-gray-300 bg-white py-3 pr-4 pl-3"
      role="button"
      onClick={() => router.push("/taskmate/my")}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Image
          src={avatarSrc}
          alt="Avatar Image"
          width={40}
          height={40}
          className="shrink-0 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="typography-label-1 text-label-neutral font-semibold">
          {nickname}
        </span>
      </div>

      <Icon
        name="RightArrow"
        size={16}
        className="absolute right-4 shrink-0 text-gray-400"
      />
    </div>
  );
};
