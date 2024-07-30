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
    const minCharCode = inputStorage[i].reduce((minIdx, val, currIdx) => {
        return val && val < inputStorage[i][minIdx] ? currIdx : minIdx;
    }, 0);
    code += String.fromCharCode(minCharCode + LETTER_A_ASCII);
}

console.log(`Answer is: ${code}`);