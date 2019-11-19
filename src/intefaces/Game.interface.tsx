export interface IGame {
  gameData: IGameData;
  liveData: ILiveData;
  metaData: object;
}

interface IGameData {
  datetime: object;
  game: object;
  players: object;
  status: object;
  teams: ITeams;
  venue: IVenue;
}

interface IVenue {
  id: number;
  link: string;
  name: string;
}

interface ITeams {
  away: ITeamInfo;
  home: ITeamInfo;
}

interface ITeamInfo {
  abbreviation: string;
  active: boolean;
  conference: object;
  division: object;
  firstYearOfPlay: string;
  franchise: object;
  franchiseId: number;
  id: number;
  link: string;
  locationName: string;
  name: string;
  officialSiteUrl: string;
  shortName: string;
  teamName: string;
  triCode: string;
}

interface ILiveData {
  boxscore: object;
  decisions: object;
  linescore: ILineScore;
  plays: object;
}

interface ILineScore {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  hasShootout: boolean;
  intermissionInfo: object;
  periods: IPeriods[];
  powerPlayInfo: object;
  powerPlayStrength: string;
  shootoutInfo: object;
  teams: {
    away: ITeamGoalData;
    home: ITeamGoalData;
  };
}

interface IPeriods {
  away: ITeamGoalData;
  home: ITeamGoalData;
  ordinalNum: string;
  startTime: string;
}

interface ITeamGoalData {
  goals: number;
  shotsOnGoal: number;
}
