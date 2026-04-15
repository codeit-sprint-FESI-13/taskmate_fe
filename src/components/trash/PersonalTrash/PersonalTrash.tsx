import React from "react";

import TrashEmpty from "@/components/trash/TrashEmpty";
import TrashList from "@/components/trash/TrashList";

function PersonalTrash() {
  const isEmpty = false;
  return <div>{isEmpty ? <TrashEmpty /> : <TrashList />}</div>;
}

export default PersonalTrash;
