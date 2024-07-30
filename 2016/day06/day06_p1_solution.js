import fs from 'fs';

const filePath = './day06_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

const numOfColumns = lines[0].length;
const ABC_LETTERS = 26;
const LETTER_A_ASCII = 97

const inputStorage = Array.from({ length: numOfColumns }, () => Array(ABC_LETTERS).fill(0));

for (const line of lines) {
    const lineArr = Array.from(line);
    lineArr.forEach((char, index) => {
        inputStorage[index][char.charCodeAt(0) - LETTER_A_ASCII] += 1;
    })
}

let code = '';
for (let i = 0; i < numOfColumns; ++i) {
    const maxCharIndex = inputStorage[i].reduce((maxIdx, val, currIdx) => {
        return val > inputStorage[i][maxIdx] ? currIdx : maxIdx;
    }, 0);
    code += String.fromCharCode(maxCharIndex + LETTER_A_ASCII);
}

console.log(`Answer is: ${code}`);
