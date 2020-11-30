import {rocketEquation, sumFuel} from "./rocketEquation";

test.each`
input | expected
${12} | ${2}
${14} | ${2}
${1969} | ${654}
${100756} | ${33583}
`('Given the $input value when calling the rocket equation then $expected should be returned', ({ input, expected }) => {
    expect(rocketEquation(input)).toBe(expected);
});

test('Given the input list when calling sumFuel then the expected fuel sum should be returned', async () => {
    const sum = await sumFuel();
    expect(sum).toBe(0);
});
