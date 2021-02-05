export function buildResolvers(dependencyContainer) {
  const attentionLevelFetcher = dependencyContainer.resolve(
    "AttentionLevelsFetcher"
  );
  const unitsFetcher = dependencyContainer.resolve("UnitsFetcher");

  return {
    Query: {
      attentionLevels: attentionLevelFetcher.loadAll,
      units: unitsFetcher.loadAll,
    },
  };
}
