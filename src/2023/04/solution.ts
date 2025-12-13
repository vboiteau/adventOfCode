interface Card {
  winningNumbers: Array<number>;
  numbers: Array<number>;
}

export const readCard = (line: string): Card => {
  const cardContent = line.split(':')[1].trim();
  const [winningNumbers, numbers] = cardContent.split('|');
  return {
    winningNumbers: winningNumbers.trim().split(' ').filter(Boolean).map(Number),
    numbers: numbers.trim().split(' ').filter(Boolean).map(Number),
  };
};

export const solution01 = (lines: Array<string>): number => {
  const matchingNumbers = lines
    .map((line, index) => {
      const { winningNumbers, numbers } = readCard(line);
      return winningNumbers.filter(number => numbers.includes(number));
    })
    .filter(numbers => numbers.length > 0);
  return matchingNumbers.reduce((acc, numbers) => acc + Math.pow(2, numbers.length - 1), 0);
};

export const solution02 = (lines: Array<string>): number => {
  const cards = lines.map(readCard);

  const cardCopies = new Array(cards.length).fill(1);
  for (let i = 0; i < cards.length; i++) {
    const { winningNumbers, numbers } = cards[i];
    const numberOfCardToCopy = winningNumbers.filter(number => numbers.includes(number)).length;
    for (let j = 1; j <= numberOfCardToCopy; j++) {
      if (i + j < cardCopies.length) {
        cardCopies[i + j] += cardCopies[i];
      }
    }
  }
  return cardCopies.reduce((sum, copy) => sum + copy, 0);
};
