import React, { useContext } from "react";
import Context from "../../context/context";

const Scoring = () => {
  const { goalsObjData }: any = useContext(Context);

  return (
    <section className="Game-summary-scoring">
      <h3>Scoring</h3>
      {Object.keys(goalsObjData).map(period => {
        return (
          <div className="Game-summary-scoring-period" key={period}>
            <div>{period}</div>
            {goalsObjData[period].map((goal, index) => (
              <div className="Game-summary-scoring-period-data" key={index}>
                <div className="Game-summary-scoring-player-row">
                  <ul className="Game-summary-scoring-player-row-players">
                    {goal.players.map(playerObj => {
                      const { player, playerType, seasonTotal } = playerObj;
                      const { fullName, id, link } = player;

                      if (playerType !== "Goalie" && playerType === "Scorer") {
                        return (
                          <li
                            className="Game-summary-scoring-player-row-players-scorer"
                            key={id}
                            role="link"
                          >
                            {goal.about.periodTime} {goal.team.triCode}{" "}
                            {fullName} ({seasonTotal}){" "}
                            {goal.result.strength.code === "PPG" &&
                              `(Power Play)`}
                          </li>
                        );
                      } else if (
                        playerType !== "Goalie" &&
                        playerType === "Assist"
                      ) {
                        return (
                          <li
                            className="Game-summary-scoring-player-row-players-assist"
                            key={id}
                          >
                            {fullName}
                          </li>
                        );
                      }
                    })}
                  </ul>
                  <div className="Game-summary-scoring-player-row-goalStatus">
                    {Object.keys(goal.about.goals).map(team => {
                      return (
                        <span
                          key={team}
                          className="Game-summary-scoring-player-row-goalStatus-teams"
                        >
                          {goal.about.goals[team]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default Scoring;
