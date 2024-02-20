import { getFileLines } from "../../fileReader";
import { join } from "path";
import { getCityLeastLavalLost } from './solution';

test.each`
file | expected
${'example.txt'} | ${102}
`('Given a cityMap in $file when getCityLeastLavaLost then it should return $expected lava lost', async ({ file, expected }) => {
    const cityMap = await getFileLines(join(__dirname, file));
    expect(getCityLeastLavalLost(cityMap)).toEqual(expected);
});
