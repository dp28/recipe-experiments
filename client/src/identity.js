import cuid from "cuid";

export function withNewId(action) {
  return {
    ...action,
    payload: {
      ...(action.payload || {}),
      id: cuid(),
    },
  };
}
