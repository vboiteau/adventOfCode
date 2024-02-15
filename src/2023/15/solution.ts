export const getInstructionResult = (instruction: string): number => {
    return instruction.split('').reduce((sum, char) => {
        const ascii = char.charCodeAt(0);
        return ((sum + ascii) * 17) % 256;
    }, 0);
}

export const getResult = (hashList: string): number => {
    const instructions = hashList.split(',').map(instruction => instruction.trim()).filter(Boolean);
    const results = instructions.map(getInstructionResult);
    return results.reduce((sum, result) => sum + result, 0);
}

interface PlaceLens {
    label: string;
    focalLength: number;
}

export const getLensPower = (hashList: string): number => {
    const instructions = hashList.split(',').map(instruction => instruction.trim()).filter(Boolean);
    let lens: Array<Array<PlaceLens>> = new Array(256);
    for (const instruction of instructions) {
        if (instruction.includes('-')) {
            const [label] = instruction.split('-');
            const boxNumber = getInstructionResult(label);
            if (!lens[boxNumber]) {
                lens[boxNumber] = [];
            }
            const toRemove = lens[boxNumber].findIndex((lens: PlaceLens) => lens.label === label);
            if (toRemove !== -1) {
                lens[boxNumber].splice(toRemove, 1);
            }
        } else if (instruction.includes('=')) {
            const [label, focalLength] = instruction.split('=');
            const boxNumber = getInstructionResult(label);
            if (!lens[boxNumber]) {
                lens[boxNumber] = [];
            }
            const lensIndex = lens[boxNumber].findIndex((lens: PlaceLens) => lens.label === label);
            if (lensIndex !== -1) {
                lens[boxNumber].splice(lensIndex, 1, { label, focalLength: Number(focalLength) });
            } else {
                lens[boxNumber].push({ label, focalLength: Number(focalLength) });
            }
        }
    }
    return lens.reduce((lensSum, box, boxNumber) => {
        return lensSum + box.reduce((boxSum, lens, lenIndex) => boxSum + (lens.focalLength * (lenIndex + 1) * (boxNumber + 1)), 0);
    }, 0);
}
