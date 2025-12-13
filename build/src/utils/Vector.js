import * as DirectionUtils from './Direction';
import * as PointUtils from './Point';
export function equals(v1, v2) {
  return PointUtils.equals(v1.point, v2.point) && v1.direction === v2.direction;
}
export function copy(v) {
  return { point: PointUtils.copy(v.point), direction: v.direction };
}
export function cw(v) {
  return { point: PointUtils.copy(v.point), direction: DirectionUtils.cw(v.direction) };
}
export function ccw(v) {
  return { point: PointUtils.copy(v.point), direction: DirectionUtils.ccw(v.direction) };
}
export function step(v) {
  return { point: PointUtils.jump(v.point, v.direction), direction: v.direction };
}
