"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// import { formatMemberList } from "@/utils/formatMemberList";
import Button from "@/components/common/Button/Button";
import ProfileCard from "@/components/common/ProfileCard/ProfileCard";
import { memberListApi } from "@/features/management/api";
import { MemberData } from "@/features/management/types";

interface MemberListProps {
  onInviteClick: () => void;
}

const MemberList = ({ onInviteClick }: MemberListProps) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);

  useEffect(() => {
    const loadMemberList = async (): Promise<void> => {
      try {
        const res = await memberListApi.read(teamId);
        const list = res.data;
        setMembers(Array.isArray(list) && list.length > 0 ? list : []);
      } catch (error) {
        console.error(console.log("member list error"));
      }
    };

    loadMemberList();
  }, [teamId]);

  return (
    <section className="bg-inverse-normal relative h-183.25 rounded-4xl">
      <div className="flex flex-col items-center gap-2 px-5 py-8">
        {members.map((member) => (
          <ProfileCard
            key={member.id}
            avatar={member.profileImageUrl ?? ""}
            nickName={member.userNickname}
            email={member.userEmail}
            isAdmin={member.role === "ADMIN"}
            variant="admin"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-22.5 rounded-b-4xl" />
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
