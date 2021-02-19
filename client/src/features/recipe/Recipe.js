import React, { useMemo, useState } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RecipeQuery } from "./recipeQueries";
import { buildRecipeTree } from "./recipeTree";
import { PlanningStep } from "./PlanningStep";
import { Timeline } from "../timeline/Timeline";

const useStyles = makeStyles((theme) => ({
  controls: {
    marginBottom: theme.spacing(3),
  },
}));

export const Recipe = () => {
  const classes = useStyles();
  const { recipeId } = useParams();
  const { loading, error, data } = useQuery(RecipeQuery, {
    variables: { id: recipeId },
  });

  const recipe = data?.recipe;
  const rootTreeNode = useMemo(
    () => (recipe ? buildRecipeTree(recipe) : null),
    [recipe]
  );
  const [showTree, setShowTree] = useState(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const title = recipe.name || recipe.product.food.name;

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      <div className={classes.controls}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowTree(!showTree)}
        >
          {showTree ? "View timeline" : "View recipe tree"}
        </Button>
      </div>

      {showTree ? (
        <PlanningStep stepTreeNode={rootTreeNode} />
      ) : (
        <Timeline rootTreeNode={rootTreeNode} />
      )}
    </div>
  );
};
