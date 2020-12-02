import {getFileLines} from "../../fileReader";

export function countValidPasswords(passwordLines) {
    return passwordLines.reduce((sum, passwordLine) => sum + isValidPassword(passwordLine), 0);
}

function isValidPassword(passwordLine) {
    const regex = /^(\d*)-(\d*)\s(\w):\s(\w*)/;
    try {
        const [_, min, max, letterTarget, password] = passwordLine.match(regex);
        const occurence = password.split('').filter(letter => letter === letterTarget).length;
        return occurence >= parseInt(min) && occurence <= parseInt(max);
    } catch (e) {
        console.log(passwordLine);
        return false;
    }
}

export function countValidPasswordsWithLimit(passwordLines) {
    return passwordLines.reduce((sum, passwordLine) => sum + isValidPasswordWithLimit(passwordLine), 0);
}

function isValidPasswordWithLimit(passwordLine) {
    const regex = /^(\d*)-(\d*)\s(\w):\s(\w*)/;
    try {
        const [_, first, second, letterTarget, password] = passwordLine.match(regex);
        const firstLetter = password[parseInt(first) - 1];
        const secondLetter = password[parseInt(second) - 1];
        return (firstLetter === letterTarget && secondLetter !== letterTarget) || (firstLetter !== letterTarget && secondLetter === letterTarget);
    } catch (e) {
        console.log(passwordLine);
        return false;
    }
}
