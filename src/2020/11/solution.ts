export enum SeatState {
  FLOOR = '.',
  EMPTY = 'L',
  OCCUPIED = '#',
}

interface Boundary {
  bottom: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
}

export function getOccupiedSeatAtTheEnd(
  seatPlan: Array<Array<SeatState>>,
  counter: (
    seatPlan: Array<Array<SeatState>>,
    rowIndex: number,
    columnIndex: number
  ) => number,
  maxOccupied: number
): number {
  let changedSeat = Infinity;
  let pass = 0;
  let currentSeatPlan = cloneSeatPlan(seatPlan);
  while (changedSeat > 0) {
    pass++;
    const nextSeatPlan = cloneSeatPlan(currentSeatPlan);
    changedSeat = 0;
    for (let rowIndex = 0; rowIndex < currentSeatPlan.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < currentSeatPlan[rowIndex].length;
        columnIndex++
      ) {
        nextSeatPlan[rowIndex][columnIndex] = getNextSeatState(
          currentSeatPlan,
          rowIndex,
          columnIndex,
          counter,
          maxOccupied
        );
        changedSeat +=
          currentSeatPlan[rowIndex][columnIndex] ===
          nextSeatPlan[rowIndex][columnIndex]
            ? 0
            : 1;
      }
    }
    currentSeatPlan = nextSeatPlan;
  }
  return currentSeatPlan.reduce(
    (occupiedInPlan, rowOfSeat) =>
      occupiedInPlan +
      rowOfSeat.reduce(
        (occupiedInRow, seat) =>
          occupiedInRow + (seat === SeatState.OCCUPIED ? 1 : 0),
        0
      ),
    0
  );
}

function getNextSeatState(
  seatPlan: Array<Array<SeatState>>,
  rowIndex,
  columnIndex,
  counter: (
    seatPlan: Array<Array<SeatState>>,
    rowIndex: number,
    columnIndex: number
  ) => number,
  maxOccupied: number
): SeatState {
  if (seatPlan[rowIndex][columnIndex] === SeatState.FLOOR) {
    return SeatState.FLOOR;
  }
  const occupiedAdjacentSeats: number = counter(
    seatPlan,
    rowIndex,
    columnIndex
  );
  if (
    seatPlan[rowIndex][columnIndex] === SeatState.EMPTY &&
    occupiedAdjacentSeats === 0
  ) {
    return SeatState.OCCUPIED;
  }
  if (
    seatPlan[rowIndex][columnIndex] === SeatState.OCCUPIED &&
    occupiedAdjacentSeats >= maxOccupied
  ) {
    return SeatState.EMPTY;
  }
  return seatPlan[rowIndex][columnIndex];
}

export function countOccupiedSeatAround(
  seatPlan: Array<Array<SeatState>>,
  rowIndex: number,
  columnIndex: number
): number {
  const boundary: Boundary = {
    bottom: seatPlan.length - 1 > rowIndex,
    left: columnIndex > 0,
    right: seatPlan[rowIndex].length - 1 > columnIndex,
    top: rowIndex > 0,
  };
  return [
    boundary.top && boundary.left && [rowIndex - 1, columnIndex - 1],
    boundary.top && [rowIndex - 1, columnIndex],
    boundary.top && boundary.right && [rowIndex - 1, columnIndex + 1],
    boundary.left && [rowIndex, columnIndex - 1],
    boundary.right && [rowIndex, columnIndex + 1],
    boundary.bottom && boundary.left && [rowIndex + 1, columnIndex - 1],
    boundary.bottom && [rowIndex + 1, columnIndex],
    boundary.bottom && boundary.right && [rowIndex + 1, columnIndex + 1],
  ]
    .filter(adjacentCoords => !!adjacentCoords !== false)
    .reduce(
      (occupied: number, [rowIndex, columnIndex]) =>
        occupied +
        (seatPlan[rowIndex][columnIndex] === SeatState.OCCUPIED ? 1 : 0),
      0
    );
}

export function countOccupiedNextSeat(
  seatPlan: Array<Array<SeatState>>,
  rowIndex: number,
  columnIndex: number
): number {
  const adjacentSeats: Array<Array<number>> = [
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, -1, -1),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, -1, 0),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, -1, 1),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, 0, -1),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, 0, 1),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, 1, -1),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, 1, 0),
    lookupSeatInDirection(seatPlan, rowIndex, columnIndex, 1, 1),
  ];

  const occupiedSeatCount = adjacentSeats
    .filter(adjacentCoords => !!adjacentCoords !== false)
    .reduce(
      (occupied: number, [rowIndex, columnIndex]) =>
        occupied +
        (seatPlan[rowIndex][columnIndex] === SeatState.OCCUPIED ? 1 : 0),
      0
    );
  return occupiedSeatCount;
}

function lookupSeatInDirection(
  seatPlan: Array<Array<SeatState>>,
  rowIndex: number,
  columnIndex: number,
  rowDirection: number,
  columnDirection: number
): Array<number> {
  let currentAdjacentCheck = [
    rowIndex + rowDirection,
    columnIndex + columnDirection,
  ];
  while (!isSeatOutOfBound(seatPlan, currentAdjacentCheck)) {
    if (
      seatPlan[currentAdjacentCheck[0]][currentAdjacentCheck[1]] !==
      SeatState.FLOOR
    ) {
      return currentAdjacentCheck;
    }
    currentAdjacentCheck = [
      currentAdjacentCheck[0] + rowDirection,
      currentAdjacentCheck[1] + columnDirection,
    ];
  }
  return null;
}

function isSeatOutOfBound(
  seatPlan: Array<Array<SeatState>>,
  seat: Array<number>
): boolean {
  const outOfRowBound: boolean = seatPlan.length <= seat[0] || seat[0] < 0;
  const outOfColumnBound: boolean =
    seatPlan[0].length <= seat[1] || seat[1] < 0;
  return outOfRowBound || outOfColumnBound;
}

function cloneSeatPlan(
  seatPlan: Array<Array<SeatState>>
): Array<Array<SeatState>> {
  return [...seatPlan.map(seatRow => [...seatRow])];
}
