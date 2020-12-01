export function getProductOfBusNumberAndTimeToWait(notesFile: string): number {
  const notes: Array<string> = notesFile.split('\n');
  const timeReady: number = parseInt(notes[0]);
  const buses: Array<number> = notes[1]
    .split(',')
    .filter(bus => bus !== 'x')
    .map(bus => parseInt(bus));
  const sortByCloseToTimeReady = buses.sort(
    (a, b) => a - (timeReady % a) - (b - (timeReady % b))
  );
  return (
    (sortByCloseToTimeReady[0] - (timeReady % sortByCloseToTimeReady[0])) *
    sortByCloseToTimeReady[0]
  );
}

interface OrderedBus {
  index: bigint;
  id: bigint;
}

export function getTimestampWithSequence(buses: Array<string>): number {
  const orderedBuses: Array<OrderedBus> = buses
    .map((bus, index) =>
      bus !== 'x' ? {index: index, id: parseInt(bus)} : false
    )
    .filter(minuteFromFirst => minuteFromFirst !== false);
  return crt(
    orderedBuses.map(({id}) => id),
    orderedBuses.map(({id, index}) => id - index)
  );
}

function getMinuteFromTarget(target: bigint, bus: bigint): bigint {
  return BigInt(target % bus) && BigInt(bus - (target % bus));
}

function crt(num, rem) {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c, 1);

  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % prod;
}

function mulInv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];

  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}
