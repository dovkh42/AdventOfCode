def determine_location_hierarchy(location1, location2):
    return (location1, location2) if location1[0] < location2[0] else (location2, location1)

def is_valid_location(location, num_of_cols):
    r, c = location
    return 0 <= r < num_of_cols and 0 <= c < num_of_cols

def get_anti_nodes(l1, l2, num_of_cols):
    high, low = determine_location_hierarchy(l1, l2)
    l1_row, l1_col = high
    l2_row, l2_col = low
    row_dif = l2_row - l1_row
    col_dif = l2_col - l1_col

    t1 = (l2_row + row_dif, l2_col + col_dif) if is_valid_location((l2_row + row_dif, l2_col + col_dif), num_of_cols) else None
    t2 = (l1_row - row_dif, l1_col - col_dif) if is_valid_location((l1_row - row_dif, l1_col - col_dif), num_of_cols) else None

    return t1, t2

def get_permutations(antenna_map, num_of_cols):
    anti_nodes = set();
    for char, locations in antenna_map.items():
        for i in range(len(locations)):
            for j in range(i+1, len(locations)):
                if i != j:
                    anti_nodes.update(node for node in get_anti_nodes(locations[i], locations[j], num_of_cols) if node is not None)

    return anti_nodes

with open('input.txt', "r") as file:
    antenna_map = {}
    for row, line in enumerate(file):
        line = line.strip()
        for col, char in enumerate(line):
            if char != ".":
                antenna_map.setdefault(char, []).append((row, col))
    cols = len(line)

print(len(get_permutations(antenna_map, cols)))