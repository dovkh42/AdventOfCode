import crypto from 'crypto';
import fs from 'fs';

const filePath = './day05_input.txt';
const data = fs.readFileSync(filePath, 'utf8');

const generateMD5Hash = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
}

const [doorId] = data.split('\r\n');

let password = '';

for (let index = 0; password.length < 8; ++index) {
    const hash = generateMD5Hash(doorId + index);
    if (hash.startsWith('00000')) {
        password += hash[5];
    }
}

console.log(`Answer is: ${password}`);