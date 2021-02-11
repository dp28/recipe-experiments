import { buildRecipeResolvers } from "./recipes.js";
import { buildIngredientResolvers } from "./ingredients.js";
import { buildStepResolvers } from "./steps.js";
import { buildAmountResolvers } from "./amounts.js";

export function buildResolvers(dependencyContainer) {
  const attentionLevelFetcher = dependencyContainer.resolve(
    "AttentionLevelsFetcher"
  );
  const unitsFetcher = dependencyContainer.resolve("UnitsFetcher");
  const roughUnitsFetcher = dependencyContainer.resolve("RoughUnitsFetcher");
  const foodsFetcher = dependencyContainer.resolve("FoodsFetcher");
  const stepsFetcher = dependencyContainer.resolve("StepsFetcher");
  const recipesFetcher = dependencyContainer.resolve("RecipesFetcher");

  return {
    ...buildRecipeResolvers(dependencyContainer),
    ...buildIngredientResolvers(dependencyContainer),
    ...buildStepResolvers(dependencyContainer),
    ...buildAmountResolvers(dependencyContainer),

    Query: {
      attentionLevels: attentionLevelFetcher.loadAll,
      attentionLevel: (_, { id }) => attentionLevelsFetcher.find(id),

      units: unitsFetcher.loadAll,
      unit: (_, { id }) => unitsFetcher.find(id),

      roughUnits: roughUnitsFetcher.loadAll,

      foods: foodsFetcher.loadAll,
      food: (_, { id }) => foodsFetcher.find(id),

      recipes: recipesFetcher.loadAll,
      recipe: (_, { id }) => recipesFetcher.find(id),

      step: (_, { id }) => logAndReturn(stepsFetcher.find(id)),
    },
  };
}

async function logAndReturn(arg) {
  const result = await arg;
  console.log(result);
  return result;
}
