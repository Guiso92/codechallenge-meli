import React, { lazy, Suspense, useState } from "react";
import { Redirect, Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import SearchBar from "./pages/search-bar";
import { LoaderContext } from "./shared/context/loader-context";
import Loader from "./shared/components/loader";

const Home = lazy(() => import("./pages/home"));
const Details = lazy(() => import("./pages/details"));

const history = createBrowserHistory();

export default function AppRouter() {
  const [isLoading, setIsLoading] = useState(false);
  

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <Router history={history}>
        <SearchBar />
        <Loader />
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route exact path="/items">
              <Home />
            </Route>
            <Route path="/items/:id" exact>
              <Details />
            </Route>
            <Route>
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </LoaderContext.Provider>
  );
}
