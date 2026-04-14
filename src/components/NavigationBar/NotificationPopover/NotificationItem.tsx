import React from "react";

const NotificationItem = () => {
  return (
    <div>
      <div className="hover:bg-background-normal-alternative flex w-70 cursor-pointer items-start gap-2 rounded-2xl px-3 py-5">
        {/* isRead false 일 경우에만 block */}
        <div className="my-0.75 mt-1 block h-1.5 w-1.5 rounded-full bg-blue-700"></div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <span className="typography-label-1 font-semibold text-blue-800"></span>
            <span className="typography-caption-1 font-medium text-gray-400"></span>
          </div>

          <div>
            <span className="text-sm text-gray-500">message</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="typography-caption-1 font-normal text-gray-400"></span>
            <span className="bg-background-elevated-normal-alternative inline-block h-0.75 w-0.75 rounded-full"></span>
            <span className="typography-caption-1 font-normal text-gray-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
