import * as attentionLevels from "./attentionLevels.js";
import * as units from "./units.js";
import * as roughUnits from "./roughUnits.js";

export function register(dependencyContainer) {
  [attentionLevels, units, roughUnits].forEach((service) => {
    service.register(dependencyContainer);
  });
}
