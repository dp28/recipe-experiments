export function buildRecipeTree(recipe) {
  const steps = [recipe.finalStep, ...recipe.allOtherSteps];
  const stepsById = indexById(steps);

  return buildTreeFromSteps(stepsById, recipe.finalStep);
}

function indexById(array) {
  return Object.fromEntries(array.map((value) => [value.id, value]));
}

function buildTreeFromSteps(stepsById, finalStep) {
  const root = { step: finalStep, children: [] };
  const nodesToProcess = [root];

  while (nodesToProcess.length) {
    const node = nodesToProcess.pop();
    node.children = node.step.input.previousSteps.map(({ id }) => ({
      step: stepsById[id],
      children: [],
    }));
    node.children.forEach((child) => nodesToProcess.push(child));
  }
  postprocess(root);

  const timeline = buildTimeline(root);

  return root;
}

function postprocess(root) {
  const nodesToProcess = [root];
  const postOrderTraversal = [];

  while (nodesToProcess.length) {
    const node = nodesToProcess.pop();
    node.children.forEach((child) => {
      child.parent = node;
      nodesToProcess.push(child);
    });
    postOrderTraversal.unshift(node);
  }

  postOrderTraversal.forEach((node) => {
    node.depth = 1 + Math.max(0, ...node.children.map((_) => _.depth));

    node.minDuration =
      node.step.time.estimatedDurationInSeconds +
      Math.max(0, ...node.children.map((_) => _.minDuration));

    node.maxLowAttentionDuration =
      (lowAttentionOrLess(node.step.attentionLevel)
        ? node.step.time.estimatedDurationInSeconds
        : 0) +
      Math.max(0, ...node.children.map((_) => _.maxLowAttentionDuration));

    node.breadth =
      node.children.reduce((breadth, child) => breadth + child.breadth, 0) || 1;

    sortBy(node.children, (_) => -_.minDuration);
  });
}

function buildTimeline(rootNode) {
  const nodesToProcess = [rootNode];
  const timeline = { nodes: [] };

  while (nodesToProcess.length) {
    const node = removeBestNextNode(nodesToProcess, timeline);
    node.children.forEach((child) => nodesToProcess.push(child));
    addNode(node, timeline);
  }

  reverseTimes(timeline);

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

function areParallelizable(actionLevel, otherActionLevel) {
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

function lowAttentionOrLess(attentionLevel) {
  return attentionLevel.id === "NONE" || attentionLevel.id === "LOW";
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
}

function sortBy(array, getter) {
  array.sort((a, b) => getter(a) - getter(b));
  return array;
}
