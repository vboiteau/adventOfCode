export function validatePassports(passportLines, validator) {
  return passportLines
    .reduce(
      (passports, passportLine) => {
        if (passportLine.length) {
          const matches = passportLine.match(/(\w*):([a-z\d#]*)/gi);
          matches.forEach(match => {
            const [key, value] = match.split(':');
            passports[passports.length - 1][key] = value;
          });
        } else {
          passports.push({});
        }
        return passports;
      },
      [{}]
    )
    .filter(validator).length;
}

export function validatePassportKeys(passport) {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(
    key => passport[key] !== undefined
  );
}

export function validatePassportValues(passport) {
  const validated = [
    ['byr', value => !!value && validateRange(value, 1920, 2002)],
    ['iyr', value => !!value && validateRange(value, 2010, 2020)],
    ['eyr', value => !!value && validateRange(value, 2020, 2030)],
    ['hgt', value => !!value && validateHeight(value)],
    ['hcl', value => !!value && /^#[\da-f]{6}$/.test(value)],
    [
      'ecl',
      value =>
        !!value &&
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    ],
    ['pid', value => !!value && /^\d{9}$/.test(value)],
  ].map(([key, validator]) => [key, validator(passport[key])]);
  return validated.every(([key, valid]) => valid);
}

function validateHeight(height) {
  try {
    const {numericValue, unit} = height.match(
      /^(?<numericValue>\d+)(?<unit>in|cm)/
    ).groups;
    const isCm = unit === 'cm';
    return validateRange(numericValue, isCm ? 150 : 59, isCm ? 193 : 76);
  } catch (e) {
    return false;
  }
}

function validateRange(value, min, max) {
  return value >= min && value <= max;
}
