function readStep(step) {
  const {
    groups: { current, left, right },
  } = /^(?<current>[A-Z0-9]{3})\s=\s\((?<left>[A-Z0-9]{3}),\s(?<right>[A-Z0-9]{3})\)$/.exec(step);
  return { current, left, right };
}
function findStep(instruction, steps) {
  return steps.find(({ current }) => instruction === current);
}
function gcb(a, b) {
  while (b != 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
function lcm(a, b) {
  return (a * b) / gcb(a, b);
}
function lcms([a, ...rest]) {
  if (rest.length === 0) {
    return a;
  }
  return lcm(a, lcms(rest));
}
export function solution01([actionsLine, ...stepLines]) {
  const actions = actionsLine.split('');
  const steps = stepLines.map(readStep);
  let stepCount = 0;
  let currentStep = findStep('AAA', steps);
  while (currentStep.current !== 'ZZZ') {
    const currentAction = actions[stepCount % actions.length];
    const nextCurrent = currentAction === 'L' ? currentStep.left : currentStep.right;
    currentStep = findStep(nextCurrent, steps);
    stepCount++;
  }
  return stepCount;
}
export function solution02([actionsLine, ...stepLines]) {
  const actions = actionsLine.split('');
  const steps = stepLines.map(readStep);
  let currentSteps = steps.filter(({ current }) => current[2] === 'A');
  const endSteps = currentSteps.map(cursor => {
    let stepCount = 0;
    let currentStep = cursor;
    while (currentStep.current[2] !== 'Z') {
      const currentAction = actions[stepCount % actions.length];
      const nextCurrent = currentAction === 'L' ? currentStep.left : currentStep.right;
      currentStep = findStep(nextCurrent, steps);
      stepCount++;
    }
    return stepCount;
  });
  return lcms(endSteps);
}
