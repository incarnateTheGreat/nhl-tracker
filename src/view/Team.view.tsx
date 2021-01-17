import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTeamScheduleData } from "../services/api";

const Team = () => {
  const { teamID = "" } = useParams();

  useEffect(() => {
    const teamDataCakl = async () => {
      const teamScheduleData = await getTeamScheduleData(teamID);

      for (const game of teamScheduleData.dates) {
        console.log(game.games[0]);
      }
    };

    teamDataCakl();
  }, []);

  return <div>Team. {teamID}</div>;
};

export default Team;
