export function createDependencyContainer() {
  const dependencyMap = {};

  function register(namesToFunctions) {
    Object.entries(namesToFunctions).forEach(([name, func]) => {
      dependencyMap[name] = func;
    });
  }

  function resolve(name) {
    return dependencyMap[name];
  }

  return {
    register,
    resolve,
  };
}
