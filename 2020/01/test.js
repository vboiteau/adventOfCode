import {multiplyThreeNumberSummingToTarget, multiplyTwoNumberSummingToTarget} from "./solution";
import input from './input.json';

test(
    'Given a list of number when getInputSumTo2020 then the correct value should be returned.',
    () => {
        expect(multiplyTwoNumberSummingToTarget(2020, input)).toBe(157059);
    }
);

test(
    'Given a list of number when getInputSumTo2020 then the correct value should be returned.',
    () => {
        expect(multiplyThreeNumberSummingToTarget(2020, input)).toBe(165080960);
    }
);
