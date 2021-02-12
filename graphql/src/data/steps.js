import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("Steps", [
  {
    id: "dice onions",
    instruction: { text: "Roughly dice the onions" },
    input: {
      ingredients: [
        {
          foodId: "onion",
          amount: {
            exactQuantity: 4,
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 300,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "saute onions",
    instruction: { text: "Saute the onions until translucent" },
    input: {
      ingredients: [
        {
          foodId: "oil",
          amount: {
            exactQuantity: 1,
            unitId: "tbsp",
          },
          optional: false,
        },
        {
          foodId: "salt",
          amount: {
            exactQuantity: 1,
            unitId: "tsp",
          },
          optional: false,
        },
      ],
      previousStepIds: ["dice onions"],
    },
    time: {
      estimatedDurationInSeconds: 300,
      timers: [],
    },
    attentionLevelId: "LOW",
    alternativeStepIds: ["brown onions"],
  },
  {
    id: "chop tomatoes",
    instruction: { text: "Chop the tomatoes" },
    input: {
      ingredients: [
        {
          foodId: "plum tomato",
          amount: {
            exactQuantity: 6,
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 120,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: ["canned tomatoes"],
  },
  {
    id: "brown onions",
    instruction: { text: "Brown the onions" },
    input: {
      ingredients: [],
      previousStepIds: ["dice onions"],
    },
    time: {
      estimatedDurationInSeconds: 15 * 60,
      timers: [],
    },
    attentionLevelId: "LOW",
    alternativeStepIds: ["saute onions"],
  },
  {
    id: "canned tomatoes",
    instruction: { text: "Open the canned chopped tomatoes" },
    input: {
      ingredients: [
        {
          foodId: "can tomato",
          amount: {
            exactQuantity: 1,
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: ["chop tomatoes"],
  },
  {
    id: "mix tomatoes and onions",
    instruction: { text: "Add the chopped tomatoes to the onions" },
    input: {
      ingredients: [
        {
          foodId: "chopped tomatoes",
          amount: {
            exactQuantity: 400,
            unitId: "g",
          },
          optional: false,
        },
      ],
      previousStepIds: ["saute onions"],
    },
    time: {
      estimatedDurationInSeconds: 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "brown mince",
    instruction: { text: "Brown the mince" },
    input: {
      ingredients: [
        {
          foodId: "steak mince",
          amount: {
            exactQuantity: 400,
            unitId: "g",
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 10 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "combine bolognese ingredients",
    instruction: {
      text:
        "Combine the mince, onions, and tomatoes. Add in the tomato puree, worcestershire sauce, and milk. You may want to add some water to let down the sauce a bit.",
    },
    input: {
      ingredients: [
        {
          foodId: "tomato puree",
          amount: {
            exactQuantity: 2,
            unitId: "tbsp",
          },
          optional: false,
        },
        {
          foodId: "milk",
          amount: {
            exactQuantity: 2,
            unitId: "tbsp",
          },
          optional: false,
        },
        {
          foodId: "worcestershire sauce",
          amount: {
            exactQuantity: 2,
            unitId: "tsp",
          },
          optional: false,
        },
        {
          foodId: "water",
          amount: {
            exactQuantity: 100,
            unitId: "ml",
          },
          optional: true,
        },
      ],
      previousStepIds: ["brown mince", "mix tomatoes and onions"],
    },
    time: {
      estimatedDurationInSeconds: 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "cook bolognese",
    instruction: {
      text:
        "Bring to a simmer, cover, then cook on low for at least 30 minutes, up to 8 hours (longer is better), stirring occasionally.",
    },
    input: {
      ingredients: [],
      previousStepIds: ["combine bolognese ingredients"],
    },
    time: {
      estimatedDurationInSeconds: 90 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
]);

export function buildStepResolvers(dependencyContainer) {
  const stepsFetcher = dependencyContainer.resolve("StepsFetcher");
  const attentionLevelsFetcher = dependencyContainer.resolve(
    "AttentionLevelsFetcher"
  );

  return {
    StepInput: {
      previousSteps: (stepInput) =>
        stepsFetcher.findMany(stepInput.previousStepIds),
    },

    Step: {
      attentionLevel: (step) =>
        attentionLevelsFetcher.find(step.attentionLevelId),
      alternativeSteps: (step) =>
        stepsFetcher.findMany(step.alternativeStepIds),
    },
  };
}
