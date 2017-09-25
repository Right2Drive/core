export function numSubstrings(str: string, substr: string) {
  return str.split(substr).length - 1;
}
