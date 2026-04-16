import Image from "next/image";

import defaultAvatar from "@/assets/images/avatar.png";
import Crown from "@/components/common/Icons/Crown";
import { cn } from "@/utils/utils";

export type MemberProps = {
  avatar: string;
  nickName: string;
  email: string;
  isAdmin?: boolean;
  isMe?: boolean;
  className?: string;
};

export default function Member({
  avatar,
  nickName,
  email,
  isAdmin = false,
  isMe = false,
  className,
}: MemberProps) {
  const avatarSrc = avatar.trim() ? avatar : defaultAvatar.src;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 gap-2 rounded-2xl bg-white py-4 pr-5 pl-[14px]",
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
        {isAdmin && (
          <span className="absolute -top-0.75 -right-0.75 h-4 w-4">
            <Crown />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <div
          className={cn(
            "inline-flex min-w-0 items-center",
            isMe && "gap-[4px]",
          )}
        >
          <span className="typography-label-1 text-label-neutral truncate font-semibold">
            {nickName}
          </span>
          {isMe ? (
            <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1 text-[12px] text-gray-400">
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
