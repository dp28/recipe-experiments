export function buildResolvers(dependencyContainer) {
  const attentionLevelFetcher = dependencyContainer.resolve(
    "AttentionLevelsFetcher"
  );
  const unitsFetcher = dependencyContainer.resolve("UnitsFetcher");
  const roughUnitsFetcher = dependencyContainer.resolve("RoughUnitsFetcher");

  return {
    Query: {
      attentionLevels: attentionLevelFetcher.loadAll,
      units: unitsFetcher.loadAll,
      roughUnits: roughUnitsFetcher.loadAll,
    },
  };
}
