import React from "react";

import TrashEmpty from "../TrashEmpty";
import TrashList from "../TrashList";

function TeamTrash() {
  const isEmpty = true;
  return <div>{isEmpty ? <TrashEmpty /> : <TrashList />}</div>;
}

export default TeamTrash;
