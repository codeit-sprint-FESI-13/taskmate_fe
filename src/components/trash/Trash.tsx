"use client";
import React, { useState } from "react";

import PersonalTrash from "./PersonalTrash";
import TeamTrash from "./TeamTrash";
import TeamTrashDropdown from "./TeamTrash/TeamTrashDropdown";
import TrashTabs, { TrashTab } from "./TrashTabs";

function Trash() {
  const [activeTab, setActiveTab] = useState<TrashTab>("team");
  return (
    <div className="mt-20 flex w-full flex-col">
      <div className="tablet:flex-row tablet:items-center tablet:justify-end flex flex-col">
        <div className="tablet:w-full w-[209px] pr-2">
          <TrashTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        {activeTab === "team" && <TeamTrashDropdown />}
      </div>

      <div className="w-full py-5">
        {activeTab === "personal" ? <PersonalTrash /> : <TeamTrash />}
      </div>
    </div>
  );
}

export default Trash;
