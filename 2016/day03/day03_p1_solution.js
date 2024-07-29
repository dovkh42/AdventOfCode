import fs from 'fs';

const filePath = './day03_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const sideLengthSets = data.split('\r\n').map((line) => line.trim().split(/\s+/).map(Number));
const numOfValidTriangles = sideLengthSets.filter(([a, b, c]) => a + b > c && b + c > a && a + c > b).length;

console.log(`Answer is: ${numOfValidTriangles}`);