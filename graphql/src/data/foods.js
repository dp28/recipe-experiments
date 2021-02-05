import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("Foods", [
  { id: "1", name: "onion", conversionRatios: [] },
  { id: "2", name: "oil", conversionRatios: [] },
  { id: "3", name: "salt", conversionRatios: [] },
  { id: "4", name: "plum tomato", conversionRatios: [] },
  { id: "5", name: "steak mince", modifier: "20% fat", conversionRatios: [] },
  { id: "6", name: "cheese", modifier: "Cheddar", conversionRatios: [] },
  { id: "7", name: "pasta", modifier: "fusili", conversionRatios: [] },
  { id: "8", name: "milk", conversionRatios: [] },
  { id: "9", name: "flour", conversionRatios: [] },
  { id: "10", name: "butter", conversionRatios: [] },
  { id: "11", name: "butternut squash", conversionRatios: [] },
]);
