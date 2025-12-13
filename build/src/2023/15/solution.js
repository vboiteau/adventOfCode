export const getInstructionResult = instruction => {
  return instruction.split('').reduce((sum, char) => {
    const ascii = char.charCodeAt(0);
    return ((sum + ascii) * 17) % 256;
  }, 0);
};
export const getResult = hashList => {
  const instructions = hashList
    .split(',')
    .map(instruction => instruction.trim())
    .filter(Boolean);
  const results = instructions.map(getInstructionResult);
  return results.reduce((sum, result) => sum + result, 0);
};
export const getLensPower = hashList => {
  const instructions = hashList
    .split(',')
    .map(instruction => instruction.trim())
    .filter(Boolean);
  const lens = new Array(256);
  for (const instruction of instructions) {
    if (instruction.includes('-')) {
      processMinusInstruction(lens, instruction);
    } else if (instruction.includes('=')) {
      processEqualInstruction(lens, instruction);
    }
  }
  return lens.reduce((lensSum, box, boxNumber) => {
    return (
      lensSum +
      box.reduce(
        (boxSum, lens, lenIndex) => boxSum + lens.focalLength * (lenIndex + 1) * (boxNumber + 1),
        0,
      )
    );
  }, 0);
};
const processMinusInstruction = (lens, instruction) => {
  const [label] = instruction.split('-');
  const boxNumber = getInstructionResult(label);
  if (!lens[boxNumber]) {
    lens[boxNumber] = [];
  }
  const toRemove = lens[boxNumber].findIndex(lens => lens.label === label);
  if (toRemove !== -1) {
    lens[boxNumber].splice(toRemove, 1);
  }
};
const processEqualInstruction = (lens, instruction) => {
  const [label, focalLength] = instruction.split('=');
  const boxNumber = getInstructionResult(label);
  if (!lens[boxNumber]) {
    lens[boxNumber] = [];
  }
  const lensIndex = lens[boxNumber].findIndex(lens => lens.label === label);
  if (lensIndex !== -1) {
    lens[boxNumber].splice(lensIndex, 1, { label, focalLength: Number(focalLength) });
  } else {
    lens[boxNumber].push({ label, focalLength: Number(focalLength) });
  }
};
