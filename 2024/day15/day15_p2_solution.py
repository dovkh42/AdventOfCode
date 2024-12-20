directions = {
    '<': 0 - 1j,
    '>': 0 +1j,
    '^': -1 +0j,
    'v': 1 +0j,
}

with open('input.txt', 'rt') as file:
    warehouse, moves = file.read().split("\n\n")
    warehouse = ''.join([''.join('[]' if char == 'O' else '@.' if char == '@' else char*2 if char != '\n' else char for char in row) for row in warehouse])
    grid = {i+j*1j: char for i, row in enumerate(warehouse.split('\n'))
                for j, char in enumerate(row.strip())}
    robot = min(p for p in grid if grid[p] == '@')
    moves = ''.join(moves.split('\n'))


def move_box_horizontal(grid, next_location, direction):
    if grid[next_location] == '#':
        return False
    if grid[next_location] == '.':
        return True
    
    res = move_box_horizontal(grid, next_location+direction, direction)
    if res:
        grid[next_location+direction], grid[next_location] = grid[next_location], grid[next_location+direction]

    return res

def move_box_vertical(grid, left_bracket, right_bracket, direction):
    if grid[left_bracket+direction] == '#' or grid[right_bracket+direction] == '#':
        return False
    elif grid[left_bracket+direction] == '.' and grid[right_bracket+direction] == '.':
        grid[left_bracket+direction], grid[left_bracket] = grid[left_bracket], grid[left_bracket + direction]
        grid[right_bracket+direction], grid[right_bracket] = grid[right_bracket], grid[right_bracket + direction]
        return True
    
    res = None
    if grid[left_bracket + direction] == '[' and grid[right_bracket+direction] == ']':
        res = move_box_vertical(grid, left_bracket + direction, right_bracket+direction, direction)
    elif grid[left_bracket+direction] == "]" and grid[right_bracket+direction] == "[":
        res =  (move_box_vertical(grid, left_bracket + direction + directions['<'], left_bracket+direction, direction) and
               move_box_vertical(grid, right_bracket + direction, right_bracket+direction+directions['>'], direction)) 
    elif grid[left_bracket+direction] == "]":
        res =  move_box_vertical(grid, left_bracket + direction + directions['<'], left_bracket+direction, direction)
    elif grid[right_bracket+direction] == "[":
        res =  move_box_vertical(grid, right_bracket + direction, right_bracket+direction+directions['>'], direction)

    if res == True:
        grid[left_bracket+direction], grid[left_bracket] = grid[left_bracket], grid[left_bracket + direction]
        grid[right_bracket+direction], grid[right_bracket] = grid[right_bracket], grid[right_bracket + direction]

    return res

for move in moves:
    next_cell = grid[robot + directions[move]]
    if next_cell == '#':
        continue

    if next_cell == '[' or next_cell == ']':
        if move == '>' or move == '<':
            if move_box_horizontal(grid, robot + directions[move], directions[move]):
                next_cell = grid[robot + directions[move]]
        elif next_cell == ']':
            grid2 = grid.copy()
            if move_box_vertical(grid, robot + directions[move] + directions['<'] ,robot + directions[move], directions[move]):
                next_cell = grid[robot + directions[move]]
            else:
                grid = grid2
        else: 
            grid2 = grid.copy()
            if move_box_vertical(grid, robot + directions[move], robot + directions[move] + directions['>'], directions[move]):
                next_cell = grid[robot + directions[move]]
            else:
                grid = grid2
        
    if next_cell == '.':
        grid[robot], grid[robot + directions[move]] = grid[robot + directions[move]], grid[robot]
        robot = robot + directions[move]

res = 0
for key in grid:
    if grid[key] == "[":
        res += int(key.real) * 100 + int(key.imag)

print(res)