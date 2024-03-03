import Direction from "../../utils/Direction";
import Point, * as PointUtils from "../../utils/Point";

interface Instruction {
    direction: Direction;
    jump: number;
}

const readDirection = (input: string): Direction => {
    switch (input) {
        case 'R':
        case '0': 
            return Direction.EAST;
        case 'L':
        case '2':
            return Direction.WEST;
        case 'U':
        case '3':
            return Direction.NORTH;
        case 'D':
        case '1':
        default:
            return Direction.SOUTH;
    }
}

export const readInstructionPart1 = (input: string): Instruction => {
    const [direction, jump] = input.split(' ');
    return {
        direction: readDirection(direction),
        jump: Number(jump)
    };
}

export const readInstructionPart2 = (input: string): Instruction => {
    const hex = input.split(' ')[2].replaceAll(/[#()]/g, '');
    return {
        direction: readDirection(hex.charAt(5)),
        jump: Number.parseInt(hex.substring(0, 5), 16)
    };
}

export const read = (input: Array<string>, readInstruction: (input: string) => Instruction): Array<Instruction> => {
    return input.map(readInstruction);
};

export const getPoints = (instructions: Array<Instruction>): Array<Point> => {
    return instructions.reduce((acc, instruction) => {
        const last = acc[acc.length - 1];
        const newPoint = PointUtils.jump(last, instruction.direction, instruction.jump);
        return [...acc, newPoint];
    }, [{ x: 0, y: 0 }]);
}

export const shoelace = (points: Array<Point>) => {
    const n = points.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const p1 = points[i];
        const p2 = points[j];
        sum += (p1.y * p2.x);
        sum -= (p1.x * p2.y);
    }
    sum /= 2;
    return Math.abs(sum);
}

export const perimeter = (points: Array<Point>) => {
    return points.reduce((acc, p1, index) => {
        if (index === points.length - 1) {
            return acc;
        }
        const p2 = points[index + 1];
        return acc + PointUtils.distance(p1, p2);
    }, 0);
}

export const getDigSize = (input: Array<string>, readInstruction: (input: string) => Instruction): number => {
    const points = getPoints(read(input, readInstruction));
    return (shoelace(points) - perimeter(points) / 2) + perimeter(points) + 1;
}
