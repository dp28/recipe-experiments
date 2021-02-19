import React, { useMemo } from "react";
import { buildTimeline } from "./buildTimeline";

export const Timeline = ({ rootTreeNode }) => {
  const timeline = useMemo(() => buildTimeline(rootTreeNode), [rootTreeNode]);

  return <div></div>;
};
