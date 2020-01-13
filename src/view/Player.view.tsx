import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerData } from "../services/api";
import { IPlayer } from "../intefaces/Player.interface";

const Player = () => {
  const { playerID } = useParams();
  const [data, setData] = useState<IPlayer>();

  useEffect(() => {
    async function collectPlayerData() {
      const res = await getPlayerData(playerID);
      setData(res.people[0]);
    }

    collectPlayerData();
  }, []);

  if (data) {
    const {
      id,
      fullName,
      firstName,
      lastName,
      primaryNumber,
      birthDate,
      currentAge,
      birthCity,
      birthStateProvince,
      birthCountry,
      height,
      weight,
      primaryPosition,
      stats
    } = data;

    console.log(data);

    const getCurrentYearStats = () => {
      const res = stats.find(
        statType => statType.type.displayName === "yearByYear"
      );

      if (res) {
        const {
          timeOnIce,
          assists,
          goals,
          pim,
          shots,
          games,
          hits
        } = res.splits[res.splits.length - 1].stat;

        console.log(timeOnIce, assists, goals, pim, shots, games, hits);
      }
    };

    return (
      data && (
        <section className="player">
          <h2>
            {firstName} {lastName} | {primaryPosition.code}
          </h2>
          <img
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={fullName}
          />
          {getCurrentYearStats()}
        </section>
      )
    );
  }

  return <div>nodata.</div>;
};

export default Player;
