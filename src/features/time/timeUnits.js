export const TimeUnitsById = {
  SECOND: {
    id: "SECOND",
    singular: "second",
    plural: "seconds",
    symbol: "s",
    inSeconds: 1,
  },
  MINUTE: {
    id: "MINUTE",
    singular: "minute",
    plural: "minutes",
    symbol: "min",
    inSeconds: 60,
  },
  HOUR: {
    id: "HOUR",
    singular: "hour",
    plural: "hours",
    symbol: "h",
    inSeconds: 60 * 60,
  },
  DAY: {
    id: "DAY",
    singular: "day",
    plural: "days",
    symbol: "d",
    inSeconds: 60 * 60 * 24,
  },
};

export const TimeUnits = Object.values(TimeUnitsById);
