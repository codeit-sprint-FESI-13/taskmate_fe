import React from "react";

import TextButton from "@/components/common/TextButton/TextButton";

import NotificationItem from "./NotificationItem";

interface Props {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: Props) => {
  return (
    <div className="bg-background-normal fixed bottom-30 left-50 z-999 rounded-3xl border border-gray-200 px-3 py-5 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
      <div className="mb-4 flex justify-between">
        <span className="typography-label-1 text-label-neutral my-1.25 ml-2 font-semibold">
          알림
        </span>
        <TextButton className="my-1.25mr-2 text-blue-700">모두 읽기</TextButton>
      </div>
      <div className="custom-scroll h-110 overflow-auto pr-2">
        <NotificationItem />
      </div>
    </div>
  );
};

export default NotificationPanel;
