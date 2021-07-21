import React from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Logo from "../Logo/Logo.component";
import { isLive } from "../../utils/utils";

const Scorecard = ({ data }) => {
  const history = useHistory();
  const { gameDate, gamePk, status, teams, venue, linescore } = data;
  const { statusCode } = status;

  const navToGame = () => {
    history.push(`/game/${gamePk}`);
  };

  const isPreview = () => {
    return statusCode === "1" || statusCode === "2";
  };

  const isPowerPlay = (powerPlay) => {
    return powerPlay && statusCode !== "7";
  };

  const displayLeagueRecord = (record) => {
    return `(${record.wins}-${record.losses}-${record.ot})`;
  };

  const formatDate = () => {
    let dateStr = "";

    if (statusCode === "1") {
      dateStr = `${format(new Date(gameDate), "h:mm a")} EDT`;
    } else if (statusCode === "2") {
      dateStr = status.detailedState;
    } else if (isLive(statusCode)) {
      dateStr = `${linescore.currentPeriodOrdinal} - ${linescore.currentPeriodTimeRemaining}`;
    } else {
      dateStr = `${linescore.currentPeriodTimeRemaining}`;

      if (linescore.currentPeriodOrdinal !== "3rd") {
        dateStr += ` (${linescore.currentPeriodOrdinal})`;
      }
    }

    return dateStr;
  };

  console.log(teams.away);

  return (
    <div onClick={navToGame} className="scorecard" role="presentation">
      <div className="scorecard-info">
        <div className="scorecard-info-status">
          {isLive(statusCode) && <div className="live pulse-live" />}
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
            <span>{teams.away.team.name}</span>
            <span className="scorecard-boxscore-team-record">
              {isPreview() && displayLeagueRecord(teams.away.leagueRecord)}
            </span>
            {isPowerPlay(data.linescore.teams.away.powerPlay) && (
              <span className="scorecard-boxscore-team-name-powerplay powerplay">
                PP
              </span>
            )}
          </span>
          <span className="scorecard-boxscore-team-score">
            {isPreview() ? "--" : teams.away.score}{" "}
          </span>
        </div>
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-logo">
            <Logo teamName={teams.home.team.name} />
          </span>
          <span className="scorecard-boxscore-team-name">
            <span>{teams.home.team.name} </span>
            <span className="scorecard-boxscore-team-record">
              {isPreview() && displayLeagueRecord(teams.home.leagueRecord)}
            </span>
            {isPowerPlay(data.linescore.teams.home.powerPlay) && (
              <span className="scorecard-boxscore-team-name-powerplay powerplay">
                PP
              </span>
            )}
          </span>
          <span className="scorecard-boxscore-team-score">
            {isPreview() ? "--" : teams.home.score}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
