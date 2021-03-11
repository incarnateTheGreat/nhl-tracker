import React, { useContext, useEffect, useState } from "react";
import { format, toDate } from "date-fns";
import Context from "../../context/context";
import { createImageLink, isLive, isGameOver } from "../../utils/utils";

const ScoreHeader = () => {
  const { gameData, liveData, headToHeadData }: any = useContext(Context);
  const { status } = gameData;
  const [awayTeamLogo, setAwayTeamLogo] = useState<string>("");
  const [homeTeamLogo, setHomeTeamLogo] = useState<string>("");

  const homeTeam = headToHeadData?.teams.find(
    (team) => team.id === gameData.teams.home.id
  );
  const awayTeam = headToHeadData?.teams.find(
    (team) => team.id === gameData.teams.away.id
  );

  // Assign the Home and Away logos.
  useEffect(() => {
    const getLogo = async (logo, setMethod) => {
      const res = await createImageLink(logo);

      setMethod(res);
    };

    getLogo(gameData.teams.away.name, setAwayTeamLogo);
    getLogo(gameData.teams.home.name, setHomeTeamLogo);
  }, [gameData.teams.away.name, gameData.teams.home.name]);

  const statusInfo = () => {
    let statusStr = "";

    if (liveData && gameData) {
      const {
        currentPeriodTimeRemaining,
        currentPeriodOrdinal,
      } = liveData.linescore;
      const { dateTime } = gameData.datetime;
      const { statusCode } = gameData.status;

      // "1" is for Preview, "3" and "5" are for Pregame and Live, and "7" is for Final.
      if (statusCode === "1") {
        statusStr = `${format(
          toDate(new Date(dateTime)),
          "MMM do, yyyy @ h:mm a"
        )} EDT`;
      } else if (statusCode === "2") {
        statusStr = gameData.status.detailedState;
      } else if (
        statusCode === "3" ||
        statusCode === "4" ||
        statusCode === "5"
      ) {
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

  const homeTeamWinner = () => {
    return (
      liveData.linescore.teams.home.goals > liveData.linescore.teams.away.goals
    );
  };

  const awayTeamWinner = () => {
    return (
      liveData.linescore.teams.away.goals > liveData.linescore.teams.home.goals
    );
  };

  return (
    <section className="game-header">
      <div className="game-header-score">
        <div className="game-header-score-team game-header-score-team-away">
          <span
            className="game-header-score-team-logo"
            style={{
              backgroundImage: `url(${awayTeamLogo})`,
            }}
          ></span>
          <span className="game-header-score-team-info">
            <span className="game-header-score-team-info-shortName">
              {gameData.teams.away.shortName}
            </span>
            <span className="game-header-score-team-info-teamName">
              {gameData.teams.away.teamName}
            </span>
            <span>
              {awayTeam?.record.leagueRecord.wins}-
              {awayTeam?.record.leagueRecord.losses}-
              {awayTeam?.record.leagueRecord.ot}
            </span>
          </span>
          <span className="game-header-score-team-pp powerplay">
            {isLive(status.statusCode) &&
              liveData.linescore.teams.away.powerPlay &&
              "PP"}
          </span>
          <span
            className={`game-header-score-team-score ${
              isGameOver(liveData) &&
              awayTeamWinner() &&
              `game-header-score-team-score-winner`
            }`}
          >
            {liveData.linescore.teams.away.goals}
          </span>
        </div>
        <div className="game-header-score-team game-header-score-team-home">
          <span
            className={`game-header-score-team-score ${
              isGameOver(liveData) &&
              homeTeamWinner() &&
              `game-header-score-team-score-winner`
            }`}
          >
            {liveData.linescore.teams.home.goals}
          </span>
          <span className="game-header-score-team-info">
            <span className="game-header-score-team-info-shortName">
              {gameData.teams.home.shortName}
            </span>
            <span className="game-header-score-team-info-teamName">
              {gameData.teams.home.teamName}
            </span>
            <span>
              {homeTeam?.record.leagueRecord.wins}-
              {homeTeam?.record.leagueRecord.losses}-
              {homeTeam?.record.leagueRecord.ot}
            </span>
          </span>
          <span className="game-header-score-team-pp powerplay">
            {isLive(status.statusCode) &&
              liveData.linescore.teams.home.powerPlay &&
              "PP"}
          </span>
          <span
            className="game-header-score-team-logo"
            style={{
              backgroundImage: `url(${homeTeamLogo})`,
            }}
          ></span>
        </div>
      </div>
      <div className="game-header-location">
        <span>{statusInfo()}</span>
        <span> {gameData.venue.name}</span>
      </div>
    </section>
  );
};

export default ScoreHeader;
