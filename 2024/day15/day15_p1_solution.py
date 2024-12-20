directions = {
    '<': 0 - 1j,
    '>': 0 +1j,
    '^': -1 +0j,
    'v': 1 +0j,
}

with open('input.txt', 'rt') as file:
    warehouse, moves = file.read().split("\n\n")
    grid = {i+j*1j: char for i, row in enumerate(warehouse.split('\n'))
                for j, char in enumerate(row.strip())}
    robot = min(p for p in grid if grid[p] == '@')
    moves = ''.join(moves.split('\n'))

for move in moves:
    next_cell = grid[robot + directions[move]]
    if next_cell == '#':
        continue

    if next_cell == 'O':
        next_next_cell = robot + directions[move] + directions[move]
        while grid[next_next_cell] == 'O':
            next_next_cell += directions[move]
        
        if grid[next_next_cell] == '#':
            continue
        else:
            grid[next_next_cell], grid[robot + directions[move]] = grid[robot + directions[move]], grid[next_next_cell]
            next_cell = grid[robot + directions[move]]


    if next_cell == '.':
        grid[robot], grid[robot + directions[move]] = grid[robot + directions[move]], grid[robot]
        robot = robot + directions[move]

res = 0
for key in grid:
    if grid[key] == "O":
        res += int(key.real) * 100 + int(key.imag)

print(res)

