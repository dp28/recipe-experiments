const Units = [
  {
    id: "lb",
    symbol: "lb",
    name: {
      singular: "pound",
      plural: "pounds",
    },
  },
  {
    id: "oz",
    symbol: "oz",
    name: {
      singular: "ounce",
      plural: "ounces",
    },
  },
  {
    id: "tbsp",
    symbol: "tbsp",
    name: {
      singular: "tablespoon",
      plural: "tablespoons",
    },
  },
  {
    id: "tsp",
    symbol: "tsp",
    name: {
      singular: "teaspoon",
      plural: "teaspoons",
    },
  },
  {
    id: "ml",
    symbol: "ml",
    name: {
      singular: "millilitre",
      plural: "millilitres",
    },
  },
  {
    id: "l",
    symbol: "l",
    name: {
      singular: "litre",
      plural: "litres",
    },
  },
  {
    id: "cup",
    symbol: "cup",
    name: {
      singular: "cup",
      plural: "cups",
    },
  },
  {
    id: "pint",
    symbol: "pint",
    name: {
      singular: "pint",
      plural: "pints",
    },
  },
  {
    id: "gallon",
    symbol: "gallon",
    name: {
      singular: "gallon",
      plural: "gallons",
    },
  },
  {
    id: "cm",
    symbol: "cm",
    name: {
      singular: "centimetre",
      plural: "centimetres",
    },
  },
  {
    id: "m",
    symbol: "m",
    name: {
      singular: "metre",
      plural: "metres",
    },
  },
  {
    id: "in",
    symbol: "in",
    name: {
      singular: "inch",
      plural: "inches",
    },
  },
  {
    id: "ft",
    symbol: "ft",
    name: {
      singular: "foot",
      plural: "feet",
    },
  },
  {
    id: "g",
    symbol: "g",
    name: {
      singular: "gram",
      plural: "grams",
    },
  },
  {
    id: "kg",
    symbol: "kg",
    name: {
      singular: "kilogram",
      plural: "kilograms",
    },
  },
];

const UnitsById = Units.reduce((result, unit) => {
  result[unit.id] = unit;
  return result;
}, {});

export const UnitsFetcher = {
  loadAll: async () => Units,
  find: async (id) => UnitsById[id],
  findMany: async (ids) => ids.map((id) => UnitsById[id]).filter(Boolean),
};

export const register = (dependencyContainer) => {
  dependencyContainer.register({ UnitsFetcher });
};
