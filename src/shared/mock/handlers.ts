import { authHandlers } from "@/features/auth/mock/auth";
import { goalsHandlers } from "@/features/goal/mock/goals";
import { invitationsHandlers } from "@/features/team/mock/invitations";
import { managementHandler } from "@/features/team/mock/management";
import { teamsHandlers } from "@/features/team/mock/teams";
import { todosHandlers } from "@/features/todo/mock/todos";

export const handlers = [
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
];
