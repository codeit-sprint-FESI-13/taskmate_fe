import Button from "@/components/common/Button/Button";

import { Spacing } from "../../common/Spacing";
import { List } from "../parts/List";

interface Props {
  error: Error;
  onReset: () => void;
}

export const Error = ({ error, onReset }: Props) => {
  return (
    <List.Container>
      <List.Header>
        <List.Title>개인 스페이스</List.Title>
      </List.Header>
      <Spacing size={10} />

      <div className="flex flex-col items-center gap-2 px-4">
        <Button
          variant="secondary"
          onClick={onReset}
        >
          데이터 다시 가져오기
        </Button>
      </div>
    </List.Container>
  );
};
