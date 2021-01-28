export const AttentionLevelsById = {
  TOTAL: {
    id: "TOTAL",
    label: "Total",
    description:
      "An activity that requires your complete attention - you can't do anything else at the same time.",
  },
  HIGH: {
    id: "HIGH",
    label: "High",
    description:
      "An activity that requires most of your attention, but you can take short breaks (eg chopping vegetables).",
  },
  LOW: {
    id: "LOW",
    label: "Low",
    description:
      "An activity that only requires your attention every so often (eg roasting meat).",
  },
  NONE: {
    id: "NONE",
    label: "None",
    description:
      "An activity that doesn't require any of your attention (eg setting a cake aside to cool)",
  },
};

export const AttentionLevels = Object.values(AttentionLevelsById);
