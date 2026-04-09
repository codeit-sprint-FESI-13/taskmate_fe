"use client";
import Image from "next/image";
import { useState } from "react";

import avatar1 from "@/assets/images/avatar-blue-default.svg";
import avatar2 from "@/assets/images/avatar-blue-glasses.svg";
import avatar3 from "@/assets/images/avatar-green-default.svg";
import avatar4 from "@/assets/images/avatar-green-glasses.svg";

const DEFAULT_AVATARS = [avatar1, avatar2, avatar3, avatar4];

interface UserAvatarProps {
  imageUrl?: string | null;
  className?: string;
}

const UserAvatar = ({ imageUrl, className }: UserAvatarProps) => {
  const [Avatar] = useState(
    () => DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
  );

  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover"
        />
      ) : (
        <Avatar className="h-full w-full rounded-full" />
      )}
    </div>
  );
};

export default UserAvatar;
