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
  SOW: "SOW"
};

const Standings = () => {
  const [atlantic, setAtlantic] = useState<object>();
  const [metropolitian, setMetropolitan] = useState<object>();
  const [central, setCentral] = useState<object>();
  const [pacific, setPacific] = useState<object>();
  const [sortDirection, setSortDirection] = useState("ASC");

  const assembleRecord = useCallback(teamData => {
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
  }, []);

  const calcGoalsDiff = (goalsScored, goalsAgainst) => {
    const goalsDiff = goalsScored - goalsAgainst;

    return goalsDiff > 0
      ? `+${goalsDiff.toString()}`
      : `${goalsDiff.toString()}`;
  };

  const assembleL10Record = lastTen => {
    const { wins, losses, ot } = lastTen;

    return `${wins}-${losses}-${ot}`;
  };

  const assembleSOWRecord = lastTen => {
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

  const assembleTeamRow = team => {
    return Object.values(team).map((data: any, key) => {
      return (
        <td key={key}>
          {key === 0 ? (
            <>
              {" "}
              <Logo teamName={team.name} /> {data}{" "}
            </>
          ) : (
            data
          )}
        </td>
      );
    });
  };

  const sortTable = useCallback(
    (tableData: IStandings, column, divisionName) => {
      const direction = sortDirection === "ASC" ? "DESC" : "ASC";

      const table = Object.values(tableData).sort((a, b) => {
        if (direction === "ASC") {
          return a[column] - b[column];
        }
        return b[column] - a[column];
      });

      switch (divisionName) {
        case "atlantic":
          setAtlantic(table);
          break;
        case "metropolitan":
          setMetropolitan(table);
          break;
        case "central":
          setCentral(table);
          break;
        case "pacific":
          setPacific(table);
          break;
        default:
      }

      setSortDirection(direction);

      return table;
    },
    [sortDirection]
  );

  useEffect(() => {
    const standingsCall = async () => {
      // Get the Standings data.
      const standings = await getStandingsData();

      // Filter out and Reduce the Eastern and Western Conference Standings based on the keys.
      const eastern: IStandings = standings.records
        .filter(table => table.conference.name === "Eastern")
        .reduce((r, acc) => {
          r[acc.division.name] = assembleRecord(acc.teamRecords);

          return r;
        }, []);

      const western: IStandings = standings.records
        .filter(table => table.conference.name === "Western")
        .reduce((r, acc) => {
          r[acc.division.name] = assembleRecord(acc.teamRecords);

          return r;
        }, []);

      // Sort the Tables by Points.
      setAtlantic(sortTable(eastern["Atlantic"], "points", "atlantic"));
      setMetropolitan(
        sortTable(eastern["Metropolitan"], "points", "metropolitan")
      );
      setCentral(sortTable(western["Central"], "points", "central"));
      setPacific(sortTable(western["Pacific"], "points", "pacific"));
    };

    standingsCall();
  }, [assembleRecord]);

  return (
    <article className="standings">
      {atlantic && metropolitian && central && pacific && (
        <>
          <section className="standings-conference">
            <h3>Eastern Conference</h3>
            <table className="standings-conference-division">
              {assembleStandingsView(atlantic, "atlantic")}
            </table>
            <table className="standings-conference-division">
              {assembleStandingsView(metropolitian, "metropolitan")}
            </table>
          </section>
          <section className="standings-conference">
            <h3>Western Conference</h3>
            <table className="standings-conference-division">
              {assembleStandingsView(central, "central")}
            </table>
            <table className="standings-conference-division">
              {assembleStandingsView(pacific, "pacific")}
            </table>
          </section>
        </>
      )}
    </article>
  );
};

export default Standings;
