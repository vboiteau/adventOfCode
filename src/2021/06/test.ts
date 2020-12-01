import {readInputFileAsLines} from '../fileReader';
import {getNumberOfLanternFishAtNthDay} from './solution';

test.each`
  filePath                      | days   | expectedResult
  ${`${__dirname}/example.txt`} | ${18}  | ${26}
  ${`${__dirname}/example.txt`} | ${80}  | ${5934}
  ${`${__dirname}/example.txt`} | ${256} | ${26984457539}
  ${`${__dirname}/input.txt`}   | ${80}  | ${362666}
  ${`${__dirname}/input.txt`}   | ${256} | ${1640526601595}
`(
  'Given a input $filePath when calling getWinningScore function should receive $expectedResult',
  async ({filePath, days, expectedResult}) => {
    const [fishReport] = await readInputFileAsLines(filePath);
    expect(getNumberOfLanternFishAtNthDay(fishReport, days)).toBe(
      expectedResult
    );
  }
);
