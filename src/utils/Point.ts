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

export function jump(point: Point, direction: Direction, jumpSize: number = 1) {
    switch (direction) {
        case Direction.NORTH:
            return { x: point.x, y: point.y - jumpSize };
        case Direction.EAST:
            return { x: point.x + jumpSize, y: point.y };
        case Direction.SOUTH:
            return { x: point.x, y: point.y + jumpSize };
        case Direction.WEST:
        default:
            return { x: point.x - jumpSize, y: point.y };
    }
}

export function add(p1: Point, p2: Point): Point {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
}

export function distance(p1: Point, p2: Point): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export default Point;
