import React, { useContext } from "react";
import { format, toDate } from "date-fns";
import Context from "../../context/context";
import Logo from "../Logo/Logo.component";

const ScoreHeader = () => {
  const { gameData, liveData, headToHeadData }: any = useContext(Context);

  const homeTeam = headToHeadData?.teams.find(
    (team) => team.id === gameData.teams.home.id
  );
  const awayTeam = headToHeadData?.teams.find(
    (team) => team.id === gameData.teams.away.id
  );

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

  return (
    <section className="Game-header">
      <div className="Game-header-status">{statusInfo()}</div>
      <div className="Game-header-score">
        <div className="Game-header-score-team Game-header-score-team-away">
          <span className="Game-header-score-team-logo">
            <Logo teamName={gameData.teams.away.name} />
          </span>
          <span className="Game-header-score-team-info">
            <span className="Game-header-score-team-info-shortName">
              {gameData.teams.away.shortName}
            </span>
            <span className="Game-header-score-team-info-teamName">
              {gameData.teams.away.teamName}
            </span>
            <span>
              {awayTeam?.record.leagueRecord.wins}-
              {awayTeam?.record.leagueRecord.losses}-
              {awayTeam?.record.leagueRecord.ot}
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
            <span>
              {homeTeam?.record.leagueRecord.wins}-
              {homeTeam?.record.leagueRecord.losses}-
              {homeTeam?.record.leagueRecord.ot}
            </span>
          </span>
          <span className="Game-header-score-team-logo">
            <Logo teamName={gameData.teams.home.name} />
          </span>
        </div>
      </div>
      <div className="Game-header-location">{gameData.venue.name}</div>
    </section>
  );
};

export default ScoreHeader;
