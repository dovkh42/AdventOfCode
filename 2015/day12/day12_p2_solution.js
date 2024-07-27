/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';

const filePath = './day12_input.txt';

// synchronous read
const parseJsonFromTxt = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');

        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing JSON from text file:', err.message);
        return null;
    }
}


const calculateJsonSum = (json) => {
    let sum = 0;

    const traverseJsonObjects = (obj) => {
        if (!Array.isArray(obj) && Object.values(obj).includes('red')) {
            return;
        }
        for (let key in obj) {
            const value = obj[key];
            if (typeof value === 'number') {
                sum += value;
            } else if (typeof value === 'object' && value !== null) {
                traverseJsonObjects(value);
            }
        }
    }

    traverseJsonObjects(json);

    return sum;
}


const parsedData = parseJsonFromTxt(filePath);

if (parsedData) {
    const res = calculateJsonSum(parsedData);

    console.log(`Answer is: ${res}`);
}
