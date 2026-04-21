"use client";
import React, { useRef } from "react";

import { useUploadProfileImageMutation } from "@/features/my/hooks/useUploadProfileImageMutation";
import { useToast } from "@/shared/hooks/useToast";

import ActionButton from "../../shared/ui/Button/ActionButton/ActionButton";
import UserAvatar from "../../shared/ui/UserAvatar/UserAvatar";

interface ProfileImageUploaderProps {
  imageUrl: string | null;
}

const ProfileImageUploader = ({ imageUrl }: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const { mutate: uploadImage, isPending } = useUploadProfileImageMutation();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "jpeg, png, gif, webp 형식만 업로드 가능합니다",
        variant: "error",
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "10MB 이하의 파일만 업로드 가능합니다.",
        variant: "error",
      });
      return;
    }

    uploadImage(file);
    e.target.value = "";
  };

  return (
    <div className="relative flex w-fit">
      <UserAvatar
        imageUrl={imageUrl}
        className="tablet:w-35 tablet:h-35 h-20 w-20"
      />
      <ActionButton
        type="button"
        // action="edit"
        className="absolute right-0 bottom-0"
        onClick={handleClick}
        disabled={isPending}
      />
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/jpeg,image/png,image/gif,image/webp,.jpg,.jpeg,.png,.gif,.webp"
      />
    </div>
  );
};

export default ProfileImageUploader;
