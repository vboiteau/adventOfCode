export function countTreeEncountered(treeRows, right, down) {
  const rowLength = treeRows[0].length;
  return treeRows
    .filter((_, index) => !(index % down))
    .reduce(
      (treeCount, row, index) =>
        treeCount + (row[(index * right) % rowLength] === '#'),
      0
    );
}

export function combineSlopes(treeRows, slopes) {
  return slopes.reduce(
    (treeProduct, [right, down]) =>
      treeProduct * countTreeEncountered(treeRows, right, down),
    1
  );
}
