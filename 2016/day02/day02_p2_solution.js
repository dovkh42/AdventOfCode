import fs from 'fs';

const filePath = './day02_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

let lastPressedButton = [2, 0];
const keypad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0]
];


const getNextButton = (direction) => {
    switch (direction) {
        case 'U':
            if (lastPressedButton[0] - 1 >= 0 && keypad[lastPressedButton[0] - 1][lastPressedButton[1]] !== 0) {
                lastPressedButton = [lastPressedButton[0] - 1, lastPressedButton[1]];
            }
            break;
        case 'D':
            if (lastPressedButton[0] + 1 < keypad.length && keypad[lastPressedButton[0] + 1][lastPressedButton[1]] !== 0) {
                lastPressedButton = [lastPressedButton[0] + 1, lastPressedButton[1]];
            }
            break;
        case 'R':
            if (lastPressedButton[1] + 1 < keypad.length && keypad[lastPressedButton[0]][lastPressedButton[1] + 1] !== 0) {
                lastPressedButton = [lastPressedButton[0], lastPressedButton[1] + 1];
            }
            break;

        case 'L':
            if (lastPressedButton[1] - 1 >= 0 && keypad[lastPressedButton[0]][lastPressedButton[1] - 1] !== 0) {
                lastPressedButton = [lastPressedButton[0], lastPressedButton[1] - 1];
            }
            break;

        default:
            break;
    }
}

const res = [];

for (const line of lines) {
    const codeArray = Array.from(line);
    for (const char of codeArray) {
        getNextButton(char);
    }
    res.push(keypad[lastPressedButton[0]][lastPressedButton[1]]);
}

console.log(`Answer is: ${res.join('')}`);