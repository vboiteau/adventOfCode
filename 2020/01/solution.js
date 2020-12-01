export function multiplyTwoNumberSummingToTarget(target, list) {
    const first = list.find((number) => list.includes(target - number));
    return first && (first * (target - first));
}

export function multiplyThreeNumberSummingToTarget(target, list) {
    for (const number of list) {
        const mult = multiplyTwoNumberSummingToTarget(target - number, list);
        if (mult) {
            return mult * number;
        }
    }
}
