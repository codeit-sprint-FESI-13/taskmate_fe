import { notificationQueryOptions } from "@/entities/notification";
import {
  buildNotificationUrl,
  formatNotificationType,
  formatRelativeTime,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "@/features/notification";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll/useInfiniteScroll";
import TextButton from "@/shared/ui/Button/TextButton/TextButton";

import NotificationItem from "./NotificationItem";

interface Props {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: Props) => {
  const { data, isFetchingNextPage, ref } = useInfiniteScroll(
    notificationQueryOptions.notificationsInfinite(),
  );

  const notifications =
    data?.pages.flatMap((page) =>
      page.items.map((item) => ({
        id: item.id,
        url: buildNotificationUrl({ goalId: item.goalId, teamId: item.teamId }),
        isRead: item.isRead,
        notificationType: formatNotificationType(item.type ?? ""),
        createdAt: formatRelativeTime(item.createdAt),
        message: item.message,
        goalName: item.goalName,
        spaceName: item.spaceName,
      })),
    ) ?? [];

  const { mutate: readAll } = useReadAllNotificationMutation();
  const { mutate: readOne } = useReadNotificationMutation();

  const handleReadAll = () => readAll();

  const handleItemClick = (item: {
    id: number;
    isRead: boolean;
    url: string;
  }) => {
    if (!item.isRead) {
      readOne(item.id, {
        onSettled: () => {
          onClose();
          window.location.assign(item.url);
        },
      });
    } else {
      onClose();
      window.location.assign(item.url);
    }
  };

  return (
    <div className="bg-background-normal z-999 rounded-3xl border border-gray-200 px-3 py-5 shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
      <div className="mb-4 flex justify-between">
        <span className="typography-label-1 text-label-neutral my-1.25 ml-2 font-semibold">
          알림
        </span>
        <TextButton
          onClick={handleReadAll}
          className="my-1.25mr-2 text-blue-700"
        >
          모두 읽기
        </TextButton>
      </div>
      <div className="custom-scroll h-110 overflow-auto pr-2">
        {notifications.map((item) => (
          <NotificationItem
            key={item.id}
            isRead={item.isRead}
            NotificationType={item.notificationType ?? ""}
            createAt={item.createdAt}
            message={item.message}
            goalName={item.goalName}
            spaceName={item.spaceName}
            onItemClick={() => handleItemClick(item)}
          />
        ))}
        <div ref={ref} />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <span className="text-sm text-gray-500">로딩 중...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
