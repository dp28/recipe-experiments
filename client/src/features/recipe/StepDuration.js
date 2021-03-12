import React from "react";
import { Typography, makeStyles, Tooltip } from "@material-ui/core";
import { colourForStep } from "../attentionLevel/attentionLevels";

const NumberOfBlocks = 4;
const NumberOfSlices = NumberOfBlocks * 2 + 1;
const PercentPerSlice = 100 / NumberOfSlices;

const SlicePercentages = [...Array(NumberOfSlices)].map((_, i) => [
  i * PercentPerSlice,
  (i + 1) * PercentPerSlice,
]);

const useStyles = makeStyles((theme) => ({
  stepDuration: {
    backgroundColor: ({ step }) => colourForStep(step),
    height: "100%",
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
  adjustedMarker: {
    width: "100%",
    height: "4px",
    position: "relative",
    background: ({ step }) => {
      const slices = SlicePercentages.map(([start, end], i) => {
        const colour =
          i % 2 === 0 ? theme.palette.grey[100] : colourForStep(step);
        return `${colour} ${start}% ${end}%`;
      });
      return `
        linear-gradient(
          90deg,
          ${slices.join(",")}
        )
      `;
    },
    backgroundSize: "100%",
  },
  content: {
    width: "100%",
  },
}));

export function StepDuration({
  step,
  className,
  style,
  adjusted,
  label,
  withHelp = false,
}) {
  const classes = useStyles({ step, adjusted });

  return (
    <div className={className} style={style}>
      <Tooltip
        disableFocusListener={!withHelp}
        disableHoverListener={!withHelp}
        disableTouchListener={!withHelp}
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
        <div className={classes.stepDuration}>
          <div className={classes.content}>
            <Typography className={classes.label}>
              {label || toTimeString(step.time.estimatedDurationInSeconds)}
            </Typography>
            {adjusted && <div className={classes.adjustedMarker} />}
          </div>
        </div>
      </Tooltip>
    </div>
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
