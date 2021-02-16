import Scores from "../view/Scores.view";
import Standings from "../view/Standings.view";
import Game from "../view/Game.view";
import Player from "../view/Player.view";
import Team from "../view/Team.view";

const routes = (t) => [
  {
    label: t("nav.scores"),
    path: "/",
    component: Scores,
    exact: true,
  },
  {
    label: t("nav.standings"),
    path: "/standings",
    component: Standings,
    exact: true,
  },
  {
    label: t("nav.game"),
    path: "/game/:gamePk",
    component: Game,
    exact: true,
  },
  {
    label: t("nav.player"),
    path: "/player/:playerID",
    component: Player,
    exact: true,
  },
  {
    path: "/team/:teamID",
    component: Team,
    exact: true,
  },
];

export default routes;
