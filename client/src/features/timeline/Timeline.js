import React, { useMemo } from "react";
import { buildTimeline } from "./buildTimeline";
import { useElementVisibleHeight } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core";
import { StepDuration } from "../recipe/StepDuration";
import { buildDisplayableTimeline } from "./buildDisplayableTimeline";

const StepBorderInPx = 1;

const useStyles = makeStyles((theme) => ({
  timeline: {
    height: "100%",
    position: "relative",
  },
  stream: {
    width: 50,
    height: "100%",
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
  step: {
    borderBottom: `${StepBorderInPx}px solid ${theme.palette.grey[100]}`,
    position: "absolute",
    width: 50,
  },
}));

export const Timeline = ({ rootTreeNode }) => {
  const classes = useStyles();
  const timeline = useMemo(() => buildTimeline(rootTreeNode), [rootTreeNode]);
  const [visibleHeight, ref] = useElementVisibleHeight();
  const displayableTimeline = useMemo(
    () => buildDisplayableTimeline(timeline, visibleHeight),
    [timeline, visibleHeight]
  );

  return (
    <div ref={ref} className={classes.timeline}>
      {displayableTimeline.streams.map((stream) => (
        <div key={stream[0].step.id} className={classes.stream}>
          {stream.map((node) => {
            return (
              <StepDuration
                key={node.step.id}
                step={node.step}
                className={classes.step}
                adjusted={node.display.adjusted}
                style={{
                  height: node.display.height,
                  top: node.display.start,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
