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
      weight
    } = data;

    return (
      data && (
        <section className="player">
          <img
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={fullName}
          />
          <span>
            {firstName} {lastName}
          </span>
        </section>
      )
    );
  }

  return <div>nodata.</div>;
};

export default Player;
