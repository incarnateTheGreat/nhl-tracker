import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/context";
import ScoreHeader from "../components/ScoreHeader/ScoreHeader.component";
import Linescore from "../components/Linescore/Linescore.component";
import Goalies from "../components/Goalies/Goalies.component";
import Scoring from "../components/Scoring/Scoring.component";
import Penalties from "../components/Penalties/Penalties.component";
import GameStatistics from "../components/Statistics/TeamStatistics.component";
import PlayerStatistics from "../components/Statistics/PlayerStatistics.component";
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
import { isGameOver } from "../utils/utils";

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

  // TODO: Use this to listen for goals. Select a game to follow, then observe the latest event in the game.
  // If it's a goal, then fire the Desktop Notification.

  // document.addEventListener("DOMContentLoaded", function () {
  //   if (!Notification) {
  //     alert("Desktop notifications not available in your browser. Try Chromium.");
  //     return;
  //   }

  //   if (Notification.permission !== "granted") Notification.requestPermission();

  //   const notification = new Notification("Notification title", {
  //     icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
  //     body: "Hey there! You've been notified!",
  //   });
  // });

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

    if (liveData) {
      //   console.log(liveData.plays.allPlays);

      const currentPlay = liveData.plays.currentPlay;

      //   const currentPlay = {
      //     players: [
      //       {
      //         player: {
      //           id: 8477498,
      //           fullName: "Darnell Nurse",
      //           link: "/api/v1/people/8477498",
      //         },
      //         playerType: "Scorer",
      //         seasonTotal: 12,
      //       },
      //       {
      //         player: {
      //           id: 8478402,
      //           fullName: "Connor McDavid",
      //           link: "/api/v1/people/8478402",
      //         },
      //         playerType: "Assist",
      //         seasonTotal: 42,
      //       },
      //       {
      //         player: {
      //           id: 8477934,
      //           fullName: "Leon Draisaitl",
      //           link: "/api/v1/people/8477934",
      //         },
      //         playerType: "Assist",
      //         seasonTotal: 35,
      //       },
      //       {
      //         player: {
      //           id: 8474636,
      //           fullName: "Michael Hutchinson",
      //           link: "/api/v1/people/8474636",
      //         },
      //         playerType: "Goalie",
      //       },
      //     ],
      //     result: {
      //       event: "Goal",
      //       eventCode: "TOR674",
      //       eventTypeId: "GOAL",
      //       description:
      //         "Darnell Nurse (12) Wrist Shot, assists: Connor McDavid (42), Leon Draisaitl (35)",
      //       secondaryType: "Wrist Shot",
      //       strength: {
      //         code: "EVEN",
      //         name: "Even",
      //       },
      //       gameWinningGoal: true,
      //       emptyNet: false,
      //     },
      //     about: {
      //       eventIdx: 312,
      //       eventId: 674,
      //       period: 4,
      //       periodType: "OVERTIME",
      //       ordinalNum: "OT",
      //       periodTime: "00:17",
      //       periodTimeRemaining: "04:43",
      //       dateTime: "2021-03-30T01:30:18Z",
      //       goals: {
      //         away: 3,
      //         home: 2,
      //       },
      //     },
      //     coordinates: {
      //       x: -71,
      //       y: -17,
      //     },
      //     team: {
      //       id: 22,
      //       name: "Edmonton Oilers",
      //       link: "/api/v1/teams/22",
      //       triCode: "EDM",
      //     },
      //   };

      if (currentPlay.result.event === "Goal") {
        new Notification(
          `GOAL! ${currentPlay.about.goals.away}-${currentPlay.about.goals.home} @ ${currentPlay.about.periodTimeRemaining} ${currentPlay.about.ordinalNum}`,
          {
            icon: "../assets/images/toronto-maple-leafs-logo.svg",
            body: `${currentPlay.team.triCode}: ${currentPlay.result.description}`,
          }
        );
      }
      // else {
      // }
    }

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
        label: "Team Statistics",
        component: <GameStatistics />,
      },
      {
        label: "Player Statistics",
        component: <PlayerStatistics />,
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
                {isGameOver(liveData) && <Goalies />}

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
