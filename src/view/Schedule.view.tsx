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
      const yeah = {
        date: "2019-11-21",
        totalItems: 13,
        totalEvents: 0,
        totalGames: 13,
        totalMatches: 0,
        games: [
          {
            gamePk: 2019020333,
            link: "/api/v1/game/2019020333/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T00:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "1",
              detailedState: "Final",
              statusCode: "1",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 10,
                  losses: 9,
                  ot: 3,
                  type: "league"
                },
                score: 2,
                team: {
                  id: 7,
                  name: "Buffalo Sabres",
                  link: "/api/v1/teams/7"
                }
              },
              home: {
                leagueRecord: {
                  wins: 14,
                  losses: 3,
                  ot: 5,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 6,
                  name: "Boston Bruins",
                  link: "/api/v1/teams/6"
                }
              }
            },
            venue: {
              id: 5085,
              name: "TD Garden",
              link: "/api/v1/venues/5085"
            },
            content: {
              link: "/api/v1/game/2019020333/content"
            }
          },
          {
            gamePk: 2019020334,
            link: "/api/v1/game/2019020334/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T00:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 10,
                  losses: 10,
                  ot: 3,
                  type: "league"
                },
                score: 4,
                team: {
                  id: 24,
                  name: "Anaheim Ducks",
                  link: "/api/v1/teams/24"
                }
              },
              home: {
                leagueRecord: {
                  wins: 12,
                  losses: 5,
                  ot: 5,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 13,
                  name: "Florida Panthers",
                  link: "/api/v1/teams/13"
                }
              }
            },
            venue: {
              id: 5027,
              name: "BB&T Center",
              link: "/api/v1/venues/5027"
            },
            content: {
              link: "/api/v1/game/2019020334/content"
            }
          },
          {
            gamePk: 2019020335,
            link: "/api/v1/game/2019020335/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T00:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 11,
                  losses: 7,
                  ot: 4,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 5,
                  name: "Pittsburgh Penguins",
                  link: "/api/v1/teams/5"
                }
              },
              home: {
                leagueRecord: {
                  wins: 16,
                  losses: 3,
                  ot: 1,
                  type: "league"
                },
                score: 4,
                team: {
                  id: 2,
                  name: "New York Islanders",
                  link: "/api/v1/teams/2"
                }
              }
            },
            venue: {
              id: 5026,
              name: "Barclays Center",
              link: "/api/v1/venues/5026"
            },
            content: {
              link: "/api/v1/game/2019020335/content"
            }
          },
          {
            gamePk: 2019020336,
            link: "/api/v1/game/2019020336/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T00:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 11,
                  losses: 7,
                  ot: 4,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 4,
                  name: "Philadelphia Flyers",
                  link: "/api/v1/teams/4"
                }
              },
              home: {
                leagueRecord: {
                  wins: 13,
                  losses: 8,
                  ot: 1,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 12,
                  name: "Carolina Hurricanes",
                  link: "/api/v1/teams/12"
                }
              }
            },
            venue: {
              id: 5066,
              name: "PNC Arena",
              link: "/api/v1/venues/5066"
            },
            content: {
              link: "/api/v1/game/2019020336/content"
            }
          },
          {
            gamePk: 2019020337,
            link: "/api/v1/game/2019020337/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T00:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 7,
                  losses: 14,
                  ot: 3,
                  type: "league"
                },
                score: 4,
                team: {
                  id: 17,
                  name: "Detroit Red Wings",
                  link: "/api/v1/teams/17"
                }
              },
              home: {
                leagueRecord: {
                  wins: 9,
                  losses: 8,
                  ot: 4,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 29,
                  name: "Columbus Blue Jackets",
                  link: "/api/v1/teams/29"
                }
              }
            },
            venue: {
              id: 5059,
              name: "Nationwide Arena",
              link: "/api/v1/venues/5059"
            },
            content: {
              link: "/api/v1/game/2019020337/content"
            }
          },
          {
            gamePk: 2019020338,
            link: "/api/v1/game/2019020338/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T01:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 10,
                  losses: 12,
                  ot: 3,
                  type: "league"
                },
                score: 0,
                team: {
                  id: 20,
                  name: "Calgary Flames",
                  link: "/api/v1/teams/20"
                }
              },
              home: {
                leagueRecord: {
                  wins: 14,
                  losses: 4,
                  ot: 5,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 19,
                  name: "St. Louis Blues",
                  link: "/api/v1/teams/19"
                }
              }
            },
            venue: {
              id: 5076,
              name: "Enterprise Center",
              link: "/api/v1/venues/5076"
            },
            content: {
              link: "/api/v1/game/2019020338/content"
            }
          },
          {
            gamePk: 2019020339,
            link: "/api/v1/game/2019020339/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T01:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 11,
                  losses: 8,
                  ot: 4,
                  type: "league"
                },
                score: 6,
                team: {
                  id: 23,
                  name: "Vancouver Canucks",
                  link: "/api/v1/teams/23"
                }
              },
              home: {
                leagueRecord: {
                  wins: 9,
                  losses: 9,
                  ot: 3,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 18,
                  name: "Nashville Predators",
                  link: "/api/v1/teams/18"
                }
              }
            },
            venue: {
              id: 5030,
              name: "Bridgestone Arena",
              link: "/api/v1/venues/5030"
            },
            content: {
              link: "/api/v1/game/2019020339/content"
            }
          },
          {
            gamePk: 2019020340,
            link: "/api/v1/game/2019020340/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T01:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 13,
                  losses: 7,
                  ot: 2,
                  type: "league"
                },
                score: 2,
                team: {
                  id: 21,
                  name: "Colorado Avalanche",
                  link: "/api/v1/teams/21"
                }
              },
              home: {
                leagueRecord: {
                  wins: 9,
                  losses: 11,
                  ot: 2,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 30,
                  name: "Minnesota Wild",
                  link: "/api/v1/teams/30"
                }
              }
            },
            venue: {
              id: 5098,
              name: "Xcel Energy Center",
              link: "/api/v1/venues/5098"
            },
            content: {
              link: "/api/v1/game/2019020340/content"
            }
          },
          {
            gamePk: 2019020341,
            link: "/api/v1/game/2019020341/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T01:30:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 10,
                  losses: 7,
                  ot: 2,
                  type: "league"
                },
                score: 4,
                team: {
                  id: 14,
                  name: "Tampa Bay Lightning",
                  link: "/api/v1/teams/14"
                }
              },
              home: {
                leagueRecord: {
                  wins: 9,
                  losses: 9,
                  ot: 4,
                  type: "league"
                },
                score: 2,
                team: {
                  id: 16,
                  name: "Chicago Blackhawks",
                  link: "/api/v1/teams/16"
                }
              }
            },
            venue: {
              id: 5092,
              name: "United Center",
              link: "/api/v1/venues/5092"
            },
            content: {
              link: "/api/v1/game/2019020341/content"
            }
          },
          {
            gamePk: 2019020342,
            link: "/api/v1/game/2019020342/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T01:30:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 13,
                  losses: 9,
                  ot: 1,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 52,
                  name: "Winnipeg Jets",
                  link: "/api/v1/teams/52"
                }
              },
              home: {
                leagueRecord: {
                  wins: 13,
                  losses: 8,
                  ot: 2,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 25,
                  name: "Dallas Stars",
                  link: "/api/v1/teams/25"
                }
              }
            },
            venue: {
              id: 5019,
              name: "American Airlines Center",
              link: "/api/v1/venues/5019"
            },
            content: {
              link: "/api/v1/game/2019020342/content"
            }
          },
          {
            gamePk: 2019020343,
            link: "/api/v1/game/2019020343/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T02:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 10,
                  losses: 10,
                  ot: 4,
                  type: "league"
                },
                score: 3,
                team: {
                  id: 10,
                  name: "Toronto Maple Leafs",
                  link: "/api/v1/teams/10"
                }
              },
              home: {
                leagueRecord: {
                  wins: 13,
                  losses: 8,
                  ot: 2,
                  type: "league"
                },
                score: 1,
                team: {
                  id: 53,
                  name: "Arizona Coyotes",
                  link: "/api/v1/teams/53"
                }
              }
            },
            venue: {
              id: 5043,
              name: "Gila River Arena",
              link: "/api/v1/venues/5043"
            },
            content: {
              link: "/api/v1/game/2019020343/content"
            }
          },
          {
            gamePk: 2019020344,
            link: "/api/v1/game/2019020344/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T03:00:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 11,
                  losses: 11,
                  ot: 1,
                  type: "league"
                },
                score: 2,
                team: {
                  id: 28,
                  name: "San Jose Sharks",
                  link: "/api/v1/teams/28"
                }
              },
              home: {
                leagueRecord: {
                  wins: 11,
                  losses: 9,
                  ot: 4,
                  type: "league"
                },
                score: 1,
                team: {
                  id: 54,
                  name: "Vegas Golden Knights",
                  link: "/api/v1/teams/54"
                }
              }
            },
            venue: {
              id: 5178,
              name: "T-Mobile Arena",
              link: "/api/v1/venues/5178"
            },
            content: {
              link: "/api/v1/game/2019020344/content"
            }
          },
          {
            gamePk: 2019020345,
            link: "/api/v1/game/2019020345/feed/live",
            gameType: "R",
            season: "20192020",
            gameDate: "2019-11-22T03:30:00Z",
            status: {
              abstractGameState: "Final",
              codedGameState: "7",
              detailedState: "Final",
              statusCode: "7",
              startTimeTBD: false
            },
            teams: {
              away: {
                leagueRecord: {
                  wins: 14,
                  losses: 7,
                  ot: 3,
                  type: "league"
                },
                score: 1,
                team: {
                  id: 22,
                  name: "Edmonton Oilers",
                  link: "/api/v1/teams/22"
                }
              },
              home: {
                leagueRecord: {
                  wins: 9,
                  losses: 12,
                  ot: 1,
                  type: "league"
                },
                score: 5,
                team: {
                  id: 26,
                  name: "Los Angeles Kings",
                  link: "/api/v1/teams/26"
                }
              }
            },
            venue: {
              id: 5081,
              name: "STAPLES Center",
              link: "/api/v1/venues/5081"
            },
            content: {
              link: "/api/v1/game/2019020345/content"
            }
          }
        ],
        events: [],
        matches: []
      };
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
