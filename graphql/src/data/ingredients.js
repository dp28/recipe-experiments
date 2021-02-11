export function buildIngredientResolvers(dependencyContainer) {
  const foodsFetcher = dependencyContainer.resolve("FoodsFetcher");
  const recipesFetcher = dependencyContainer.resolve("RecipesFetcher");

  return {
    Ingredient: {
      food: (ingredient) => foodsFetcher.find(ingredient.foodId),
      recipes: (ingredient) => recipesFetcher.findMany(ingredient.recipeIds),
    },
  };
}
