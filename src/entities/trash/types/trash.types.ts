export interface TrashItemData {
  itemType: "GOAL" | "TODO";
  id: number;
  deleteAt: string;
  teamName: string;
  goalName: string;
  todoTitle: string;
}

export interface TrashListData {
  content: TrashItemData[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface TrashActionParam {
  goalIds: number[];
  todoIds: number[];
}
