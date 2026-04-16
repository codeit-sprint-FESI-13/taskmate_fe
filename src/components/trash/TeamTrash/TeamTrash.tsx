import React from "react";

import TrashEmpty from "@/components/trash/TrashEmpty";
import TrashList from "@/components/trash/TrashList";
import { trashQueries } from "@/constants/queryKeys/trash.queryKey";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface TeamTrashProp {
  selectedTeamId: number;
}

function TeamTrash({ selectedTeamId }: TeamTrashProp) {
  const { ref, data, isFetchingNextPage } = useInfiniteScroll(
    trashQueries.teamTrashList(selectedTeamId),
  );
  const items = data.pages.flatMap((page) => page.content);
  const isEmpty = data.pages[0].totalElements === 0;
  return (
    <div>
      {isEmpty ? (
        <TrashEmpty />
      ) : (
        <TrashList
          items={items}
          bottomRef={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export default TeamTrash;
