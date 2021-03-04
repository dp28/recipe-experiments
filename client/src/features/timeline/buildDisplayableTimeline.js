import { sortBy } from "../../utils/arrays";
import { highAttentionOrMore } from "../attentionLevel/attentionLevels";

const MinStepHeightInPixels = 15;
const StepBorderInPixels = 2;

export function buildDisplayableTimeline(timeline, maxHeightInPixels) {
  const simplePixelsPerSecond = maxHeightInPixels / timeline.duration;
  const shortestNode = findShortest(timeline.nodes);
  if (
    durationFor(shortestNode) * simplePixelsPerSecond >=
    MinStepHeightInPixels
  ) {
    return calculateSimpleDisplayableTimeline(timeline, simplePixelsPerSecond);
  }
  return calculateAdjustedDisplayableTimeline(
    timeline,
    shortestNode,
    maxHeightInPixels
  );
}

function calculateSimpleDisplayableTimeline(timeline, pixelsPerSecond) {
  timeline.nodes.forEach((node) => {
    node.display = {
      height: calculateNodeHeight(node, pixelsPerSecond),
      start:
        Math.floor(node.timing.start * pixelsPerSecond) + StepBorderInPixels,
    };
  });
  return timeline;
}

function calculateAdjustedDisplayableTimeline(
  timeline,
  shortestNode,
  maxHeightInPixels
) {
  calculateAdjustedNodeHeights(timeline, shortestNode, maxHeightInPixels);
  calculateAdjustedNodeStarts(timeline);
  return timeline;
}

function calculateAdjustedNodeHeights(
  timeline,
  shortestNode,
  maxHeightInPixels
) {
  const shortestNodeDuration = durationFor(shortestNode);
  const fixedHeight = timeline.nodes.length * MinStepHeightInPixels;
  const durationOfFixedHeight = shortestNodeDuration * timeline.nodes.length;

  const variableHeight = Math.max(0, maxHeightInPixels - fixedHeight);
  const variableDuration = Math.max(
    0,
    timeline.duration - durationOfFixedHeight
  );
  const variablePixelsPerNode =
    variableDuration === 0 ? 0 : variableHeight / variableDuration;

  timeline.nodes.forEach((node) => {
    const variableDurationPortion = durationFor(node) - shortestNodeDuration;
    node.display = {
      height:
        MinStepHeightInPixels +
        Math.floor(variablePixelsPerNode * variableDurationPortion) -
        StepBorderInPixels,
      adjusted: variableDurationPortion > 0,
    };
  });
}

function calculateAdjustedNodeStarts(timeline) {
  const highAttentionStream = timeline.streams[timeline.streams.length - 1];

  const nodesByStartTime = sortBy([...timeline.nodes], (_) => _.timing.start);

  nodesByStartTime.forEach((node) => {
    if (node.timing.start === 0) {
      node.display.start = 0;
      node.display.end = node.display.height;
      return;
    }

    node.display.start =
      Math.max(
        getStreamPredecessorEnd(node, highAttentionStream),
        getMaxChildrenEnd(node)
      ) + StepBorderInPixels;
    node.display.end = node.display.start + node.display.height;
  });
}

function getStreamPredecessorEnd(node, highAttentionStream) {
  if (highAttentionOrMore(node.step.attentionLevel)) {
    const index = highAttentionStream.findIndex((_) => _ === node);
    const predecessor = highAttentionStream[index - 1];
    return predecessor ? predecessor.display.end : 0;
  }
  return 0;
}

function getMaxChildrenEnd(node) {
  return Math.max(0, ...node.children.map((_) => _.display.end));
}

function calculateNodeHeight(node, pixelsPerSecond) {
  return Math.floor(pixelsPerSecond * durationFor(node)) - StepBorderInPixels;
}

function findShortest(nodes) {
  let shortestNode = nodes[0];

  nodes.forEach((node) => {
    if (durationFor(node) < durationFor(shortestNode)) {
      shortestNode = node;
    }
  });
  return shortestNode;
}

function durationFor(node) {
  return node.step.time.estimatedDurationInSeconds;
}
