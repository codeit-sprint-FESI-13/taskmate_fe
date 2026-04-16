"use client";
import TrashEmpty from "@/components/trash/TrashEmpty";
import TrashList from "@/components/trash/TrashList";
import { trashQueries } from "@/constants/queryKeys/trash.queryKey";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

function PersonalTrash() {
  const { ref, data, isFetchingNextPage } = useInfiniteScroll(
    trashQueries.personalTrashList(),
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

export default PersonalTrash;
