import React, { useEffect, useState } from "react";
import { getGamesOfDay } from "../services/api";
import Datepicker from "../components/Datepicker/Datepicker.component";
import Scorecard from "../components/Scorecard/Scorecard.component";
import { IScheduleGame } from "../intefaces/ScheduleGame.interface";

const Schedule = () => {
  const [todaysGames, setTodaysGames] = useState();
  const [scheduleDate, setScheduleDate] = useState(new Date());

  useEffect(() => {
    if (typeof scheduleDate === "string") {
      getGamesOfDay(scheduleDate).then(data => {
        if (data.dates.length > 0) {
          setTodaysGames(data.dates[0]);
        }
      });
    }
  }, [scheduleDate]);

  const dateHandler = date => {
    setScheduleDate(date);
  };

  console.log(todaysGames);

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
