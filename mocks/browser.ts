import { setupWorker } from "msw/browser";

import { postsHandlers } from "@/mocks/handlers/posts";

// 브라우저에서 MSW 실행
export const worker = setupWorker(...postsHandlers);
