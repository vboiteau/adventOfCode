const partDescriptionRegExp = /^\{x=(?<xValue>\d+),m=(?<mValue>\d+),a=(?<aValue>\d+),s=(?<sValue>\d+)\}/;
const processRegExp = /^(?<id>\w+){(?<serializedSteps>[^}]+)}$/;

type PartCategory = 'x' | 'm' | 'a' | 's';

type PartDescription = Record<PartCategory, number>;

type ActionType = 'condition' | 'pointer' | 'approved' | 'rejected';

interface ProcessStep {
    type: ActionType;
}

interface Condition extends ProcessStep {
    type: 'condition';
    category: PartCategory;
    value: number;
    comparison: 'eq' | 'gt' | 'lt';
    ifTrue: Pointer | Approved | Rejected;
}

export const isCondition = (action: ProcessStep): action is Condition => action.type === 'condition';

interface Pointer extends ProcessStep {
    type: 'pointer';
    to: string;
}

export const isPointer = (action: ProcessStep): action is Pointer => action.type === 'pointer';

interface Approved extends ProcessStep {
    type: 'approved';
}

export const isApproved = (action: ProcessStep): action is Approved => action.type === 'approved';

interface Rejected extends ProcessStep {
    type: 'rejected';
}

export const isRejected = (action: ProcessStep): action is Rejected => action.type === 'rejected';

interface Process {
    id: string;
    steps: ProcessStep[];
}

export interface WorkSheet {
    partDescriptions: Array<PartDescription>;
    processes: Array<Process>;
}

export interface PartState {
    part: PartDescription;
    processId: string;
    stepIndex: number;
}

export const parseOperator = (operator: string): 'eq' | 'gt' | 'lt' => {
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
}

export function parseProcessStep(serializedProcessStep: string): ProcessStep {
    if ('A' === serializedProcessStep) {
        return { type: 'approved' } as Approved;
    }
    if ('R' === serializedProcessStep) {
        return { type: 'rejected' } as Rejected;
    }
    if (/^\w+$/.test(serializedProcessStep)) {
        return { type: 'pointer', to: serializedProcessStep } as Pointer;
    }
    const conditionRegex = /(?<category>[xmas])(?<operator>[<>=])(?<value>\d+):(?<ifTrueStep>\w+)/;
    if (conditionRegex.test(serializedProcessStep)) {
        const matches = conditionRegex.exec(serializedProcessStep);
        const ifTrue = parseProcessStep(matches?.groups?.ifTrueStep);
        const comparison = parseOperator(matches?.groups?.operator);
        return {
            type: 'condition',
            category: matches?.groups?.category as PartCategory,
            value: Number(matches?.groups?.value),
            comparison,
            ifTrue
        } as Condition;
    }
    throw new Error('Invalid serialized process step');
}


export function parsePartDescription(serializedPartDescription: string): PartDescription {
    const matches = partDescriptionRegExp.exec(serializedPartDescription);
    return {
        x: Number(matches?.groups?.xValue),
        m: Number(matches?.groups?.mValue),
        a: Number(matches?.groups?.aValue),
        s: Number(matches?.groups?.sValue),
    };
}

export function parseProcess(serializedProcess: string): Process {
    const matches = processRegExp.exec(serializedProcess);
    return {
        id: matches?.groups?.id,
        steps: matches?.groups?.serializedSteps.split(',').map(parseProcessStep)
    };
}

export const parseWorkSheet = (input: Array<string>): WorkSheet => ({
    processes: input.filter((line) => processRegExp.test(line)).map(parseProcess),
    partDescriptions: input.filter((line) => partDescriptionRegExp.test(line)).map(parsePartDescription)
});

export const getProcessMap = (processes: Array<Process>): Record<string, Array<ProcessStep>> => processes.reduce((acc, { id, steps }) => ({
    ...acc,
    [id]: steps
}), {});

export const isPartApproved = (part: PartDescription, processes: Record<string, Array<ProcessStep>>): boolean => {
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
}

export const isCondtionApproved = (nextState: PartState, step: Condition): boolean | PartState => {
    const value = nextState.part[step.category];
    if ((step.comparison === 'eq' && value === step.value) ||
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
}

export const getApprovedSum = (input: Array<string>): number => {
    const workSheet = parseWorkSheet(input);
    const processes = getProcessMap(workSheet.processes);
    return workSheet.partDescriptions.filter((part) => isPartApproved(part, processes)).reduce((acc, part) => acc + part.x + part.m + part.a + part.s, 0);
}
