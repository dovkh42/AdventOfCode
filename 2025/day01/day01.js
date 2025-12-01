import fs from 'fs';

const filePath = './input.txt';
const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

const part1 = () => {
  let pos = 50;
  let timesAtZero = 0;
  const moves = {
    'L': -1,
    'R': 1
  }

  for (const e of lines) {
    const dir = e[0];
    const num = Number(e.slice(1));

    pos = ((pos + (moves[dir] * num % 100)) + 100) % 100

    if (pos === 0) {
      timesAtZero++
    }
  }

  console.log(timesAtZero);
}

const part2 = () => {
  let pos = 50;
  let timesAtZero = 0;
  const moves = {
    'L': -1,
    'R': 1
  }

  for (const e of lines) {
    const dir = e[0];
    const num = Number(e.slice(1));
    timesAtZero += Math.floor(num / 100);

    let newPos = ((pos + (moves[dir] * (num % 100))) + 100) % 100

    if ((newPos === 0) ||
      (dir === 'L' && newPos > pos && pos !== 0) ||
      (dir === 'R' && newPos < pos)) {
      timesAtZero++
    }

    pos = newPos;
  }

  console.log(timesAtZero);
}

part1();
part2();