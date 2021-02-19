import { sortBy } from "../../utils/arrays";

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
