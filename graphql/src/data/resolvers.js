export function buildResolvers(dependencyContainer) {
  const attentionLevelFetcher = dependencyContainer.resolve(
    "AttentionLevelsFetcher"
  );
  const unitsFetcher = dependencyContainer.resolve("UnitsFetcher");
  const roughUnitsFetcher = dependencyContainer.resolve("RoughUnitsFetcher");
  const foodsFetcher = dependencyContainer.resolve("FoodsFetcher");

  return {
    Query: {
      attentionLevels: attentionLevelFetcher.loadAll,
      attentionLevel: (_, { id }) => attentionLevelsFetcher.find(id),

      units: unitsFetcher.loadAll,
      unit: (_, { id }) => unitsFetcher.find(id),

      roughUnits: roughUnitsFetcher.loadAll,

      foods: foodsFetcher.loadAll,
      food: (_, { id }) => foodsFetcher.find(id),
    },
  };
}
