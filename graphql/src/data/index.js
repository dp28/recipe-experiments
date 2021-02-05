import * as attentionLevels from "./attentionLevels.js";
import * as units from "./units.js";
import * as roughUnits from "./roughUnits.js";
import * as foods from "./foods.js";

export function register(dependencyContainer) {
  [attentionLevels, units, roughUnits, foods].forEach((service) => {
    service.register(dependencyContainer);
  });
}
