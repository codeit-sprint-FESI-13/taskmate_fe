import { authHandlers } from "./auth";
import { goalsHandlers } from "./goals";
import { managementHandler } from "./management";
import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";
import { todosHandlers } from "./todos";
import { invitationsHandlers } from './invitations'

export const handlers = [
  ...postsHandlers,
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
  ...managementHandler,
];
