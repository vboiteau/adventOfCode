interface Instruction {
  type: string;
  value: number;
  visited: boolean;
}

interface Execution {
  accumulator: number;
  lastIndex: number;
}

export function getAccumulatorBeforeSecondVisit(
  fileLines: Array<string>
): number {
  const instructions: Array<Instruction> =
    getInstructionsFromFileLines(fileLines);
  const execution: Execution = executeProgram(instructions);
  return execution.accumulator;
}

export function fixProgram(fileLines: Array<string>): number {
  const instructions: Array<Instruction> =
    getInstructionsFromFileLines(fileLines);
  const failedInstructions: Array<Instruction> =
    cloneInstructions(instructions);
  executeProgram(failedInstructions);
  const instructionsToChangeBasedOnBrokenExecution: Array<number> =
    failedInstructions
      .map((instruction: Instruction, index: number) =>
        instruction.visited && ['jmp', 'nop'].includes(instruction.type)
          ? index
          : false
      )
      .filter(index => index !== false);
  for (
    let i = 0, len = instructionsToChangeBasedOnBrokenExecution.length;
    i < len;
    i++
  ) {
    const instructionToRemapIndex: number =
      instructionsToChangeBasedOnBrokenExecution[i];
    const currentInstructions: Array<Instruction> =
      cloneInstructions(instructions);
    const typeToSwap = currentInstructions[instructionToRemapIndex].type;
    currentInstructions[instructionToRemapIndex].type =
      typeToSwap === 'jmp' ? 'nop' : 'jmp';
    const execution = executeProgram(currentInstructions);
    if (execution.lastIndex >= currentInstructions.length) {
      return execution.accumulator;
    }
  }
  return 0;
}

function executeProgram(instructions: Array<Instruction>): Execution {
  let nextInstructionIndex = 0;
  let accumulator = 0;
  while (
    instructions[nextInstructionIndex] &&
    !instructions[nextInstructionIndex].visited
  ) {
    instructions[nextInstructionIndex].visited = true;
    if (instructions[nextInstructionIndex].type === 'acc') {
      accumulator += instructions[nextInstructionIndex].value;
    }
    nextInstructionIndex +=
      instructions[nextInstructionIndex].type === 'jmp'
        ? instructions[nextInstructionIndex].value
        : 1;
  }
  return {accumulator, lastIndex: nextInstructionIndex};
}

function getInstructionsFromFileLines(
  fileLines: Array<string>
): Array<Instruction> {
  return fileLines.map((fileLine: string) => {
    const {type, value} = fileLine.match(
      /^(?<type>acc|nop|jmp)\s(?<value>[+-]\d+)$/
    ).groups;
    return {
      type,
      value: parseInt(value),
      visited: false,
    };
  });
}

function cloneInstructions(
  instructions: Array<Instruction>
): Array<Instruction> {
  return [...instructions.map(instruction => ({...instruction}))];
}
