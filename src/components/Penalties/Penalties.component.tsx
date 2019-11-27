import React, { useContext } from "react";
import Context from "../../context/context";

const Scoring = () => {
  const { penaltiesObjData }: any = useContext(Context);

  console.log(penaltiesObjData);

  return (
    <section className="Game-summary-penalties">
      <h3>Penalties</h3>
      {Object.keys(penaltiesObjData).map(period => {
        return (
          <div className="Game-summary-scoring-period" key={period}>
            <div>{period}</div>
            {penaltiesObjData[period].map(penalty => (
              <div
                className="Game-summary-scoring-period-data"
                key={penalty.about.eventIdx}
              >
                ({penalty.about.periodTime}){" "}
                {penalty.players[0].player.fullName}{" "}
                {penalty.result.penaltyMinutes} minutes for{" "}
                {penalty.result.secondaryType}
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default Scoring;
