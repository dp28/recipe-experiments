import React from "react";
import { makeStyles } from "@material-ui/core";
import { Ingredient } from "./Ingredient";

const useStyles = makeStyles((theme) => ({
  ingredients: {},
}));

export function Ingredients({ ingredients }) {
  const classes = useStyles();

  return (
    <div className={classes.ingredients}>
      {ingredients.map((ingredient) => (
        <Ingredient ingredient={ingredient} key={ingredient.food.id} />
      ))}
    </div>
  );
}
