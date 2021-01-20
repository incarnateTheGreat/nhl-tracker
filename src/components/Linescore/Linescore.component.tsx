import React, { useContext } from "react";
import Context from "../../context/context";

const Linescore = () => {
  const { liveData }: any = useContext(Context);
  const { away, home } = liveData.linescore.teams;

  return (
    <section className="game-linescore">
      <div className="game-linescore-periods game-linescore-header">
        <div className="game-linescore-periods-period">&nbsp;</div>
        {liveData.linescore.periods.map((period) => (
          <div
            key={period.ordinalNum}
            className="game-linescore-periods-period game-linescore-periods-period-title"
          >
            {period.ordinalNum}
          </div>
        ))}
        <div className="game-linescore-periods-period game-linescore-periods-period-title">
          T
        </div>
      </div>
      <div className="game-linescore-periods">
        <div className="game-linescore-periods-period game-linescore-periods-period-team">
          {away.team.abbreviation}
        </div>
        {liveData.linescore.periods.map((period, key) => (
          <div key={key} className="game-linescore-periods-period">
            {period.away.goals}
          </div>
        ))}
        <div className="game-linescore-periods-period">{away.goals}</div>
      </div>
      <div className="game-linescore-periods">
        <div className="game-linescore-periods-period game-linescore-periods-period-team">
          {home.team.abbreviation}
        </div>
        {liveData.linescore.periods.map((period, key) => (
          <div key={key} className="game-linescore-periods-period">
            {period.home.goals}
          </div>
        ))}
        <div className="game-linescore-periods-period">{home.goals}</div>
      </div>
    </section>
  );
};

export default Linescore;
