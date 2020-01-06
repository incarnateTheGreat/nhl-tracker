import React, { useContext } from "react";
import Logo from "../Logo/Logo.component";
import Context from "../../context/context";

const Scoring = () => {
  const { penaltiesObjData }: any = useContext(Context);

  return (
    <section className="Game-summary-penalties">
      <h3>Penalties</h3>
      {Object.keys(penaltiesObjData).map(period => {
        return (
          <div className="Game-summary-penalties-period" key={period}>
            <h4>{period}</h4>
            {penaltiesObjData[period].map(penalty => (
              <ul
                className="Game-summary-penalties-period-data"
                key={penalty.about.eventIdx}
              >
                <li className="Game-summary-penalties-period-data-time">
                  {penalty.about.periodTime}{" "}
                </li>
                <li>
                  <Logo teamName={penalty.team.name} />
                </li>
                <li className="Game-summary-penalties-period-data-content">
                  <span role="link">{penalty.players[0].player.fullName}</span>
                  <span>
                    {penalty.result.penaltyMinutes} minutes for{" "}
                    {penalty.result.secondaryType}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default Scoring;
