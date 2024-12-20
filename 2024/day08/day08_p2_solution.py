def determine_location_hierarchy(location1, location2):
    return ((location1, location2) 
            if location1[0] < location2[0] 
            else (location2, location1))

def is_valid_location(location, num_of_cols):
    r, c = location
    return 0 <= r < num_of_cols and 0 <= c < num_of_cols

def get_anti_nodes(l1, l2, num_of_cols):
    high, low = determine_location_hierarchy(l1, l2)
    l1_row, l1_col = high
    l2_row, l2_col = low
    row_dif = l2_row - l1_row
    col_dif = l2_col - l1_col

    anti_nodes = []
    while True:
        t = (l2_row + row_dif, l2_col + col_dif)
        if is_valid_location(t, num_of_cols):
            l2_row += row_dif
            l2_col += col_dif
            anti_nodes.append(t)
        else:
            break

    while True:
        t = (l1_row - row_dif, l1_col - col_dif)
        if is_valid_location(t, num_of_cols):
            l1_row -= row_dif
            l1_col -= col_dif
            anti_nodes.append(t)
        else:
            break

    return anti_nodes

def get_permutations(antenna_map, num_of_cols):
    anti_nodes = set();
    for char, locations in antenna_map.items():
        for i in range(len(locations)):
            anti_nodes.add(locations[i])
            for j in range(i+1, len(locations)):
                anti_nodes.add(locations[j])

                if i != j:
                    anti_nodes.update(get_anti_nodes(locations[i], locations[j], num_of_cols))

    anti_nodes = sorted(anti_nodes)
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