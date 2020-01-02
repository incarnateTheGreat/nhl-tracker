import React, { useEffect, useState } from "react";
import { getStandingsData } from "../services/api";
import { IStandings } from "../intefaces/Standings.interface";

const tableKey = {
  name: "",
  gamesPlayed: "GP",
  wins: "W",
  losses: "L",
  ot: "OTL",
  points: "PTS",
  regulationWins: "ROW",
  goalsScored: "GF",
  goalsAgainst: "GA",
  goalsDiff: "DIFF",
  streakCode: "STRK",
  L10: "L10",
  SOW: "SOW"
};

const assembleRecord = teamData => {
  return teamData.reduce((r, acc) => {
    const {
      team,
      gamesPlayed,
      leagueRecord,
      points,
      regulationWins,
      goalsScored,
      goalsAgainst,
      streak
    } = acc;
    const { name } = team;
    const { wins, losses, ot } = leagueRecord;
    const { streakCode } = streak;

    r[acc.team.id] = {
      name,
      gamesPlayed,
      wins,
      losses,
      ot,
      points,
      regulationWins,
      goalsScored,
      goalsAgainst,
      goalsDiff: 0, // a function that assembles the Goal Diff with plus or minus
      streakCode,
      L10: "1-1-1", // a function that assembles the Last Ten record
      SOW: "1-1-1" // a function that assembles the Shootout record
    };

    return r;
  }, {});
};

const sortTable = tableData => {
  const table = Object.values(tableData).sort(
    (a: any, b: any) => b.points - a.points
  );

  return table;
};

const Standings = () => {
  const [easternConference, setEasternConference] = useState<IStandings>();
  const [westernConference, setWesternConference] = useState<IStandings>();

  useEffect(() => {
    async function standingsCall() {
      // Get the Standings data.
      const standings = await getStandingsData();

      // Filter out and Reduce the Eastern and Western Conference Standings based on the keys.
      const eastern: IStandings = standings.records
        .filter(table => table.conference.name === "Eastern")
        .reduce((r, acc) => {
          r[acc.division.name] = assembleRecord(acc.teamRecords);

          return r;
        }, []);

      const western = standings.records
        .filter(table => table.conference.name === "Western")
        .reduce((r, acc) => {
          r[acc.division.name] = assembleRecord(acc.teamRecords);

          return r;
        }, []);

      // Sort the Tables by Points.
      for (const division in western) {
        western[division] = sortTable(western[division]);
      }

      for (const division in eastern) {
        eastern[division] = sortTable(eastern[division]);
      }

      setEasternConference(eastern);
      setWesternConference(western);
    }

    standingsCall();
  }, []);

  console.log(easternConference);
  console.log(westernConference);

  return (
    <article className="standings">
      {easternConference && westernConference && (
        <section className="standings-conference">
          <h3>Eastern Conference</h3>
          <div className="standings-conference-division">
            <div className="standings-conference-division-header">
              {Object.keys(tableKey).map((title, key) => (
                <div
                  className="standings-conference-division-header-title"
                  key={key}
                >
                  {tableKey[title]}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default Standings;
