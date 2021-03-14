import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo/Logo.component";
import Context from "../../context/context";
import { IGoalieData, IPlayerData } from "../../intefaces/Game.interface";

interface Team {
  goalies: Array<IGoalieData>;
  forwards: Array<IPlayerData>;
  defensemen: Array<IPlayerData>;
}

const PlayerStatistics = () => {
  const { liveData } = useContext(Context);
  const { away, home } = liveData.boxscore.teams;
  const [awayTeam, setAwayTeam] = useState<Team>({
    goalies: [],
    forwards: [],
    defensemen: [],
  });
  const [homeTeam, setHomeTeam] = useState<Team>({
    goalies: [],
    forwards: [],
    defensemen: [],
  });

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

  const Goalies = ({ goalies }) => {
    return (
      <div className="game-summary-player-statistics-body-container">
        <div className="game-summary-player-statistics-body-container-header">
          <div className="game-summary-player-statistics-body-container-element">
            Goalies
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            GA
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            SV
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            SA
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            SV %
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            TOI
          </div>
        </div>
        {goalies.map((goalie, key) => (
          <div
            className="game-summary-player-statistics-body-container-data"
            key={key}
          >
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.person.fullName}{" "}
              <span className="game-summary-player-statistics-body-container-element-position">
                {goalie.position.abbreviation}
              </span>
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.stats.goalieStats.shots - goalie.stats.goalieStats.saves}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.stats.goalieStats.saves}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.stats.goalieStats.shots}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.stats.goalieStats.savePercentage
                ? Math.round(goalie.stats.goalieStats.savePercentage * 10) / 10
                : "N/A"}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {goalie.stats.goalieStats.timeOnIce}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const Skaters = ({ skaters, title }) => {
    return (
      <div className="game-summary-player-statistics-body-container">
        <div className="game-summary-player-statistics-body-container-header">
          <div className="game-summary-player-statistics-body-container-element">
            {title}
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            G
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            A
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            +/-
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            SOG
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            PIM
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            BLK
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            FOT-FOW
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            TOI
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            EVTOI
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            PPTOI
          </div>
          <div className="game-summary-player-statistics-body-container-element">
            SHTOI
          </div>
        </div>
        {skaters.map((forward, key) => (
          <div
            className="game-summary-player-statistics-body-container-data"
            key={key}
          >
            <div className="game-summary-player-statistics-body-container-element">
              {forward.person.fullName}{" "}
              <span className="game-summary-player-statistics-body-container-element-position">
                {forward.position.abbreviation}
              </span>
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.goals}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.assists}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.plusMinus}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.shots}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.penaltyMinutes}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.blocked}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.faceOffWins} -{" "}
              {forward.stats.skaterStats.faceoffTaken}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.timeOnIce}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.evenTimeOnIce}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.powerPlayTimeOnIce}
            </div>
            <div className="game-summary-player-statistics-body-container-element">
              {forward.stats.skaterStats.shortHandedTimeOnIce}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Build out the team's players.
  useEffect(() => {
    setAwayTeam(buildTeam(away.players));
    setHomeTeam(buildTeam(home.players));
  }, [away, home]);

  //   useEffect(() => {
  //      console.log({ awayTeam });
  //        console.log({ homeTeam });
  //   }, [awayTeam, homeTeam]);

  return (
    <section className="game-summary-player-statistics">
      <section className="game-summary-player-statistics-team">
        <div className="game-summary-player-statistics-header">
          <Logo size="small" teamName={away.team.name} />
          <h3>{away.team.name}</h3>
        </div>
        <div className="game-summary-player-statistics-body">
          <Goalies goalies={awayTeam.goalies} />
          <Skaters skaters={awayTeam.forwards} title="Forwards" />
          <Skaters skaters={awayTeam.defensemen} title="Defensement" />
        </div>
      </section>

      <section className="game-summary-player-statistics-team">
        <div className="game-summary-player-statistics-header">
          <Logo size="small" teamName={home.team.name} />
          <h3>{home.team.name}</h3>
        </div>
        <div className="game-summary-player-statistics-body">
          <Goalies goalies={homeTeam.goalies} />
          <Skaters skaters={homeTeam.forwards} title="Forwards" />
          <Skaters skaters={homeTeam.defensemen} title="Defensement" />
        </div>
      </section>
    </section>
  );
};

export default PlayerStatistics;
