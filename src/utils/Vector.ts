import Direction, * as DirectionUtils from './Direction';
import Point, * as PointUtils from './Point';

interface Vector {
  point: Point;
  direction: Direction;
}

export function equals(v1: Vector, v2: Vector): boolean {
  return PointUtils.equals(v1.point, v2.point) && v1.direction === v2.direction;
}

export function copy(v: Vector): Vector {
  return { point: PointUtils.copy(v.point), direction: v.direction };
}

export function cw(v: Vector): Vector {
  return { point: PointUtils.copy(v.point), direction: DirectionUtils.cw(v.direction) };
}

export function ccw(v: Vector): Vector {
  return { point: PointUtils.copy(v.point), direction: DirectionUtils.ccw(v.direction) };
}

export function step(v: Vector): Vector {
  return { point: PointUtils.jump(v.point, v.direction), direction: v.direction };
}

export default Vector;
