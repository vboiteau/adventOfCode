import { join } from 'path';
import {
  getApprovedSum,
  getProcessMap,
  isApproved,
  isCondition,
  isPartApproved,
  isPointer,
  isRejected,
  parseOperator,
  parsePartDescription,
  parseProcess,
  parseProcessStep,
  parseWorkSheet,
} from './solution';
import { getFileLines } from '@aoc/file-reader';

test('Given a serialized part descriptin when parse part description is called then it should return the parsed part description.', () => {
  expect(parsePartDescription('{x=787,m=2655,a=1222,s=2876}')).toEqual({
    x: 787,
    m: 2655,
    a: 1222,
    s: 2876,
  });
});

test.each`
  serializedProcessStep | expected
  ${'A'}                | ${{ type: 'approved' }}
  ${'R'}                | ${{ type: 'rejected' }}
  ${'qweq'}             | ${{ type: 'pointer', to: 'qweq' }}
  ${'a>1716:R'}         | ${{ type: 'condition', category: 'a', value: 1716, comparison: 'gt', ifTrue: { type: 'rejected' } }}
  ${'a<1716:A'}         | ${{ type: 'condition', category: 'a', value: 1716, comparison: 'lt', ifTrue: { type: 'approved' } }}
  ${'a=1716:iewq'}      | ${{ type: 'condition', category: 'a', value: 1716, comparison: 'eq', ifTrue: { type: 'pointer', to: 'iewq' } }}
`(
  'Given a serialized process step $serializedProcessStep when parse process step is called then it should return the parsed process step $expected.',
  ({ serializedProcessStep, expected }) => {
    expect(parseProcessStep(serializedProcessStep)).toEqual(expected);
  },
);

test('Given an invalid serialized comparison when parse operator then throw an error', () => {
  expect(() => parseOperator('<=')).toThrow();
});

test('Given an invalid serialized process step when parse process step then throw an error', () => {
  expect(() => parseOperator('a<1716:a>189412')).toThrow();
});

test.each`
  action                                                                                               | expected
  ${{ type: 'approved' }}                                                                              | ${false}
  ${{ type: 'rejected' }}                                                                              | ${false}
  ${{ type: 'pointer', to: 'qweq' }}                                                                   | ${false}
  ${{ type: 'condition', category: 'a', value: 1716, comparison: 'gt', ifTrue: { type: 'rejected' } }} | ${true}
`('Given an action when is condition is called then return $expected', ({ action, expected }) => {
  expect(isCondition(action)).toBe(expected);
});

test.each`
  action                                                                                               | expected
  ${{ type: 'approved' }}                                                                              | ${true}
  ${{ type: 'rejected' }}                                                                              | ${false}
  ${{ type: 'pointer', to: 'qweq' }}                                                                   | ${false}
  ${{ type: 'condition', category: 'a', value: 1716, comparison: 'gt', ifTrue: { type: 'rejected' } }} | ${false}
`('Given an action when is approved is called then return $expected', ({ action, expected }) => {
  expect(isApproved(action)).toBe(expected);
});

test.each`
  action                                                                                               | expected
  ${{ type: 'approved' }}                                                                              | ${false}
  ${{ type: 'rejected' }}                                                                              | ${true}
  ${{ type: 'pointer', to: 'qweq' }}                                                                   | ${false}
  ${{ type: 'condition', category: 'a', value: 1716, comparison: 'gt', ifTrue: { type: 'rejected' } }} | ${false}
`('Given an action when is rejected is called then return $expected', ({ action, expected }) => {
  expect(isRejected(action)).toBe(expected);
});

test.each`
  action                                                                                               | expected
  ${{ type: 'approved' }}                                                                              | ${false}
  ${{ type: 'rejected' }}                                                                              | ${false}
  ${{ type: 'pointer', to: 'qweq' }}                                                                   | ${true}
  ${{ type: 'condition', category: 'a', value: 1716, comparison: 'gt', ifTrue: { type: 'rejected' } }} | ${false}
`('Given an action when is pointer is called then return $expected', ({ action, expected }) => {
  expect(isPointer(action)).toBe(expected);
});

test('Given a serialized process when parse process is called then it should return the parsed process.', () => {
  expect(parseProcess('px{a<2006:qkq,m>2090:A,rfg}')).toEqual({
    id: 'px',
    steps: [
      {
        type: 'condition',
        category: 'a',
        value: 2006,
        comparison: 'lt',
        ifTrue: { type: 'pointer', to: 'qkq' },
      },
      {
        type: 'condition',
        category: 'm',
        value: 2090,
        comparison: 'gt',
        ifTrue: { type: 'approved' },
      },
      { type: 'pointer', to: 'rfg' },
    ],
  });
});

test('Given a serialized work sheet when parse work sheet is called then it should return the parsed work sheet.', async () => {
  const serializedWorkSheet = await getFileLines(join(__dirname, 'example.txt'));
  const workSheet = parseWorkSheet(serializedWorkSheet);
  expect(workSheet.partDescriptions).toHaveLength(5);
  expect(workSheet.processes).toHaveLength(11);
});

test('Given a work sheet when check is approved part for each part is called then it should return the expected approval.', async () => {
  const serializedWorkSheet = await getFileLines(join(__dirname, 'example.txt'));
  const workSheet = parseWorkSheet(serializedWorkSheet);
  expect(
    workSheet.partDescriptions.map(part =>
      isPartApproved(part, getProcessMap(workSheet.processes)),
    ),
  ).toEqual([true, false, true, false, true]);
});

test.each`
  file             | expected
  ${'example.txt'} | ${19114}
`(
  'Given a work sheet when approved sum then it should return the expected result $expected.',
  async ({ file, expected }) => {
    const serializedWorkSheet = await getFileLines(join(__dirname, file));
    expect(getApprovedSum(serializedWorkSheet)).toEqual(expected);
  },
);
