import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";
import { useParams } from "react-router-dom";
import { getNextFewGamesData, getPlayerData } from "../services/api";
import { IPlayer } from "../intefaces/Player.interface";

const Player = () => {
  const dateFormat = "yyyy-MM-dd";
  const { playerID } = useParams();
  const [data, setData] = useState<IPlayer>();
  const [nextGamesData, setNextGamesData] = useState();

  useEffect(() => {
    async function collectPlayerData() {
      // Get Player Data.
      const playerData = await getPlayerData(playerID);

      // Get Next Few Games Data.
      const startDate = format(new Date(), dateFormat);
      const endDate = format(add(new Date(), { days: 20 }), dateFormat);
      const nextGames = await getNextFewGamesData(
        startDate,
        endDate,
        playerData.people[0].currentTeam.id
      );

      setData(playerData.people[0]);
      setNextGamesData(nextGames.dates);
    }

    collectPlayerData();
  }, []);

  if (data) {
    console.log(nextGamesData);

    const {
      id,
      fullName,
      firstName,
      lastName,
      primaryNumber,
      // birthDate,
      // currentAge,
      // birthCity,
      // birthStateProvince,
      // birthCountry,
      height,
      weight,
      primaryPosition,
      currentTeam,
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
          shots,
          games,
          hits,
          powerPlayGoals,
          penaltyMinutes,
          faceOffPct,
          shotPct,
          gameWinningGoals,
          overTimeGoals,
          shortHandedGoals,
          plusMinus,
          points
        } = res.splits[res.splits.length - 1].stat;

        return (
          <table className="player-stats-table">
            <thead>
              <tr>
                <th title="Games Played">GP</th>
                <th title="Goals">G</th>
                <th title="Assists">A</th>
                <th title="Points">PTS</th>
                <th title="Plus Minus">+/-</th>
                <th title="Penalty Minutes">PIM</th>
                <th title="Shots on Goal">SOG</th>
                <th title="Shot Percentage">%</th>
                <th title="Power Play Goals">PPG</th>
                <th title="Short-handed Goals">SHG</th>
                <th title="Game-winning Goals">GWG</th>
                <th title="Face-off Percentage">FO%</th>
                <th title="Overtime Goals">OTG</th>
                <th title="Time on Ice per Game">TOI/G</th>
                <th title="Hits">HIT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{games}</td>
                <td>{goals}</td>
                <td>{assists}</td>
                <td>{points}</td>
                <td>{plusMinus}</td>
                <td>{penaltyMinutes}</td>
                <td>{shots}</td>
                <td>{shotPct}</td>
                <td>{powerPlayGoals}</td>
                <td>{shortHandedGoals}</td>
                <td>{gameWinningGoals}</td>
                <td>{faceOffPct}</td>
                <td>{overTimeGoals}</td>
                <td>{timeOnIce}</td>
                <td>{hits}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    };

    return (
      data && (
        <section className="player">
          <div className="player-header">
            <div className="player-header-image">
              <img
                src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
                alt={fullName}
              />
            </div>
            <div className="player-header-details">
              <h2>
                {firstName} {lastName} | {primaryPosition.abbreviation}
              </h2>
              <div className="player-header-details-detail">
                <span className="player-header-details-detail-value">
                  {height} {weight} lbs.
                </span>
              </div>
              <div className="player-header-details-detail">
                <span className="player-header-details-detail-value">
                  {currentTeam.name}
                </span>
              </div>
              <div className="player-header-details-detail">
                <span className="player-header-details-detail-value">
                  #{primaryNumber}
                </span>
              </div>
              <div className="player-header-details-detail"></div>
              <div className="player-header-details-detail"></div>
            </div>
          </div>
          <div className="player-stats">
            <h3>Current Stats: 2019-2020</h3>
            {getCurrentYearStats()}
          </div>
        </section>
      )
    );
  }

  return <div>nodata.</div>;
};

export default Player;
