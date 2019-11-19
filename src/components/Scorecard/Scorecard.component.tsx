import React from "react";
import { useHistory } from "react-router-dom";

const Scorecard = ({ data }) => {
  const history = useHistory();
  const { gamePk, status, teams, venue } = data;

  const navToGame = () => {
    history.push(`/game/${gamePk}`);
  };

  return (
    <div onClick={navToGame} className="scorecard" role="presentation">
      <div className="scorecard-info">
        <span className="scorecard-info-status">{status.detailedState}</span>
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
