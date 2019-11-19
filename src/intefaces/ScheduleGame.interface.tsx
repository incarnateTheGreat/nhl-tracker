export interface IScheduleGame {
  content: object;
  gameDate: string;
  gamePk: number;
  gameType: string;
  link: string;
  season: string;
  status: IScheduleGameStatus;
  teams: IScheduleTeams;
  venue: IScheduleVenue;
}

interface IScheduleTeams {
  away: IScheduleTeam;
  home: IScheduleTeam;
}

interface IScheduleTeam {
  leagueRecord: object;
  score: number;
  team: {
    id: number;
    name: string;
    link: string;
  };
}
interface IScheduleGameStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  startTimeTBD: boolean;
  statusCode: string;
}

interface IScheduleVenue {
  link: string;
  name: string;
}
