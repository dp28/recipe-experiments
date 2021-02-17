import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher(
  "Foods",
  [
    "blood orange juice",
    "blood orange spoom",
    "bolognese",
    "butter",
    "butternut squash",
    "can tomato",
    "cheese",
    "chopped tomatoes",
    "cream of tartar",
    "egg",
    "egg white",
    "flour",
    "italian meringue",
    "lemon",
    "lemon juice",
    "milk",
    "oil",
    "onion",
    "pasta",
    "plum tomato",
    "salt",
    "simple syrup",
    "steak mince",
    "sugar",
    "tomato puree",
    "water",
    "worcestershire sauce",
  ].map((name) => ({ id: name, name, conversionRatios: [] }))
);
