export const AttentionLevelsById = {
  TOTAL: {
    id: "TOTAL",
    label: "Total",
    description:
      "An activity that requires your complete attention - you can't do anything else at the same time.",
    ordering: 1,
  },
  HIGH: {
    id: "HIGH",
    label: "High",
    description:
      "An activity that requires most of your attention, but you can take short breaks (eg chopping vegetables).",
    ordering: 2,
  },
  LOW: {
    id: "LOW",
    label: "Low",
    description:
      "An activity that only requires your attention every so often (eg roasting meat).",
    ordering: 3,
  },
  NONE: {
    id: "NONE",
    label: "None",
    description:
      "An activity that doesn't require any of your attention (eg setting a cake aside to cool)",
    ordering: 4,
  },
};

export const AttentionLevelsFetcher = {
  loadAll: async () => Object.values(AttentionLevelsById),
  find: async (id) => AttentionLevelsById[id],
  findMany: async (ids) =>
    ids.map((id) => AttentionLevelsById[id]).filter(Boolean),
};
