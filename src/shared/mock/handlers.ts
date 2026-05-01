import { authHandlers } from "@/features/auth/mock/auth";
import { goalsHandlers } from "@/features/goal/mock/goals";
import {
  invitationsHandlers,
  managementHandler,
  teamsHandlers,
} from "@/features/team/mock";
import { todosHandlers } from "@/features/todo/mock/todos";

export const handlers = [
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
];
