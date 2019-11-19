export const getGamesOfDay = async date => {
  return await fetch(
    `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
  ).then(response => response.json());
};

export const getGameData = async gamePk => {
  return await fetch(
    `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/feed/live`
  ).then(response => response.json());
};
