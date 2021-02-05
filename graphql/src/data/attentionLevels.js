import { buildRegisterFetcher } from "./inMemoryFetcher.js";

export const register = buildRegisterFetcher("AttentionLevels", [
  {
    id: "TOTAL",
    label: "Total",
    description:
      "An activity that requires your complete attention - you can't do anything else at the same time.",
    ordering: 1,
  },
  {
    id: "HIGH",
    label: "High",
    description:
      "An activity that requires most of your attention, but you can take short breaks (eg chopping vegetables).",
    ordering: 2,
  },
  {
    id: "LOW",
    label: "Low",
    description:
      "An activity that only requires your attention every so often (eg roasting meat).",
    ordering: 3,
  },
  {
    id: "NONE",
    label: "None",
    description:
      "An activity that doesn't require any of your attention (eg setting a cake aside to cool)",
    ordering: 4,
  },
]);
