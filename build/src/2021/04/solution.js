const splitBoards = boardLines =>
  boardLines.reduce((currentBoards, line, index) => {
    const caseLine = line
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
const getDrawnedNumbers = drawnedNumbers =>
  drawnedNumbers.split(',').map(value => Number.parseInt(value));
function getBoardStates([numbers, ...boardLines]) {
  const drawnedNumbers = getDrawnedNumbers(numbers);
  const boards = splitBoards(boardLines);
  const boardStates = new Array(boards.length).fill({
    completed: false,
    completionPosition: -1,
    completedWithNumber: -1,
    board: [],
  });
  let completionPosition = 0;
  for (const drawnedNumber of drawnedNumbers) {
    if (boardStates.every(({ completed }) => completed)) {
      break;
    }
    boards.forEach((board, boardIndex) => {
      if (!boardStates[boardIndex].completed) {
        completionPosition = processBoardLineForDrawnNumber({
          drawnedNumber,
          board,
          completionPosition,
          boardIndex,
          boardStates,
        });
      }
    });
  }
  return boardStates;
}
const processBoardLineForDrawnNumber = ({
  drawnedNumber,
  board,
  completionPosition,
  boardIndex,
  boardStates,
}) =>
  board.reduce(
    (current, line) =>
      line.reduce((currentLine, lineColumn, columnIndex) => {
        if (lineColumn.value === drawnedNumber) {
          lineColumn.marked = true;
          const column = board.map(row => row[columnIndex]);
          if (column.every(({ marked }) => marked) || line.every(({ marked }) => marked)) {
            boardStates[boardIndex] = {
              completionPosition: currentLine,
              completedWithNumber: drawnedNumber,
              completed: true,
              board,
            };
            return currentLine + 1;
          }
        }
        return currentLine;
      }, current),
    completionPosition,
  );
const getBoardLineScore = boardLine =>
  boardLine.filter(({ marked }) => !marked).reduce((lineSum, { value }) => lineSum + value, 0);
const getBoardScore = board =>
  board.reduce((boardSum, line) => boardSum + getBoardLineScore(line), 0);
const getBoardStateScore = ({ board, completedWithNumber }) =>
  getBoardScore(board) * completedWithNumber;
export const getWinningScore = lines => {
  const [winningBoardState] = getBoardStates(lines).sort(
    (a, b) => a.completionPosition - b.completionPosition,
  );
  return getBoardStateScore(winningBoardState);
};
export const getLosingScore = lines => {
  const [losingBoardState] = getBoardStates(lines).sort(
    (a, b) => b.completionPosition - a.completionPosition,
  );
  return getBoardStateScore(losingBoardState);
};
