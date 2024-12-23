def compute(program, A, B, C, ip = 0):
    reg = {'A': A, 'B': B, 'C': C, 'IP': ip}
    output = []

    combo = {i: (lambda x=i: x) for i in range(4)} | {
        4: lambda: reg['A'],
        5: lambda: reg['B'],
        6: lambda: reg['C'],
    }

    instructions = {
        0: lambda operand: reg.update({'A': reg["A"] >> combo[operand]()}),
        1: lambda operand: reg.update({'B': reg['B'] ^ operand}),
        2: lambda operand: reg.update({'B': combo[operand]() & 7}),
        3: lambda operand: reg.update({'IP': operand - 2 if reg['A'] else reg['IP']}),
        4: lambda operand: reg.update({'B': reg['B'] ^ reg['C']}),
        5: lambda operand: output.append(combo[operand]() & 7),
        6: lambda operand: reg.update({'B': reg["A"] >> combo[operand]()}),
        7: lambda operand: reg.update({'C': reg["A"] >> combo[operand]()}), 
    }

    while reg['IP']+1 < len(program):
        instructions[program[reg['IP']]](program[reg['IP']+1])
        reg['IP'] += 2
    
    return output


with open('input.txt', 'rt') as file:
    reg = []
    program = []
    
    for line in file:
        if line.startswith('R'):
            reg.append(int(line.strip().split(':')[1]))
        elif line.startswith('P'):
            program.extend(map(int, line.strip().split(":")[1].strip().split(',')))

print(*compute(program, *reg), sep=',')
