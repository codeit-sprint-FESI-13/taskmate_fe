import { authHandlers } from "@/features/auth/mock/auth";
import { goalsHandlers } from "@/features/goal/mock/goals";
import { invitationsHandlers } from "@/features/team/mock/invitations";
import { managementHandler } from "@/features/team/mock/management";
import { teamsHandlers } from "@/features/team/mock/teams";
import { todosHandlers } from "@/features/todo/mock/todos";
import { postsHandlers } from "@/mocks/handlers/posts";

export const handlers = [
  ...postsHandlers,
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
];
