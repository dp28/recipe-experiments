import React, { useMemo } from "react";
import { buildTimeline } from "./buildTimeline";
import { useElementVisibleHeight } from "../../utils/hooks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  timeline: {
    height: "100%",
  },
}));

export const Timeline = ({ rootTreeNode }) => {
  const timeline = useMemo(() => buildTimeline(rootTreeNode), [rootTreeNode]);
  const [visibleHeight, ref] = useElementVisibleHeight();
  console.log(visibleHeight);
  const classes = useStyles({ visibleHeight });

  return <div ref={ref} className={classes.timeline}></div>;
};
