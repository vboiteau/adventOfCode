let cache: Record<string, number> = {};

const trimStart = (input: string): string => {
    return input.startsWith('.') ? input.split(/(?<=\.)(?=[^.])/).slice(1).join('') : input;
};

const getPossibilities = (input: string, targets: Array<number>): number => {
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

    let possibilities =
        (input[0] !== '#' ? getPossibilities(trimStart(input.slice(1)), targets) : 0) +
        (foundGroup && input[targets[0]] !== '#' ? getPossibilities(trimStart(input.slice(targets[0] + 1)), targets.slice(1)) : 0)

    return cache[line] ??= possibilities;
};

export const solution = (input: Array<string>, repeatCount: number): number => {
    return input.reduce((sum, line, index) => {
        const [message, target] = line.split(' ');
        const repeatedMessage = new Array(repeatCount).fill(message.trim()).join('?');
        const repeatedTarget = new Array(repeatCount).fill(target.trim()).join(',').split(',').map(Number);
        const possibilities = getPossibilities(repeatedMessage, repeatedTarget);
        return sum + possibilities;
    }, 0);
};
