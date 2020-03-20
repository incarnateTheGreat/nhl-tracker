import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/context";
import ScoreHeader from "../components/ScoreHeader/ScoreHeader.component";
import Linescore from "../components/Linescore/Linescore.component";
import Scoring from "../components/Scoring/Scoring.component";
import Penalties from "../components/Penalties/Penalties.component";
import { getGameData } from "../services/api";
import { IGame, IAllPlays } from "../intefaces/Game.interface";

const Game = () => {
  const { gamePk } = useParams();
  const [data, setData] = useState<IGame>();
  const [goalsObjData, setGoalsObjData] = useState();
  const [penaltiesObjData, setPenaltiesObjData] = useState();
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
      setData(res);
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
      value={{ gameData, liveData, goalsObjData, penaltiesObjData }}
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
