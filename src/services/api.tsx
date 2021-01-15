const baseUrl = "https://statsapi.web.nhl.com/api/v1";

export const getGamesOfDay = async (date) => {
  return await fetch(`${baseUrl}/schedule?date=${date}`).then((response) =>
    response.json()
  );
};

export const getNextFewGamesData = async (startDate, endDate, teamID) => {
  return await fetch(
    `${baseUrl}/schedule?startDate=${startDate}&endDate=${endDate}&hydrate=team,linescore,broadcasts(all),tickets,game(content(media(epg)),seriesSummary),radioBroadcasts,metadata,seriesSummary(series)&site=en_nhlCA&teamId=${teamID}&gameType=&timecode=`
  ).then((response) => response.json());
};

export const getGameData = async (gamePk) => {
  return await fetch(`${baseUrl}/game/${gamePk}/feed/live`).then((response) =>
    response.json()
  );
};

export const getStandingsData = async () => {
  return await fetch(
    `${baseUrl}/standings?expand=standings.record`
  ).then((response) => response.json());
};

export const getPlayerData = async (playerID) => {
  return await fetch(
    `${baseUrl}/people/${playerID}?expand=person.stats&stats=yearByYear&expand=stats.team&site=en_nhlCA`
  ).then((response) => response.json());
};

export const getHeadtoHeadTeamData = async (homeTeamID, awayTeamID) => {
  return await fetch(
    `${baseUrl}/teams?site=en_nhl&teamId=${homeTeamID},${awayTeamID}&hydrate=previousSchedule(limit=10,linescore,team),record,coaches,roster(person(stats(splits=statsSingleSeason)))&gameType=R&season=20202021`
  ).then((response) => response.json());
};
