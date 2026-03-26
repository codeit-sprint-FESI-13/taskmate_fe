import React from "react";

const SnsLoginButtons = ({ label }: { label: string }) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div>
        <p className="text-label-alternative typography-label-2 font-medium">
          {label}
        </p>
      </div>
      <div>버튼</div>
    </div>
  );
};

export default SnsLoginButtons;
