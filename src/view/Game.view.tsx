import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/context";
import ScoreHeader from "../components/ScoreHeader/ScoreHeader.component";
import Linescore from "../components/Linescore/Linescore.component";
import Scoring from "../components/Scoring/Scoring.component";
import Penalties from "../components/Penalties/Penalties.component";
import { getGameData, getHeadtoHeadTeamData } from "../services/api";
import { IGame, IAllPlays } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const [headToHeadData, setHeadtoHeadData] = useState<IGame>();
  const [goalsObjData, setGoalsObjData] = useState<Array<object>>();
  const [penaltiesObjData, setPenaltiesObjData] = useState<Array<object>>();
  const { gameData, liveData } = data || {};

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

  useEffect(() => {
    const collecGameData = async () => {
      const res = await getGameData(gamePk);

      const headToHead = await getHeadtoHeadTeamData(
        res.gameData.teams.home.id,
        res.gameData.teams.away.id
      );

      setData(res);
      setHeadtoHeadData(headToHead);
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
  }, [getPenaltiesPlays, getScoringPlays, liveData]);

  return (
    <Context.Provider
      value={{
        gameData,
        liveData,
        goalsObjData,
        penaltiesObjData,
        headToHeadData,
      }}
    >
      <article className="Game">
        {gameData && liveData ? (
          <>
            <ScoreHeader />
            <Linescore />

            {gameData.status.codedGameState !== "1" && (
              <section className="Game-summary">
                <Scoring />
                <Penalties />
              </section>
            )}
          </>
        ) : (
          <div>No data.</div>
        )}
      </article>
    </Context.Provider>
  );
};

export default Game;
