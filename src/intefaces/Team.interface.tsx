import { ILineScore } from "./Game.interface";

export interface ITeamInfo {
  id: number;
  name: string;
  link: string;
  venue: {
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: number;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: {
    id: number;
    name: string;
    link: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: true;
  record: IRecord;
}

export interface IRecord {
  team: {
    id: number;
    name: string;
    link: string;
  };
  leagueRecord: {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  };
  regulationWins: number;
  goalsAgainst: number;
  goalsScored: number;
  points: number;
  divisionRank: string;
  divisionL10Rank: string;
  divisionRoadRank: string;
  divisionHomeRank: string;
  conferenceRank: string;
  conferenceL10Rank: string;
  conferenceRoadRank: string;
  conferenceHomeRank: string;
  leagueRank: string;
  leagueL10Rank: string;
  leagueRoadRank: string;
  leagueHomeRank: string;
  wildCardRank: string;
  row: number;
  gamesPlayed: number;
  streak: {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  };
  pointsPercentage: number;
  ppDivisionRank: string;
  ppConferenceRank: string;
  ppLeagueRank: string;
  lastUpdated: string;
}

export interface ITeam {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  games: [
    {
      gamePk: number;
      link: string;
      gameType: string;
      season: string;
      gameDate: string;
      linescore: ILineScore;
      status: {
        abstractGameState: string;
        codedGameState: string;
        detailedState: string;
        statusCode: string;
        startTimeTBD: false;
      };
      teams: {
        away: {
          leagueRecord: {
            wins: number;
            losses: number;
            ot: number;
            type: string;
          };
          score: number;
          team: ITeamInfo;
        };
        home: {
          leagueRecord: {
            wins: number;
            losses: number;
            ot: number;
            type: string;
          };
          score: number;
          team: ITeamInfo;
        };
      };
      venue: {
        id: number;
        name: string;
        link: string;
      };
      broadcasts: [
        {
          id: number;
          name: string;
          type: string;
          site: string;
          language: string;
        },
        {
          id: number;
          name: string;
          type: string;
          site: string;
          language: string;
        }
      ];
      content: {
        link: string;
      };
      metadata: {
        isManuallyScored: false;
        isSplitSquad: false;
      };
    }
  ];
  events: object[];
  matches: object[];
}
