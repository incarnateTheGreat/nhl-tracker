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
  }, [playerID, data]);

  if (data) {
    const {
      firstName,
      lastName,
      primaryNumber,
      birthDate,
      currentAge,
      birthCity,
      birthStateProvince,
      birthCountry,
      height,
      weight
    } = data;

    return (
      data && (
        <section className="player">
          {firstName} {lastName}
        </section>
      )
    );
  }

  return <div>nodata.</div>;
};

export default Player;
