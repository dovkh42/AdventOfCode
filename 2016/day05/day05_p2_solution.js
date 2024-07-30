import crypto from 'crypto';
import fs from 'fs';

const filePath = './day05_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const generateMD5Hash = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
}

const [doorId] = data.split('\r\n');

let password = Array.from({ length: 8 }).fill(null);

for (let index = 0, numOfHashesFound = 0; numOfHashesFound < 8; ++index) {
    const hash = generateMD5Hash(doorId + index);
    if (hash.startsWith('00000') && Number.parseInt(hash[5]) < 8 && password[Number.parseInt(hash[5])] === null) {
        password[Number.parseInt(hash[5])] = hash[6];
        ++numOfHashesFound;
    }
}

console.log(`Answer is: ${password.join('')}`);