import fs from 'fs';
import readline from 'readline';

const filePath = './day10_input.txt';

const fileStream = fs.createReadStream(filePath);

let result = 0;
let inputLine;


const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    inputLine = Array.from(line);
});

rl.on('close', () => {
    const lookAndSay = (input) => {
        let newArr = [];
        for (let i = 0; i < input.length;) {
            let rightSide = input[i];
            let leftSide = 1;
            for (; i + leftSide < input.length && input[i + leftSide] === input[i + leftSide - 1]; ++leftSide) { /* empty */ }
            i += leftSide;
            newArr.push(leftSide, rightSide);
        }

        return (newArr.join(''))
    }

    result = Array(50).fill().reduce((input) => { return lookAndSay(input) }, inputLine);

    console.log(`Answer is: ${result.length}`);
});
