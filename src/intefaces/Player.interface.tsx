export interface IPlayer {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: ICurrentTeam;
  primaryPosition: IPrimaryPosition;
  stats: IStats[];
}

interface ICurrentTeam {
  id: number;
  name: string;
  link: string;
}

interface IPrimaryPosition {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}

interface IStats {
  type: {
    displayName: string;
  };
  splits: [
    {
      stat: IStat;
    }
  ];
}

interface IStat {
  assists: number;
  goals: number;
  pim: number;
  games: number;
  penaltyMinutes: string;
  plusMinus: number;
  points: number;
  timeOnIce: string;
  shots: number;
  hits: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  powerPlayTimeOnIce: string;
  evenTimeOnIce: string;
  faceOffPct: number;
  shotPct: number;
  gameWinningGoals: number;
  overTimeGoals: number;
  shortHandedGoals: number;
  shortHandedPoints: number;
  shortHandedTimeOnIce: string;
  blocked: number;
  shifts: number;
}
