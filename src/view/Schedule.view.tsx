import React, { useCallback, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getGamesOfDay } from "../services/api";
import Datepicker from "../components/Datepicker/Datepicker.component";
import Scorecard from "../components/Scorecard/Scorecard.component";
import {
  IScheduleData,
  IScheduleGame
} from "../intefaces/ScheduleGame.interface";

const Schedule = () => {
  const [scheduleGames, setScheduleGames] = useState<IScheduleData>();
  const [scheduleDate, setScheduleDate] = useState("");

  const dateHandler = date => {
    setScheduleDate(date);
  };

  const getListOfGames = useCallback(() => {
    let activeGames: object[] = [];

    if (scheduleGames && scheduleGames.games.length > 0) {
      activeGames = scheduleGames.games.filter(game => {
        return game.status.statusCode === "1" || game.status.statusCode === "3";
      });
    }

    return activeGames;
  }, [scheduleGames]);

  const getActiveGames = useCallback(
    listOfGames => {
      // If Games are in 'Preview' or 'Live/In Progress' Mode, then they are considered 'Active'.
      // If Games are all registered as 'Final', then they're not considered 'Active'.

      // If all games have a Status "1", then set the Interval time to 1 minute.
      // If AT LEAST one of the games have a Status of "3" (maybe "5"), then set the Interval time to 30 seconds.
      const gameStatusList =
        scheduleGames &&
        scheduleGames.games.map(game => game.status.statusCode);
      let intervalVal = 60000;

      if (gameStatusList && listOfGames.length > 0) {
        if (gameStatusList.includes("3") || gameStatusList.includes("5")) {
          intervalVal = 30000;
        } else {
          intervalVal = 60000;
        }
      }

      return intervalVal;
    },
    [scheduleGames]
  );

  const callScheduleData = useCallback(async () => {
    const res = await getGamesOfDay(scheduleDate);

    if (res.dates.length > 0) {
      setScheduleGames(res.dates[0]);
    }
  }, [scheduleDate]);

  // Get Today's Scheduled Game Data every 15 seconds.
  useEffect(() => {
    if (scheduleDate) {
      callScheduleData();
    }
  }, [callScheduleData, scheduleDate]);

  useEffect(() => {
    const listOfGames = getListOfGames();
    const activeGames = getActiveGames(listOfGames);

    if (listOfGames.length > 0) {
      const interval = setInterval(() => {
        callScheduleData();
      }, activeGames);
      return () => clearInterval(interval);
    }
  }, [callScheduleData, getActiveGames, getListOfGames, scheduleGames]);

  return (
    <article className="schedule">
      <nav>
        <Datepicker callback={dateHandler} dateValue={scheduleDate} />
        <h3>{scheduleDate && format(parseISO(scheduleDate), "MMMM, do, Y")}</h3>
      </nav>

      <section className="scorecards">
        {scheduleGames &&
          scheduleGames.games.length > 0 &&
          scheduleGames.games.map((game: IScheduleGame) => (
            <Scorecard key={game.gamePk} data={game} />
          ))}
      </section>
    </article>
  );
};

export default Schedule;
