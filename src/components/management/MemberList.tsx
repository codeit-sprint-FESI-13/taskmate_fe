"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import ErrorModal from "@/components/management/ErrorModal";
import ProfileCard from "@/components/management/ProfileCard";
import { userQueries } from "@/constants/queryKeys/user.queryKey";
import {
  memberApi,
  memberListApi,
  memberRoleApi,
} from "@/features/management/api";
import { MemberData } from "@/features/management/types";
import { type MemberRole } from "@/features/management/types";
import { formatMemberList } from "@/utils/formatMemberList";

interface MemberListProps {
  onInviteClick: () => void;
}

const MemberList = ({ onInviteClick }: MemberListProps) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);

  const { data: me } = useQuery({
    ...userQueries.myInfo(),
    throwOnError: false,
    retry: false,
  });

  const myUserId = me?.id;

  useEffect(() => {
    const loadMemberList = async () => {
      const res = await memberListApi.read(teamId);
      setMembers(Array.isArray(res.data) ? res.data : []);
    };

    if (Number.isFinite(teamId)) loadMemberList();
  }, [teamId]);

  const handleRoleChange = async (memberId: number, role: MemberRole) => {
    try {
      await memberRoleApi.update(teamId, memberId, role);
      setMembers((prev) =>
        prev.map((member) =>
          member.id === memberId ? { ...member, role } : member,
        ),
      );
    } catch (error) {
      setErrorMessage("팀에는 최소 1명의 ADMIN이 필요합니다.");
      setErrorModalOpen(true);
      throw error;
    }
  };

  const handleDeleteMember = async (memberId: number): Promise<void> => {
    try {
      await memberApi.delete(teamId, memberId);
      setMembers((prev) => prev.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error("delete member error", error);
    }
  };

  useEffect(() => {
    if (!Number.isFinite(teamId)) return;

    const loadMemberList = async (): Promise<void> => {
      try {
        const res = await memberListApi.read(teamId);
        const list = Array.isArray(res.data) ? res.data : [];

        setMembers(
          typeof myUserId === "number"
            ? formatMemberList(list, myUserId)
            : list,
        );
      } catch (error) {
        console.error("member list error", error);
      }
    };

    loadMemberList();
  }, [teamId, myUserId]);

  return (
    <section className="bg-inverse-normal relative h-183.25 overflow-hidden rounded-4xl">
      <div className="flex h-183.25 flex-col items-center gap-2 overflow-y-auto px-5 py-8">
        {members.map((member) => (
          <ProfileCard
            key={member.id}
            id={member.id}
            avatar={member.profileImageUrl ?? ""}
            nickName={member.userNickname}
            email={member.userEmail}
            isAdmin={member.role === "ADMIN"}
            isMe={typeof myUserId === "number" && member.userId === myUserId}
            variant="admin"
            onRoleChange={handleRoleChange}
            onDeleteMember={() => handleDeleteMember(member.id)}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-22.5 rounded-b-4xl bg-linear-to-t from-white via-white/90 to-transparent" />
      <Button
        className="absolute right-5 bottom-5.75 z-20"
        type="button"
        onClick={onInviteClick}
      >
        팀원 추가하기
      </Button>
      {errorModalOpen && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorModalOpen(false)}
        />
      )}
    </section>
  );
};

export default MemberList;
