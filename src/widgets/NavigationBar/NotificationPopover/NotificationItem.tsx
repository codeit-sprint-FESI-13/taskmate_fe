"use client";

import { cn } from "@/shared/utils/styles/cn";

interface NotificationItemProps {
  isRead: boolean;
  NotificationType: string;
  createAt: string;
  message: string;
  goalName: string;
  spaceName: string;
  onItemClick: () => void;
}

const NotificationItem = ({
  isRead,
  NotificationType,
  createAt,
  message,
  goalName,
  spaceName,
  onItemClick,
}: NotificationItemProps) => {
  return (
    <button
      type="button"
      onClick={onItemClick}
      className="block w-full text-left"
    >
      <div>
        <div className="hover:bg-background-normal-alternative flex w-70 cursor-pointer items-start gap-2 rounded-2xl px-3 py-5">
          <div
            className={cn(
              "my-0.75 mt-1 h-1.5 w-1.5 rounded-full",
              isRead ? "bg-transparent" : "bg-blue-700",
            )}
          />
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <span className="typography-label-1 font-semibold text-blue-800">
                {NotificationType}
              </span>
              <span className="typography-caption-1 font-medium text-gray-400">
                {createAt}
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-500">{message}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="typography-caption-1 font-normal text-gray-400">
                {goalName}
              </span>
              <span className="bg-background-elevated-normal-alternative inline-block h-0.75 w-0.75 rounded-full"></span>
              <span className="typography-caption-1 font-normal text-gray-400">
                {spaceName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
