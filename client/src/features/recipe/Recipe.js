import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const RECIPE_QUERY = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      name
      product {
        food {
          name
        }
      }
      finalStep {
        id
      }
      allOtherSteps {
        id
      }
    }
  }
`;

export const Recipe = () => {
  const { recipeId } = useParams();
  const { loading, error, data } = useQuery(RECIPE_QUERY, {
    variables: { id: recipeId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { recipe } = data;
  const title = recipe.name || recipe.product.food.name;
  const steps = [recipe.finalStep, ...recipe.allOtherSteps];

  return (
    <div>
      <Typography component="h1" gutterBottom>
        {title}
      </Typography>

      <Typography>{steps.length} steps</Typography>
    </div>
  );
};
