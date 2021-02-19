export function sortBy(array, getter) {
  array.sort((a, b) => getter(a) - getter(b));
  return array;
}
