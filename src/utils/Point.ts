import Direction from "./Direction";

interface Point {
    x: number;
    y: number;
}

export function equals(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y;
}

export function copy(p: Point): Point {
    return { ...p };
}

export function getAdjacent(point: Point, direction: Direction) {
    switch (direction) {
        case Direction.NORTH:
            return { x: point.x, y: point.y - 1 };
        case Direction.EAST:
            return { x: point.x + 1, y: point.y };
        case Direction.SOUTH:
            return { x: point.x, y: point.y + 1 };
        default:
        case Direction.WEST:
            return { x: point.x - 1, y: point.y };
    }
}

 export default Point;
