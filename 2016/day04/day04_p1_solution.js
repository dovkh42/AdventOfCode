import fs from 'fs';

const filePath = './day04_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

let realSectorIdsSum = 0;

for (const line of lines) {
    let [letters, checksum] = line.split('[');
    checksum = checksum.slice(0, -1);
    letters = letters.split('-');
    const sectorId = Number.parseInt(letters.pop());
    letters = Array.from(letters.join(''))

    const map = new Map();

    letters.forEach((letter) => map.set(letter, (map.get(letter) || 0) + 1))

    const sortedMap = new Map(
        [...map]
            .sort(([key1, value1], [key2, value2]) =>
                value1 === value2 ? key1.localeCompare(key2) : value2 - value1
            )
    );

    const checksumBuild = [];
    let iterator = sortedMap.keys();
    for (let i = 0; i < 5; ++i) {
        checksumBuild.push(iterator.next().value)
    }

    if (checksumBuild.join('') === checksum) {
        realSectorIdsSum += sectorId
    }
}
console.log(`Answer is: ${realSectorIdsSum}`);