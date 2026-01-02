interface Range {
  start: number;
  end: number;
}
type Ranges = Array<Range>;
type Ingredients = Array<number>;
interface DatabaseExport {
  ingredients: Ingredients;
  ranges: Ranges;
}

const parseInput = (input: string[]): DatabaseExport => {
  return input.reduce(
    (current, line) => {
      if (line.indexOf('-') > -1) {
        const [start, end] = line.split('-').map(Number);
        current.ranges.push({ start, end });
      } else if (line.length > 0) {
        current.ingredients.push(Number(line));
      }
      return current;
    },
    { ingredients: [], ranges: [] },
  );
};

const consolidateRanges = (ranges: Ranges): Ranges => {
  const sortedRanges = ranges.toSorted((a, b) => a.start - b.start);
  for (let i = 0; i < sortedRanges.length - 1; i++) {
    while (sortedRanges[i + 1] && sortedRanges[i].end >= sortedRanges[i + 1].start) {
      sortedRanges.splice(i, 2, {
        start: sortedRanges[i].start,
        end: Math.max(sortedRanges[i].end, sortedRanges[i + 1].end),
      });
    }
  }
  return sortedRanges;
};

const getFreshIngredients = (input: string[]): Ingredients => {
  const { ingredients, ranges } = parseInput(input);
  const consolidatedRanges = consolidateRanges(ranges);
  const freshIngredients = ingredients.filter(ingredient =>
    consolidatedRanges.some(range => ingredient >= range.start && ingredient <= range.end),
  );
  return freshIngredients;
};

export const getAvailableFreshIngredientsCount = (input: string[]): number => {
  return getFreshIngredients(input).length;
};

export const getTotalFreshIngredientsCount = (input: string[]): number => {
  const { ranges } = parseInput(input);
  const consolidatedRanges = consolidateRanges(ranges);
  return consolidatedRanges.reduce((total, range) => total + (range.end - range.start + 1), 0);
};
