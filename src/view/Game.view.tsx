import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameData } from "../services/api";
import { IGame } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const { gameData, liveData } = data || {};

  useEffect(() => {
    const initGameData = async () => {
      const res = await getGameData(gamePk);
      setData(res);
    };

    initGameData();
  }, [gamePk]);

  if (gameData && liveData) {
    console.log(gameData, liveData);
  }

  return (
    <article className="Game">
      {gameData && liveData ? (
        <>
          <section className="Game-header">
            <div className="Game-header-status">
              {liveData.linescore.currentPeriodTimeRemaining}
            </div>
            <div className="Game-header-score">
              <div className="Game-header-score-team Game-header-score-team-away">
                <span className="Game-header-score-team-logo">Logo</span>
                <span className="Game-header-score-team-info">
                  <span className="Game-header-score-team-info-shortName">
                    {gameData.teams.away.shortName}
                  </span>
                  <span className="Game-header-score-team-info-teamName">
                    {gameData.teams.away.teamName}
                  </span>
                </span>
                <span className="Game-header-score-team-score">
                  {liveData.linescore.teams.away.goals}
                </span>
              </div>
              <div className="Game-header-score-team Game-header-score-team-home">
                <span className="Game-header-score-team-score">
                  {liveData.linescore.teams.home.goals}
                </span>
                <span className="Game-header-score-team-info">
                  <span className="Game-header-score-team-info-shortName">
                    {gameData.teams.home.shortName}
                  </span>
                  <span className="Game-header-score-team-info-teamName">
                    {gameData.teams.home.teamName}
                  </span>
                </span>
                <span className="Game-header-score-team-logo">Logo</span>
              </div>
            </div>
            <div className="Game-header-location">{gameData.venue.name}</div>
          </section>
          <section className="Game-boxscore">
            <div className="Game-boxscore-periods Game-boxscore-header">
              <div className="Game-boxscore-periods-period">&nbsp;</div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.ordinalNum}
                  className="Game-boxscore-periods-period"
                >
                  {period.ordinalNum}
                </div>
              ))}
              <div className="Game-boxscore-periods-period">T</div>
            </div>
            <div className="Game-boxscore-periods">
              <div className="Game-boxscore-periods-period Game-boxscore-periods-period-team">
                Away Team
              </div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.startTime}
                  className="Game-boxscore-periods-period"
                >
                  {period.away.goals}
                </div>
              ))}
              <div className="Game-boxscore-periods-period">
                {liveData.linescore.teams.away.goals}
              </div>
            </div>
            <div className="Game-boxscore-periods">
              <div className="Game-boxscore-periods-period Game-boxscore-periods-period-team">
                Home Team
              </div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.startTime}
                  className="Game-boxscore-periods-period"
                >
                  {period.home.goals}
                </div>
              ))}
              <div className="Game-boxscore-periods-period">
                {liveData.linescore.teams.home.goals}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>No data.</div>
      )}
    </article>
  );
};

export default Game;
