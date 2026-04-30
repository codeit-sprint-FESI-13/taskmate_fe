import Image from "next/image";

import defaultAvatar from "@/shared/assets/images/avatar.png";
import { cn } from "@/shared/utils/styles/cn";

export type MemberProps = {
  avatar: string;
  nickName: string;
  email: string;
  isMe?: boolean;
  className?: string;
};

export default function Member({
  avatar,
  nickName,
  email,
  isMe = false,
  className,
}: MemberProps) {
  const avatarSrc = avatar.trim() ? avatar : defaultAvatar.src;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 gap-2 rounded-2xl bg-white py-4 pr-5 pl-3.5",
        className,
      )}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Image
          src={avatarSrc}
          alt="user-avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <div
          className={cn("inline-flex min-w-0 items-center", isMe && "gap-1")}
        >
          <span className="typography-label-1 text-label-neutral truncate font-semibold">
            {nickName}
          </span>
          {isMe ? (
            <span className="typography-caption-1 shrink-0 rounded-lg bg-gray-100 px-2.5 py-1 text-gray-400">
              나
            </span>
          ) : null}
        </div>
        {email ? (
          <span className="typography-label-2 truncate font-medium text-gray-400">
            {email}
          </span>
        ) : null}
      </div>
    </div>
  );
}
