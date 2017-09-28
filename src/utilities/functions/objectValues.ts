interface IterableObject<T> {
  [k: string]: T;
}

/**
 * Iterate over enumarable keys of object and return an array
 *
 * @param {object} [obj] The object to iterate over
 */
export default function objectValues<T>(obj: object) {
  return Object.keys(obj).map(k => (<IterableObject<T>>obj)[k]);
}
