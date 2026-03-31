export const goalKeys = {
  // 목표 관련 전체 캐시
  all: ["goals"] as const,

  // 개인 목표 목록 조회할 때
  personalGoalList: (userId: string) =>
    [...goalKeys.all, "list", "personal", userId] as const,
  // → ['goals', 'list', 'personal', 'user123']

  // 팀 목표 목록 조회할 때
  teamGoalList: (teamId: string) =>
    [...goalKeys.all, "list", "team", teamId] as const,
  // → ['goals', 'list', 'team', 'team123']
};

// 사용예시
// 목표 목록 조회
/** 
 * 개인 목표 목록 조회
    useQuery({
    queryKey: goalKeys.personalGoalList(userId),  // ['goals', 'list', 'personal', 'user123']
    queryFn: () => getPersonalGoals(userId),
    })

 * 팀 목표 목록 조회
    useQuery({
    queryKey: goalKeys.teamGoalList(teamId),      // ['goals', 'list', 'team', 'team123']
    queryFn: () => getTeamGoals(teamId),
    })
  
 * 팀 목표 수정 후 갱신 
  useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
        // 해당 팀 목표 목록 무효화 → 자동으로 다시 조회
        queryClient.invalidateQueries({ queryKey: goalKeys.teamGoalList(teamId) })
    }
  })
})
  **/
