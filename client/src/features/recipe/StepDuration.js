import React from "react";
import { Typography, makeStyles, Tooltip } from "@material-ui/core";

const AttentionColours = {
  TOTAL: "#fb8d00",
  HIGH: "#ffb84d",
  LOW: "#46bdff",
  NONE: "#0079ff",
};

const useStyles = makeStyles((theme) => ({
  stepDuration: {
    backgroundColor: ({ step }) => AttentionColours[step.attentionLevel.id],
    height: ({ secondsToPx, step }) =>
      secondsToPx ? secondsToPx * step.time.estimatedDurationInSeconds : "100%",
    minWidth: "4ch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: "0.8rem",
    textAlign: "center",
  },
  attentionLevelLabel: {
    fontWeight: "bold",
  },
  toolTipTitle: {
    fontSize: "1rem",
  },
  toolTipContent: {
    fontSize: "0.8rem",
  },
}));

export function StepDuration({ step, secondsToPx, className }) {
  const classes = useStyles({ step, secondsToPx });

  return (
    <Tooltip
      title={
        <>
          <Typography color="inherit" className={classes.toolTipTitle}>
            Attention level:{" "}
            <span className={classes.attentionLevelLabel}>
              {step.attentionLevel.label}
            </span>
          </Typography>
          <Typography className={classes.toolTipContent}>
            {step.attentionLevel.description}
          </Typography>
        </>
      }
    >
      <div className={`${classes.stepDuration} ${className}`}>
        <Typography className={classes.label}>
          {toTimeString(step.time.estimatedDurationInSeconds)}
        </Typography>
      </div>
    </Tooltip>
  );
}

function toTimeString(totalSeconds) {
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor(totalSeconds / 60 - hours * 60);

  return [
    [hours, "h"],
    [minutes, "m"],
    [seconds, "s"],
  ]
    .filter(([number]) => Boolean(number))
    .map(([number, symbol]) => `${number}${symbol}`)
    .join(" ");
}