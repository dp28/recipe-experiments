import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("Steps", [
  {
    id: "bolognese",
    product: {
      foodId: "bolognese",
      amount: { quantity: 4, roughUnitId: "serving" },
    },
    finalStepId: "cook bolognese",
    allOtherStepIds: [
      "combine bolognese ingredients",
      "brown mince",
      "mix tomatoes and onions",
      "saute onions",
      "dice onions",
    ],
  },
  {
    id: "chopped tomatoes",
    product: {
      foodId: "chopped tomatoes",
      amount: { exactQuantity: 400, unitId: "g" },
    },
    finalStepId: "chop tomatoes",
    allOtherStepIds: [],
  },
]);
