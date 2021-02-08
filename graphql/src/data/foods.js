import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("Foods", [
  { id: "onion", name: "onion", conversionRatios: [] },
  { id: "oil", name: "oil", conversionRatios: [] },
  { id: "salt", name: "salt", conversionRatios: [] },
  { id: "water", name: "water", conversionRatios: [] },
  { id: "plum tomato", name: "plum tomato", conversionRatios: [] },
  {
    id: "can tomato",
    name: "can of chopped tomatoes",
    conversionRatios: [],
  },
  {
    id: "chopped tomatoes",
    name: "chopped tomatoes",
    conversionRatios: [],
  },
  {
    id: "steak mince",
    name: "steak mince",
    modifier: "20% fat",
    conversionRatios: [],
  },
  { id: "cheese", name: "cheese", modifier: "Cheddar", conversionRatios: [] },
  { id: "pasta", name: "pasta", modifier: "fusili", conversionRatios: [] },
  { id: "milk", name: "milk", conversionRatios: [] },
  { id: "flour", name: "flour", conversionRatios: [] },
  { id: "butter", name: "butter", conversionRatios: [] },
  { id: "butternut squash", name: "butternut squash", conversionRatios: [] },
  { id: "bolognese", name: "Bolognese sauce", conversionRatios: [] },
]);
