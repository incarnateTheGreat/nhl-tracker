import React, { useEffect, useState } from "react";
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

  // If Games are in 'Preview' or 'Live/In Progress' Mode, then they are considered 'Active'.
  // If Games are all registered as 'Final', then they're not considered 'Active'.
  const checkActiveGames = () => {
    let activeGames: object[] = [];

    if (scheduleGames && scheduleGames.games.length > 0) {
      activeGames = scheduleGames.games.filter(game => {
        return game.status.statusCode === "1" || game.status.statusCode === "3";
      });
    }

    console.log("List of Active Games:", activeGames);

    return activeGames.length > 0 ? true : false;
  };

  const callScheduleData = async () => {
    const res = await getGamesOfDay(scheduleDate);

    if (res.dates.length > 0) {
      setScheduleGames(res.dates[0]);
    }
  };

  // Get Today's Scheduled Game Data every 15 seconds.
  useEffect(() => {
    if (scheduleDate) {
      callScheduleData();
    }
  }, [scheduleDate]);

  useEffect(() => {
    const runInterval = checkActiveGames();

    console.log("Run Interval:", runInterval);

    if (runInterval) {
      const interval = setInterval(() => {
        callScheduleData();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [scheduleGames]);

  return (
    <article className="schedule">
      <Datepicker callback={dateHandler} dateValue={scheduleDate} />
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
