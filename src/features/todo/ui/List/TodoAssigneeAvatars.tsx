"use client";

import Image from "next/image";

import type { Todo } from "@/entities/todo";
import defaultAvatar from "@/shared/assets/images/avatar.png";

const MAX_VISIBLE_ASSIGNEES = 4;

interface TodoAssigneeAvatarsProps {
  assignees: Todo["assignees"];
}

export const TodoAssigneeAvatars = ({
  assignees,
}: TodoAssigneeAvatarsProps) => {
  return (
    <div className="flex items-center">
      {(assignees ?? [])
        .slice(0, MAX_VISIBLE_ASSIGNEES)
        .map((assignee, index) => (
          <span
            key={assignee.userId}
            className="relative -ml-3.5 shrink-0 first:ml-0"
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
