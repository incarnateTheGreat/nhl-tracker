import Schedule from "../view/Schedule.view";
import Standings from "../view/Standings.view";
import Game from "../view/Game.view";
import Player from "../view/Player.view";

const routes = [
  {
    label: "Schedule",
    path: "/",
    component: Schedule,
    exact: true
  },
  {
    label: "Standings",
    path: "/standings",
    component: Standings,
    exact: true
  },
  {
    label: "Game",
    path: "/game/:gamePk",
    component: Game,
    exact: true
  },
  {
    label: "Player",
    path: "/player/:playerID",
    component: Player,
    exact: true
  }
];

export default routes;
