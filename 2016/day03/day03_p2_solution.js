import fs from 'fs';

const filePath = './day03_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');
const sideLengthSets = Array.from({ length: lines.length }, () => []);
let currentSet = 0;

lines.forEach((line, index) => {
	if (index > 0 && index  % 3 === 0) {
		currentSet += 3;
	}
	const set = line.trim().split(/\s+/).map(Number);

	set.forEach((number, index) => {
		sideLengthSets[currentSet+index].push(number);
	})
})

const numOfValidTriangles = sideLengthSets.filter(([a, b, c]) => a + b > c && b + c > a && a + c > b).length;

console.log(`Answer is: ${numOfValidTriangles}`);

