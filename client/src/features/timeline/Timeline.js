import React, { useMemo } from "react";
import { buildTimeline } from "./buildTimeline";
import { useElementVisibleHeight } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core";
import { StepDuration } from "../recipe/StepDuration";

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
    borderBottom: `2px solid ${theme.palette.grey[100]}`,
    position: "absolute",
    width: 50,
  },
}));

export const Timeline = ({ rootTreeNode }) => {
  const timeline = useMemo(() => buildTimeline(rootTreeNode), [rootTreeNode]);
  const [visibleHeight, ref] = useElementVisibleHeight();
  const pixelsPerSecond = visibleHeight / timeline.duration;
  const classes = useStyles({ pixelsPerSecond });

  console.log(timeline);

  return (
    <div ref={ref} className={classes.timeline}>
      {timeline.streams.map((stream) => (
        <div key={stream[0].step.id} className={classes.stream}>
          {stream.map((node) => {
            const height =
              Math.floor(
                pixelsPerSecond * node.step.time.estimatedDurationInSeconds
              ) - 1;

            const start = Math.floor(node.timing.start * pixelsPerSecond);

            return (
              <StepDuration
                key={node.step.id}
                step={node.step}
                className={classes.step}
                style={{
                  height,
                  top: start,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
