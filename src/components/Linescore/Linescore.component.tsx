import React, { useContext } from "react";
import Context from "../../context/context";

const Linescore = () => {
  const { liveData }: any = useContext(Context);

  return (
    <section className="Game-linescore">
      <div className="Game-linescore-periods Game-linescore-header">
        <div className="Game-linescore-periods-period">&nbsp;</div>
        {liveData.linescore.periods.map(period => (
          <div
            key={period.ordinalNum}
            className="Game-linescore-periods-period"
          >
            {period.ordinalNum}
          </div>
        ))}
        <div className="Game-linescore-periods-period">T</div>
      </div>
      <div className="Game-linescore-periods">
        <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
          {liveData.linescore.teams.away.team.abbreviation}
        </div>
        {liveData.linescore.periods.map(period => (
          <div key={period.startTime} className="Game-linescore-periods-period">
            {period.away.goals}
          </div>
        ))}
        <div className="Game-linescore-periods-period">
          {liveData.linescore.teams.away.goals}
        </div>
      </div>
      <div className="Game-linescore-periods">
        <div className="Game-linescore-periods-period Game-linescore-periods-period-team">
          {liveData.linescore.teams.home.team.abbreviation}
        </div>
        {liveData.linescore.periods.map(period => (
          <div key={period.startTime} className="Game-linescore-periods-period">
            {period.home.goals}
          </div>
        ))}
        <div className="Game-linescore-periods-period">
          {liveData.linescore.teams.home.goals}
        </div>
      </div>
    </section>
  );
};

export default Linescore;
