"use client";

import Image from "next/image";

import defaultAvatar from "@/assets/images/avatar.png";
import type { Todo } from "@/entities/todo/types/types";

interface TodoAssigneeAvatarsProps {
  assignees: Todo["assignees"];
}

export const TodoAssigneeAvatars = ({
  assignees,
}: TodoAssigneeAvatarsProps) => {
  return (
    <div className="flex items-center">
      {/* @TODO: 담당자 이미지 받아서 처리 필요 ( 중간 이후 )*/}
      {/* @TODO: mouse hover 시 담당자 정보 표시? */}
      {assignees.slice(0, 4).map((assignee, index) => (
        <span
          key={assignee.userId}
          className="relative -ml-[14px] shrink-0 first:ml-0"
          style={{ zIndex: index + 1 }}
        >
          <Image
            src={defaultAvatar.src}
            alt="Avatar Image"
            width={40}
            height={40}
            className="shrink-0 rounded-full object-cover"
          />
        </span>
      ))}
    </div>
  );
};
