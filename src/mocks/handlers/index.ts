import { authHandlers } from "./auth";
import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";
import { todosHandlers } from "./todos";

export const handlers = [...postsHandlers, ...teamsHandlers, ...todosHandlers, ...authHandlers];

