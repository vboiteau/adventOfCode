interface Cell {
  value: number;
  marked: boolean;
}

type BoardRow = Array<Cell>;

type Board = Array<BoardRow>;

interface BoardState {
  board: Board;
  completedWithNumber: number;
  completed: boolean;
  completionPosition: number;
}

const splitBoards = (boardLines: Array<string>): Array<Board> =>
  boardLines.reduce((currentBoards: Array<Board>, line, index) => {
    const caseLine: BoardRow = line
      .split(' ')
      .filter(Boolean)
      .map(value => Number.parseInt(value))
      .map(value => ({
        value,
        marked: false,
      }));
    if (!currentBoards[Math.floor(index / 5)]) {
      currentBoards[Math.floor(index / 5)] = [];
    }
    currentBoards[Math.floor(index / 5)][index % 5] = caseLine;
    return currentBoards;
  }, []);

const getDrawnedNumbers = (drawnedNumbers: string): Array<number> =>
  drawnedNumbers.split(',').map(value => Number.parseInt(value));

function getBoardStates([
  numbers,
  ...boardLines
]: Array<string>): Array<BoardState> {
  const drawnedNumbers: Array<number> = getDrawnedNumbers(numbers);

  const boards = splitBoards(boardLines);

  const boardStates: Array<BoardState> = new Array(boards.length).fill({
    completed: false,
    completionPosition: -1,
    completedWithNumber: -1,
    board: [],
  });

  let completionPosition = 0;

  for (const drawnedNumber of drawnedNumbers) {
    if (boardStates.every(({completed}) => completed)) {
      break;
    }
    boards.forEach((board, boardIndex) => {
      if (!boardStates[boardIndex].completed) {
        board.forEach(line => {
          line.forEach((lineColumn, columnIndex) => {
            if (lineColumn.value === drawnedNumber) {
              lineColumn.marked = true;
              const column = board.map(row => row[columnIndex]);
              if (
                column.every(({marked}) => marked) ||
                line.every(({marked}) => marked)
              ) {
                boardStates[boardIndex] = {
                  completionPosition,
                  completedWithNumber: drawnedNumber,
                  completed: true,
                  board,
                };
                completionPosition++;
              }
            }
          });
        });
      }
    });
  }
  return boardStates;
}

const getBoardLineScore = (boardLine: BoardRow): number =>
  boardLine
    .filter(({marked}) => !marked)
    .reduce((lineSum, {value}) => lineSum + value, 0);

const getBoardScore = (board: Board): number =>
  board.reduce(
    (boardSum: number, line: BoardRow) => boardSum + getBoardLineScore(line),
    0
  );

const getBoardStateScore = ({board, completedWithNumber}: BoardState): number =>
  getBoardScore(board) * completedWithNumber;

export const getWinningScore = (lines: Array<string>): number => {
  const [winningBoardState] = getBoardStates(lines).sort(
    (a, b) => a.completionPosition - b.completionPosition
  );
  return getBoardStateScore(winningBoardState);
};

export const getLosingScore = (lines: Array<string>): number => {
  const [losingBoardState] = getBoardStates(lines).sort(
    (a, b) => b.completionPosition - a.completionPosition
  );
  return getBoardStateScore(losingBoardState);
};
