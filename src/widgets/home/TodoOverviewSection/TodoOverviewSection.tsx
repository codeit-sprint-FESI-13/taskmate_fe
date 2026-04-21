"use client";

import Image from "next/image";

import emptyImg from "@/assets/images/empty.png";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";
import { Icon } from "@/shared/ui/Icon";
import { mainInfiniteQueries } from "@/widgets/home/query/mainInfiniteQueries";

import MainTodoItem from "../MainTodoItem/MainTodoItem";

export default function TodoOverviewSection() {
  //  최근 등록한 할 일 - 무한 스크롤
  const {
    data: recentData,
    isFetchingNextPage: recentIsFetchingNextPage,
    ref: recentRef,
  } = useInfiniteScroll(mainInfiniteQueries.recentInfiniteOptions());
  const recentItems =
    recentData?.pages.flatMap((page) =>
      page.items.map((item) => ({
        todoId: item.todoId,
        title: item.title,
        teamDisplayName: item.teamDisplayName,
        goalTitle: item.goalTitle,
        dueDate: item.dueDate,
      })),
    ) ?? [];

  // 마감 임박 할 일 - 무한 스크롤
  const {
    data: dueSoonData,
    isFetchingNextPage: dueSoonIsFetchingNextPage,
    ref: dueSoonRef,
  } = useInfiniteScroll(mainInfiniteQueries.dueSoonInfiniteOptions());

  const dueSoonItems =
    dueSoonData?.pages.flatMap((page) =>
      page.items.map((item) => ({
        todoId: item.todoId,
        title: item.title,
        teamDisplayName: item.teamDisplayName,
        goalTitle: item.goalTitle,
        dueDate: item.dueDate,
      })),
    ) ?? [];

  return (
    <section className="desktop:flex-row desttop:gap-8 flex w-full flex-col gap-10">
      <div className="tablet:gap-5 flex flex-1 flex-col gap-3">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="Goal"
            size={40}
            className="tablet:block hidden"
          />
          <Icon
            name="Goal"
            size={24}
            className="tablet:hidden block"
          />
          <h2 className="typography-label-1 tablet:typography-body-1 font-medium text-black">
            최근 등록한 할 일
          </h2>
        </div>

        <div className="tablet:gap-4 desktop:gap-6 flex h-[636px] flex-col gap-3 overflow-hidden overflow-y-scroll">
          {recentItems.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-4xl bg-white">
              <Image
                src={emptyImg}
                alt="최근 등록한 할 일이 없을 때 보여지는 이미지"
                className="mb-6"
                width={140}
                height={140}
              />
              <span className="typography-heading-2 font-semibold text-gray-500">
                생성된 할 일이 없어요
              </span>
              <span className="typography-heading-2 text-gray-500">
                새로운 할 일을 만들고 관리해보세요
              </span>
            </div>
          ) : (
            <>
              {recentItems.map((item) => (
                <MainTodoItem
                  key={item.todoId}
                  todoId={item.todoId}
                  title={item.title}
                  teamDisplayName={item.teamDisplayName}
                  goalTitle={item.goalTitle}
                  dueDate={item.dueDate}
                />
              ))}
              <div ref={recentRef} />

              {recentIsFetchingNextPage && (
                <div className="flex w-full animate-pulse items-center justify-center py-4">
                  로딩중
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="tablet:gap-5 flex flex-1 flex-col gap-3">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="Deadline"
            size={40}
            className="tablet:block hidden"
          />
          <Icon
            name="Deadline"
            size={24}
            className="tablet:hidden block"
          />
          <h2 className="typography-label-1 tablet:typography-body-1 font-medium text-black">
            마감 임박 할일
          </h2>
        </div>

        <div className="tablet:gap-4 desktop:gap-6 flex h-159 flex-col gap-3 overflow-hidden overflow-y-scroll">
          {dueSoonItems.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-4xl bg-white">
              <Image
                src={emptyImg}
                alt="최근 등록한 할 일이 없을 때 보여지는 이미지"
                className="mb-6"
                width={140}
                height={140}
              />
              <span className="typography-heading-2 font-semibold text-gray-500">
                마감이 임박한 일이 없어요!
              </span>
            </div>
          ) : (
            <>
              {dueSoonItems.map((item) => (
                <MainTodoItem
                  key={item.todoId}
                  todoId={item.todoId}
                  title={item.title}
                  teamDisplayName={item.teamDisplayName}
                  goalTitle={item.goalTitle}
                  dueDate={item.dueDate}
                />
              ))}
              <div ref={dueSoonRef} />

              {dueSoonIsFetchingNextPage && (
                <div className="flex w-full animate-pulse items-center justify-center py-4">
                  로딩중
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
