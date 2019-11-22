import React, { useEffect, useState } from "react";
import { isToday, isYesterday, parseISO, parse } from "date-fns";
import { getGamesOfDay } from "../services/api";
import Datepicker from "../components/Datepicker/Datepicker.component";
import Scorecard from "../components/Scorecard/Scorecard.component";
import {
  IScheduleData,
  IScheduleGame
} from "../intefaces/ScheduleGame.interface";

const Schedule = () => {
  const [todaysGames, setTodaysGames] = useState<IScheduleData>();
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const dateHandler = date => {
    setScheduleDate(date);
  };

  const checkActiveGames = () => {
    let activeGames: object[] = [];

    // console.log(todaysGames);

    if (todaysGames && todaysGames.games.length > 0) {
      activeGames = todaysGames.games.filter(game => {
        return (
          game.status.abstractGameState === "Live" ||
          game.status.detailedState === "In Progress"
        );
      });
    }

    console.log(activeGames);

    return activeGames.length > 0 ? true : false;
  };

  // Get Today's Scheduled Game Data every 15 seconds.
  useEffect(() => {
    const callScheduleData = () => {
      getGamesOfDay(scheduleDate).then(data => {
        if (data.dates.length > 0) {
          setTodaysGames(data.dates[0]);
        }
      });
    };

    if (typeof scheduleDate === "string") {
      callScheduleData();

      if (
        isToday(parseISO(scheduleDate)) ||
        isYesterday(parseISO(scheduleDate))
      ) {
        checkActiveGames();

        const interval = setInterval(() => {
          callScheduleData();
        }, 15000);
        return () => clearInterval(interval);
      }
    }
  }, [scheduleDate]);

  return (
    <article className="schedule">
      <Datepicker callback={dateHandler} dateValue={scheduleDate} />
      <section className="scorecards">
        {todaysGames &&
          todaysGames.games.length > 0 &&
          todaysGames.games.map((game: IScheduleGame) => (
            <Scorecard key={game.gamePk} data={game} />
          ))}
      </section>
    </article>
  );
};

export default Schedule;
