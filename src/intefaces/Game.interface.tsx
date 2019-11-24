export interface IGame {
  gameData: IGameData;
  liveData: ILiveData;
  metaData: object;
}

interface IGameData {
  datetime: object;
  game: object;
  players: object;
  status: IGameStatus;
  teams: ITeams;
  venue: IVenue;
}

interface IGameStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  startTimeTBD: boolean;
  statusCode: string;
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
  plays: IPlays;
}

interface IPlays {
  allPlays: IAllPlays[];
  scoringPlays: number[];
}

export interface IAllPlays {
  about: {
    dateTime: string;
    eventId: number;
    eventIdx: number;
    goals: {
      away: number;
      home: number;
    };
    ordinalNum: string;
    period: number;
    periodTime: string;
    periodTimeRemaining: string;
    periodType: string;
  };
  coordinates: {};
  result: {
    description: string;
    event: string;
    eventCode: string;
    eventTypeId: string;
  };
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
