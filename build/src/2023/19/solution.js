const partDescriptionRegExp =
  /^\{x=(?<xValue>\d+),m=(?<mValue>\d+),a=(?<aValue>\d+),s=(?<sValue>\d+)\}/;
const processRegExp = /^(?<id>\w+){(?<serializedSteps>[^}]+)}$/;
export const isCondition = action => action.type === 'condition';
export const isPointer = action => action.type === 'pointer';
export const isApproved = action => action.type === 'approved';
export const isRejected = action => action.type === 'rejected';
export const parseOperator = operator => {
  switch (operator) {
    case '<':
      return 'lt';
    case '>':
      return 'gt';
    case '=':
      return 'eq';
    default:
      throw new Error('Invalid operator');
  }
};
export function parseProcessStep(serializedProcessStep) {
  if ('A' === serializedProcessStep) {
    return { type: 'approved' };
  }
  if ('R' === serializedProcessStep) {
    return { type: 'rejected' };
  }
  if (/^\w+$/.test(serializedProcessStep)) {
    return { type: 'pointer', to: serializedProcessStep };
  }
  const conditionRegex = /(?<category>[xmas])(?<operator>[<>=])(?<value>\d+):(?<ifTrueStep>\w+)/;
  if (conditionRegex.test(serializedProcessStep)) {
    const matches = conditionRegex.exec(serializedProcessStep);
    const ifTrue = parseProcessStep(matches?.groups?.ifTrueStep);
    const comparison = parseOperator(matches?.groups?.operator);
    return {
      type: 'condition',
      category: matches?.groups?.category,
      value: Number(matches?.groups?.value),
      comparison,
      ifTrue,
    };
  }
  throw new Error('Invalid serialized process step');
}
export function parsePartDescription(serializedPartDescription) {
  const matches = partDescriptionRegExp.exec(serializedPartDescription);
  return {
    x: Number(matches?.groups?.xValue),
    m: Number(matches?.groups?.mValue),
    a: Number(matches?.groups?.aValue),
    s: Number(matches?.groups?.sValue),
  };
}
export function parseProcess(serializedProcess) {
  const matches = processRegExp.exec(serializedProcess);
  return {
    id: matches?.groups?.id,
    steps: matches?.groups?.serializedSteps.split(',').map(parseProcessStep),
  };
}
export const parseWorkSheet = input => ({
  processes: input.filter(line => processRegExp.test(line)).map(parseProcess),
  partDescriptions: input
    .filter(line => partDescriptionRegExp.test(line))
    .map(parsePartDescription),
});
export const getProcessMap = processes =>
  processes.reduce(
    (acc, { id, steps }) => ({
      ...acc,
      [id]: steps,
    }),
    {},
  );
export const isPartApproved = (part, processes) => {
  let nextState = { part, processId: 'in', stepIndex: 0 };
  let count = 0;
  while (count < 1_000_000_000) {
    const process = processes[nextState.processId];
    const step = process[nextState.stepIndex];
    if (isApproved(step)) {
      return true;
    }
    if (isRejected(step)) {
      return false;
    }
    if (isPointer(step)) {
      nextState = { ...nextState, processId: step.to, stepIndex: 0 };
    } else if (isCondition(step)) {
      const isApproved = isCondtionApproved(nextState, step);
      if (typeof isApproved === 'boolean') {
        return isApproved;
      }
      nextState = isApproved;
    }
    count++;
  }
};
export const isCondtionApproved = (nextState, step) => {
  const value = nextState.part[step.category];
  if (
    (step.comparison === 'eq' && value === step.value) ||
    (step.comparison === 'gt' && value > step.value) ||
    (step.comparison === 'lt' && value < step.value)
  ) {
    if (isApproved(step.ifTrue)) {
      return true;
    }
    if (isRejected(step.ifTrue)) {
      return false;
    }
    if (isPointer(step.ifTrue)) {
      return { ...nextState, processId: step.ifTrue.to, stepIndex: 0 };
    }
  }
  return { ...nextState, stepIndex: nextState.stepIndex + 1 };
};
export const getApprovedSum = input => {
  const workSheet = parseWorkSheet(input);
  const processes = getProcessMap(workSheet.processes);
  return workSheet.partDescriptions
    .filter(part => isPartApproved(part, processes))
    .reduce((acc, part) => acc + part.x + part.m + part.a + part.s, 0);
};
