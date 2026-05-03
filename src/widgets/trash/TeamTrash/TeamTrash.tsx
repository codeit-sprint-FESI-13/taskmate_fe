import React from "react";

import { trashQueries } from "@/entities/trash";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import TrashEmpty from "@/widgets/trash/TrashEmpty";
import TrashList from "@/widgets/trash/TrashList";

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
