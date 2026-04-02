import { authHandlers } from "./auth";
import { goalsHandlers } from "./goals";
import { invitationsHandlers } from "./invitations";
import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";
import { todosHandlers } from "./todos";

export const handlers = [
  ...postsHandlers,
  ...teamsHandlers,
  ...invitationsHandlers,
  ...goalsHandlers,
  ...authHandlers,
  ...todosHandlers,
];
