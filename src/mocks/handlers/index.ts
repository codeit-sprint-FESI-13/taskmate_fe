import { authHandlers } from "./auth";
import { goalsHandlers } from "./goals";
import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";

export const handlers = [
  ...postsHandlers,
  ...teamsHandlers,
  ...goalsHandlers,
  ...authHandlers,
];
