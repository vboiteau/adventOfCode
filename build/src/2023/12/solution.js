const cache = {};
const trimStart = input => {
  return input.startsWith('.')
    ? input
        .split(/(?<=\.)(?=[^.])/)
        .slice(1)
        .join('')
    : input;
};
const getPossibilities = (input, targets) => {
  const line = `${input} ${targets.join(',')}`;
  if (cache[line]) {
    return cache[line];
  }
  if (targets.length <= 0) {
    return Number(!input.includes('#'));
  }
  if (input.length - targets.reduce((sum, group) => sum + group, 0) - targets.length + 1 < 0) {
    return 0;
  }
  const foundGroup = !input.slice(0, targets[0]).includes('.');
  if (input.length === targets[0]) {
    return Number(foundGroup);
  }
  const possibilities =
    (!input[0].startsWith('#') ? getPossibilities(trimStart(input.slice(1)), targets) : 0) +
    (foundGroup && input[targets[0]] !== '#'
      ? getPossibilities(trimStart(input.slice(targets[0] + 1)), targets.slice(1))
      : 0);
  if (!cache[line]) {
    cache[line] = possibilities;
  }
  return cache[line];
};
export const solution = (input, repeatCount) => {
  return input.reduce((sum, line) => {
    const [message, target] = line.split(' ');
    const repeatedMessage = new Array(repeatCount).fill(message.trim()).join('?');
    const repeatedTarget = new Array(repeatCount)
      .fill(target.trim())
      .join(',')
      .split(',')
      .map(Number);
    const possibilities = getPossibilities(repeatedMessage, repeatedTarget);
    return sum + possibilities;
  }, 0);
};
