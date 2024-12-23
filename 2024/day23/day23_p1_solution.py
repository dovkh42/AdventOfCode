with open('input.txt', 'rt') as file:
    pc_map = {}

    for line in file:
        a, b = line.strip().split('-')
        pc_map.setdefault(a, []).append(b)
        pc_map.setdefault(b, []).append(a)

result = set()
for first, first_links in pc_map.items():
    for second in first_links:
        second_values = pc_map[second]
        if len(second_values) == 0:
            continue
        for third in second_values:
            if third != first and third in first_links and any(str.startswith('t') for str in [first, second, third]):
                result.add((first, second, third))
    pc_map[first].clear()

unique_combinations = {frozenset(triplet) for triplet in result}

print(len(unique_combinations))