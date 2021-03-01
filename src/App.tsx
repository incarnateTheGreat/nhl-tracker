import React, { useEffect, useRef, useReducer } from "react";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Router, Route, Switch, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/routes";
import { handleNavClick, resources } from "./utils/utils";

import DateContext from "./context/dateContext";

const initialState = {
  selectedDate: "",
  dispatch: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATE":
      return { ...state, selectedDate: action.selectedDate };
    default:
      return state;
  }
};

// Initialize the History Browser History.
const history = createBrowserHistory();

// List of Routes to ignore displaying.
const ignoreRoutes = (route, routesToIgnore) => {
  const res = routesToIgnore.find((ignoreredRoute) =>
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
    format: function (value, format, lng) {
      if (format === "intlDate") return new Intl.DateTimeFormat().format(value); // -> "12/20/2012" if run in en-US locale with time zone America/Los_Angeles
      return value;
    },
  },
});

// Display the Navigation.
const handleNavigation = (t) => {
  return (
    <ul className="siteNav">
      {routes(t).map((route, key) => {
        // console.log(route.path, history.location.pathname);
        // history.listen() to update this. May need to segregate it as a component.

        return (
          route.path !== history.location.pathname &&
          ignoreRoutes(route, ["/game", "/player"]) && (
            <li key={key}>
              <button
                type="button"
                onClick={handleNavClick(route.path, history)}
                title={route.label}
              >
                {route.label}
              </button>
            </li>
          )
        );
      })}
    </ul>
  );
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const langValue = useRef<HTMLSelectElement>(null);
  // const location = useLocation();

  console.log({ state });

  useEffect(() => {
    lang();
  }, []);

  // useEffect(() => {
  //   console.log("Location changed");
  // }, [location]);

  const { t } = useTranslation();

  return (
    <DateContext.Provider
      value={{
        selectedDate: state.selectedDate,
        dispatch,
      }}
    >
      <div className="App container">
        <nav className="nav">
          <div className="nav-container">
            <h1>NHL Tracker</h1>
            {handleNavigation(t)}
            <select
              ref={langValue}
              name="lang"
              id="lang"
              value={localStorage.lang}
              onChange={(e) => {
                i18next.changeLanguage(e.target.value);
                localStorage.setItem("lang", e.target.value);
              }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </nav>
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
        <footer>
          <div className="footer-container">Footer</div>
        </footer>
      </div>
    </DateContext.Provider>
  );
};

export default App;
