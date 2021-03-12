import React, { useMemo, useState, useCallback } from "react";
import { buildTimeline } from "./buildTimeline";
import { useElementVisibleHeight } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core";
import { StepDuration } from "../recipe/StepDuration";
import { buildDisplayableTimeline } from "./buildDisplayableTimeline";
import { TimelineStep } from "./TimelineStep";

const useStyles = makeStyles((theme) => ({
  timeline: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    outline: "none",
  },
  streams: {
    height: "100%",
    flexShrink: 0,
  },
  stream: {
    width: 50,
    height: "100%",
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
  stepDuration: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    position: "absolute",
    width: 50,
    boxSizing: "border-box",
  },
  steps: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  step: {
    marginBottom: theme.spacing(1),
  },
  current: {
    border: `3px solid ${theme.palette.secondary.main}`,
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
  const [currentStepOrdering, setCurrentStepOrdering] = useState(1);

  const moveOrdering = useCallback(
    (event) => {
      console.log("press", event.key);
      if (event.key === "ArrowUp") {
        setCurrentStepOrdering(Math.max(1, currentStepOrdering - 1));
      } else if (event.key === "ArrowDown") {
        setCurrentStepOrdering(
          Math.min(timeline.orderedNodes.length, currentStepOrdering + 1)
        );
      }
    },
    [setCurrentStepOrdering, timeline, currentStepOrdering]
  );

  return (
    <div
      ref={ref}
      className={classes.timeline}
      onKeyDown={moveOrdering}
      tabIndex="-1"
    >
      <div className={classes.streams}>
        {displayableTimeline.streams.map((stream) => (
          <div key={stream[0].step.id} className={classes.stream}>
            {stream.map((node) => {
              return (
                <StepDuration
                  key={node.step.id}
                  step={node.step}
                  className={`${classes.stepDuration} ${
                    node.ordering === currentStepOrdering ? classes.current : ""
                  }`}
                  // adjusted={node.display.adjusted}
                  // label={node.ordering}
                  style={{
                    height: node.display.height,
                    top: node.display.start,
                  }}
                  onClick={() => setCurrentStepOrdering(node.ordering)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className={classes.steps}>
        {timeline.orderedNodes.map((node) => (
          <div className={classes.step} key={node.step.id}>
            <TimelineStep
              node={node}
              current={node.ordering === currentStepOrdering}
              onClick={() => setCurrentStepOrdering(node.ordering)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
