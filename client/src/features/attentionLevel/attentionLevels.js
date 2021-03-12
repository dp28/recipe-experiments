import { sortBy } from "../../utils/arrays";

const AttentionColours = {
  TOTAL: "#fb8d00",
  HIGH: "#ffb84d",
  LOW: "#46bdff",
  NONE: "#0079ff",
};

export function areParallelizable(actionLevel, otherActionLevel) {
  const [lower, higher] = sortBy(
    [actionLevel, otherActionLevel],
    (_) => _.ordering
  );

  return (
    lowAttentionOrLess(higher) ||
    (higher.id === "TOTAL" && lower.id === "NONE") ||
    (higher.id === "HIGH" && lowAttentionOrLess(lower))
  );
}

export function lowAttentionOrLess(attentionLevel) {
  return attentionLevel.id === "NONE" || attentionLevel.id === "LOW";
}

export function highAttentionOrMore(attentionLevel) {
  return attentionLevel.id === "HIGH" || attentionLevel.id === "TOTAL";
}

export function colourForStep(step) {
  return AttentionColours[step.attentionLevel.id];
}
