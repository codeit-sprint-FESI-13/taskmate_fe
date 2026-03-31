import { postsHandlers } from "./posts";
import { teamsHandlers } from "./teams";

export const handlers = [...postsHandlers, ...teamsHandlers];
