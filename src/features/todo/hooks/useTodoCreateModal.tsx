"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { userQueries } from "@/entities/auth/query/user.queryKey";
import { goalQueryOptions } from "@/entities/goal";
import type { Member } from "@/entities/team";
import { teamQueryOptions } from "@/entities/team";
import { TodoCreateModal } from "@/features/todo/ui/CreateTodoModal/TodoCreateModal";
import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

const TODO_CREATE_MODAL_ID = "todo-create-modal";

export const useTodoCreateModal = () => {
  const overlay = useOverlay();
  const params = useParams<{ teamId?: string }>();
  const teamId = params.teamId;
  const isPersonal = !teamId;

  const goalId = useGoalId();
  const {
    data: { goalName },
  } = useSuspenseQuery(goalQueryOptions.getSummary(goalId));
  const { data: teamSummary } = useQuery({
    ...teamQueryOptions.summary(teamId ?? ""),
    enabled: Boolean(teamId),
  });

  const { data: myInfo } = useQuery({
    ...userQueries.myInfo(),
    enabled: isPersonal,
  });

  const { data: teamMemberList } = useQuery({
    ...teamQueryOptions.memberList(teamId ?? ""),
    enabled: Boolean(teamId),
  });

  const personalMember: Member | null = myInfo
    ? {
        id: myInfo.id,
        userId: myInfo.id,
        userEmail: myInfo.email,
        profileImageUrl: myInfo.profileImageUrl ?? null,
        userNickname: myInfo.nickname,
        role: "MEMBER",
        joinedAt: myInfo.createdAt,
      }
    : null;

  const memberList: Member[] = isPersonal
    ? personalMember
      ? [personalMember]
      : []
    : (teamMemberList ?? []);

  const initialAssigneeIds = isPersonal && myInfo ? [myInfo.id] : [];

  const closeTodoCreateModal = () => {
    overlay.close();
  };

  const openTodoCreateModal = () => {
    overlay.open(
      TODO_CREATE_MODAL_ID,
      <TodoCreateModal
        onClose={closeTodoCreateModal}
        goalName={goalName}
        teamName={teamSummary?.teamName ?? "개인"}
        memberList={memberList}
        isAssigneeFixed={isPersonal}
        fixedAssigneeNickname={myInfo?.nickname ?? "나"}
        initialAssigneeIds={initialAssigneeIds}
      />,
    );
  };

  return {
    openTodoCreateModal,
    closeTodoCreateModal,
  };
};
