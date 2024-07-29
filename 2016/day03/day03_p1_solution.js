import fs from 'fs';

const filePath = './day03_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const sideLengthSets = data.split('\r\n').map((line)=> line.trim().split('  ').map(Number));
let numOfValidTriangles = 0;

for (const set of sideLengthSets) {
	const maxLenSide = Math.max(...set);
	set.splice(set.indexOf(maxLenSide), 1);
	const [sideA, sideB] = set;

	if (sideA + sideB > maxLenSide) {
		++numOfValidTriangles;
	}
}

console.log(`Answer is: ${numOfValidTriangles}`);