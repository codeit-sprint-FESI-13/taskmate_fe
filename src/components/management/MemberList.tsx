"use client";

import Button from "@/components/common/Button/Button";

interface MemberListProps {
  onInviteClick: () => void;
}

const MemberList = ({ onInviteClick }: MemberListProps) => {
  return (
    <section className="bg-inverse-normal relative h-183.25 rounded-4xl">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[90px] rounded-b-4xl"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 100%)",
        }}
      />
      <Button
        className="absolute right-5 bottom-5.75 z-20"
        type="button"
        onClick={onInviteClick}
      >
        팀원 추가하기
      </Button>
    </section>
  );
};

export default MemberList;
