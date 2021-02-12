export function buildRecipeTree(recipe) {
  const steps = [recipe.finalStep, ...recipe.allOtherSteps];
  const stepsById = indexById(steps);

  return {
    rootTreeNode: buildTreeFromSteps(stepsById, recipe.finalStep),
    stepsById,
  };
}

function indexById(array) {
  return Object.fromEntries(array.map((value) => [value.id, value]));
}

function buildTreeFromSteps(stepsById, finalStep) {
  const root = { id: finalStep.id, children: [] };
  const nodesToProcess = [root];

  while (nodesToProcess.length) {
    const node = nodesToProcess.pop();
    const step = stepsById[node.id];
    node.children = step.input.previousSteps.map(({ id }) => ({
      id,
      children: [],
    }));
    node.children.forEach((child) => nodesToProcess.push(child));
  }
  postprocess(root, stepsById);

  console.log(root);

  return root;
}

function postprocess(root, stepsById) {
  const nodesToProcess = [root];
  const postOrderTraversal = [];

  while (nodesToProcess.length) {
    const node = nodesToProcess.pop();
    node.children.forEach((child) => nodesToProcess.push(child));
    postOrderTraversal.unshift(node);
  }

  postOrderTraversal.forEach((node) => {
    node.depth = 1 + Math.max(0, ...node.children.map((_) => _.depth));

    node.duration =
      stepsById[node.id].time.estimatedDurationInSeconds +
      Math.max(0, ...node.children.map((_) => _.duration));

    node.breadth =
      node.children.reduce((breadth, child) => breadth + child.breadth, 0) || 1;

    node.children.sort((a, b) => (a.duration > b.duration ? -1 : 1));
  });
}
