import { authHandlers } from "./auth";
import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";

export const handlers = [...postsHandlers, ...teamsHandlers, ...authHandlers];
