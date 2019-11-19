import Schedule from "../view/Schedule.view";
import Game from "../view/Game.view";

const routes = [
  {
    label: "Schedule",
    path: "/",
    component: Schedule,
    exact: true
  },
  {
    label: "Game",
    path: "/game/:gamePk",
    component: Game,
    exact: true
  }
];

export default routes;
