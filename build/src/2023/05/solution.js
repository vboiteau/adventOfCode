const readAlmanac = lines => {
  const [seedLine, ...mappingLines] = lines;
  return {
    seeds: seedLine.split(':')[1].trim().split(' ').filter(Boolean).map(Number),
    mappings: mappingLines.reduce((acc, line) => {
      if (!line.endsWith(':')) {
        const [destinationStart, sourceStart, length] = line
          .trim()
          .split(' ')
          .filter(Boolean)
          .map(Number);
        acc[acc.length - 1].push({ destinationStart, sourceStart, length });
      } else {
        acc.push([]);
      }
      return acc;
    }, []),
  };
};
export const solution01 = lines => {
  const { seeds, mappings } = readAlmanac(lines);
  const locations = [];
  for (const seed of seeds) {
    const result = mappings.reduce((acc, mapping) => {
      const mappingToApply = mapping.find(({ sourceStart, length }) => {
        return acc >= sourceStart && acc < sourceStart + length;
      });
      if (!mappingToApply) {
        return acc;
      }
      return mappingToApply.destinationStart + (acc - mappingToApply.sourceStart);
    }, seed);
    locations.push(result);
  }
  return Math.min(...locations);
};
export const solution02 = lines => {
  const { seeds, mappings } = readAlmanac(lines);
  let groups = getGroupsForSeeds(seeds);
  for (const mapping of mappings) {
    const newGroups = [];
    for (const { destinationStart, sourceStart, length } of mapping) {
      const groupsFromPrevious = [...groups];
      for (let groupIndex = 0; groupIndex < groupsFromPrevious.length; groupIndex++) {
        const group = groupsFromPrevious[groupIndex];
        getNewGroup(
          group,
          destinationStart,
          sourceStart,
          length,
          groupsFromPrevious,
          groupIndex,
          newGroups,
        );
      }
      groups = [...groupsFromPrevious.filter(Boolean)];
    }
    groups = [...groups, ...newGroups];
  }
  const sortedGroups = groups.toSorted((a, b) => a[0] - b[0]);
  return sortedGroups[0][0];
};
const getGroupsForSeeds = seeds => {
  const groups = [];
  for (let i = 0; i < seeds.length; i += 2) {
    groups.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }
  return groups;
};
const getNewGroup = (
  group,
  destinationStart,
  sourceStart,
  length,
  groupsFromPrevious,
  groupIndex,
  newGroups,
) => {
  if (group[0] >= sourceStart && group[1] < sourceStart + length) {
    groupsFromPrevious.splice(groupIndex, 1, null);
    newGroups.push([
      destinationStart + (group[0] - sourceStart),
      destinationStart + (group[1] - sourceStart),
    ]);
  } else if (group[0] <= sourceStart && group[1] >= sourceStart) {
    if (group[0] !== sourceStart) {
      groupsFromPrevious.splice(groupIndex, 1, [group[0], sourceStart - 1]);
    }
    const newGroup = [destinationStart, destinationStart + (group[1] - sourceStart)];
    newGroups.push(newGroup);
  } else if (group[0] <= sourceStart + length && group[1] >= sourceStart + length) {
    if (group[1] !== sourceStart + length) {
      groupsFromPrevious.splice(groupIndex, 1, [sourceStart + length + 1, group[1]]);
    }
    const newGroup = [destinationStart + (group[0] - sourceStart), destinationStart + length];
    newGroups.push(newGroup);
  }
};
