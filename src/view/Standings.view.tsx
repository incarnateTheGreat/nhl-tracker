import React, { useCallback, useEffect, useState } from "react";
import { getStandingsData } from "../services/api";
import Logo from "../components/Logo/Logo.component";
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
  SOW: "SOW",
};

const Standings = () => {
  const [central, setCentral] = useState<object>();
  const [western, setWestern] = useState<object>();
  const [eastern, setEastern] = useState<object>();
  const [northern, setNorthern] = useState<object>();
  const [sortDirection, setSortDirection] = useState("ASC");

  const assembleRecord = useCallback((teamData) => {
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
        streak = {},
      } = acc;
      const { name } = team;
      const { wins, losses, ot } = leagueRecord;
      const { streakCode } = streak;

      const res = {
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
          records.overallRecords.find((record) => record.type === "lastTen")
        ),
        SOW: assembleSOWRecord(
          records.overallRecords.find((record) => record.type === "shootOuts")
        ),
      };

      r.push(res);

      return r;
    }, []);
  }, []);

  const calcGoalsDiff = (goalsScored, goalsAgainst) => {
    const goalsDiff = goalsScored - goalsAgainst;

    return goalsDiff > 0
      ? `+${goalsDiff.toString()}`
      : `${goalsDiff.toString()}`;
  };

  const assembleL10Record = (lastTen) => {
    const { wins, losses, ot } = lastTen;

    return `${wins}-${losses}-${ot}`;
  };

  const assembleSOWRecord = (lastTen) => {
    const { wins, losses } = lastTen;

    return `${wins}-${losses}`;
  };

  const assembleStandingsView = (divisionData, divisionName) => {
    return (
      <>
        <thead>
          <tr>
            {Object.keys(tableKey).map((title, key) => (
              <th
                key={key}
                onClick={() => sortTable(divisionData, title, divisionName)}
              >
                {title === "name" ? divisionName : tableKey[title]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="standings-conference-division-body">
          {divisionData.map((team, key) => {
            return <tr key={key}>{assembleTeamRow(team)}</tr>;
          })}
        </tbody>
      </>
    );
  };

  const assembleTeamRow = (division) => {
    return Object.keys(division).map((prop, key) => {
      return (
        <td key={key}>
          {key === 0 ? (
            <>
              {" "}
              <Logo teamName={division["name"]} /> {division["name"]}{" "}
            </>
          ) : (
            <>{division[prop]}</>
          )}
        </td>
      );
    });
  };

  useEffect(() => {
    const standingsCall = async () => {
      // Get the Standings data.
      const standings = await getStandingsData();

      // Eastern Division
      const eastern: IStandings =
        standings.records.find((table) => table.division.id === 25)
          .teamRecords ?? [];

      // Central Division
      const central: IStandings =
        standings.records.find((table) => table.division.id === 26)
          .teamRecords ?? [];

      // Western Division
      const western: IStandings =
        standings.records.find((table) => table.division.id === 27)
          .teamRecords ?? [];

      // Northern (Canadian) Division
      const northern: IStandings =
        standings.records.find((table) => table.division.id === 28)
          .teamRecords ?? [];

      // Sort the Tables by Points.
      setCentral(sortTable(assembleRecord(central), "points", "central"));
      setEastern(sortTable(assembleRecord(eastern), "points", "eastern"));
      setWestern(sortTable(assembleRecord(western), "points", "western"));
      setNorthern(sortTable(assembleRecord(northern), "points", "northern"));
    };

    standingsCall();
  }, [assembleRecord]);

  const sortTable = useCallback(
    (tableData: IStandings[], column, divisionName) => {
      const direction = sortDirection === "ASC" ? "DESC" : "ASC";

      const table = tableData.sort((a, b) => {
        // Sort content alphabetically.
        if (column === "name") {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (direction === "ASC") {
            return nameA.localeCompare(nameB);
          }

          return nameB.localeCompare(nameA);
        } else {
          if (direction === "ASC") {
            return a[column] - b[column];
          }

          return b[column] - a[column];
        }
      });

      switch (divisionName) {
        case "eastern":
          setEastern(table);
          break;
        case "western":
          setWestern(table);
          break;
        case "central":
          setCentral(table);
          break;
        case "northern":
          setNorthern(table);
          break;
        default:
      }

      setSortDirection(direction);

      return table;
    },
    [sortDirection]
  );

  return (
    <article className="standings">
      {central && eastern && western && northern && (
        <section className="standings-conference">
          <table className="standings-conference-division">
            {assembleStandingsView(northern, "northern")}
          </table>
          <table className="standings-conference-division">
            {assembleStandingsView(central, "central")}
          </table>
          <table className="standings-conference-division">
            {assembleStandingsView(eastern, "eastern")}
          </table>
          <table className="standings-conference-division">
            {assembleStandingsView(western, "western")}
          </table>
        </section>
      )}
    </article>
  );
};

export default Standings;
