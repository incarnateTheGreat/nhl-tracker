import React, { useCallback, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { getGamesOfDay } from "../services/api";
import Datepicker from "../components/Datepicker/Datepicker.component";
import Scorecard from "../components/Scorecard/Scorecard.component";
import { IScheduleGame } from "../intefaces/ScheduleGame.interface";

const Schedule = () => {
  const [scheduledGames, setScheduledGames] = useState<IScheduleGame[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [activeGames, setActiveGames] = useState<IScheduleGame[]>([]);
  const [completedGames, setCompletedGames] = useState<IScheduleGame[]>([]);

  const dateHandler = (date) => {
    setScheduleDate(date);
  };

  const getListOfGames = useCallback(() => {
    let activeGames: object[] = [];

    if (scheduledGames && scheduledGames.length > 0) {
      activeGames = scheduledGames.filter((game) => {
        return game.status.statusCode === "1" || game.status.statusCode === "3";
      });
    }

    return activeGames;
  }, [scheduledGames]);

  const getActiveGames = useCallback(
    (listOfGames) => {
      // If Games are in 'Preview' or 'Live/In Progress' Mode, then they are considered 'Active'.
      // If Games are all registered as 'Final', then they're not considered 'Active'.

      // If all games have a Status "1", then set the Interval time to 1 minute.
      // If AT LEAST one of the games have a Status of "3" (maybe "5"), then set the Interval time to 30 seconds.
      const gameStatusList =
        scheduledGames && scheduledGames.map((game) => game.status.statusCode);
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
    [scheduledGames]
  );

  const callScheduleData = useCallback(async () => {
    const gamesOfDay = await getGamesOfDay(scheduleDate);

    if (gamesOfDay.dates.length > 0) {
      const gamesData = gamesOfDay.dates[0];

      const activeGamesData = gamesData.games.filter((game) => {
        return (
          game.status.statusCode === "3" ||
          game.status.statusCode === "4" ||
          game.status.statusCode === "5"
        );
      });

      const completedGamesData = gamesData.games.filter((game) => {
        return game.status.statusCode === "6" || game.status.statusCode === "7";
      });

      const scheduledGamesData = gamesData.games.filter((game) => {
        return game.status.statusCode === "1";
      });

      setScheduledGames(scheduledGamesData);
      setActiveGames(activeGamesData);
      setCompletedGames(completedGamesData);
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
  }, [callScheduleData, getActiveGames, getListOfGames, scheduledGames]);

  return (
    <article className="schedule">
      <nav>
        <Datepicker callback={dateHandler} dateValue={scheduleDate} />
        <h3>{scheduleDate && format(parseISO(scheduleDate), "MMMM do, Y")}</h3>
      </nav>

      {scheduledGames.length > 0 && (
        <section className="scorecards">
          <h3>Scheduled</h3>
          <div className="scorecards-container">
            {scheduledGames.map((game) => (
              <Scorecard key={game.gamePk} data={game} />
            ))}
          </div>
        </section>
      )}

      <section className="scorecards">
        <h3>Live</h3>
        <div className="scorecards-container">
          {activeGames.length > 0 ? (
            activeGames.map((game) => (
              <Scorecard key={game.gamePk} data={game} />
            ))
          ) : (
            <div>There are currently no live games.</div>
          )}
        </div>
      </section>

      <section className="scorecards">
        <h3>Completed</h3>
        <div className="scorecards-container">
          {completedGames.length > 0 ? (
            completedGames.map((game) => (
              <Scorecard key={game.gamePk} data={game} />
            ))
          ) : (
            <div>There are no completed games.</div>
          )}
        </div>
      </section>
    </article>
  );
};

export default Schedule;
