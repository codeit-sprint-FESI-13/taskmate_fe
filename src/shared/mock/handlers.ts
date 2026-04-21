import { authHandlers } from "@/mocks/handlers/auth";
import { goalsHandlers } from "@/mocks/handlers/goals";
import { invitationsHandlers } from "@/mocks/handlers/invitations";
import { managementHandler } from "@/mocks/handlers/management";
import { postsHandlers } from "@/mocks/handlers/posts";
import { teamsHandlers } from "@/mocks/handlers/teams";
import { todosHandlers } from "@/mocks/handlers/todos";

export const handlers = [
  ...postsHandlers,
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
];
