type ResultType =
  | 'Five of a Kind'
  | 'Four of a Kind'
  | 'Full House'
  | 'Three of a Kind'
  | 'Two Pair'
  | 'Pair'
  | 'High Card';

interface CardHand {
  type: ResultType;
  cards: string[];
  bid: number;
}

const cardStrengths = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const cardStrengthsWithJoker = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const handTypeStrength: ResultType[] = [
  'High Card',
  'Pair',
  'Two Pair',
  'Three of a Kind',
  'Full House',
  'Four of a Kind',
  'Five of a Kind',
];

function getHandType(groupedCards: Record<string, number>): ResultType {
  switch (Object.values(groupedCards).length) {
    case 1:
      return 'Five of a Kind';
    case 2:
      return Math.max(...Object.values(groupedCards)) === 4 ? 'Four of a Kind' : 'Full House';
    case 3:
      return Math.max(...Object.values(groupedCards)) === 3 ? 'Three of a Kind' : 'Two Pair';
    case 4:
      return 'Pair';
    default:
      return 'High Card';
  }
}

function getHandTypeWithJoker(groupedCards: Record<string, number>): ResultType {
  const hasJoker = Object.keys(groupedCards).includes('J');
  switch (Object.values(groupedCards).length) {
    case 1:
      return 'Five of a Kind';
    case 2:
      return getTwoGroupsHandTypeWithJoker(groupedCards, hasJoker);
    case 3:
      return getThreeGroupsHandTypeWithJoker(groupedCards, hasJoker);
    case 4:
      return getFourGroupsHandTypeWithJoker(groupedCards, hasJoker);
    default:
      return getFiveGroupsHandTypeWithJoker(groupedCards, hasJoker);
  }
}

const getTwoGroupsHandTypeWithJoker = (
  groupedCards: Record<string, number>,
  hasJoker: boolean,
): ResultType => {
  if (hasJoker) {
    return 'Five of a Kind';
  }
  return Math.max(...Object.values(groupedCards)) === 4 ? 'Four of a Kind' : 'Full House';
};

const getThreeGroupsHandTypeWithJoker = (
  groupedCards: Record<string, number>,
  hasJoker: boolean,
): ResultType => {
  if (hasJoker) {
    if (Math.max(...Object.values(groupedCards)) === 3) {
      return 'Four of a Kind';
    }
    return groupedCards['J'] === 2 ? 'Four of a Kind' : 'Full House';
  }
  return Math.max(...Object.values(groupedCards)) === 3 ? 'Three of a Kind' : 'Two Pair';
};

const getFourGroupsHandTypeWithJoker = (
  groupedCards: Record<string, number>,
  hasJoker: boolean,
): ResultType => {
  if (hasJoker) {
    return 'Three of a Kind';
  }
  return 'Pair';
};

const getFiveGroupsHandTypeWithJoker = (
  groupedCards: Record<string, number>,
  hasJoker: boolean,
): ResultType => {
  if (hasJoker) {
    return 'Pair';
  }
  return 'High Card';
};

function readCardHand(line: string): CardHand {
  const [handDesc, bid] = line.split(' ');
  const cards = handDesc.split('');
  const groupedCard: Record<string, number> = cards.reduce(
    (acc, card) => {
      if (!acc[card]) {
        acc[card] = 0;
      }
      acc[card]++;
      return acc;
    },
    {} as Record<string, number>,
  );
  return {
    type: getHandType(groupedCard),
    cards,
    bid: Number(bid),
  };
}

function readCardHandWithJoker(line: string): CardHand {
  const [handDesc, bid] = line.split(' ');
  const cards = handDesc.split('');
  const groupedCard: Record<string, number> = cards.reduce(
    (acc, card) => {
      if (!acc[card]) {
        acc[card] = 0;
      }
      acc[card]++;
      return acc;
    },
    {} as Record<string, number>,
  );
  return {
    type: getHandTypeWithJoker(groupedCard),
    cards,
    bid: Number(bid),
  };
}

function sortByStrongestCard(hands: CardHand[], position: number, strengths: string[]): CardHand[] {
  if (position === 4) {
    return strengths.flatMap(cardStrength =>
      hands.filter(({ cards }) => cards[position] === cardStrength),
    );
  }
  return strengths.flatMap(cardStrength =>
    sortByStrongestCard(
      hands.filter(({ cards }) => cards[position] === cardStrength),
      position + 1,
      strengths,
    ),
  );
}

export function solution01(lines: string[]): number {
  const hands = lines.map(readCardHand);
  const orderedHands = handTypeStrength.flatMap(handType =>
    sortByStrongestCard(
      hands.filter(({ type }) => type === handType),
      0,
      cardStrengths,
    ),
  );
  return orderedHands.reduce((sum, { bid }, index) => sum + bid * (index + 1), 0);
}

export function solution02(lines: string[]): number {
  const hands = lines.map(readCardHandWithJoker);
  const orderedHands = handTypeStrength.flatMap(handType =>
    sortByStrongestCard(
      hands.filter(({ type }) => type === handType),
      0,
      cardStrengthsWithJoker,
    ),
  );
  return orderedHands.reduce((sum, { bid }, index) => sum + bid * (index + 1), 0);
}
