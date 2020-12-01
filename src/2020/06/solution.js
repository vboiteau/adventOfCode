function getGroupBlock(fileContent) {
  return fileContent.split('\n\n');
}

export function getSumAnsweredAnyone(fileContent) {
  return getGroupBlock(fileContent)
    .map(group => new Set(group.replace(/\n/g, '').split('')))
    .reduce((sum, set) => sum + set.size, 0);
}

export function getSumAnsweredEveryone(fileContent) {
  return getGroupBlock(fileContent)
    .filter(groupContent => groupContent.length)
    .map(group => {
      const expectedCount = (group.match(/\n\w/g) || []).length + 1;
      const letters = group.split('\n')[0].split('');
      return letters.filter(
        letter => group.match(new RegExp(letter, 'g')).length === expectedCount
      ).length;
    })
    .reduce((sum, answerCount) => sum + answerCount, 0);
}
