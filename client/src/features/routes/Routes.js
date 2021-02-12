import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AllRecipes } from "../recipes/AllRecipes";

export const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/">All recipes</Link>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <AllRecipes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
