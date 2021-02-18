import React from "react";
import { Typography } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RecipeQuery } from "./recipeQueries";
import { buildRecipeTree } from "./recipeTree";
import { PlanningStep } from "./PlanningStep";

export const Recipe = () => {
  const { recipeId } = useParams();
  const { loading, error, data } = useQuery(RecipeQuery, {
    variables: { id: recipeId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { recipe } = data;
  const title = recipe.name || recipe.product.food.name;
  const rootTreeNode = buildRecipeTree(recipe);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      <PlanningStep stepTreeNode={rootTreeNode} />
    </div>
  );
};
