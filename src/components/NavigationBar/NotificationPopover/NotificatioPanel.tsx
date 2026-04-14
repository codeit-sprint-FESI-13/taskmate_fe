import React from "react";

interface Props {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: Props) => {
  return (
    <div className="fixed bottom-30 left-50 z-[9999]">
      <div>알림 패널</div>
    </div>
  );
};

export default NotificationPanel;
