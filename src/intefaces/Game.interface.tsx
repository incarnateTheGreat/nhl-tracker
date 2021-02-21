export interface IGame {
  gameData: IGameData;
  liveData: ILiveData;
  contentData: IGameContent;
  metaData: object;
}

interface IGameData {
  datetime: {
    dateTime: string;
  };
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

interface IGameContent {
  editorial: {
    articles: {
      items: IGameContentItems[];
      title: string;
      topicList: string;
    };
    preview: {
      items: IGameContentItems[];
      title: string;
      topicList: string;
    };
    recap: {
      items: IGameContentItems[];
      title: string;
      topicList: string;
    };
  };
}

interface IGameContentItems {
  approval: string;
  commenting: boolean;
  contributor: {
    contributors: string[];
    source: string;
  };
  dataURI: string;
  date: string;
  headline: string;
  id: string;
  keywordsAll: [
    {
      displayName: string;
      type: string;
      value: string;
    }
  ];
  keywordsDisplay: [
    {
      displayName: string;
      type: string;
      value: string;
    }
  ];
  media: {
    type: string;
    title: string;
    image: {
      altText: string;
      cuts: {
        string: {
          aspectRatio: string;
          at2x: string;
          at3x: string;
          height: number;
          src: string;
          width: number;
        };
      };
    };
  };
  preview: string;
  primaryKeyword: { type: string; value: string; displayName: string };
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
  shareImage: string;
  slug: string;
  state: string;
  subhead: string;
  tagline: string;
  tokenData: {
    string: {
      id: string;
      name: string;
      position: string;
      seoName: string;
      teamId: string;
      tokenGUID: string;
      type: string;
    };
  };
  type: string;
  url: string;
}

interface IPlays {
  allPlays: IAllPlays[];
  penaltyPlays: number[];
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

export interface ILineScore {
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
