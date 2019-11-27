import React from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

const Scorecard = ({ data }) => {
  const history = useHistory();
  const { gameDate, gamePk, status, teams, venue } = data;
  const { statusCode } = status;

  const navToGame = () => {
    history.push(`/game/${gamePk}`);
  };

  const formatDate = () => {
    let dateStr = "";

    if (statusCode === "1") {
      dateStr = `${format(new Date(gameDate), "h:mm a")} EDT`;
    } else {
      dateStr = status.detailedState;
    }

    return dateStr;
  };

  return (
    <div onClick={navToGame} className="scorecard" role="presentation">
      <div className="scorecard-info">
        <span className="scorecard-info-status">{formatDate()}</span>
        <span className="scorecard-info-venue">{venue.name}</span>
      </div>
      <div className="scorecard-boxscore">
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-name">
            {teams.away.team.name}
          </span>
          <span className="scorecard-boxscore-team-score">
            {teams.away.score}
          </span>
        </div>
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-name">
            {teams.home.team.name}
          </span>
          <span className="scorecard-boxscore-team-score">
            {teams.home.score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
