import React, { useEffect, useRef } from "react";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import { resources } from "./utils/utils";

// Initialize the History Browser History.
const history = createBrowserHistory();

// List of Routes to ignore displaying.
const ignoreRoutes = (route, routesToIgnore) => {
  const res = routesToIgnore.find(ignoreredRoute =>
    route.path.includes(ignoreredRoute)
  );

  return res ? false : true;
};

// Check Local Store Language value.
const lang = () => {
  return localStorage.lang
    ? localStorage.lang
    : localStorage.setItem("lang", "en");
};

// Initialze i18next.
i18next.use(initReactI18next).init({
  resources,
  lng: lang(),
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
    format: function(value, format, lng) {
      if (format === "intlDate") return new Intl.DateTimeFormat().format(value); // -> "12/20/2012" if run in en-US locale with time zone America/Los_Angeles
      return value;
    }
  }
});

// Display the Navigation.
const handleNavigation = t => {
  return (
    <nav className="siteNav">
      <ul>
        {routes(t).map((route, key) => {
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
  const langValue = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    lang();
  }, []);

  const { t } = useTranslation();

  return (
    <div className="App container">
      {handleNavigation(t)}
      <span>Date: {i18next.t("date", { now: new Date() })}</span>
      <div>
        <select
          ref={langValue}
          name="lang"
          id="lang"
          value={localStorage.lang}
          onChange={e => {
            i18next.changeLanguage(e.target.value);
            localStorage.setItem("lang", e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <Router history={history}>
        <Switch>
          {routes(t).map((route, key) => (
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
