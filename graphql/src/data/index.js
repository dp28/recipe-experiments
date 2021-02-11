import * as attentionLevels from "./attentionLevels.js";
import * as units from "./units.js";
import * as roughUnits from "./roughUnits.js";
import * as foods from "./foods.js";
import * as recipes from "./recipes.js";
import * as steps from "./steps.js";

export function register(dependencyContainer) {
  [attentionLevels, units, roughUnits, foods, steps, recipes].forEach(
    (service) => {
      service.register(dependencyContainer);
    }
  );
}
