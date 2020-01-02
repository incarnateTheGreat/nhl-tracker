import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { createFileName } from "../../utils/utils";

const Scorecard = ({ data }) => {
  const history = useHistory();
  const [homeLogo, setHomeLogo] = useState("");
  const [awayLogo, setAwayLogo] = useState("");
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

  // Get the Logos for the Home and Away Teams.
  useEffect(() => {
    async function renderLogos() {
      const homeTeamName = createFileName(teams.home.team.name);
      const awayTeamName = createFileName(teams.away.team.name);

      const homeTeamLogo = await import(
        `../../assets/images/${homeTeamName}-logo.svg`
      );
      const awayTeamLogo = await import(
        `../../assets/images/${awayTeamName}-logo.svg`
      );

      setHomeLogo(homeTeamLogo.default);
      setAwayLogo(awayTeamLogo.default);
    }

    renderLogos();
  }, [teams.home.team.name, teams.away.team.name]);

  return (
    <div onClick={navToGame} className="scorecard" role="presentation">
      <div className="scorecard-info">
        <span className="scorecard-info-status">{formatDate()}</span>
        <span className="scorecard-info-venue">{venue.name}</span>
      </div>
      <div className="scorecard-boxscore">
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-logo">
            <img src={awayLogo} alt="The Team" />
          </span>
          <span className="scorecard-boxscore-team-name">
            {teams.away.team.name}
          </span>
          <span className="scorecard-boxscore-team-score">
            {teams.away.score}
          </span>
        </div>
        <div className="scorecard-boxscore-team">
          <span className="scorecard-boxscore-team-logo">
            <img src={homeLogo} alt="The Team" />
          </span>
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
