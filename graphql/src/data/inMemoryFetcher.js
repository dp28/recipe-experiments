export function buildFetcher(array) {
  const mapById = array.reduce((result, object) => {
    result[object.id] = object;
    return result;
  }, {});

  return {
    loadAll: async () => array,
    find: async (id) => mapById[id],
    findMany: async (ids) => ids.map((id) => mapById[id]).filter(Boolean),
  };
}

export function buildRegisterFetcher(name, array) {
  return (dependencyContainer) => {
    dependencyContainer.register({
      [name + "Fetcher"]: buildFetcher(array),
    });
  };
}
