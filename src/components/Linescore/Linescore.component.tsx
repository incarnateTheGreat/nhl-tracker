import React, { useContext } from "react";
import Context from "../../context/context";

const Linescore = () => {
  const { liveData }: any = useContext(Context);
  const { away, home } = liveData.linescore.teams;

  return (
    <section className="Game-linescore">
      <div className="Game-linescore-periods Game-linescore-header">
        <div className="Game-linescore-periods-period">&nbsp;</div>
        {liveData.linescore.periods.map(period => (
          <div
            key={period.ordinalNum}
            className="Game-linescore-periods-period Game-linescore-periods-period-title"
          >
            {period.ordinalNum}
          </div>
        ))}
        <div className="Game-linescore-periods-period Game-linescore-periods-period-title">
          T
        </div>
      </div>
      <div className="Game-linescore-periods">
        <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
          {away.team.abbreviation}
        </div>
        {liveData.linescore.periods.map(period => (
          <div key={period.startTime} className="Game-linescore-periods-period">
            {period.away.goals}
          </div>
        ))}
        <div className="Game-linescore-periods-period">{away.goals}</div>
      </div>
      <div className="Game-linescore-periods">
        <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
          {home.team.abbreviation}
        </div>
        {liveData.linescore.periods.map(period => (
          <div key={period.startTime} className="Game-linescore-periods-period">
            {period.home.goals}
          </div>
        ))}
        <div className="Game-linescore-periods-period">{home.goals}</div>
      </div>
    </section>
  );
};

export default Linescore;
