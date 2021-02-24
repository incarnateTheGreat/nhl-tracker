import React, { useContext } from "react";
import Context from "../../context/context";

interface IStatObject {
  awayValue: number;
  awayPercentage: number;
  homeValue: number;
  homePercentage: number;
  label: string;
}

const Statistics = () => {
  const { liveData } = useContext(Context);
  const { away, home } = liveData.boxscore.teams;

  const statTitleIndex = {
    blocked: "Blocked",
    faceOffWinPercentage: "Faceoffs (%)",
    giveaways: "Giveaways",
    hits: "Hits",
    pim: "Penalty Minutes",
    powerPlayOpportunities: "PP Opportunities",
    powerPlayPercentage: "PP (%)",
    shots: "Shots",
    takeaways: "Takeaways",
  };

  // Parse the input and fix to two percentage points.
  const parsePercentage = (val, sum) => {
    val = parseFloat(val);

    let res = (val / sum) * 100;

    if (res > 98) {
      res = 98;
    } else if (res < 2) {
      res = 2;
    }

    return res;
  };

  // Create reference objects for easier access and reading.
  const refAwayObj = away.teamStats.teamSkaterStats;
  const refHomeObj = home.teamStats.teamSkaterStats;

  // Create a statistics object
  const statsObj = Object.keys(refAwayObj).reduce(
    (r: IStatObject[], statName) => {
      if (statTitleIndex[statName]) {
        const sum =
          parseFloat(refAwayObj[statName]) + parseFloat(refHomeObj[statName]);

        r.push({
          awayPercentage:
            refAwayObj[statName] % 1 === 0
              ? Number(parsePercentage(refAwayObj[statName], sum))
              : refAwayObj[statName],
          awayValue: +refAwayObj[statName],
          homePercentage:
            refHomeObj[statName] % 1 === 0
              ? Number(parsePercentage(refHomeObj[statName], sum))
              : refHomeObj[statName],
          homeValue: +refHomeObj[statName],
          label: statTitleIndex[statName],
        });
      }

      return r;
    },
    []
  );

  return (
    <div className="game-summary-statistics">
      {statsObj.map((statObj: IStatObject, key) => (
        <div key={key} className="game-summary-statistics-bar">
          <div className="game-summary-statistics-bar-stat-name">
            <span>{statObj.awayValue}</span>
            <span className="game-summary-statistics-bar-stat-label">
              {statObj.label}
            </span>
            <span>{statObj.homeValue}</span>
          </div>
          <div className="game-summary-statistics-bar-stat-container">
            <div
              className="game-summary-statistics-bar-stat-info game-summary-statistics-bar-stat-info--away"
              style={{
                width: `calc(${statObj.awayPercentage}% - 10px)`,
              }}
            ></div>
            <div
              className="game-summary-statistics-bar-stat-info game-summary-statistics-bar-stat-info--home"
              style={{
                width: `calc(${statObj.homePercentage}% - 0%)`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
