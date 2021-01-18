import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { getTeamData, getTeamScheduleData } from "../services/api";
import { ITeam, ITeamInfo } from "../intefaces/Tean.interface";
import Logo from "../components/Logo/Logo.component";

const Team = () => {
  let { teamID } = useParams();
  const [teamData, setTeamData] = useState<ITeamInfo>();
  const [teamSchedule, setTeamSchedule] = useState<ITeam[]>([]);

  // Parse to a Number;
  teamID = +teamID;

  useEffect(() => {
    const teamScheduleDataCall = async () => {
      const teamScheduleData = await getTeamScheduleData(teamID);

      setTeamSchedule(teamScheduleData?.dates);
    };

    const getTeamDataCall = async () => {
      const teamDataCall = await getTeamData(teamID);

      setTeamData(teamDataCall.teams[0]);
    };

    teamScheduleDataCall();
    getTeamDataCall();
  }, []);

  return (
    <article className="team">
      {teamData && (
        <>
          <h2 className="team-name-logo">
            <Logo size="large" teamName={teamData?.name} /> {teamData?.name}
          </h2>
          <table className="team-schedule">
            <thead>
              <tr>
                <th title="Date">Date</th>
                <th title="Opponent">Opponent</th>
                <th title="Time (EST)">Time (EST)</th>
              </tr>
            </thead>
            <tbody>
              {teamSchedule.length > 0 &&
                teamSchedule.map((games, key) => {
                  const { gameDate, teams } = games.games[0];
                  const { away, home } = teams;

                  let opponent;
                  let logo_teamName;
                  let home_away_symbol;

                  // If the Team ID matches the Away Team data, then the Opponent is the Home team, and vice versa.
                  if (teamID === away.team.id) {
                    opponent = home.team.locationName;
                    logo_teamName = home.team.name;
                    home_away_symbol = "@";
                  } else if (teamID === home.team.id) {
                    opponent = away.team.locationName;
                    logo_teamName = away.team.name;
                    home_away_symbol = "vs.";
                  }

                  return (
                    <tr key={key}>
                      <td>{format(new Date(gameDate), "E, MMM. do")}</td>
                      <td className="team-schedule-logo">
                        {home_away_symbol}{" "}
                        <Logo size="small" teamName={logo_teamName} />{" "}
                        {opponent}
                      </td>
                      <td>{format(new Date(gameDate), "h:mm a")}</td>
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
