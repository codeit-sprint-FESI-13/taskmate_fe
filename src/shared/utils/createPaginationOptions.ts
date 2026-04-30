type CursorParams = {
  size?: number;
  cursorId?: number;
  cursorCreatedAt?: string;
};

type CursorPage = {
  hasNext: boolean;
  nextCursorId?: number;
  nextCursorCreatedAt?: string;
};

export function createPaginationOptions<
  Params extends CursorParams = CursorParams,
  Page extends CursorPage = CursorPage,
>(apiKey: string, apiFunction: (param: Params) => Promise<{ data: Page }>) {
  const size = 20;

  return {
    queryKey: [apiKey],
    initialPageParam: { size } as Params,

    queryFn: async ({ pageParam }: { pageParam: Params }) => {
      const res = await apiFunction(pageParam);
      return res.data;
    },

    getNextPageParam: (lastPage: Page): Params | undefined =>
      lastPage.hasNext
        ? ({
            size,
            cursorId: lastPage.nextCursorId,
            cursorCreatedAt: lastPage.nextCursorCreatedAt,
          } as Params)
        : undefined,
  };
}
