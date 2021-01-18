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
