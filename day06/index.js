export function partOne(input) {
  return [...input].findIndex((_, i, arr) => areLastNDifferent(arr, i, 4));
}
export function partTwo(input) {
  return [...input].findIndex((_, i, arr) => areLastNDifferent(arr, i, 14));
}

function areLastNDifferent(arr, i, n) {
  const lastN = arr.slice(i - n, i);
  if (lastN.length < n) {
    return false;
  }
  return lastN.every((letter, i) => lastN.indexOf(letter) === i);
}
