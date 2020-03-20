import Schedule from "../view/Schedule.view";
import Standings from "../view/Standings.view";
import Game from "../view/Game.view";
import Player from "../view/Player.view";

const routes = t => [
  {
    label: t("nav.schedule"),
    path: "/",
    component: Schedule,
    exact: true
  },
  {
    label: t("nav.standings"),
    path: "/standings",
    component: Standings,
    exact: true
  },
  {
    label: t("nav.game"),
    path: "/game/:gamePk",
    component: Game,
    exact: true
  },
  {
    label: t("nav.player"),
    path: "/player/:playerID",
    component: Player,
    exact: true
  }
];

export default routes;
