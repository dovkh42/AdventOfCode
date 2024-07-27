import fs from 'fs';

const filePath = './day23_input.txt';

const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');

class Cpu {
    #registers
    #instructions;
    #nextInstruction;

    constructor(instructions) {
        this.#registers = {
            a: 1,
            b: 0,
        };
        this.#instructions = instructions;
        this.#nextInstruction = 0;
    }

    run() {
        while (this.#nextInstruction >= 0 && this.#nextInstruction < this.#instructions.length) {
            const currInstruction = this.#instructions[this.#nextInstruction];
            const [instruction, ...args] = currInstruction.split(' ');
            this[instruction](args);
        }
    }

    hlf([reg]) {
        this.#registers[reg] /= 2;
        this.#nextInstruction += 1;
    }
    tpl([reg]) {
        this.#registers[reg] *= 3;
        this.#nextInstruction += 1;
    }
    inc([reg]) {
        this.#registers[reg] += 1;
        this.#nextInstruction += 1;
    }
    jmp([offset]) {
        offset = Number.parseInt(offset);
        this.#nextInstruction += offset;
    }
    jie([reg, offset]) {
        reg = reg.slice(0, -1);
        offset = Number.parseInt(offset);
        if (this.#isRegEven(reg)) {
            this.#nextInstruction += offset;
        } else {
            this.#nextInstruction += 1;
        }
    }
    jio([reg, offset]) {
        reg = reg.slice(0, -1);
        offset = Number.parseInt(offset);
        if (this.#isRegOne(reg)) {
            this.#nextInstruction += offset;
        } else {
            this.#nextInstruction += 1;
        }
    }
    #isRegEven(reg) {
        return this.#registers[reg] % 2 === 0;
    }
    #isRegOne(reg) {
        return this.#registers[reg] === 1;
    }
    getRegisters() {
        return this.#registers;
    }
}

const cpu = new Cpu(lines);
cpu.run();

console.log(`Answer is: ${cpu.getRegisters().b}`);