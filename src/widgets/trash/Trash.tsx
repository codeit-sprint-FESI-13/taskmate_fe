"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { teamQueries } from "@/entities/team";
import PersonalTrash from "@/widgets/trash/PersonalTrash";
import TeamTrash from "@/widgets/trash/TeamTrash";
import TeamTrashDropdown from "@/widgets/trash/TeamTrash/TeamTrashDropdown";
import TrashEmpty from "@/widgets/trash/TrashEmpty";
import TrashTabs, { TrashTab } from "@/widgets/trash/TrashTabs";

import AsyncBoundary from "../../shared/ui/AsyncBoundary";

function Trash() {
  const [activeTab, setActiveTab] = useState<TrashTab>("personal");
  const { data: teams } = useSuspenseQuery(teamQueries.all());
  const [selectedTeamId, setSeletedTeamId] = useState<number | undefined>(
    teams[0]?.teamId,
  );

  return (
    <div className="mt-20 flex w-full flex-col">
      <h1 className="text-title-3 text-label-neutral tablet:block tablet:mt-0 mt-[106px] mb-8 hidden font-semibold">
        삭제된 할 일
      </h1>
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
        <AsyncBoundary>
          {activeTab === "personal" ? (
            <PersonalTrash />
          ) : selectedTeamId !== undefined ? (
            <TeamTrash selectedTeamId={selectedTeamId} />
          ) : (
            <TrashEmpty />
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
}

export default Trash;
