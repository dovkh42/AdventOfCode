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

def find_visited_cells(guard_x, guard_y, guard_direction, grid=grid):
    visited_set = set()
    next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)

    while 0 <= next_x < len(grid) and 0 <= next_y < len(grid):
        if grid[next_y][next_x] == '#':
            guard_direction = CHANGE_DIRECTION[guard_direction]
            next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)

        guard_x, guard_y = next_x, next_y
        visited_set.add((guard_x, guard_y))
        next_x, next_y = MOVE_GUARD[guard_direction](guard_x, guard_y)

    return len(visited_set)

print(find_visited_cells(guard_x, guard_y, 'up'))
