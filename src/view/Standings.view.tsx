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
      records,
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
      goalsDiff: calcGoalsDiff(goalsScored, goalsAgainst),
      streakCode,
      L10: assembleL10Record(
        records.overallRecords.find(record => record.type === "lastTen")
      ),
      SOW: assembleSOWRecord(
        records.overallRecords.find(record => record.type === "shootOuts")
      )
    };

    return r;
  }, {});
};

const calcGoalsDiff = (goalsScored, goalsAgainst) => {
  const goalsDiff = goalsScored - goalsAgainst;

  return goalsDiff > 0 ? `+${goalsDiff.toString()}` : `${goalsDiff.toString()}`;
};

const assembleL10Record = lastTen => {
  const { wins, losses, ot } = lastTen;

  return `${wins}-${losses}-${ot}`;
};

const assembleSOWRecord = lastTen => {
  const { wins, losses } = lastTen;

  return `${wins}-${losses}`;
};

const assembleStandingsView = (conference, division) => {
  return (
    <>
      <thead>
        {Object.keys(tableKey).map((title, key) => (
          <th key={key}>{title === "name" ? division : tableKey[title]}</th>
        ))}
      </thead>
      <tbody className="standings-conference-division-body">
        {conference[division].map(team => {
          return <tr>{assembleTeamRow(team)}</tr>;
        })}
      </tbody>
    </>
  );
};

const assembleTeamRow = team => {
  return Object.values(team).map((data: any, key) => {
    return <td key={key}>{data}</td>;
  });
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
        <>
          <section className="standings-conference">
            <h3>Eastern Conference</h3>
            {Object.keys(easternConference).map(division => {
              return (
                <table className="standings-conference-division">
                  {assembleStandingsView(easternConference, division)}
                </table>
              );
            })}
          </section>
          <section className="standings-conference">
            <h3>Western Conference</h3>
            {Object.keys(westernConference).map(division => {
              return (
                <table className="standings-conference-division">
                  {assembleStandingsView(westernConference, division)}
                </table>
              );
            })}
          </section>
        </>
      )}
    </article>
  );
};

export default Standings;
