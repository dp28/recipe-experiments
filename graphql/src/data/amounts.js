export function buildAmountResolvers(dependencyContainer) {
  const unitsFetcher = dependencyContainer.resolve("UnitsFetcher");
  const roughUnitsFetcher = dependencyContainer.resolve("RoughUnitsFetcher");

  return {
    MeasuredAmount: {
      unit: (amount) => unitsFetcher.find(amount.unitId),
    },
    RoughAmount: {
      unit: (amount) => roughUnitsFetcher.find(amount.roughUnitId),
    },
    Amount: {
      __resolveType(obj) {
        if (obj.unitId) {
          return "MeasuredAmount";
        } else if (obj.roughUnitId) {
          return "RoughAmount";
        } else if (obj.hasOwnProperty("exactQuantity")) {
          return "RawQuantity";
        }
      },
    },
  };
}
