"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Icon } from "@/components/common/Icon";
import TextButton from "@/components/common/TextButton/TextButton";
import { userQueries } from "@/constants/queryKeys/user.queryKey";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { useTeamLeaveModal } from "@/features/team/hooks/useTeamLeaveModal";
import { teamQueries } from "@/features/team/query/team.queryKey";

import Member from "./Member";

// @TODO: 목표 목록 조회 시 무한 스크롤 처리 (useSuspenseInfiniteQuery)
export const MemberList = () => {
  const teamId = useTeamId();
  const { openLeaveTeamModal } = useTeamLeaveModal(teamId);

  const { data: members } = useSuspenseQuery(teamQueries.memberList(teamId));
  const { data: me } = useSuspenseQuery(userQueries.myInfo());

  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <Icon
            name="People"
            size={40}
          />
          <h2 className="typography-body-1 text-label-neutral font-medium">
            멤버
          </h2>
          <span className="typography-body-1 ml-[-8px] font-medium text-gray-400">
            {members.length}명
          </span>
        </div>
        <TextButton onClick={openLeaveTeamModal}>
          <span className="typography-body-2 flex shrink-0 items-center justify-center gap-[5px] font-semibold">
            <Icon
              name="Out"
              size={16}
              className="text-gray-500"
            />
            팀 나가기
          </span>
        </TextButton>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 *:min-w-0 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {members.map((member) => (
          <Member
            key={member.userId}
            avatar={member.profileImageUrl ?? ""}
            nickName={member.userNickname}
            email={member.userEmail}
            isAdmin={member.role === "ADMIN"}
            isMe={member.userId === me.id}
          />
        ))}
      </div>
    </div>
  );
};
