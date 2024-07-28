import fs from 'fs';

const filePath = './day20_input.txt';

const data = fs.readFileSync(filePath, 'utf8');

let input = Number.parseInt(data);

const MAX_HOUSES = input / 10;
const MAX_ELVES = input / 10;
let minHouse = MAX_HOUSES;

const houses = new Array(input).fill(0);

for (let e = 1; e < MAX_ELVES; ++e) {
    for (let h = e; h < MAX_HOUSES; h += e) {
        houses[h] += e * 10;
        if (houses[h] >= input && h < minHouse) {
            minHouse = h
        }
    }
}

console.log(`Answer is ${minHouse}`);