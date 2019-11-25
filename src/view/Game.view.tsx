import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameData } from "../services/api";
import { IGame, IAllPlays } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const [goalsObjData, setGoalsObjData] = useState();
  const { gameData, liveData } = data || {};

  const getScoringPlays = () => {
    let scoringPlays: Array<IAllPlays> = [];

    if (liveData) {
      scoringPlays = liveData.plays.allPlays.filter((play: IAllPlays) =>
        liveData.plays.scoringPlays.includes(play.about.eventIdx)
      );
    }

    // Sort Goals by Periods.
    const goalsObj: Array<object> = scoringPlays.reduce((acc, curr) => {
      if (Array.isArray(acc[curr.about.ordinalNum])) {
        acc[curr.about.ordinalNum].push(curr);
      } else {
        acc[curr.about.ordinalNum] = [];
        acc[curr.about.ordinalNum].push(curr);
      }

      return acc;
    }, []);

    setGoalsObjData(goalsObj);

    console.log(gameData);

    console.log(liveData);
  };

  const statusInfo = () => {
    let statusStr = "";

    if (liveData) {
      const {
        currentPeriodTimeRemaining,
        currentPeriodOrdinal
      } = liveData.linescore;

      console.log(currentPeriodTimeRemaining, currentPeriodOrdinal);

      if (
        currentPeriodTimeRemaining === "Final" &&
        (currentPeriodOrdinal === "SO" || currentPeriodOrdinal === "OT")
      ) {
        statusStr = `${currentPeriodTimeRemaining} (${currentPeriodOrdinal})`;
      } else if (
        currentPeriodTimeRemaining === "Final" &&
        currentPeriodOrdinal === "3rd"
      ) {
        statusStr = currentPeriodTimeRemaining;
      } else {
        statusStr = `${currentPeriodTimeRemaining} - ${currentPeriodOrdinal}`;
      }
    }

    return statusStr;
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
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [gamePk, data]);

  useEffect(() => {
    getScoringPlays();
  }, [liveData]);

  return (
    <article className="Game">
      {gameData && liveData ? (
        <>
          <section className="Game-header">
            <div className="Game-header-status">{statusInfo()}</div>
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
            <section className="Game-summary-scoring">
              {Object.keys(goalsObjData).map(period => {
                return (
                  <div className="Game-summary-scoring-period" key={period}>
                    <div>{period}</div>
                    {goalsObjData[period].map(goal => (
                      <div
                        className="Game-summary-scoring-period-data"
                        key={goal.about.eventIdx}
                      >
                        {goal.players.map(playerObj => {
                          const { player, playerType, seasonTotal } = playerObj;
                          const { fullName, id, link } = player;

                          if (playerType !== "Goalie") {
                            return (
                              <span
                                key={id}
                                className={`Game-summary-scoring-player ${
                                  playerType === "Scorer"
                                    ? "Game-summary-scoring-player-scorer"
                                    : "Game-summary-scoring-player-assist"
                                }`}
                              >
                                {playerType === "Scorer"
                                  ? `(${goal.about.periodTime})`
                                  : ""}
                                {playerType === "Scorer"
                                  ? ` (${goal.team.triCode}) `
                                  : ""}
                                {fullName}
                              </span>
                            );
                          }
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </section>
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
