import React from "react";
import { List, ListItem, Typography } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const RECIPES_QUERY = gql`
  query allRecipes {
    recipes {
      id
      name
      product {
        food {
          name
        }
      }
    }
  }
`;

export const AllRecipes = () => {
  const { loading, error, data } = useQuery(RECIPES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Typography gutterBottom>Recipes ({data.recipes.length})</Typography>

      <List>
        {data.recipes.map((recipe) => (
          <ListItem key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <Typography>{recipe.name || recipe.product.food.name}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
