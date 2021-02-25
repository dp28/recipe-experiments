import { sortBy } from "../../utils/arrays";
import {
  areParallelizable,
  highAttentionOrMore,
} from "../attentionLevel/attentionLevels";

export function buildTimeline(rootNode) {
  const nodesToProcess = [rootNode];
  const timeline = { nodes: [] };

  while (nodesToProcess.length) {
    const node = removeBestNextNode(nodesToProcess, timeline);
    node.children.forEach((child) => nodesToProcess.push(child));
    addNode(node, timeline);
  }

  reverseTimes(timeline);

  timeline.duration = Math.max(
    ...timeline.nodes.map((node) => node.timing.end)
  );

  timeline.streams = buildStreams(timeline);

  return timeline;
}

function removeBestNextNode(nodesToProcess, timeline) {
  let bestNodeIndex = 0;
  let bestNodeEndTime = calculateEndTime(
    nodesToProcess[bestNodeIndex],
    timeline
  );

  for (let i = 0; i < nodesToProcess.length; i++) {
    const node = nodesToProcess[i];
    const potentialNodeEndTime = calculateEndTime(node, timeline);
    if (
      potentialNodeEndTime < bestNodeEndTime ||
      (potentialNodeEndTime === bestNodeEndTime &&
        node.maxLowAttentionDuration >
          nodesToProcess[bestNodeIndex].maxLowAttentionDuration)
    ) {
      bestNodeIndex = i;
      bestNodeEndTime = potentialNodeEndTime;
    }
  }

  const bestNode = nodesToProcess[bestNodeIndex];
  nodesToProcess.splice(bestNodeIndex, 1);

  bestNode.timing = {
    start: bestNodeEndTime + bestNode.step.time.estimatedDurationInSeconds,
    end: bestNodeEndTime,
  };

  return bestNode;
}

function calculateEndTime(node, timeline) {
  let endTime = node.parent ? node.parent.timing.start : 0;

  while (cannotAddNode(node, timeline, endTime)) {
    endTime += 60;
  }

  return endTime;
}

function cannotAddNode(node, timeline, endTime) {
  const startTime = endTime + node.step.time.estimatedDurationInSeconds;
  const otherNodes = nodesInInterval(startTime, endTime, timeline);

  return !otherNodes.every((otherNode) =>
    areParallelizable(node.step.attentionLevel, otherNode.step.attentionLevel)
  );
}

function nodesInInterval(startTime, endTime, timeline) {
  return timeline.nodes.filter(
    ({ timing }) =>
      inTimingInterval(startTime, timing) || inTimingInterval(endTime, timing)
  );
}

function inTimingInterval(time, { start, end }) {
  return inInterval(time, end, start);
}

function inInterval(number, start, end) {
  return start <= number && end > number;
}

function timingsOverlap(node, otherNode) {
  return (
    inInterval(
      node.timing.start,
      otherNode.timing.start,
      otherNode.timing.end
    ) ||
    inInterval(node.timing.end, otherNode.timing.start, otherNode.timing.end)
  );
}

function addNode(node, timeline) {
  timeline.nodes.push(node);
  sortBy(timeline.nodes, (_) => _.timing.end);
}

function reverseTimes(timeline) {
  const endTime = Math.max(...timeline.nodes.map((node) => node.timing.start));
  timeline.nodes.forEach((node) => {
    node.timing.end = endTime - node.timing.end;
    node.timing.start = endTime - node.timing.start;
  });
  sortBy(timeline.nodes, (_) => _.timing.start);
}

function buildStreams(timeline) {
  const highAttentionStream = [];
  const backgroundStreams = [];
  const nodes = [...timeline.nodes];

  let currentMainNode = nodes.pop();
  highAttentionStream.push(currentMainNode);

  while (nodes.length) {
    const node = nodes.pop();
    if (highAttentionOrMore(node.step.attentionLevel)) {
      highAttentionStream.push(node);
      currentMainNode = node;
    } else {
      const stream = findOpenBackgroundStream(node, backgroundStreams);
      if (stream) {
        stream.push(node);
      } else {
        backgroundStreams.push([node]);
      }
    }
  }

  return [...backgroundStreams, highAttentionStream];
}

function findOpenBackgroundStream(node, backgroundStreams) {
  return backgroundStreams.find((stream) => {
    const lastInStream = stream[stream.length - 1];
    return (
      !timingsOverlap(lastInStream, node) ||
      areParallelizable(
        node.step.attentionLevel,
        lastInStream.step.attentionLevel
      )
    );
  });
}
