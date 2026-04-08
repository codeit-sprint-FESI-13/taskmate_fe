import { Spacing } from "../../common/Spacing";
import { List } from "../parts/List";

// @TODO: 향후 에러 메시지를 props로 받아오도록 AsyncBoundary 수정 여부 고민
// @TODO: retry 기능 전달 고려
export const Error = () => {
  return (
    <List.Container>
      <List.Header>
        <List.Title>개인 스페이스</List.Title>
      </List.Header>
      <Spacing size={10} />

      <span className="typography-body-2 text-gray-400">
        데이터를 받아오는 과정에서 에러가 발생했습니다. 다시 시도해주세요
      </span>
    </List.Container>
  );
};
