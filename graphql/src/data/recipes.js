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
  {
    id: "simple syrup",
    product: {
      foodId: "simple syrup",
      amount: { exactQuantity: 300, unitId: "ml" },
    },
    finalStepId: "heat syrup ingredients",
    allOtherStepIds: ["combine syrup ingredients"],
  },
  {
    id: "italian meringue",
    product: {
      foodId: "italian meringue",
      amount: { quantity: 4, roughUnitId: "portion" },
    },
    finalStepId: "whisk syrup into egg whites",
    allOtherStepIds: [
      "heat syrup ingredients to soft ball",
      "beat egg whites",
      "combine thick syrup ingredients",
    ],
  },
  {
    id: "blood orange spoom",
    product: {
      foodId: "blood orange spoom",
      amount: { quantity: 4, roughUnitId: "serving" },
    },
    finalStepId: "freeze spoom",
    allOtherStepIds: [
      "mix sorbet and meringue",
      "partially freeze sorbet",
      "combine sorbet ingredients",
    ],
  },
  {
    id: "egg white",
    product: {
      foodId: "egg white",
      amount: { exactQuantity: 1 },
    },
    finalStepId: "separate eggs",
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
