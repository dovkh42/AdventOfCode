import fs from 'fs';

const filePath = './day07_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

const getAllABA = (str, isInsideBrackets) => {
    const allABA = [];
    for (let i = 1; i < str.length - 1; ++i) {
        if (str[i - 1] === str[i + 1] && str[i] !== str[i - 1]) {
            if (isInsideBrackets) {
                allABA.push(str.substring(i - 1, i + 1));
            } else {
                allABA.push(str.substring(i, i + 2));
            }
        }
    }

    return allABA;
}

let counter = 0;

for (const line of lines) {
    let isInBrackets = false;
    const outBrackets = [];
    const inBrackets = [];

    for (let i = 0; i < line.length; ++i, isInBrackets = !isInBrackets) {
        let sequence = '';

        while (line[i] !== '[' && line[i] !== ']' && i!== line.length) {
            sequence += line[i];
            ++i;
        }

        if (isInBrackets && sequence.length > 0) {
            inBrackets.push(...getAllABA(sequence, isInBrackets));
        } else {
            outBrackets.push(...getAllABA(sequence, isInBrackets));
        }
    }

    if (inBrackets.some((str) => outBrackets.includes(str))) {
        ++counter;
    }
}

console.log(`Answer is: ${counter}`);