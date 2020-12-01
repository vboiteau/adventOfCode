export function countValidPasswords(passwordLines, validator) {
  return passwordLines.reduce(
    (sum, passwordLine) => sum + validator(passwordLine),
    0
  );
}

export function validateLetterCount(passwordLine) {
  const {
    firstBound: min,
    secondBound: max,
    targetLetter,
    password,
  } = parsePasswordLine(passwordLine);
  const occurence = (password.match(new RegExp(targetLetter, 'g')) || [])
    .length;
  return occurence >= min && occurence <= max;
}

export function validateLetterXOR(passwordLine) {
  const {
    firstBound: firstIndex,
    secondBound: secondIndex,
    targetLetter,
    password,
  } = parsePasswordLine(passwordLine);
  const isTargetFirstIndex = password[firstIndex - 1] === targetLetter;
  const isTargetSecondIndex = password[secondIndex - 1] === targetLetter;
  return (
    (isTargetFirstIndex && !isTargetSecondIndex) ||
    (!isTargetFirstIndex && isTargetSecondIndex)
  );
}

function parsePasswordLine(passwordLine) {
  const regex =
    /^(?<firstBound>\d*)-(?<secondBound>\d*)\s(?<targetLetter>\w):\s(?<password>\w*)$/;
  return passwordLine.match(regex).groups;
}
