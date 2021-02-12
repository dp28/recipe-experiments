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

  return root;
}
