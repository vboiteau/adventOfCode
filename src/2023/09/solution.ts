const getDifferenceBetweenValues = (values: Array<number>): Array<number> => {
    const difference = values.reduce((acc, value, idx) => {
        if (idx !== 0) {
            acc.push(value - values[idx - 1]);
        }
        return acc;
    }, []);
    if (difference.every(value => value === difference[0])) {
        return [values[0] - difference[0], ...values, values[values.length - 1] + difference[0]];
    }
    const nextValueDifference = getDifferenceBetweenValues(difference);
    return [values[0] - nextValueDifference[0], ...values, values[values.length - 1] + nextValueDifference[nextValueDifference.length - 1]];
}

export const solution01 = (lines: Array<string>): number => {
    const values = lines.map(line => line.split(' ').filter(Boolean).map(Number));
    return values.map(getDifferenceBetweenValues).reduce((sum, values) => sum + values[values.length - 1], 0);
};

export const solution02 = (lines: Array<string>): number => {
    const values = lines.map(line => line.split(' ').filter(Boolean).map(Number));
    return values.map(getDifferenceBetweenValues).reduce((sum, values) => sum + values[0], 0);
};
