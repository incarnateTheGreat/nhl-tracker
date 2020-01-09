import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";

const history = createBrowserHistory();

const ignoreRoutes = (route, routesToIgnore) => {
  const res = routesToIgnore.find(ignoreredRoute =>
    route.path.includes(ignoreredRoute)
  );

  return res ? false : true;
};

const handleNavigation = () => {
  return (
    <nav className="siteNav">
      <ul>
        {routes.map((route, key) => {
          return (
            route.path !== history.location.pathname &&
            ignoreRoutes(route, ["/game", "/player"]) && (
              <li key={key}>
                <a href={route.path} title={route.label}>
                  {route.label}
                </a>
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="App container">
      {handleNavigation()}
      <Router history={history}>
        <Switch>
          {routes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
