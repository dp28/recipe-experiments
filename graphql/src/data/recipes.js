import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("Recipes", [
  {
    id: "bolognese",
    product: {
      foodId: "bolognese",
      amount: { quantity: 4, roughUnitId: "serving" },
    },
    finalStepId: "cook bolognese",
    allOtherStepIds: [
      "combine bolognese ingredients",
      "brown mince",
      "mix tomatoes and onions",
      "saute onions",
      "dice onions",
    ],
  },
  {
    id: "chopped tomatoes",
    product: {
      foodId: "chopped tomatoes",
      amount: { exactQuantity: 400, unitId: "g" },
    },
    finalStepId: "chop tomatoes",
    allOtherStepIds: [],
  },
]);

export function buildRecipeResolvers(dependencyContainer) {
  const foodsFetcher = dependencyContainer.resolve("FoodsFetcher");
  const stepsFetcher = dependencyContainer.resolve("StepsFetcher");

  return {
    Product: {
      food: (product) => foodsFetcher.find(product.foodId),
    },

    Recipe: {
      finalStep: (recipe) => stepsFetcher.find(recipe.finalStepId),
      allOtherSteps: (recipe) => stepsFetcher.findMany(recipe.allOtherStepIds),
    },
  };
}
