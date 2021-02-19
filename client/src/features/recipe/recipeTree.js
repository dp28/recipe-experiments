import { sortBy } from "../../utils/arrays";
import { lowAttentionOrLess } from "../attentionLevel/attentionLevels";

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
