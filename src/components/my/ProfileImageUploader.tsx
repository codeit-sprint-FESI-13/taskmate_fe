"use client";
import React, { useRef } from "react";

import ActionButton from "../common/ActionButton/ActionButton";
import UserAvatar from "../common/UserAvatar/UserAvatar";

const ProfileImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = () => {};

  return (
    <div className="relative flex w-fit">
      <UserAvatar
        imageUrl={null}
        className="tablet:w-35 tablet:h-35 h-20 w-20"
      />
      <ActionButton
        action="edit"
        className="absolute right-0 bottom-0"
        onClick={handleClick}
      />
      <input
        ref={inputRef}
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUploader;
