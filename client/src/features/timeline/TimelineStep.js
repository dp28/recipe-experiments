import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Chip,
  Collapse,
} from "@material-ui/core";
import { colourForStep } from "../attentionLevel/attentionLevels";
import { Ingredients } from "../ingredients/Ingredients";

const useStyles = makeStyles((theme) => ({
  step: {
    borderLeft: ({ current }) =>
      current ? `3px solid ${theme.palette.secondary.main}` : "",
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flexDirection: "row",
  },
  ordering: {
    flexGrow: 0,
    marginRight: theme.spacing(1),
    fontWeight: "bold",
    background: ({ step }) => colourForStep(step),
  },
  content: {
    flexGrow: 1,
  },
  ingredients: {
    marginTop: theme.spacing(2),
  },
  ingredientsTitle: {
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    fontStyle: "italic",
    marginBottom: theme.spacing(1),
  },
}));

export const TimelineStep = ({ node, current = false, onClick }) => {
  const { ordering, step } = node;
  const classes = useStyles({ step, current });

  return (
    <Card
      className={classes.step}
      raised={current}
      onClick={() => onClick(node)}
    >
      <CardContent className={classes.body}>
        <Chip className={classes.ordering} label={ordering} size="small"></Chip>
        <div className={classes.content}>
          <Typography className={classes.instruction}>
            {step.instruction.text}
          </Typography>

          {node.step.input.ingredients.length && (
            <Collapse in={current}>
              <div className={classes.ingredients}>
                <Typography className={classes.ingredientsTitle}>
                  Ingredients
                </Typography>
                <Ingredients ingredients={node.step.input.ingredients} />
              </div>
            </Collapse>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
