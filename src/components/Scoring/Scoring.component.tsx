import React, { useContext } from "react";
import Logo from "../Logo/Logo.component";
import Context from "../../context/context";

const Scoring = () => {
  const { goalsObjData }: any = useContext(Context);

  return (
    <section className="Game-summary-scoring">
      <h3>Scoring</h3>
      {Object.keys(goalsObjData).map(period => {
        return (
          <div className="Game-summary-scoring-period" key={period}>
            <h4>{period}</h4>
            {goalsObjData[period].map((goal, index) => (
              <div className="Game-summary-scoring-period-data" key={index}>
                <div className="Game-summary-scoring-player-row">
                  <ul className="Game-summary-scoring-player-row-players">
                    <li className="Game-summary-scoring-player-row-players-time">
                      {goal.about.periodTime}
                    </li>
                    <li>
                      <Logo teamName={goal.team.name} />
                    </li>
                    <li className="Game-summary-scoring-player-row-players-data">
                      {goal.players.map(playerObj => {
                        const { player, playerType, seasonTotal } = playerObj;
                        const { fullName, id } = player;

                        if (
                          playerType !== "Goalie" &&
                          playerType === "Scorer"
                        ) {
                          return (
                            <a
                              href={`/player/${id}`}
                              className="Game-summary-scoring-player-row-players-data-scorer"
                              key={id}
                            >
                              {fullName} ({seasonTotal}){" "}
                              {goal.result.strength.code === "PPG" &&
                                `(Power Play)`}
                            </a>
                          );
                        } else if (
                          playerType !== "Goalie" &&
                          playerType === "Assist"
                        ) {
                          return (
                            <span
                              className="Game-summary-scoring-player-row-players-data-assist"
                              key={id}
                            >
                              {fullName}
                            </span>
                          );
                        }

                        return "N/A";
                      })}
                    </li>
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
