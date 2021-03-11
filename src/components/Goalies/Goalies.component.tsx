import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context/context";
import { handleNavClick } from "../../utils/utils";

const Goalies = () => {
  const history = useHistory();
  const { liveData } = useContext(Context);

  const winner = liveData.decisions.winner;
  const loser = liveData.decisions.loser;

  return (
    <section className="game-summary-goalies">
      <h3>Goalies</h3>
      <div>
        W: &nbsp;
        <span
          className="link"
          onClick={handleNavClick(`/player/${winner.id}`, history)}
          title={winner.fullName}
        >
          {winner.fullName}
        </span>
      </div>
      <div>
        L: &nbsp;
        <span
          className="link"
          onClick={handleNavClick(`/player/${loser.id}`, history)}
          title={loser.fullName}
        >
          {loser.fullName}
        </span>
      </div>
    </section>
  );
};

export default Goalies;
