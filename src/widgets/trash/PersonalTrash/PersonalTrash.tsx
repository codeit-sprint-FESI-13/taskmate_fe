"use client";
import { trashQueries } from "@/features/trash/trash.queryKey";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import TrashEmpty from "@/widgets/trash/TrashEmpty";
import TrashList from "@/widgets/trash/TrashList";

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
