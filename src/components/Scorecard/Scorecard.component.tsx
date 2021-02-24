import React from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Logo from "../Logo/Logo.component";

const Scorecard = ({ data }) => {
  const history = useHistory();
  const { gameDate, gamePk, status, teams, venue, linescore } = data;
  const { statusCode } = status;

  const navToGame = () => {
    history.push(`/game/${gamePk}`);
  };

  const isLive = () => {
    return statusCode === "3" || statusCode === "4" || statusCode === "5";
  };

  const isPowerPlay = (powerPlay) => {
    return powerPlay && statusCode !== "7";
  };

  const formatDate = () => {
    let dateStr = "";

    if (statusCode === "1") {
      dateStr = `${format(new Date(gameDate), "h:mm a")} EDT`;
    } else if (statusCode === "2") {
      dateStr = status.detailedState;
    } else if (isLive()) {
      dateStr = `${linescore.currentPeriodOrdinal} - ${linescore.currentPeriodTimeRemaining}`;
    } else {
      dateStr = `${linescore.currentPeriodTimeRemaining}`;

      if (linescore.currentPeriodOrdinal !== "3rd") {
        dateStr += ` (${linescore.currentPeriodOrdinal})`;
      }
    }

    return dateStr;
  };

  return (
    <div onClick={navToGame} className="scorecard" role="presentation">
      <div className="scorecard-info">
        <div className="scorecard-info-status">
          {isLive() && (
            <div className="scorecard-info-status-live pulse-live" />
          )}
          <span className="scorecard-info-status-value">{formatDate()}</span>
        </div>

        <span className="scorecard-info-venue">{venue.name}</span>
      </div>
      <div className="scorecard-boxscore">
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-logo">
            <Logo teamName={teams.away.team.name} />
          </span>
          <span className="scorecard-boxscore-team-name">
            {teams.away.team.name}
            {isPowerPlay(data.linescore.teams.away.powerPlay) && (
              <span className="scorecard-boxscore-team-name-powerplay powerplay">
                PP
              </span>
            )}
          </span>
          <span className="scorecard-boxscore-team-score">
            {teams.away.score}
          </span>
        </div>
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-logo">
            <Logo teamName={teams.home.team.name} />
          </span>
          <span className="scorecard-boxscore-team-name">
            {teams.home.team.name}{" "}
            {isPowerPlay(data.linescore.teams.home.powerPlay) && (
              <span className="scorecard-boxscore-team-name-powerplay powerplay">
                PP
              </span>
            )}
          </span>
          <span className="scorecard-boxscore-team-score">
            {teams.home.score}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
