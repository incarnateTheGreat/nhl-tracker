import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/context";
import ScoreHeader from "../components/ScoreHeader/ScoreHeader.component";
import Linescore from "../components/Linescore/Linescore.component";
import Scoring from "../components/Scoring/Scoring.component";
import Penalties from "../components/Penalties/Penalties.component";
import Statistics from "../components/Statistics/Statistics.component";
import Tabs from "../components/Tabs/tabs.component";
import {
  getGameData,
  getGameContent,
  getHeadtoHeadTeamData,
} from "../services/api";
import {
  IGame,
  IAllPlays,
  IGameData,
  IGameContent,
} from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const [headToHeadData, setHeadtoHeadData] = useState<IGameData>();
  const [contentData, setContentData] = useState<IGameContent>();
  const [goalsObjData, setGoalsObjData] = useState<Array<object>>([]);
  const [penaltiesObjData, setPenaltiesObjData] = useState<Array<object>>([]);
  const { gameData, liveData } = data || ({} as IGame);
  const [tabData, setTabData] = useState<object[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const getScoringPlays = useCallback(() => {
    let scoringPlays: Array<IAllPlays> = [];

    if (liveData) {
      scoringPlays = liveData.plays.allPlays.filter((play, index) =>
        liveData.plays.scoringPlays.includes(index)
      );
    }

    // Sort Goals by Periods.
    const goalsObj: Array<object> = scoringPlays.reduce((acc, curr) => {
      if (Array.isArray(acc[curr.about.ordinalNum])) {
        acc[curr.about.ordinalNum].push(curr);
      } else {
        acc[curr.about.ordinalNum] = [];
        acc[curr.about.ordinalNum].push(curr);
      }

      return acc;
    }, []);

    setGoalsObjData(goalsObj);
  }, [liveData]);

  const getPenaltiesPlays = useCallback(() => {
    let penaltyPlays: Array<IAllPlays> = [];

    if (liveData) {
      penaltyPlays = liveData.plays.allPlays.filter((play, index) => {
        return liveData.plays.penaltyPlays.includes(index);
      });
    }

    // Sort Penalties by Periods.
    const penaltiesObj: Array<object> = penaltyPlays.reduce((acc, curr, i) => {
      // If the Period object exists, append to it. Otherwise, create it.
      if (Array.isArray(acc[curr.about.ordinalNum])) {
        acc[curr.about.ordinalNum].push(curr);
      } else {
        acc[curr.about.ordinalNum] = [];
        acc[curr.about.ordinalNum].push(curr);
      }

      return acc;
    }, []);

    setPenaltiesObjData(penaltiesObj);
  }, [liveData]);

  const LoadingSkeleton = () => {
    const SkeletonCard = () => (
      <svg className="scorecard scorecard--skeleton">
        {Array(15)
          .fill(1)
          .map((elem, i) => (
            <rect
              key={i}
              className="rp1"
              x="0"
              y={10 * i}
              rx="3"
              ry="3"
              width="100%"
              height="100"
            />
          ))}
      </svg>
    );

    return (
      <section className="scorecards">
        <div className="scorecards-container">
          <SkeletonCard />
        </div>
      </section>
    );
  };

  useEffect(() => {
    const collecGameData = async () => {
      const gameDataRes = await getGameData(gamePk);
      const contentDataRes = await getGameContent(gamePk);
      const headToHead = await getHeadtoHeadTeamData(
        gameDataRes.gameData.teams.home.id,
        gameDataRes.gameData.teams.away.id
      );

      setData(gameDataRes);
      setHeadtoHeadData(headToHead);
      setContentData(contentDataRes);
    };

    if (!gameData) {
      collecGameData();
    }

    if (gameData && gameData.status.codedGameState !== "7") {
      const interval = setInterval(() => {
        collecGameData();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [gameData, gamePk, data]);

  useEffect(() => {
    getScoringPlays();
    getPenaltiesPlays();

    setTabData([
      {
        label: "Scoring",
        component: <Scoring />,
      },
      {
        label: "Penalties",
        component: <Penalties />,
      },
      {
        label: "Statistics",
        component: <Statistics />,
      },
    ]);
  }, [getPenaltiesPlays, getScoringPlays, liveData]);

  return (
    <Context.Provider
      value={{
        gameData,
        liveData,
        contentData,
        goalsObjData,
        penaltiesObjData,
        headToHeadData,
      }}
    >
      <article className="game main-container">
        {gameData && liveData ? (
          <>
            <ScoreHeader />
            <Linescore />

            {gameData.status.codedGameState !== "1" && (
              <section className="game-summary">
                <Tabs
                  callback={(activeTabCallback) =>
                    setActiveTab(activeTabCallback)
                  }
                  activeTab={activeTab}
                  className="grid-container-airport-flights-container"
                  tabData={tabData}
                />
              </section>
            )}
          </>
        ) : (
          <LoadingSkeleton />
        )}
      </article>
    </Context.Provider>
  );
};

export default Game;
