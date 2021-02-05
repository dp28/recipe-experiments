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
]);
