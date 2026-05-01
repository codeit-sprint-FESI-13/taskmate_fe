import { authHandlers } from "@/features/auth/mock/auth";
import { goalsHandlers } from "@/features/goal/mock/goals";
import { managementHandler } from "@/features/management/mock/management";
import { notificationHandler } from "@/features/notification/mock/notification";
import { invitationsHandlers, teamsHandlers } from "@/features/team/mock";
import { todosHandlers } from "@/features/todo/mock/todos";
import { homeHandler } from "@/widgets/home/mock/home";

export const handlers = [
  ...homeHandler,
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
  ...notificationHandler,
];
