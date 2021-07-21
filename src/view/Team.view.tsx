import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { getTeamData, getTeamScheduleData } from "../services/api";
import { ITeam, ITeamInfo } from "../intefaces/Team.interface";
import Logo from "../components/Logo/Logo.component";
import { handleNavClick, isLive } from "../utils/utils";

const rankGridHandler = (rank) => {
  if (rank === "1") {
    return "1st";
  } else if (rank === "2") {
    return "2nd";
  } else if (rank === "3") {
    return "3rd";
  } else {
    return `${rank}th`;
  }
};

// label: t("nav.player"),

const Team = () => {
  const history = useHistory();
  let { teamID } = useParams();
  const [teamData, setTeamData] = useState<ITeamInfo>();
  const [teamScheduledGames, setTeamScheduledGames] = useState<ITeam[]>([]);
  const [teamCompletedGames, setTeamCompletedGames] = useState<ITeam[]>([]);
  const { t } = useTranslation();

  // Parse to a Number;
  teamID = +teamID;

  // When navigating between teams, listen for the route change so the previous team schedule data can be cleared.
  // Not doing this allows for previou data to crash. Navigating to a similar link will not re-render the page.
  history.listen(() => {
    setTeamScheduledGames([]);
    setTeamCompletedGames([]);
  });

  useEffect(() => {
    const teamScheduleDataCall = async () => {
      const teamScheduleData = await getTeamScheduleData(teamID);

      const scheduledGames = teamScheduleData.dates.filter((game) => {
        return (
          game.games[0].status.statusCode === "1" ||
          game.games[0].status.statusCode === "3" ||
          game.games[0].status.statusCode === "4" ||
          game.games[0].status.statusCode === "5"
        );
      });

      const completedGames = teamScheduleData.dates.filter((game) => {
        return (
          game.games[0].status.statusCode === "6" ||
          game.games[0].status.statusCode === "7"
        );
      });

      setTeamCompletedGames(completedGames);
      setTeamScheduledGames(scheduledGames);
    };

    const getTeamDataCall = async () => {
      const teamDataCall = await getTeamData(teamID);

      setTeamData(teamDataCall.teams[0]);
    };

    teamScheduleDataCall();
    getTeamDataCall();
  }, [teamID]);

  return (
    <article className="team main-container">
      {teamData && (
        <>
          <header className="team-headline">
            <h2 className="team-headline-name-logo">
              <Logo size="large" teamName={teamData?.name} /> {teamData?.name}
            </h2>
            <span className="team-headline-record">
              <span>
                {" "}
                ({teamData?.record.leagueRecord.wins}-
                {teamData?.record.leagueRecord.losses}-
                {teamData?.record.leagueRecord.ot})
              </span>

              <span>
                {rankGridHandler(teamData?.record.divisionRank)} in{" "}
                {teamData?.division.name}
              </span>
            </span>
          </header>

          <h3>Completed</h3>
          <table className="team-schedule team-schedule-upcoming">
            <thead>
              <tr>
                <th title={t("team.schedule.date")}>
                  {t("team.schedule.date")}
                </th>
                <th title={t("team.schedule.opponent")}>
                  {t("team.schedule.opponent")}
                </th>
                <th title={t("team.schedule.result")}>
                  {t("team.schedule.result")}
                </th>
                <th title={t("team.schedule.record")}>
                  {t("team.schedule.record")}
                </th>
              </tr>
            </thead>
            <tbody>
              {teamCompletedGames.length > 0 &&
                teamCompletedGames.map((game, key) => {
                  const { gameDate, gamePk, linescore, teams } = game.games[0];
                  const { away, home } = teams;

                  let opponent;
                  let opponentName;
                  let opponentID;
                  let logo_teamName;
                  let home_away_symbol;
                  let teamRecord;
                  let win_or_loss;
                  let finalScore;
                  let extraTime;

                  // If the Team ID matches the Away Team data, then the Opponent is the Home team, and vice versa.
                  if (teamID === away.team.id) {
                    opponent = home.team.locationName;
                    opponentName = home.team.name;
                    opponentID = home.team.id;
                    logo_teamName = home.team.name;
                    home_away_symbol = "@";
                    teamRecord = `${away.leagueRecord.wins}-${away.leagueRecord.losses}-${away.leagueRecord.ot}`;
                    win_or_loss = away.score > home.score ? "W" : "L";
                  } else if (teamID === home.team.id) {
                    opponent = away.team.locationName;
                    opponentName = away.team.name;
                    opponentID = away.team.id;
                    logo_teamName = away.team.name;
                    home_away_symbol = "vs.";
                    teamRecord = `${home.leagueRecord.wins}-${home.leagueRecord.losses}-${home.leagueRecord.ot}`;
                    win_or_loss = home.score > away.score ? "W" : "L";
                  }

                  // Construct the final score.
                  finalScore =
                    home.score > away.score
                      ? `${home.score}-${away.score}`
                      : `${away.score}-${home.score}`;

                  // If there was extra time (Overtime or Shootout), then apply.
                  extraTime =
                    linescore.currentPeriodOrdinal === "SO" ||
                    (linescore.currentPeriodOrdinal === "OT" &&
                      `(${linescore.currentPeriodOrdinal})`);

                  return (
                    <tr key={key}>
                      <td>{format(new Date(gameDate), "E, MMM. do")}</td>
                      <td className="team-schedule-logo">
                        <span className="team-schedule-logo-home-away">
                          {home_away_symbol}
                        </span>
                        <Logo size="small" teamName={logo_teamName} />{" "}
                        <span
                          className="link"
                          onClick={handleNavClick(
                            `/team/${opponentID}`,
                            history
                          )}
                          title={opponentName}
                        >
                          {opponent}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`team-schedule-win-loss ${
                            win_or_loss === "W" ? "--win" : "--loss"
                          }`}
                        >
                          {win_or_loss}
                        </span>{" "}
                        <span
                          className="link"
                          onClick={handleNavClick(`/game/${gamePk}`, history)}
                          title={finalScore}
                        >
                          {finalScore} {extraTime}
                        </span>
                      </td>
                      <td>{teamRecord}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <h3>Scheduled</h3>
          <table className="team-schedule team-schedule-results">
            <thead>
              <tr>
                <th title={t("team.schedule.date")}>
                  {t("team.schedule.date")}
                </th>
                <th title={t("team.schedule.opponent")}>
                  {t("team.schedule.opponent")}
                </th>
                <th title={t("team.schedule.time")}>
                  {t("team.schedule.time")}
                </th>
              </tr>
            </thead>
            <tbody>
              {teamScheduledGames.length > 0 &&
                teamScheduledGames.map((game, key) => {
                  const {
                    gameDate,
                    gamePk,
                    linescore,
                    teams,
                    status,
                  } = game.games[0];
                  const { away, home } = teams;

                  let opponent;
                  let opponentName;
                  let opponentID;
                  let logo_teamName;
                  let home_away_symbol;

                  // If the Team ID matches the Away Team data, then the Opponent is the Home team, and vice versa.
                  if (teamID === away.team.id) {
                    opponent = home.team.locationName;
                    opponentName = home.team.name;
                    opponentID = home.team.id;
                    logo_teamName = home.team.name;
                    home_away_symbol = "@";
                  } else if (teamID === home.team.id) {
                    opponent = away.team.locationName;
                    opponentName = away.team.name;
                    opponentID = away.team.id;
                    logo_teamName = away.team.name;
                    home_away_symbol = "vs.";
                  }

                  // If the game is live, show the current score and time remaining. Otherwise, display the result.
                  const renderResultOrCurrent = isLive(status.statusCode) ? (
                    <div className="team-schedule-live">
                      <div className="live pulse-live" />
                      <span
                        className="link"
                        onClick={handleNavClick(`/game/${gamePk}`, history)}
                        title={opponentName}
                      >
                        {linescore.currentPeriodOrdinal}{" "}
                        {linescore.currentPeriodTimeRemaining}{" "}
                        {linescore.teams.away.goals} -{" "}
                        {linescore.teams.home.goals}{" "}
                      </span>{" "}
                    </div>
                  ) : (
                    format(new Date(gameDate), "h:mm a")
                  );

                  return (
                    <tr key={key}>
                      <td>{format(new Date(gameDate), "E, MMM. do")}</td>
                      <td className="team-schedule-logo">
                        <span className="team-schedule-logo-home-away">
                          {home_away_symbol}
                        </span>
                        <Logo size="small" teamName={logo_teamName} />{" "}
                        <span
                          className="link"
                          onClick={handleNavClick(
                            `/team/${opponentID}`,
                            history
                          )}
                          title={opponentName}
                        >
                          {opponent}
                        </span>
                      </td>
                      <td>{renderResultOrCurrent}</td>
                      <td>&nbsp;</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </article>
  );
};

export default Team;
