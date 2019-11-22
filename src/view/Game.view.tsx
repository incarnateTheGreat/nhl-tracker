import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameData } from "../services/api";
import { IGame } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const { gameData, liveData } = data || {};

  const getScoringPlays = () => {
    let res = {};

    if (liveData) {
      res = liveData.plays.allPlays.filter(play =>
        liveData.plays.scoringPlays.includes(play.about.eventIdx)
      );
    }

    console.log(res);
  };

  useEffect(() => {
    const collecGameData = async () => {
      const res = await getGameData(gamePk);
      setData(res);
    };

    if (!gameData) {
      collecGameData();
    }

    if (gameData && gameData.status.codedGameState !== "7") {
      const interval = setInterval(() => {
        collecGameData();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [gamePk, data]);

  if (gameData && liveData) {
    getScoringPlays();
  }

  return (
    <article className="Game">
      {gameData && liveData ? (
        <>
          <section className="Game-header">
            <div className="Game-header-status">
              {liveData.linescore.currentPeriodTimeRemaining} -{" "}
              {liveData.linescore.currentPeriodOrdinal}
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
          <section className="Game-linescore">
            <div className="Game-linescore-periods Game-linescore-header">
              <div className="Game-linescore-periods-period">&nbsp;</div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.ordinalNum}
                  className="Game-linescore-periods-period"
                >
                  {period.ordinalNum}
                </div>
              ))}
              <div className="Game-linescore-periods-period">T</div>
            </div>
            <div className="Game-linescore-periods">
              <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
                Away Team
              </div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.startTime}
                  className="Game-linescore-periods-period"
                >
                  {period.away.goals}
                </div>
              ))}
              <div className="Game-linescore-periods-period">
                {liveData.linescore.teams.away.goals}
              </div>
            </div>
            <div className="Game-linescore-periods">
              <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
                Home Team
              </div>
              {liveData.linescore.periods.map(period => (
                <div
                  key={period.startTime}
                  className="Game-linescore-periods-period"
                >
                  {period.home.goals}
                </div>
              ))}
              <div className="Game-linescore-periods-period">
                {liveData.linescore.teams.home.goals}
              </div>
            </div>
          </section>
          <section className="Game-summary">
            <section className="Game-summary-scoring"></section>
            <section className="Game-summary-penalties"></section>
          </section>
        </>
      ) : (
        <div>No data.</div>
      )}
    </article>
  );
};

export default Game;
