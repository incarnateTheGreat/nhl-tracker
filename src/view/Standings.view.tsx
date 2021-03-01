import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getStandingsData } from "../services/api";
import Logo from "../components/Logo/Logo.component";
import { IStandings } from "../intefaces/Standings.interface";
import { handleNavClick } from "../utils/utils";

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
  const history = useHistory();

  const [divisions, setDivisions] = useState<object>({
    central: null,
    western: null,
    eastern: null,
    northern: null,
  });

  const [divisionSortColumns, setDivisionSortColumns] = useState<object>({
    central: { sortColumn: "points", sortDirection: "ASC" },
    western: { sortColumn: "points", sortDirection: "ASC" },
    eastern: { sortColumn: "points", sortDirection: "ASC" },
    northern: { sortColumn: "points", sortDirection: "ASC" },
  });

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
      const { name, id } = team;
      const { wins, losses, ot } = leagueRecord;
      const { streakCode } = streak;

      const res = {
        name,
        id,
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
            return (
              <tr key={key}>
                {assembleTeamRow(
                  team,
                  divisionSortColumns[divisionName].sortColumn
                )}
              </tr>
            );
          })}
        </tbody>
      </>
    );
  };

  const assembleTeamRow = (team, columnToIndicate) => {
    return Object.keys(team).map((prop, key) => {
      if (prop === "id") return;

      return (
        <td
          key={key}
          className={`${
            prop === columnToIndicate
              ? "standings-conference-division-body-selected"
              : ""
          }`}
        >
          {key === 0 && (
            <>
              {" "}
              <Logo size="small" teamName={team["name"]} />{" "}
              <span
                className="link"
                onClick={handleNavClick(`/team/${team["id"]}`, history)}
                title={team["name"]}
              >
                {team["name"]}
              </span>
            </>
          )}

          {key !== 0 && prop !== "id" && <>{team[prop]}</>}
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
      setDivisions({
        central: sortTable(
          assembleRecord(central),
          divisionSortColumns["central"].sortColumn,
          "central"
        ),
        eastern: sortTable(
          assembleRecord(eastern),
          divisionSortColumns["eastern"].sortColumn,
          "eastern"
        ),
        western: sortTable(
          assembleRecord(western),
          divisionSortColumns["western"].sortColumn,
          "western"
        ),
        northern: sortTable(
          assembleRecord(northern),
          divisionSortColumns["northern"].sortColumn,
          "northern"
        ),
      });
    };

    standingsCall();
  }, [assembleRecord]);

  const sortTable = useCallback(
    (tableData: IStandings[], sortColumn, divisionName) => {
      const sortDirection =
        divisionSortColumns[divisionName].sortDirection === "ASC"
          ? "DESC"
          : "ASC";

      const table = tableData.sort((a, b) => {
        // Sort content alphabetically.
        if (sortColumn === "name") {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (sortDirection === "ASC") {
            return nameA.localeCompare(nameB);
          }

          return nameB.localeCompare(nameA);
        } else {
          if (sortDirection === "ASC") {
            return a[sortColumn] - b[sortColumn];
          }

          return b[sortColumn] - a[sortColumn];
        }
      });

      setDivisions({
        ...divisions,
        [divisionName]: table,
      });

      setDivisionSortColumns({
        ...divisionSortColumns,
        [divisionName]: {
          sortColumn,
          sortDirection,
        },
      });

      return table;
    },
    [divisionSortColumns, divisions]
  );

  return (
    <article className="standings main-container">
      {divisions["central"] &&
        divisions["eastern"] &&
        divisions["western"] &&
        divisions["northern"] && (
          <section className="standings-conference">
            <table className="standings-conference-division">
              {assembleStandingsView(divisions["northern"], "northern")}
            </table>
            <table className="standings-conference-division">
              {assembleStandingsView(divisions["central"], "central")}
            </table>
            <table className="standings-conference-division">
              {assembleStandingsView(divisions["eastern"], "eastern")}
            </table>
            <table className="standings-conference-division">
              {assembleStandingsView(divisions["western"], "western")}
            </table>
          </section>
        )}
    </article>
  );
};

export default Standings;
