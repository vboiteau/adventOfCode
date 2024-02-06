interface CubesCount {
    blue?: number;
    green?: number;
    red?: number;
}

const max: CubesCount = {
    blue: 14,
    green: 13,
    red: 12
};

const getMinimumCubeCount = (line: string): CubesCount => {
    const instructions = line.split(':').pop();
    const cubeCounts: CubesCount = {
    };
    for (const instruction of instructions.split(';')) {
        const colorInstructions = instruction.split(',');
        for (const colorInstruction of colorInstructions) {
            const [count, color] = colorInstruction.trim().split(' ') as [string, keyof CubesCount];
            if (!cubeCounts[color]) {
                cubeCounts[color] = Number(count);
            } else {
                cubeCounts[color] = Math.max(cubeCounts[color], Number(count));
            }
        }
    }
    return cubeCounts;
}

const isMaxingOut = (line: string): boolean => {
    const instructions = line.split(':').pop();
    for (const instruction of instructions.split(';')) {
        const colorInstructions = instruction.split(',');
        for (const colorInstruction of colorInstructions) {
            const [count, color] = colorInstruction.trim().split(' ');
            if (max[color as 'blue' | 'green' | 'red'] < Number(count)) {
                return true;
            }
        }
    }
    return false;
}

export const solution01 = (lines: Array<string>): number => {
    return lines.reduce((sum, line, index) => {
        if (!isMaxingOut(line)) {
            return sum + index + 1;
        }
        return sum;
    }, 0);
};

export const solution02 = (lines: Array<string>): number => {
    return lines.reduce((sum, line) => {
        return sum + Object.values(getMinimumCubeCount(line)).reduce((power, value) => power * value, 1);
    }, 0);
};
