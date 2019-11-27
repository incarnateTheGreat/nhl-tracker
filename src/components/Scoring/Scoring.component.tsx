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
            {goalsObjData[period].map(goal => (
              <div
                className="Game-summary-scoring-period-data"
                key={goal.about.eventIdx}
              >
                {goal.players.map(playerObj => {
                  const { player, playerType, seasonTotal } = playerObj;
                  const { fullName, id, link } = player;

                  if (playerType !== "Goalie") {
                    return (
                      <span
                        key={id}
                        className={`Game-summary-scoring-player ${
                          playerType === "Scorer"
                            ? "Game-summary-scoring-player-scorer"
                            : "Game-summary-scoring-player-assist"
                        }`}
                      >
                        {playerType === "Scorer"
                          ? `(${goal.about.periodTime})`
                          : ""}
                        {playerType === "Scorer"
                          ? ` (${goal.team.triCode}) `
                          : ""}
                        {fullName}
                      </span>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default Scoring;
