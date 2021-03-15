import React, { useContext, useEffect, useState } from "react";
import Tabs from "../../components/Tabs/tabs.component";
import Context from "../../context/context";

const Linescore = () => {
  const { liveData } = useContext(Context);
  const { away, home } = liveData.linescore.teams;
  const { linescore } = liveData;
  const [tabData, setTabData] = useState<object[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const Contents = ({ dataType }) => {
    return (
      <div className="game-linescore-container">
        <div className="game-linescore-periods game-linescore-header">
          <div className="game-linescore-periods-period">&nbsp;</div>
          {linescore.periods.map((period) => (
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
          {linescore.periods.map((period, key) => (
            <div key={key} className="game-linescore-periods-period">
              {dataType === "scoring" && period.away.goals}
              {dataType === "shots" && period.away.shotsOnGoal}
            </div>
          ))}
          <div className="game-linescore-periods-period">
            {dataType === "scoring" && away.goals}
            {dataType === "shots" && away.shotsOnGoal}
          </div>
        </div>
        <div className="game-linescore-periods">
          <div className="game-linescore-periods-period game-linescore-periods-period-team">
            {home.team.abbreviation}
          </div>
          {linescore.periods.map((period, key) => (
            <div key={key} className="game-linescore-periods-period">
              {dataType === "scoring" && period.home.goals}
              {dataType === "shots" && period.home.shotsOnGoal}
            </div>
          ))}
          <div className="game-linescore-periods-period">
            {dataType === "scoring" && home.goals}
            {dataType === "shots" && home.shotsOnGoal}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setTabData([
      {
        label: "Scoring",
        component: <Contents dataType="scoring" />,
      },
      {
        label: "Shots",
        component: <Contents dataType="shots" />,
      },
    ]);
  }, []);

  return (
    <section className="game-linescore">
      <Tabs
        callback={(activeTabCallback) => setActiveTab(activeTabCallback)}
        activeTab={activeTab}
        className="game-linescore-tab-container"
        tabData={tabData}
      />
    </section>
  );
};

export default Linescore;
