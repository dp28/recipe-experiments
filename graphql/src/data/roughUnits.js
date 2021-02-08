import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("RoughUnits", [
  {
    id: "bunch",
    name: {
      singular: "bunch",
      plural: "bunches",
    },
  },
  {
    id: "pinch",
    name: {
      singular: "pinch",
      plural: "pinches",
    },
  },
  {
    id: "dash",
    name: {
      singular: "dash",
      plural: "dashes",
    },
  },
  {
    id: "handfull",
    name: {
      singular: "handfull",
      plural: "handfulls",
    },
  },
  {
    id: "head",
    name: {
      singular: "head",
      plural: "heads",
    },
  },
  {
    id: "portion",
    name: {
      singular: "portion",
      plural: "portions",
    },
  },
  {
    id: "serving",
    name: {
      singular: "serving",
      plural: "servings",
    },
  },
  {
    id: "slice",
    name: {
      singular: "slice",
      plural: "slices",
    },
  },
]);
