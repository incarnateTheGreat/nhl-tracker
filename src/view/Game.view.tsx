import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format, toDate } from "date-fns";
import Context from "../context/context";
import Scoring from "../components/Scoring/Scoring.component";
import Penalties from "../components/Penalties/Penalties.component";
import { getGameData } from "../services/api";
import { IGame, IAllPlays } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const [goalsObjData, setGoalsObjData] = useState();
  const [penaltiesObjData, setPenaltiesObjData] = useState();
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
  };

  const getPenaltiesPlays = () => {
    let penaltyPlays: Array<IAllPlays> = [];

    if (liveData) {
      penaltyPlays = liveData.plays.allPlays.filter((play: IAllPlays) =>
        liveData.plays.penaltyPlays.includes(play.about.eventIdx)
      );
    }

    // Sort Penalties by Periods.
    const penaltiesObj: Array<object> = penaltyPlays.reduce((acc, curr) => {
      if (Array.isArray(acc[curr.about.ordinalNum])) {
        acc[curr.about.ordinalNum].push(curr);
      } else {
        acc[curr.about.ordinalNum] = [];
        acc[curr.about.ordinalNum].push(curr);
      }

      return acc;
    }, []);

    setPenaltiesObjData(penaltiesObj);
  };

  const statusInfo = () => {
    let statusStr = "";

    if (liveData && gameData) {
      const {
        currentPeriodTimeRemaining,
        currentPeriodOrdinal
      } = liveData.linescore;
      const { dateTime } = gameData.datetime;
      const { statusCode } = gameData.status;

      // "1" is for Preview, "3" and "5" are for Pregame and Live, and "7" is for Final.
      if (statusCode === "1") {
        statusStr = `${format(
          toDate(new Date(dateTime)),
          "MMM do, yyyy @ h:mm a"
        )} EDT`;
      } else if (statusCode === "3" || statusCode === "5") {
        statusStr = `${currentPeriodTimeRemaining} - ${currentPeriodOrdinal}`;
      } else if (statusCode === "7") {
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
        }
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
    getPenaltiesPlays();
  }, [liveData]);

  return (
    <Context.Provider value={{ goalsObjData, penaltiesObjData }}>
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
              <Scoring />
              <Penalties />
            </section>
          </>
        ) : (
          <div>No data.</div>
        )}
      </article>
    </Context.Provider>
  );
};

export default Game;
