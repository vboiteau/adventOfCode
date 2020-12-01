import {getNthNumberSpoken} from './solution';

test.each`
  nth     | startingNumbers         | value
  ${2020} | ${[0, 3, 6]}            | ${436}
  ${2020} | ${[1, 3, 2]}            | ${1}
  ${2020} | ${[2, 1, 3]}            | ${10}
  ${2020} | ${[1, 2, 3]}            | ${27}
  ${2020} | ${[2, 3, 1]}            | ${78}
  ${2020} | ${[3, 2, 1]}            | ${438}
  ${2020} | ${[3, 1, 2]}            | ${1836}
  ${2020} | ${[0, 14, 6, 20, 1, 4]} | ${257}
`(
  'Given a nth number $nth and a starting numbers list $startingNumbers when getNthNumberSpoken is called then the returned value should be $value',
  ({nth, startingNumbers, value}) => {
    expect(getNthNumberSpoken(nth, startingNumbers)).toBe(value);
  }
);
