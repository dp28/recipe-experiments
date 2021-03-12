import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ingredient: {},
  optional: {
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.disabled,
    display: "inline-block",
  },
  amount: {
    fontWeight: "bold",
    marginRight: theme.spacing(0.5),
    display: "inline-block",
  },
  food: {
    marginRight: theme.spacing(0.5),
    display: "inline-block",
  },
  modifier: {
    color: theme.palette.text.disabled,
    display: "inline-block",
  },
}));

export function Ingredient({ ingredient }) {
  const classes = useStyles();
  const { food, amount, optional } = ingredient;

  return (
    <div className={classes.ingredient}>
      {optional && (
        <Typography className={classes.optional}>(Optional)</Typography>
      )}
      <Typography className={classes.amount}>
        {toAmountString(amount)}
      </Typography>
      <Typography className={classes.food}>{food.name}</Typography>
      <Typography className={classes.modifier}>{food.modifier}</Typography>
    </div>
  );
}

function toAmountString(amount) {
  switch (amount.__typename) {
    case "MeasuredAmount":
      return `${amount.exactQuantity} ${amount.unit.symbol}`;
    case "RawQuantity":
      return `${amount.exactQuantity}`;
    case "RoughAmount":
      return `${amount.quantity} ${
        amount.quantity === 1
          ? amount.unit.name.singular
          : amount.unit.name.plural
      }`;
    default:
      throw Error("Unknown amount type");
  }
}
