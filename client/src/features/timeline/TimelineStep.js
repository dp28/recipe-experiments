import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@material-ui/core";
import { colourForStep } from "../attentionLevel/attentionLevels";

const useStyles = makeStyles((theme) => ({
  step: {
    borderLeft: ({ current }) =>
      current ? `3px solid ${theme.palette.secondary.main}` : "",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  ordering: {
    flexGrow: 0,
    marginRight: theme.spacing(1),
    fontWeight: "bold",
    background: ({ step }) => colourForStep(step),
  },
  instruction: {
    flexGrow: 1,
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
      <CardContent className={classes.content}>
        <Chip className={classes.ordering} label={ordering} size="small"></Chip>
        <Typography className={classes.instruction}>
          {step.instruction.text}
        </Typography>
      </CardContent>
    </Card>
  );
};
