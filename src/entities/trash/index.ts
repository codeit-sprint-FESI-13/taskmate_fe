export {
  deleteTrash,
  getPersonalTrashList,
  getTeamTrashList,
  restoreTrash,
} from "./api/trash.api";
export { trashQueries } from "./query/trash.queryKey";
export type {
  TrashActionParam,
  TrashItemData,
  TrashListData,
} from "./types/trash.types";
