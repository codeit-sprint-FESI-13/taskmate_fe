"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import PersonalTrash from "@/components/trash/PersonalTrash";
import TeamTrash from "@/components/trash/TeamTrash";
import TeamTrashDropdown from "@/components/trash/TeamTrash/TeamTrashDropdown";
import TrashEmpty from "@/components/trash/TrashEmpty";
import TrashTabs, { TrashTab } from "@/components/trash/TrashTabs";
import { teamQueries } from "@/features/team/query/team.queryKey";

function Trash() {
  const [activeTab, setActiveTab] = useState<TrashTab>("personal");
  const { data: teams } = useSuspenseQuery(teamQueries.all());
  const [selectedTeamId, setSeletedTeamId] = useState<number | undefined>(
    teams[0]?.teamId,
  );

  return (
    <div className="mt-20 flex w-full flex-col">
      <div className="tablet:flex-row tablet:items-center tablet:justify-end flex flex-col">
        <div className="tablet:w-full w-[209px] pr-2">
          <TrashTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        {activeTab === "team" && selectedTeamId !== undefined && (
          <TeamTrashDropdown
            teams={teams}
            selectedTeamId={selectedTeamId}
            onSelect={setSeletedTeamId}
          />
        )}
      </div>

      <div className="w-full py-5">
        {activeTab === "personal" ? (
          <PersonalTrash />
        ) : selectedTeamId !== undefined ? (
          <TeamTrash selectedTeamId={selectedTeamId} />
        ) : (
          <TrashEmpty />
        )}
      </div>
    </div>
  );
}

export default Trash;
