import * as attentionLevels from "./attentionLevels.js";
import * as units from "./units.js";

export function register(dependencyContainer) {
  [attentionLevels, units].forEach((service) => {
    service.register(dependencyContainer);
  });
}
