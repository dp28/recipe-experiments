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
      estimatedDurationInSeconds: 10 * 60,
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

  {
    id: "combine syrup ingredients",
    instruction: {
      text: "Combine sugar and water in a small saucepan",
    },
    input: {
      ingredients: [
        {
          foodId: "sugar",
          amount: {
            exactQuantity: 200,
            unitId: "ml",
          },
          optional: false,
        },
        {
          foodId: "water",
          amount: {
            exactQuantity: 200,
            unitId: "ml",
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
    alternativeStepIds: [],
  },
  {
    id: "heat syrup ingredients",
    instruction: {
      text:
        "Gently heat sugar and water in a small saucepan, stirring occasionally, until the sugar has disolved",
    },
    input: {
      ingredients: [],
      previousStepIds: ["combine syrup ingredients"],
    },
    time: {
      estimatedDurationInSeconds: 3 * 60,
      timers: [],
    },
    attentionLevelId: "LOW",
    alternativeStepIds: [],
  },

  {
    id: "separate eggs",
    instruction: {
      text:
        "Carefully crack the egg in half over a jar or mug, letting the egg white fall into the mug. Move the yolk from shell half to shell half so that most of the white falls into the jar. Be careful not to break the yolk.",
    },
    input: {
      ingredients: [
        {
          foodId: "egg",
          amount: {
            exactQuantity: 1,
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 2 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },

  {
    id: "beat egg whites",
    instruction: {
      text:
        "Beat the egg whites and cream of tartar with an electric mixer until the egg whites form stiff peaks",
    },
    input: {
      ingredients: [
        {
          foodId: "egg white",
          amount: {
            exactQuantity: 3,
          },
          optional: false,
        },
        {
          foodId: "cream of tartar",
          amount: {
            exactQuantity: 0.25,
            unitId: "tsp",
          },
          optional: true,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "combine thick syrup ingredients",
    instruction: {
      text: "Combine the syrup ingredients in a small saucepan",
    },
    input: {
      ingredients: [
        {
          foodId: "sugar",
          amount: {
            exactQuantity: 190,
            unitId: "g",
          },
          optional: false,
        },
        {
          foodId: "water",
          amount: {
            exactQuantity: 60,
            unitId: "ml",
          },
          optional: false,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 1 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "heat syrup ingredients to soft ball",
    instruction: {
      text:
        "Heat sugar and water in a small saucepan, stirring occasionally, until the sugar has disolved. Once the sugar has disolved, stop stirring. Heat the syrup to 240F, then remove from the heat and use immediately. Another way to tell the syrup is ready is to check that it is at the 'soft ball stage': dip a small spoonful of the syrup into water to cool it. If it forms a thread in the water, it's not ready. If it can be squished into a rough ball, it's ready. If it forms a hard ball, it's gone too far.",
    },
    input: {
      ingredients: [],
      previousStepIds: ["combine thick syrup ingredients"],
    },
    time: {
      estimatedDurationInSeconds: 5 * 60,
      timers: [],
    },
    attentionLevelId: "LOW",
    alternativeStepIds: [],
  },
  {
    id: "whisk syrup into egg whites",
    instruction: {
      text:
        "Slowly dribble the hot syrup into the stiff eggs while continuously whisking the eggs with the electric beater. Once all the syrup is incoroporated, beat for several minutes more until the mixture has cooled.",
    },
    input: {
      ingredients: [],
      previousStepIds: [
        "heat syrup ingredients to soft ball",
        "beat egg whites",
      ],
    },
    time: {
      estimatedDurationInSeconds: 5 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },

  {
    id: "combine sorbet ingredients",
    instruction: {
      text:
        "Combine the blood orange juice, lemon juice, simple syrup, and salt",
    },
    input: {
      ingredients: [
        {
          foodId: "blood orange juice",
          amount: {
            exactQuantity: 500,
            unitId: "ml",
          },
          optional: false,
        },
        {
          foodId: "simple syrup",
          amount: {
            exactQuantity: 250,
            unitId: "ml",
          },
          optional: false,
        },
        {
          foodId: "lemon juice",
          amount: {
            exactQuantity: 2,
            unitId: "tbsp",
          },
          optional: true,
        },
        {
          foodId: "salt",
          amount: {
            exactQuantity: 0.5,
            unitId: "tsp",
          },
          optional: true,
        },
      ],
      previousStepIds: [],
    },
    time: {
      estimatedDurationInSeconds: 1 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "partially freeze sorbet",
    instruction: {
      text:
        "Place the sorbet in a large, shallow container in the freezer. Churn the mixture every 30 minutes until ice starts to form at the sides of the container.",
    },
    input: {
      ingredients: [],
      previousStepIds: ["combine sorbet ingredients"],
    },
    time: {
      estimatedDurationInSeconds: 2 * 60 * 60,
      timers: [
        {
          durationInSeconds: 30 * 60,
          repeat: true,
        },
      ],
    },
    attentionLevelId: "LOW",
    alternativeStepIds: [],
  },
  {
    id: "mix sorbet and meringue",
    instruction: {
      text:
        "Once the sorbet has started to freeze, take it out of the freezer and beat it together with the Italiane meringue until combined (about 15 seconds)",
    },
    input: {
      ingredients: [
        {
          foodId: "italian meringue",
          amount: {
            quantity: 4,
            roughUnitId: "portion",
          },
          optional: false,
        },
      ],
      previousStepIds: ["partially freeze sorbet"],
    },
    time: {
      estimatedDurationInSeconds: 1 * 60,
      timers: [],
    },
    attentionLevelId: "HIGH",
    alternativeStepIds: [],
  },
  {
    id: "freeze spoom",
    instruction: {
      text:
        "Return the mixture to the same shallow container in the freezer. Leave until frozen, churning every 30 minutes. The meringue mixture may separate from the liquid between each time you churn it - this should happen less and less as the spoom freezes more.",
    },
    input: {
      ingredients: [],
      previousStepIds: ["mix sorbet and meringue"],
    },
    time: {
      estimatedDurationInSeconds: 3 * 60 * 60,
      timers: [
        {
          durationInSeconds: 30 * 60,
          repeat: true,
        },
      ],
    },
    attentionLevelId: "LOW",
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
