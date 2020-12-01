interface Step {
    current: string;
    left: string;
    right: string;
}

function readStep(step: string): Step {
    const { groups: { current, left, right } } = /^(?<current>[A-Z0-9]{3})\s=\s\((?<left>[A-Z0-9]{3}),\s(?<right>[A-Z0-9]{3})\)$/.exec(step);
    return { current, left, right };
}

function findStep(instruction: string, steps: Step[]): Step {
    return steps.find(({ current }) => instruction === current);
}

function gcb(a: number, b: number): number {
    while (b != 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function lcm(a: number, b: number): number {
    return (a * b) / gcb(a, b);
}

function lcms([a, ...rest]: number[]): number {
    if (rest.length === 0) {
        return a;
    }
    return lcm(a, lcms(rest));
}

export function solution01([actionsLine, ...stepLines]: string[]): number {
    const actions: string[] = actionsLine.split('');
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

export function solution02([actionsLine, ...stepLines]: string[]): number {
    const actions: string[] = actionsLine.split('');
    const steps = stepLines.map(readStep);
    let currentSteps = steps.filter(({ current }) => current[2] === 'A');
    const endSteps = currentSteps.map((cursor) => {
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
