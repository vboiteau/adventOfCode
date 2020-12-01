const getCode = (input: string): Array<number> => {
    let inElement = false;
    let currentElementLength = 0;
    let foundQuestionMark = false;
    return input
        .split('')
        .reduce((code, char, index) => {
            if (foundQuestionMark) {
                return code;
            }
            if (char === '#') {
                if (inElement) {
                    currentElementLength += 1;
                } else {
                    currentElementLength = 1;
                }
                if (index === input.length - 1) {
                    code.push(currentElementLength);
                }
                inElement = true;
            } else if (char === '.') {
                if (inElement) {
                    code.push(currentElementLength);
                }
                inElement = false;
            } else if (char === '?') {
                foundQuestionMark = true;
            }
            return code;
        }, [] as Array<number>);
};

const getPossibilities = (input: string, target: string): number => {
    const indexOfQuestionMark = input.indexOf('?');
    if (indexOfQuestionMark !== -1) {
        const currentCode = getCode(input).join(',');
        if (currentCode && !target.startsWith(currentCode)) {
            return 0;
        }
        return getPossibilities(input.substring(0, indexOfQuestionMark) + '.' + input.substring(indexOfQuestionMark + 1), target)
            + getPossibilities(input.substring(0, indexOfQuestionMark) + '#' + input.substring(indexOfQuestionMark + 1), target);
    }
    const code = getCode(input);
    const codeEquals = code.join(',') === target;
    return codeEquals ? 1 : 0;
};

export const solution01 = (input: Array<string>): number => {
    return input.reduce((sum, line) => {
        const [message, target] = line.split(' ');
        return sum + getPossibilities(message.trim(), target.trim());
    }, 0);
};

export const solution02 = (input: Array<string>): number => {
    return input.reduce((sum, line) => {
        const [message, target] = line.split(' ');
        const repeatedMessage = new Array(5).fill(message.trim()).join('?');
        const repeatedTarget = new Array(5).fill(target.trim()).join(',');
        const possibilities = getPossibilities(repeatedMessage, repeatedTarget);
        console.log({ repeatedMessage, repeatedTarget, possibilities });
        return sum + possibilities;
    }, 0);
};
