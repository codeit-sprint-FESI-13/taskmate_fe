export type CreateTodoInput = {
  title: string;
  startDate: string;
  endDate: string;
  assigneeIds: string[];
  memo: string;
};

export type ResponseCreateTood = {
  success: boolean;
  code: string;
  message: string;
};
