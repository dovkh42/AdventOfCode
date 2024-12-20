from typing import Tuple, Dict, Callable

MOVE_GUARD: Dict[str, Callable[[int, int], Tuple[int, int]]] = {
    'up': lambda x,y: (x, y-1),
    'down': lambda x,y: (x, y + 1),
    'left': lambda x,y: (x - 1, y),
    "right": lambda x,y: (x + 1, y)
}

CHANGE_DIRECTION: Dict[str, str] = {
    'up': 'right',
    'down': 'left',
    'left': 'up',
    "right": 'down'
}

def get_location(location_tuple):
    x, y = location_tuple
    return x, y

with open('input.txt', 'r') as file:
    grid = [list(line.strip()) for line in file]
    guard_x, guard_y = next(
        (
            (x, y) 
            for y, row in enumerate(grid) 
            for x, cell in enumerate(row) 
            if cell == '^'
        ), 
        None
    )

def is_valid_pos(x, y, length):
    return 0 <= x < length and 0 <= y < length


def find_visited_cells(guard_x, guard_y, guard_direction, grid=grid):
    visited_map = {}
    next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)
    prev = (guard_x, guard_y, guard_direction, 0)

    while is_valid_pos(next_x, next_y, len(grid)):
        if grid[next_y][next_x] == '#':
            guard_direction = CHANGE_DIRECTION[guard_direction]
            next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)
        else:
            guard_x, guard_y = next_x, next_y
            next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)
            visited_map.setdefault((guard_x, guard_y), prev)
            prev = guard_x, guard_y, guard_direction, len(visited_map)

    return visited_map

def is_loop(guard_x, guard_y, guard_direction, grid, allowed_steps):
    start_x, start_y, start_dir = guard_x, guard_y, guard_direction
    next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)
    is_same_spot_reached = False

    while is_valid_pos(next_x, next_y, len(grid)):
        if is_same_spot_reached or not allowed_steps:
            return True

        if grid[next_y][next_x] == '#':
            guard_direction = CHANGE_DIRECTION[guard_direction]
            next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)
        else:
            guard_x, guard_y = next_x, next_y
            allowed_steps -= 1
            if ( start_x, start_y) == (guard_x, guard_y) and guard_direction == start_dir:
                is_same_spot_reached = True
            next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)

    return False


visited = find_visited_cells(guard_x, guard_y, 'up')

counter = 0
for location in visited:
    x, y = location
    start_x, start_y, direction, num_of_steps = visited[location]
    grid[y][x] = '#'

    if is_loop(start_x, start_y, direction, grid, len(grid)**2) == True:
        counter += 1
    grid[y][x] = '.'

print(counter)

