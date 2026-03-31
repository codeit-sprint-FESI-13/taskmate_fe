export interface ResponseCreateTeam {
  success: true;
}

export interface ResponseCreateTeamError {
  success: false;
  error: {
    message: string;
  };
}
