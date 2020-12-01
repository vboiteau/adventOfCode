export function getSeatId(seatIndication) {
  const row = parseInt(
    seatIndication.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'),
    2
  );
  const seat = parseInt(
    seatIndication.substr(7).replace(/L/g, '0').replace(/R/g, '1'),
    2
  );
  return row * 8 + seat;
}

export function getHighestSeatId(seatIndications) {
  return seatIndications.reduce(
    (max, seatIndication) => Math.max(max, getSeatId(seatIndication)),
    0
  );
}

export function findMissingSeat(seatIndications) {
  const seats = seatIndications
    .map(seatIndication => getSeatId(seatIndication))
    .sort((a, b) => a - b);
  return seats.find(current => !seats.includes(current + 1)) + 1;
}
