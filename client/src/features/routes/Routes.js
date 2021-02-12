import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AllRecipes } from "../recipes/AllRecipes";
import { Recipe } from "../recipe/Recipe";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
}));

export const Routes = () => {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Button component={Link} color="inherit" to="/">
              All recipes
            </Button>
          </Toolbar>
        </AppBar>

        <Container className={classes.container}>
          <Switch>
            <Route path="/recipes/:recipeId">
              <Recipe />
            </Route>
            <Route path="/">
              <AllRecipes />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};
