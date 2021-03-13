import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo/Logo.component";
import Context from "../../context/context";

const PlayerStatistics = () => {
  const { liveData } = useContext(Context);
  const { away, home } = liveData.boxscore.teams;
  const [awayTeam, setAwayTeam] = useState<object>();
  const [homeTeam, setHomeTeam] = useState<object>();

  // Separate the team's players by position to be stored.
  const buildTeam = (players: object) => {
    const goaliesRes = Object.values(players).filter(
      (player) => player.position.code === "G"
    );

    const forwardsRes = Object.values(players).filter(
      (player) =>
        player.position.code === "L" ||
        player.position.code === "R" ||
        player.position.code === "C"
    );

    const defensemenRes = Object.values(players).filter(
      (player) => player.position.code === "D"
    );

    return {
      goalies: goaliesRes,
      forwards: forwardsRes,
      defensemen: defensemenRes,
    };
  };

  // Build out the team's players.
  useEffect(() => {
    setAwayTeam(buildTeam(away.players));
    setHomeTeam(buildTeam(home.players));
  }, [away, home]);

  useEffect(() => {
    console.log({ awayTeam });
    console.log({ homeTeam });
  }, [awayTeam, homeTeam]);

  return (
    <section className="game-summary-player-statistics">
      <div className="game-summary-player-statistics-header">
        <Logo size="small" teamName={away.team.name} />
        <h3>{away.team.name}</h3>
      </div>
      <div className="game-summary-player-statistics-body"></div>
    </section>
  );
};

export default PlayerStatistics;
