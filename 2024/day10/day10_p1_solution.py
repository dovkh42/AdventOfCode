directions = {
    'left': 0 - 1j,
    'right': 0 +1j,
    'up': -1 +0j,
    'down': 1 +0j
}

grid = {i+j*1j: int(char) for i, line in enumerate(open('input.txt')) 
        for j, char in enumerate(line.strip())}

summit_locations = {loc: set() for loc, value in grid.items() if value == 0}

def find_trails(curr_loc, prev_loc, trail = None, grid = grid):
    if trail is None:
        trail = [curr_loc]

    if curr_loc not in grid or (prev_loc and prev_loc not in grid):
        return []

    if prev_loc and grid.get(curr_loc) - grid.get(prev_loc) != 1:
        return []
    
    if grid.get(curr_loc) == 9:
        return [trail]

    all_trails = []
    for direction in directions.values():
        next_loc = curr_loc + direction
        if next_loc not in trail:
            trails = find_trails(next_loc, curr_loc, trail + [next_loc])

            all_trails.extend(trails)        
    
    return all_trails
    
counter = 0
for location in summit_locations.keys():
    trails = find_trails(location, None)
    if trails is not None:
        for trail in trails:
            summit_locations[location].add(trail[len(trail)-1])
        counter += len(summit_locations[location])
    
print(counter)