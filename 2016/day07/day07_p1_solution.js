import fs from 'fs';

const filePath = './day07_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

const hasAbba = (str) => {
    for (let i = 1; i < str.length - 2; ++i) {
        if (str[i] === str[i + 1] && str[i - 1] === str[i + 2] && str[i] !== str[i - 1]) {
            return true;
        }
    }

    return false;
}

let counter = 0;

for (const line of lines) {
    let isInBrackets = false;
    let outerBracketsValidFound = false;
    let innerBracketsInvalid = false;

    for (let i = 0; i < line.length; ++i, isInBrackets = !isInBrackets) {
        let sequence = '';

        while (line[i] !== '[' && line[i] !== ']' && i !== line.length) {
            sequence += line[i];
            ++i;
        }

        if (isInBrackets && sequence.length > 0 && hasAbba(sequence)) {
            innerBracketsInvalid = true;
            break;
        } else if (sequence.length > 0 && !outerBracketsValidFound && hasAbba(sequence)) {
            outerBracketsValidFound = true;
        }
    }

    if (outerBracketsValidFound && !innerBracketsInvalid) {
        ++counter;
    }
}

console.log(`Answer is: ${counter}`);