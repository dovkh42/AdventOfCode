import fs from 'fs';

const filePath = './day25_input.txt';
const data = fs.readFileSync(filePath, 'utf8');
const numbers = data.match(/\d+/g);

const table = [
    [20151125, 18749137, 17289845, 30943339, 10071777, 33511524],
    [31916031, 21629792, 16929656, 7726640, 15514188, 4041754],
    [16080970, 8057251, 1601130, 7981243, 11661866, 16474243],
    [24592653, 32451966, 21345942, 9380097, 10600672, 31527494],
    [77061, 17552253, 28094349, 6899651, 9250759, 31663883],
    [33071741, 6796745, 25397450, 24659492, 1534922, 27995004]
];


const givenX = numbers[0] - 1;
const givenY = numbers[1] - 1;

const array = Array.from(Array(givenX + givenY + 1), () => new Uint32Array(givenX + givenY + 1).fill(0));

let prev = 0;
const multiplier = 252533;
const divider = 33554393;

for (let i = 0; i < array.length; ++i) {
    for (let j = 0, k = i; j <= i; ++j, --k) {
        if (k === 0 && j === 0) {
            array[k][j] = table[0][0];
        } else {
            array[k][j] = (prev * multiplier) % divider;
        }
        prev = array[k][j];
    }
}

console.log(`Answer is: ${array[givenX][givenY]}`);


