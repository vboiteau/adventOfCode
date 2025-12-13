const bigCaveRegex = /[A-Z]+/;
const noDoubleSmallCaveVisit = path =>
  Object.values(
    path
      .filter(({ isBigCave }) => !isBigCave)
      .reduce((visits, { label }) => {
        if (!visits[label]) {
          visits[label] = 0;
        }
        visits[label] += 1;
        return visits;
      }, {}),
  ).every(value => value === 1);
const findPaths = paths => {
  for (const path of paths) {
    if (path[path.length - 1].label === 'end') {
      continue;
    }
    for (const cave of path[path.length - 1].links) {
      if (cave.isBigCave || (!cave.isBigCave && !path.find(({ label }) => label === cave.label))) {
        paths.push([...path, cave]);
      }
    }
  }
  return paths.filter(path => path[path.length - 1].label === 'end');
};
const findPathsWithDouble = paths => {
  for (const path of paths) {
    if (path[path.length - 1].label === 'end') {
      continue;
    }
    for (const cave of path[path.length - 1].links) {
      if (
        cave.isBigCave ||
        (!cave.isBigCave && !path.find(({ label }) => label === cave.label)) ||
        (!cave.isBigCave && noDoubleSmallCaveVisit(path) && cave.label !== 'start')
      ) {
        paths.push([...path, cave]);
      }
    }
  }
  return paths.filter(path => path[path.length - 1].label === 'end');
};
const getCaves = caveSystem => {
  const caves = [];
  caveSystem.forEach(caveLink => {
    const [caveALabel, caveBLabel] = caveLink.split('-');
    if (!caves.find(({ label }) => label === caveALabel)) {
      caves.push({
        label: caveALabel,
        isBigCave: bigCaveRegex.test(caveALabel),
        links: [],
      });
    }
    if (!caves.find(({ label }) => label === caveBLabel)) {
      caves.push({
        label: caveBLabel,
        isBigCave: bigCaveRegex.test(caveBLabel),
        links: [],
      });
    }
    const caveA = caves.find(({ label }) => label === caveALabel);
    const caveB = caves.find(({ label }) => label === caveBLabel);
    if (caveA && caveB) {
      caveA.links.push(caveB);
      caveB.links.push(caveA);
    }
  });
  return caves;
};
export const countPaths = caveSystem => {
  const caves = getCaves(caveSystem);
  const paths = findPaths([[caves.find(({ label }) => label === 'start')]]);
  return paths.length;
};
export const countPathsWithDoubleVisits = caveSystem => {
  const caves = getCaves(caveSystem);
  const paths = findPathsWithDouble([[caves.find(({ label }) => label === 'start')]]);
  return paths.length;
};
